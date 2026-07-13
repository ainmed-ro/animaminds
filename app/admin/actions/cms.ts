'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { sendAdminNewRegistrationEmail } from '@/lib/notifications'
import { syncRegistrationToGoogleSheets } from '@/lib/google-sheets'
import {
  Role,
  ProgrammeStatus,
  EditionStatus,
  DeliveryFormat,
  PriceType,
  PriceStatus,
  FormType,
  OnlinePlatform,
} from '@prisma/client'
import { requireAdminUser, canEditPrices, canManageContent } from '@/lib/auth'
import bcrypt from 'bcrypt'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Final capacity business rules (also stored on Programme as defaults)
const DEFAULT_CAPACITY: Record<string, { min: number | null; max: number }> = {
  ONLINE: { min: 15, max: 30 },
  ONLINE_DEDICATED: { min: 15, max: 30 },
  ONSITE: { min: 15, max: 30 },
  EXPERIENCE_EDITION: { min: 20, max: 30 },
  // Temporarily added for backward compatibility during migration
  OPEN_COHORT: { min: 15, max: 30 },
}

function getCapacityRules(edition: { deliveryFormat: DeliveryFormat; programme: { onlineMinParticipants: number | null; onlineMaxParticipants: number | null; onsiteMaxParticipants: number | null; experienceMinParticipants: number | null; experienceMaxParticipants: number | null } | null } | null) {
  const defaults = edition ? DEFAULT_CAPACITY[edition.deliveryFormat] : DEFAULT_CAPACITY[DeliveryFormat.ONLINE]
  const p = edition?.programme
  if (!p) return defaults
  switch (edition?.deliveryFormat) {
    case DeliveryFormat.ONLINE:
      return {
        min: p.onlineMinParticipants ?? defaults.min,
        max: p.onlineMaxParticipants ?? defaults.max,
      }
    case DeliveryFormat.ONSITE:
      return { min: defaults.min, max: p.onsiteMaxParticipants ?? defaults.max }
    case DeliveryFormat.EXPERIENCE_EDITION:
      return {
        min: p.experienceMinParticipants ?? defaults.min,
        max: p.experienceMaxParticipants ?? defaults.max,
      }
    default:
      return defaults
  }
}

function validateParticipantCount(edition: { deliveryFormat: DeliveryFormat; programme: { onlineMinParticipants: number | null; onlineMaxParticipants: number | null; onsiteMaxParticipants: number | null; experienceMinParticipants: number | null; experienceMaxParticipants: number | null } | null } | null, participantCount: number) {
  if (!participantCount || participantCount < 1) throw new Error('Participant count must be at least 1')
  const rules = getCapacityRules(edition)
  if (rules.min !== null && participantCount < rules.min) {
    throw new Error(`Minimum ${rules.min} participants required for this format`)
  }
  if (participantCount > rules.max) {
    throw new Error(`Maximum ${rules.max} participants allowed for this format`)
  }
}

function validateCapacityMinMax(min: number | undefined | null, max: number | undefined | null, label: string) {
  if (min != null && max != null && min > max) {
    throw new Error(`${label}: minimum cannot exceed maximum`)
  }
}

function validateProgrammeCapacity(data: {
  onlineMinParticipants?: number
  onlineMaxParticipants?: number
  onsiteMaxParticipants?: number
  experienceMinParticipants?: number
  experienceMaxParticipants?: number
}) {
  validateCapacityMinMax(data.onlineMinParticipants, data.onlineMaxParticipants, 'Online Live')
  validateCapacityMinMax(data.experienceMinParticipants, data.experienceMaxParticipants, 'Experience Edition')
}

function validateEditionCapacity(data: { minParticipants?: number; maxParticipants?: number; deliveryFormat?: DeliveryFormat }) {
  validateCapacityMinMax(data.minParticipants, data.maxParticipants, data.deliveryFormat || 'Edition')
}

function validateHourFields(data: {
  contactHours?: number
  individualActivitiesHours?: number
  totalLearningHours?: number
}) {
  const { contactHours, individualActivitiesHours, totalLearningHours } = data
  if (
    contactHours != null &&
    individualActivitiesHours != null &&
    totalLearningHours != null &&
    Math.abs(contactHours + individualActivitiesHours - totalLearningHours) > 0.001
  ) {
    throw new Error('Total Learning Hours should equal Contact Hours + Individual Activities Hours')
  }
}

function validateCpdCredits(cpdCredits?: number) {
  if (cpdCredits != null && cpdCredits < 0) {
    throw new Error('CPD Credits cannot be negative')
  }
}

// ------------------------------------------------------------------
// Programmes
// ------------------------------------------------------------------

export async function getProgrammes() {
  return prisma.programme.findMany({
    include: {
      targetAudiences: { include: { targetAudience: true } },
      applicationAreas: { include: { applicationArea: true } },
      editions: { select: { id: true, editionTitle: true } },
      defaultStandardPrice: { select: { id: true, priceCode: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProgramme(id: string) {
  return prisma.programme.findUnique({
    where: { id },
    include: {
      targetAudiences: { include: { targetAudience: true } },
      applicationAreas: { include: { applicationArea: true } },
      editions: true,
      defaultStandardPrice: true,
      defaultLaunchPrice: true,
      additionalDefaultPrices: true,
      faqs: true,
      documents: { include: { document: true } },
      galleries: { include: { gallery: true } },
      testimonials: { include: { testimonial: true } },
      seo: true,
      programmeOwner: true,
      reviewer: true,
    },
  })
}

export async function getProgrammeEditOptions() {
  const [prices, faqs, documents, galleries, users, taxonomies] = await Promise.all([
    prisma.price.findMany({ orderBy: { priceCode: 'asc' } }),
    prisma.fAQ.findMany({ orderBy: { order: 'asc' } }),
    prisma.document.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.user.findMany({ orderBy: { name: 'asc' } }),
    getTaxonomies(),
  ])
  return { prices, faqs, documents, galleries, users, taxonomies }
}

function getStrings(formData: FormData, name: string): string[] {
  return formData.getAll(name).map((v) => v.toString()).filter(Boolean)
}

function getNumber(formData: FormData, name: string): number | undefined {
  const value = Number(formData.get(name))
  return isNaN(value) ? undefined : value
}

function getDate(formData: FormData, name: string): Date | undefined {
  const value = formData.get(name) as string
  return value ? new Date(value) : undefined
}

function getJson(formData: FormData, name: string): any | undefined {
  const value = formData.get(name) as string
  if (!value) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

function getOptional(formData: FormData, name: string): string | undefined {
  const value = formData.get(name) as string
  return value || undefined
}

function buildProgrammeData(formData: FormData) {
  const name = formData.get('name') as string
  return {
    slug: slugify(formData.get('slug') as string || name),
    programmeCode: formData.get('programmeCode') as string,
    name,
    status: formData.get('status') as ProgrammeStatus,
    subtitle: getOptional(formData, 'subtitle'),
    shortDescription: getOptional(formData, 'shortDescription'),
    fullDescription: getOptional(formData, 'fullDescription'),
    problemSolved: getOptional(formData, 'problemSolved'),
    programmePromise: getOptional(formData, 'programmePromise'),
    mainBenefits: getStrings(formData, 'mainBenefits'),
    whatParticipantsReceive: getStrings(formData, 'whatParticipantsReceive'),
    whatParticipantsCanDoNextDay: getStrings(formData, 'whatParticipantsCanDoNextDay'),
    availableDeliveryFormats: getStrings(formData, 'availableDeliveryFormats') as DeliveryFormat[],
    registrationCTA: getOptional(formData, 'registrationCTA') || 'Înscrie-te',
    offerRequestCTA: getOptional(formData, 'offerRequestCTA') || 'Solicită ofertă',
    featuredImageUrl: getOptional(formData, 'featuredImageUrl'),
    duration: getOptional(formData, 'duration'),
    learningHours: getNumber(formData, 'learningHours'),
    contactHours: getNumber(formData, 'contactHours'),
    individualActivitiesHours: getNumber(formData, 'individualActivitiesHours'),
    totalLearningHours: getNumber(formData, 'totalLearningHours'),
    cpdCredits: getNumber(formData, 'cpdCredits'),
    onlineMinParticipants: getNumber(formData, 'onlineMinParticipants'),
    onlineMaxParticipants: getNumber(formData, 'onlineMaxParticipants'),
    onsiteMaxParticipants: getNumber(formData, 'onsiteMaxParticipants'),
    experienceMinParticipants: getNumber(formData, 'experienceMinParticipants'),
    experienceMaxParticipants: getNumber(formData, 'experienceMaxParticipants'),
    accreditationBody: getOptional(formData, 'accreditationBody'),
    cpdProviderReference: getOptional(formData, 'cpdProviderReference'),
    cpdApprovalDate: getDate(formData, 'cpdApprovalDate'),
    competenciesDeveloped: getJson(formData, 'competenciesDeveloped'),
    learningOutcomes: getStrings(formData, 'learningOutcomes'),
    programmeObjectives: getOptional(formData, 'programmeObjectives'),
    learningMethods: getStrings(formData, 'learningMethods'),
    assessmentMethods: getStrings(formData, 'assessmentMethods'),
    resourcesOffered: getStrings(formData, 'resourcesOffered'),
    certificationInfo: getOptional(formData, 'certificationInfo'),
    followUpProcess: getOptional(formData, 'followUpProcess'),
    industryAdaptations: getJson(formData, 'industryAdaptations'),
    emotionalSafetyProtocol: getOptional(formData, 'emotionalSafetyProtocol'),
    dataRetentionPolicy: getOptional(formData, 'dataRetentionPolicy'),
    pmdVersion: getOptional(formData, 'pmdVersion'),
    displayProfessionalLevel: formData.get('displayProfessionalLevel') === 'true',
    displayGovernanceFields: formData.get('displayGovernanceFields') === 'true',
    programmeOwnerId: getOptional(formData, 'programmeOwnerId'),
    reviewerId: getOptional(formData, 'reviewerId'),
    dateApproved: getDate(formData, 'dateApproved'),
    nextReviewDate: getDate(formData, 'nextReviewDate'),
    defaultStandardPriceId: getOptional(formData, 'defaultStandardPriceId'),
    defaultLaunchPriceId: getOptional(formData, 'defaultLaunchPriceId'),
  }
}

export async function createProgramme(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const targetAudienceIds = getStrings(formData, 'targetAudienceIds')
  const applicationAreaIds = getStrings(formData, 'applicationAreaIds')
  const faqIds = getStrings(formData, 'faqIds')
  const documentIds = getStrings(formData, 'documentIds')
  const galleryIds = getStrings(formData, 'galleryIds')
  const additionalDefaultPriceIds = getStrings(formData, 'additionalDefaultPriceIds')

  const programmeData = buildProgrammeData(formData)
  validateProgrammeCapacity(programmeData)
  validateHourFields(programmeData)
  validateCpdCredits(programmeData.cpdCredits)

  const programme = await prisma.programme.create({
    data: {
      ...programmeData,
      targetAudiences: {
        create: targetAudienceIds.map((tid) => ({ targetAudience: { connect: { id: tid } } })),
      },
      applicationAreas: {
        create: applicationAreaIds.map((aid) => ({ applicationArea: { connect: { id: aid } } })),
      },
      faqs: { connect: faqIds.map((id) => ({ id })) },
      documents: { create: documentIds.map((did) => ({ document: { connect: { id: did } } })) },
      galleries: { create: galleryIds.map((gid) => ({ gallery: { connect: { id: gid } } })) },
      additionalDefaultPrices: { connect: additionalDefaultPriceIds.map((id) => ({ id })) },
    },
  })

  await saveProgrammeSEO(programme.id, formData)

  revalidatePath('/admin/programmes')
  redirect('/admin/programmes')
}

async function saveProgrammeSEO(programmeId: string, formData: FormData) {
  const seoId = formData.get('seoId') as string | undefined
  const seoData = {
    metaTitle: getOptional(formData, 'metaTitle'),
    metaDescription: getOptional(formData, 'metaDescription'),
    canonicalUrl: getOptional(formData, 'canonicalUrl'),
    ogTitle: getOptional(formData, 'ogTitle'),
    ogDescription: getOptional(formData, 'ogDescription'),
    ogImageUrl: getOptional(formData, 'ogImageUrl'),
    noIndex: formData.get('noIndex') === 'true',
    structuredData: getJson(formData, 'structuredData'),
  }

  if (seoId) {
    await prisma.programmeSEO.upsert({
      where: { id: seoId },
      update: seoData,
      create: { programmeId, ...seoData },
    })
  } else {
    await prisma.programmeSEO.upsert({
      where: { programmeId },
      update: seoData,
      create: { programmeId, ...seoData },
    })
  }
}

export async function updateProgramme(id: string, formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const targetAudienceIds = getStrings(formData, 'targetAudienceIds')
  const applicationAreaIds = getStrings(formData, 'applicationAreaIds')
  const faqIds = getStrings(formData, 'faqIds')
  const documentIds = getStrings(formData, 'documentIds')
  const galleryIds = getStrings(formData, 'galleryIds')
  const additionalDefaultPriceIds = getStrings(formData, 'additionalDefaultPriceIds')

  const programmeData = buildProgrammeData(formData)
  validateProgrammeCapacity(programmeData)
  validateHourFields(programmeData)
  validateCpdCredits(programmeData.cpdCredits)

  await prisma.programme.update({
    where: { id },
    data: {
      ...programmeData,
      targetAudiences: {
        deleteMany: {},
        create: targetAudienceIds.map((tid) => ({
          targetAudience: { connect: { id: tid } },
        })),
      },
      applicationAreas: {
        deleteMany: {},
        create: applicationAreaIds.map((aid) => ({
          applicationArea: { connect: { id: aid } },
        })),
      },
      faqs: { set: faqIds.map((id) => ({ id })) },
      documents: {
        deleteMany: {},
        create: documentIds.map((did) => ({ document: { connect: { id: did } } })),
      },
      galleries: {
        deleteMany: {},
        create: galleryIds.map((gid) => ({ gallery: { connect: { id: gid } } })),
      },
      additionalDefaultPrices: { set: additionalDefaultPriceIds.map((id) => ({ id })) },
    },
  })

  await saveProgrammeSEO(id, formData)

  revalidatePath('/admin/programmes')
  revalidatePath(`/admin/programmes/${id}`)
  redirect('/admin/programmes')
}

export async function deleteProgramme(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.programme.delete({ where: { id } })
  revalidatePath('/admin/programmes')
}

// ------------------------------------------------------------------
// Editions
// ------------------------------------------------------------------

export async function getEditions() {
  return prisma.edition.findMany({
    include: {
      programme: { 
        select: { 
          name: true,
        } 
      },
      displayPrice: true,
      additionalPrices: { include: { price: true } },
      galleries: { include: { gallery: true } },
      _count: { select: { registrations: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getEdition(id: string) {
  return prisma.edition.findUnique({
    where: { id },
    include: {
      programme: true,
      displayPrice: true,
      additionalPrices: { include: { price: true } },
      galleries: { include: { gallery: true } },
      registrations: { select: { id: true } },
    },
  })
}

export async function getProgrammesForSelect() {
  return prisma.programme.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })
}

export async function getPricesForSelect(programmeId?: string) {
  return prisma.price.findMany({
    where: programmeId ? { OR: [{ programmeId }, { programmeId: null }] } : {},
    select: { id: true, priceCode: true, priceType: true, status: true, displayLabel: true },
    orderBy: { priceCode: 'asc' },
  })
}

export async function getGalleriesForSelect() {
  return prisma.gallery.findMany({
    select: { id: true, name: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getEditionEditOptions(programmeId?: string) {
  const [programmes, prices, galleries] = await Promise.all([
    getProgrammesForSelect(),
    getPricesForSelect(programmeId),
    getGalleriesForSelect(),
  ])
  return { programmes, prices, galleries }
}

function buildEditionData(formData: FormData) {
  const editionTitle = formData.get('editionTitle') as string
  const slug = slugify(formData.get('slug') as string || editionTitle)
  const format = (formData.get('deliveryFormat') as DeliveryFormat) || DeliveryFormat.ONLINE
  const isExperience = format === DeliveryFormat.EXPERIENCE_EDITION

  const sessionDates = getStrings(formData, 'sessionDates')
    .filter(Boolean)
    .map((d) => new Date(d))

  return {
    editionTitle,
    slug,
    deliveryFormat: format,
    status: (formData.get('status') as EditionStatus) || EditionStatus.DRAFT,
    startDate: getDate(formData, 'startDate'),
    endDate: getDate(formData, 'endDate'),
    durationText: getOptional(formData, 'durationText'),
    registrationDeadline: getDate(formData, 'registrationDeadline'),
    maxSeats: getNumber(formData, 'maxSeats'),
    availableSeats: getNumber(formData, 'availableSeats'),
    displayPriceId: getOptional(formData, 'displayPriceId'),
    featuredImageUrl: getOptional(formData, 'featuredImageUrl'),
    notes: getOptional(formData, 'notes'),
    // Learning & CPD overrides
    contactHours: getNumber(formData, 'contactHours'),
    individualActivitiesHours: getNumber(formData, 'individualActivitiesHours'),
    totalLearningHours: getNumber(formData, 'totalLearningHours'),
    cpdCredits: getNumber(formData, 'cpdCredits'),
    // Group size overrides (available for every format)
    minParticipants: getNumber(formData, 'minParticipants'),
    maxParticipants: getNumber(formData, 'maxParticipants'),
    // Online
    platform: getOptional(formData, 'platform') as any,
    meetLink: getOptional(formData, 'meetLink'),
    classroomLink: getOptional(formData, 'classroomLink'),
    sessionDates,
    sessionCount: getNumber(formData, 'sessionCount'),
    recordingPolicy: getOptional(formData, 'recordingPolicy'),
    // On-site
    city: getOptional(formData, 'city'),
    locationName: getOptional(formData, 'locationName'),
    address: getOptional(formData, 'address'),
    startTime: getOptional(formData, 'startTime'),
    endTime: getOptional(formData, 'endTime'),
    includedServices: getStrings(formData, 'includedServices'),
    excludedServices: getStrings(formData, 'excludedServices'),
    hasOwnRoom: formData.get('hasOwnRoom') === 'true',
    roomCostIncluded: formData.get('roomCostIncluded') === 'true',
    // Experience Edition
    destination: isExperience ? getOptional(formData, 'destination') : undefined,
    hotelName: isExperience ? getOptional(formData, 'hotelName') : undefined,
    hotelAddress: isExperience ? getOptional(formData, 'hotelAddress') : undefined,
    period: isExperience ? getOptional(formData, 'period') : undefined,
    // Experience Edition specific fields remain guarded
    roomTypes: isExperience ? getJson(formData, 'roomTypes') : undefined,
    includedMeals: isExperience ? getStrings(formData, 'includedMeals') : undefined,
    includedFacilities: isExperience ? getStrings(formData, 'includedFacilities') : undefined,
    complementaryActivities: isExperience ? getStrings(formData, 'complementaryActivities') : undefined,
    indicativeSchedule: isExperience ? getOptional(formData, 'indicativeSchedule') : undefined,
    confirmationPolicy: isExperience ? getOptional(formData, 'confirmationPolicy') : undefined,
    cancellationPolicy: isExperience ? getOptional(formData, 'cancellationPolicy') : undefined,
    priceStatus: isExperience ? (getOptional(formData, 'priceStatus') as any) : undefined,
  }
}

export async function createEdition(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const programmeId = formData.get('programmeId') as string
  const additionalPriceIds = getStrings(formData, 'additionalPriceIds')
  const galleryIds = getStrings(formData, 'galleryIds')

  const editionData = buildEditionData(formData)
  validateEditionCapacity(editionData)
  validateHourFields(editionData)
  validateCpdCredits(editionData.cpdCredits)

  await prisma.edition.create({
    data: {
      programmeId,
      ...editionData,
      additionalPrices: {
        create: additionalPriceIds.map((pid) => ({ price: { connect: { id: pid } } })),
      },
      galleries: {
        create: galleryIds.map((gid) => ({ gallery: { connect: { id: gid } } })),
      },
    },
  })

  revalidatePath('/admin/editions')
  redirect('/admin/editions')
}

export async function updateEdition(id: string, formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const additionalPriceIds = getStrings(formData, 'additionalPriceIds')
  const galleryIds = getStrings(formData, 'galleryIds')

  const editionData = buildEditionData(formData)
  validateEditionCapacity(editionData)
  validateHourFields(editionData)
  validateCpdCredits(editionData.cpdCredits)

  await prisma.edition.update({
    where: { id },
    data: {
      ...editionData,
      additionalPrices: {
        deleteMany: {},
        create: additionalPriceIds.map((pid) => ({ price: { connect: { id: pid } } })),
      },
      galleries: {
        deleteMany: {},
        create: galleryIds.map((gid) => ({ gallery: { connect: { id: gid } } })),
      },
    },
  })

  revalidatePath('/admin/editions')
  revalidatePath(`/admin/editions/${id}`)
  redirect('/admin/editions')
}

export async function deleteEdition(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.edition.delete({ where: { id } })
  revalidatePath('/admin/editions')
}

// ------------------------------------------------------------------
// Registrations
// ------------------------------------------------------------------

export async function getRegistrations() {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  return prisma.registration.findMany({
    include: { edition: { include: { programme: { select: { name: true } } } } },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getRegistration(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  return prisma.registration.findUnique({
    where: { id },
    include: { edition: { include: { programme: { select: { name: true } } } } },
  })
}

const EDITION_PROGRAMME_SELECT = {
  name: true,
  slug: true,
  defaultLaunchPrice: { select: { amount: true, currency: true, displayLabel: true, priceType: true, deliveryFormat: true } },
} as const

export async function getOpenEditionsForRegistration() {
  return prisma.edition.findMany({
    where: {
      status: { in: ['DRAFT', 'OPEN'] },
      OR: [
        { registrationDeadline: { gte: new Date() } },
        { registrationDeadline: null },
      ],
    },
    include: { programme: { select: EDITION_PROGRAMME_SELECT }, displayPrice: true },
    orderBy: { startDate: 'asc' },
  })
}

export async function getOpenEditionsForRegistrationByProgramme(programmeSlug: string) {
  return prisma.edition.findMany({
    where: {
      programme: { slug: programmeSlug },
      status: { in: ['DRAFT', 'OPEN'] },
      OR: [
        { registrationDeadline: { gte: new Date() } },
        { registrationDeadline: null },
      ],
    },
    include: { programme: { select: EDITION_PROGRAMME_SELECT }, displayPrice: true },
    orderBy: { startDate: 'asc' },
  })
}

export async function createRegistration(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const editionId = formData.get('editionId') as string
  const participantCount = getNumber(formData, 'participantCount') || 1

  const edition = await prisma.edition.findUnique({
    where: { id: editionId },
    include: {
      programme: {
        select: {
          onlineMinParticipants: true,
          onlineMaxParticipants: true,
          onsiteMaxParticipants: true,
          experienceMinParticipants: true,
          experienceMaxParticipants: true,
        } as any,
      },
    },
  }) as any
  if (!edition) throw new Error('Edition not found')
  validateParticipantCount(edition, participantCount)
  if (edition.availableSeats !== null && edition.availableSeats < participantCount) {
    throw new Error('Not enough available seats')
  }

  const registration = await prisma.$transaction([
    prisma.registration.create({
      data: {
        editionId,
        contactName: formData.get('contactName') as string,
        contactEmail: formData.get('contactEmail') as string,
        contactPhone: getOptional(formData, 'contactPhone'),
        entityType: (formData.get('entityType') as any) || 'INDIVIDUAL',
        entityName: getOptional(formData, 'entityName'),
        cui: getOptional(formData, 'cui'),
        participantsJson: getJson(formData, 'participantsJson'),
        paymentStatus: (formData.get('paymentStatus') as any) || 'PENDING',
        notes: getOptional(formData, 'notes'),
      },
    }),
    prisma.edition.update({
      where: { id: editionId },
      data: { availableSeats: edition.availableSeats !== null ? { decrement: participantCount } : undefined },
    }),
  ])

  revalidatePath('/admin/registrations')
  revalidatePath('/admin/editions')
  redirect('/admin/registrations')
}

export async function updateRegistration(id: string, formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const existing = await prisma.registration.findUnique({ where: { id } })
  if (!existing) throw new Error('Registration not found')

  const oldCount = getParticipantCount(existing.participantsJson)
  const newCount = getNumber(formData, 'participantCount') || oldCount

  const edition = await prisma.edition.findUnique({
    where: { id: existing.editionId },
    include: {
      programme: {
        select: {
          onlineMinParticipants: true,
          onlineMaxParticipants: true,
          onsiteMaxParticipants: true,
          experienceMinParticipants: true,
          experienceMaxParticipants: true,
        } as any,
      },
    },
  }) as any
  if (edition) validateParticipantCount(edition, newCount)

  await prisma.$transaction([
    prisma.registration.update({
      where: { id },
      data: {
        contactName: formData.get('contactName') as string,
        contactEmail: formData.get('contactEmail') as string,
        contactPhone: getOptional(formData, 'contactPhone'),
        entityType: (formData.get('entityType') as any) || 'INDIVIDUAL',
        entityName: getOptional(formData, 'entityName'),
        cui: getOptional(formData, 'cui'),
        participantsJson: getJson(formData, 'participantsJson'),
        paymentStatus: (formData.get('paymentStatus') as any) || 'PENDING',
        notes: getOptional(formData, 'notes'),
      },
    }),
    prisma.edition.update({
      where: { id: existing.editionId },
      data: {
        availableSeats: {
          increment: oldCount - newCount,
        },
      },
    }),
  ])

  revalidatePath('/admin/registrations')
  revalidatePath('/admin/editions')
  revalidatePath(`/admin/registrations/${id}`)
  redirect('/admin/registrations')
}

function getParticipantCount(json: any): number {
  if (!json || !Array.isArray(json)) return 1
  return json.length || 1
}

export async function deleteRegistration(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const existing = await prisma.registration.findUnique({ where: { id } })
  if (!existing) throw new Error('Registration not found')

  const count = getParticipantCount(existing.participantsJson)

  await prisma.$transaction([
    prisma.registration.delete({ where: { id } }),
    prisma.edition.update({
      where: { id: existing.editionId },
      data: { availableSeats: { increment: count } },
    }),
  ])

  revalidatePath('/admin/registrations')
  revalidatePath('/admin/editions')
}

export async function submitPublicRegistration(formData: FormData) {
  const editionId = formData.get('editionId') as string
  const participantCount = getNumber(formData, 'participantCount') || 1

  const edition = await prisma.edition.findUnique({
    where: { id: editionId },
    include: {
      programme: {
        select: {
          name: true,
          slug: true,
          onlineMinParticipants: true,
          onlineMaxParticipants: true,
          onsiteMaxParticipants: true,
          experienceMinParticipants: true,
          experienceMaxParticipants: true,
        } as any,
      },
    },
  }) as any
  if (!edition) throw new Error('Edition not found')
  if (edition.status !== 'OPEN' && edition.status !== 'DRAFT') {
    throw new Error('Registration is closed for this edition')
  }
  if (edition.registrationDeadline && new Date(edition.registrationDeadline) < new Date()) {
    throw new Error('Registration deadline has passed')
  }
  validateParticipantCount(edition as any, participantCount)
  if (edition.availableSeats !== null && edition.availableSeats < participantCount) {
    throw new Error('Not enough available seats')
  }

  const [registration] = await prisma.$transaction([
    prisma.registration.create({
      data: {
        editionId,
        contactName: formData.get('contactName') as string,
        contactEmail: formData.get('contactEmail') as string,
        contactPhone: getOptional(formData, 'contactPhone'),
        entityType: (formData.get('entityType') as any) || 'INDIVIDUAL',
        entityName: getOptional(formData, 'entityName'),
        cui: getOptional(formData, 'cui'),
        participantsJson: getJson(formData, 'participantsJson'),
        paymentStatus: 'PENDING',
        notes: getOptional(formData, 'notes'),
      },
    }),
    prisma.edition.update({
      where: { id: editionId },
      data: { availableSeats: edition.availableSeats !== null ? { decrement: participantCount } : undefined },
    }),
  ])

  revalidatePath('/admin/registrations')
  revalidatePath('/admin/editions')
  revalidatePath('/calendar')

  try {
    await sendAdminNewRegistrationEmail({
      contactName: registration.contactName,
      contactEmail: registration.contactEmail,
      contactPhone: registration.contactPhone,
      editionTitle: edition.editionTitle,
      programmeName: edition.programme.name,
      participantCount,
      createdAt: registration.createdAt,
      registrationId: registration.id,
    })
  } catch (err) {
    console.error('Failed to send registration notification:', err)
  }

  try {
    await syncRegistrationToGoogleSheets({
      formType: 'ÎNSCRIERI',
      programme: edition.programme.name,
      edition: edition.editionTitle,
      contactName: registration.contactName,
      contactEmail: registration.contactEmail,
      contactPhone: registration.contactPhone,
      participantCount,
      entityName: registration.entityName,
      entityType: registration.entityType,
      paymentStatus: registration.paymentStatus,
      notes: registration.notes,
      createdAt: registration.createdAt,
    })
  } catch (err) {
    console.error('Failed to sync registration to Google Sheets:', err)
  }

  return registration
}

// ------------------------------------------------------------------
// Prices
// ------------------------------------------------------------------

export async function getPrices() {
  return prisma.price.findMany({
    include: { programme: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getPrice(id: string) {
  return prisma.price.findUnique({
    where: { id },
    include: { programme: true },
  })
}

export async function createPrice(formData: FormData) {
  const user = await requireAdminUser()
  if (!canEditPrices(user)) throw new Error('Access denied')

  await prisma.price.create({
    data: {
      priceCode: formData.get('priceCode') as string,
      programmeId: (formData.get('programmeId') as string) || undefined,
      priceType: (formData.get('priceType') as PriceType) || PriceType.STANDARD,
      deliveryFormat: (formData.get('deliveryFormat') as DeliveryFormat) || null,
      amount: Number(formData.get('amount')) || undefined,
      currency: (formData.get('currency') as string) || 'RON',
      vatIncluded: formData.get('vatIncluded') === 'true',
      status: (formData.get('status') as PriceStatus) || PriceStatus.ON_REQUEST,
      displayLabel: formData.get('displayLabel') as string,
    } as any,
  })

  revalidatePath('/admin/prices')
  redirect('/admin/prices')
}

export async function updatePrice(id: string, formData: FormData) {
  const user = await requireAdminUser()
  if (!canEditPrices(user)) throw new Error('Access denied')

  await prisma.price.update({
    where: { id },
    data: {
      priceCode: formData.get('priceCode') as string,
      programmeId: (formData.get('programmeId') as string) || undefined,
      priceType: (formData.get('priceType') as PriceType) || PriceType.STANDARD,
      deliveryFormat: (formData.get('deliveryFormat') as DeliveryFormat) || null,
      amount: Number(formData.get('amount')) || undefined,
      currency: (formData.get('currency') as string) || 'RON',
      vatIncluded: formData.get('vatIncluded') === 'true',
      status: (formData.get('status') as PriceStatus) || PriceStatus.ON_REQUEST,
      displayLabel: formData.get('displayLabel') as string,
    } as any,
  })

  revalidatePath('/admin/prices')
  revalidatePath(`/admin/prices/${id}`)
  redirect('/admin/prices')
}

export async function deletePrice(id: string) {
  const user = await requireAdminUser()
  if (!canEditPrices(user)) throw new Error('Access denied')
  await prisma.price.delete({ where: { id } })
  revalidatePath('/admin/prices')
}

// ------------------------------------------------------------------
// Taxonomies
// ------------------------------------------------------------------

export async function getTaxonomies() {
  const [targetAudiences, applicationAreas] = await Promise.all([
    prisma.targetAudience.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.applicationArea.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  return { targetAudiences, applicationAreas }
}

export async function createTargetAudience(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const name = formData.get('name') as string
  await prisma.targetAudience.create({
    data: {
      name,
      slug: slugify(formData.get('slug') as string || name),
      description: formData.get('description') as string,
      sortOrder: Number(formData.get('sortOrder')) || 0,
    },
  })
  revalidatePath('/admin/taxonomies')
  redirect('/admin/taxonomies')
}

export async function createApplicationArea(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const name = formData.get('name') as string
  await prisma.applicationArea.create({
    data: {
      name,
      slug: slugify(formData.get('slug') as string || name),
      description: formData.get('description') as string,
      sortOrder: Number(formData.get('sortOrder')) || 0,
    },
  })
  revalidatePath('/admin/taxonomies')
  redirect('/admin/taxonomies')
}

export async function deleteTargetAudience(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.targetAudience.delete({ where: { id } })
  revalidatePath('/admin/taxonomies')
}

export async function deleteApplicationArea(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.applicationArea.delete({ where: { id } })
  revalidatePath('/admin/taxonomies')
}

// ------------------------------------------------------------------
// FAQs
// ------------------------------------------------------------------

export async function getFAQs() {
  return prisma.fAQ.findMany({
    include: { programme: { select: { name: true } } },
    orderBy: { order: 'asc' },
  })
}

export async function createFAQ(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.fAQ.create({
    data: {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      order: Number(formData.get('order')) || 0,
      programmeId: (formData.get('programmeId') as string) || undefined,
    },
  })
  revalidatePath('/admin/faqs')
  redirect('/admin/faqs')
}

export async function deleteFAQ(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.fAQ.delete({ where: { id } })
  revalidatePath('/admin/faqs')
}

// ------------------------------------------------------------------
// Testimonials
// ------------------------------------------------------------------

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createTestimonial(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.testimonial.create({
    data: {
      quote: formData.get('quote') as string,
      authorName: formData.get('authorName') as string,
      authorRole: formData.get('authorRole') as string,
      authorSector: formData.get('authorSector') as string,
      isPublic: formData.get('isPublic') === 'true',
    },
  })
  revalidatePath('/admin/testimonials')
  redirect('/admin/testimonials')
}

export async function deleteTestimonial(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/testimonials')
}

// ------------------------------------------------------------------
// Documents
// ------------------------------------------------------------------

export async function getDocuments() {
  return prisma.document.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createDocument(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.document.create({
    data: {
      title: formData.get('title') as string,
      fileUrl: formData.get('fileUrl') as string,
      fileType: formData.get('fileType') as string,
      description: formData.get('description') as string,
    },
  })
  revalidatePath('/admin/documents')
  redirect('/admin/documents')
}

export async function deleteDocument(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.document.delete({ where: { id } })
  revalidatePath('/admin/documents')
}

// ------------------------------------------------------------------
// Galleries
// ------------------------------------------------------------------

export async function getGalleries() {
  return prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createGallery(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.gallery.create({
    data: {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    },
  })
  revalidatePath('/admin/galleries')
  redirect('/admin/galleries')
}

export async function deleteGallery(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.gallery.delete({ where: { id } })
  revalidatePath('/admin/galleries')
}

// ------------------------------------------------------------------
// Pages
// ------------------------------------------------------------------

export async function getPages() {
  return prisma.page.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createPage(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const title = formData.get('title') as string
  await prisma.page.create({
    data: {
      title,
      slug: slugify(formData.get('slug') as string || title),
      content: formData.get('content') as string,
      isPublished: formData.get('isPublished') === 'true',
    },
  })
  revalidatePath('/admin/pages')
  redirect('/admin/pages')
}

export async function deletePage(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.page.delete({ where: { id } })
  revalidatePath('/admin/pages')
}

// ------------------------------------------------------------------
// Forms
// ------------------------------------------------------------------

export async function getForms() {
  return prisma.form.findMany({ orderBy: { formType: 'asc' } })
}

export async function createForm(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.form.create({
    data: {
      formType: (formData.get('formType') as FormType) || FormType.CONTACT,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      submitLabel: (formData.get('submitLabel') as string) || 'Trimite',
      successMessage: formData.get('successMessage') as string,
    },
  })
  revalidatePath('/admin/forms')
  redirect('/admin/forms')
}

export async function deleteForm(id: string) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  await prisma.form.delete({ where: { id } })
  revalidatePath('/admin/forms')
}

// ------------------------------------------------------------------
// Users
// ------------------------------------------------------------------

export async function getUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createUser(formData: FormData) {
  const user = await requireAdminUser()
  if (user.role !== Role.SUPER_ADMIN) throw new Error('Access denied')
  const password = formData.get('password') as string
  await prisma.user.create({
    data: {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      role: (formData.get('role') as Role) || Role.CONTENT_MANAGER,
      password: password ? await bcrypt.hash(password, 10) : null,
    },
  })
  revalidatePath('/admin/users')
  redirect('/admin/users')
}

export async function deleteUser(id: string) {
  const user = await requireAdminUser()
  if (user.role !== Role.SUPER_ADMIN) throw new Error('Access denied')
  await prisma.user.delete({ where: { id } })
  revalidatePath('/admin/users')
}

// ------------------------------------------------------------------
// Globals
// ------------------------------------------------------------------

export async function getGlobals() {
  const [siteSettings, navigation, publicProcurement, transportInfo] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navigation.findFirst(),
    prisma.publicProcurement.findFirst(),
    prisma.transportInfo.findFirst(),
  ])
  return { siteSettings, navigation, publicProcurement, transportInfo }
}

export async function updateSiteSettings(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const id = formData.get('id') as string
  await prisma.siteSettings.upsert({
    where: { id },
    update: {
      brandName: formData.get('brandName') as string,
      tagline: formData.get('tagline') as string,
      contactEmail: formData.get('contactEmail') as string,
      contactPhone: formData.get('contactPhone') as string,
      defaultMetaTitle: formData.get('defaultMetaTitle') as string,
      defaultMetaDescription: formData.get('defaultMetaDescription') as string,
    },
    create: {
      brandName: formData.get('brandName') as string,
      tagline: formData.get('tagline') as string,
      contactEmail: formData.get('contactEmail') as string,
      contactPhone: formData.get('contactPhone') as string,
      defaultMetaTitle: formData.get('defaultMetaTitle') as string,
      defaultMetaDescription: formData.get('defaultMetaDescription') as string,
    },
  })
  revalidatePath('/admin/globals')
  redirect('/admin/globals')
}

export async function updatePublicProcurement(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const id = formData.get('id') as string
  await prisma.publicProcurement.upsert({
    where: { id },
    update: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      ctaLabel: formData.get('ctaLabel') as string,
    },
    create: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      ctaLabel: formData.get('ctaLabel') as string,
    },
  })
  revalidatePath('/admin/globals')
  redirect('/admin/globals')
}

export async function updateTransportInfo(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const id = formData.get('id') as string
  await prisma.transportInfo.upsert({
    where: { id },
    update: {
      content: formData.get('content') as string,
    },
    create: {
      content: formData.get('content') as string,
    },
  })
  revalidatePath('/admin/globals')
  redirect('/admin/globals')
}

export async function updateNavigation(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')
  const id = formData.get('id') as string
  await prisma.navigation.upsert({
    where: { id },
    update: {
      header: formData.get('header') as string,
      footer: formData.get('footer') as string,
    },
    create: {
      header: formData.get('header') as string,
      footer: formData.get('footer') as string,
    },
  })
  revalidatePath('/admin/globals')
  redirect('/admin/globals')
}

// ------------------------------------------------------------------
// Public API Functions
// ------------------------------------------------------------------

const APPROVED_PROGRAM_ORDER = [
  'conversatii-care-conteaza',
  'ai-fara-haos', 
  'calm-sub-pressiune',
  'busola-deciziilor',
  'avantajul-uman'
]

export async function getPublicProgrammes() {
  return prisma.programme.findMany({
    where: { 
      status: { 
        in: [ProgrammeStatus.ACTIVE] 
      } 
    },
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      shortDescription: true,
      fullDescription: true,
      duration: true,
      learningHours: true,
                  targetAudiences: {
        select: {
          targetAudience: {
            select: { name: true }
          }
        }
      },
      editions: {
        where: { status: EditionStatus.OPEN },
        select: {
          id: true,
          editionTitle: true,
          deliveryFormat: true,
          startDate: true,
          endDate: true,
          registrationDeadline: true,
          maxSeats: true,
          availableSeats: true,
          minParticipants: true,
          maxParticipants: true,
          displayPrice: {
            select: { priceCode: true, amount: true }
          }
        },
        orderBy: { startDate: 'asc' }
      }
    },
    orderBy: [
      // Custom order based on APPROVED_PROGRAM_ORDER
      { name: 'asc' } // Fallback, will be reordered in code
    ]
  }).then(programmes => {
    // Reorder according to approved order
    return programmes.sort((a, b) => {
      const aIndex = APPROVED_PROGRAM_ORDER.indexOf(a.slug)
      const bIndex = APPROVED_PROGRAM_ORDER.indexOf(b.slug)
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name)
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1
      return aIndex - bIndex
    })
  })
}

export async function getPublicProgramme(slug: string) {
  return prisma.programme.findUnique({
    where: { 
      slug,
      status: ProgrammeStatus.ACTIVE 
    },
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      fullDescription: true,
      duration: true,
      learningHours: true,
                  targetAudiences: {
        select: {
          targetAudience: {
            select: { name: true }
          }
        }
      },
      editions: {
        where: { status: EditionStatus.OPEN },
        select: {
          id: true,
          editionTitle: true,
          deliveryFormat: true,
          startDate: true,
          endDate: true,
          registrationDeadline: true,
          maxSeats: true,
          availableSeats: true,
          minParticipants: true,
          maxParticipants: true,
          contactHours: true,
          individualActivitiesHours: true,
          totalLearningHours: true,
          cpdCredits: true,
          sessionDates: true,
          sessionCount: true,
          platform: true,
          meetLink: true,
          classroomLink: true,
          city: true,
          locationName: true,
          address: true,
          startTime: true,
          endTime: true,
          destination: true,
          hotelName: true,
          hotelAddress: true,
          period: true,
          displayPrice: {
            select: { priceCode: true, amount: true }
          }
        },
        orderBy: { startDate: 'asc' }
      }
    }
  })
}

export async function getPublicEditions() {
  return prisma.edition.findMany({
    where: { 
      status: EditionStatus.OPEN,
      programme: { status: ProgrammeStatus.ACTIVE }
    },
    select: {
      id: true,
      editionTitle: true,
      deliveryFormat: true,
      startDate: true,
      endDate: true,
      registrationDeadline: true,
      maxSeats: true,
      availableSeats: true,
      minParticipants: true,
      maxParticipants: true,
            city: true,
      sessionDates: true,
      startTime: true,
      programme: {
        select: {
          id: true,
          name: true,
          slug: true,
          onlineMinParticipants: true,
          onlineMaxParticipants: true,
          onsiteMaxParticipants: true,
          experienceMinParticipants: true,
          experienceMaxParticipants: true,
        }
      },
      displayPrice: {
        select: { priceCode: true, amount: true }
      }
    },
    orderBy: { startDate: 'asc' }
  })
}

export async function getPublicEditionsByProgramme(programmeSlug: string) {
  return prisma.edition.findMany({
    where: { 
      status: EditionStatus.OPEN,
      programme: { 
        status: ProgrammeStatus.ACTIVE,
        slug: programmeSlug 
      }
    },
    select: {
      id: true,
      editionTitle: true,
      deliveryFormat: true,
      startDate: true,
      endDate: true,
      registrationDeadline: true,
      maxSeats: true,
      availableSeats: true,
      minParticipants: true,
      maxParticipants: true,
            sessionDates: true,
      sessionCount: true,
      platform: true,
      meetLink: true,
      classroomLink: true,
      city: true,
      locationName: true,
      address: true,
      startTime: true,
      endTime: true,
      destination: true,
      hotelName: true,
      hotelAddress: true,
      period: true,
      programme: {
        select: {
          id: true,
          name: true,
          slug: true,
          onlineMinParticipants: true,
          onlineMaxParticipants: true,
          onsiteMaxParticipants: true,
          experienceMinParticipants: true,
          experienceMaxParticipants: true,
        }
      },
      displayPrice: {
        select: { priceCode: true, amount: true }
      }
    },
    orderBy: { startDate: 'asc' }
  })
}
