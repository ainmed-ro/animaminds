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
    cpdHours: getNumber(formData, 'cpdHours'),
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

  const programme = await prisma.programme.create({
    data: {
      ...buildProgrammeData(formData),
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

  await prisma.programme.update({
    where: { id },
    data: {
      ...buildProgrammeData(formData),
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
      programme: { select: { name: true } },
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
    // Online
    platform: getOptional(formData, 'platform') as any,
    meetLink: getOptional(formData, 'meetLink'),
    classroomLink: getOptional(formData, 'classroomLink'),
    sessionDates,
    sessionCount: getNumber(formData, 'sessionCount'),
    recordingPolicy: getOptional(formData, 'recordingPolicy'),
    // On-site / open cohort
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
    minParticipants: isExperience ? getNumber(formData, 'minParticipants') : undefined,
    maxParticipants: isExperience ? getNumber(formData, 'maxParticipants') : undefined,
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

  await prisma.edition.create({
    data: {
      programmeId,
      ...buildEditionData(formData),
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

  await prisma.edition.update({
    where: { id },
    data: {
      ...buildEditionData(formData),
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

export async function getOpenEditionsForRegistration() {
  return prisma.edition.findMany({
    where: {
      status: { in: ['DRAFT', 'OPEN'] },
      OR: [
        { registrationDeadline: { gte: new Date() } },
        { registrationDeadline: null },
      ],
    },
    include: { programme: { select: { name: true, slug: true } }, displayPrice: true },
    orderBy: { startDate: 'asc' },
  })
}

export async function createRegistration(formData: FormData) {
  const user = await requireAdminUser()
  if (!canManageContent(user)) throw new Error('Access denied')

  const editionId = formData.get('editionId') as string
  const participantCount = getNumber(formData, 'participantCount') || 1

  const edition = await prisma.edition.findUnique({ where: { id: editionId } })
  if (!edition) throw new Error('Edition not found')
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
    include: { programme: { select: { name: true, slug: true } } },
  })
  if (!edition) throw new Error('Edition not found')
  if (edition.status !== 'OPEN' && edition.status !== 'DRAFT') {
    throw new Error('Registration is closed for this edition')
  }
  if (edition.registrationDeadline && new Date(edition.registrationDeadline) < new Date()) {
    throw new Error('Registration deadline has passed')
  }
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
      amount: Number(formData.get('amount')) || undefined,
      currency: (formData.get('currency') as string) || 'RON',
      vatIncluded: formData.get('vatIncluded') === 'true',
      status: (formData.get('status') as PriceStatus) || PriceStatus.ON_REQUEST,
      displayLabel: formData.get('displayLabel') as string,
    },
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
      amount: Number(formData.get('amount')) || undefined,
      currency: (formData.get('currency') as string) || 'RON',
      vatIncluded: formData.get('vatIncluded') === 'true',
      status: (formData.get('status') as PriceStatus) || PriceStatus.ON_REQUEST,
      displayLabel: formData.get('displayLabel') as string,
    },
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
