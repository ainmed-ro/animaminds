import { PrismaClient, DeliveryFormat, EditionStatus, PriceStatus, ProgrammeStatus } from '@prisma/client'

const prisma = new PrismaClient()

const timestamp = Date.now().toString()
const runId = timestamp.slice(-6)

async function createTestData() {
  const [programme, price, gallery] = await Promise.all([
    prisma.programme.create({
      data: {
        programmeCode: `P05_PRG_${runId}`,
        slug: `phase05-programme-${runId}`,
        name: `Phase05 Programme ${runId}`,
        status: ProgrammeStatus.DRAFT,
      },
    }),
    prisma.price.create({
      data: {
        priceCode: `P05_${runId}`,
        priceType: 'STANDARD',
        amount: 1000,
        currency: 'RON',
        status: 'ACTIVE',
        vatRate: 19,
      },
    }),
    prisma.gallery.create({
      data: { name: `Phase05 Gallery ${runId}` },
    }),
  ])

  return { programme, price, gallery }
}

async function cleanup(ids: { editionId?: string; programmeId: string; priceId: string; galleryId: string }) {
  if (ids.editionId) {
    await prisma.edition.delete({ where: { id: ids.editionId } }).catch(() => {})
  }
  await prisma.programme.delete({ where: { id: ids.programmeId } }).catch(() => {})
  await prisma.price.delete({ where: { id: ids.priceId } }).catch(() => {})
  await prisma.gallery.delete({ where: { id: ids.galleryId } }).catch(() => {})
}

export async function runPhase05Validation() {
  const related = await createTestData()
  let editionId: string | undefined

  try {
    // Create online edition
    const onlineEdition = await prisma.edition.create({
      data: {
        programmeId: related.programme.id,
        editionTitle: `Phase05 Online Edition ${runId}`,
        slug: `phase05-online-${runId}`,
        deliveryFormat: DeliveryFormat.ONLINE,
        status: EditionStatus.OPEN,
        startDate: new Date('2026-10-01'),
        endDate: new Date('2026-10-02'),
        durationText: '2 zile',
        registrationDeadline: new Date('2026-09-25'),
        maxSeats: 30,
        availableSeats: 25,
        displayPriceId: related.price.id,
        platform: 'GOOGLE_MEET',
        meetLink: 'https://meet.example.com/phase05',
        sessionDates: [new Date('2026-10-01'), new Date('2026-10-02')],
        sessionCount: 2,
        recordingPolicy: 'Available for 30 days',
        galleries: { create: { galleryId: related.gallery.id } },
      },
      include: {
        displayPrice: true,
        galleries: true,
      },
    })

    editionId = onlineEdition.id
    console.log('✓ Create online edition: OK')

    // Validate capacity fields
    if (onlineEdition.maxSeats !== 30) throw new Error(`Expected maxSeats 30, got ${onlineEdition.maxSeats}`)
    if (onlineEdition.availableSeats !== 25) throw new Error(`Expected availableSeats 25, got ${onlineEdition.availableSeats}`)
    console.log('✓ Capacity fields: OK')

    // Validate deadline field
    const deadline = new Date(onlineEdition.registrationDeadline || '').toISOString().split('T')[0]
    if (deadline !== '2026-09-25') throw new Error(`Expected deadline 2026-09-25, got ${deadline}`)
    console.log('✓ Deadline field: OK')

    // Validate price linkage
    if (!onlineEdition.displayPrice || onlineEdition.displayPrice.id !== related.price.id) {
      throw new Error('Display price relation missing')
    }
    console.log('✓ Price linkage: OK')

    // Validate gallery linkage
    if (onlineEdition.galleries.length !== 1) throw new Error('Gallery relation missing')
    console.log('✓ Gallery linkage: OK')

    // Update to on-site and verify update path
    const updated = await prisma.edition.update({
      where: { id: onlineEdition.id },
      data: {
        deliveryFormat: DeliveryFormat.ONSITE,
        city: 'București',
        locationName: 'Hotel Intercontinental',
        address: 'B-dul Nicolae Bălcescu 4',
        hasOwnRoom: true,
        roomCostIncluded: false,
      },
    })
    if (updated.deliveryFormat !== DeliveryFormat.ONSITE) throw new Error('Delivery format update failed')
    if (updated.city !== 'București') throw new Error('City update failed')
    console.log('✓ Update to on-site: OK')

    // Create experience edition separately to verify all fields
    const experienceEdition = await prisma.edition.create({
      data: {
        programmeId: related.programme.id,
        editionTitle: `Phase05 Experience Edition ${runId}`,
        slug: `phase05-experience-${runId}`,
        deliveryFormat: DeliveryFormat.EXPERIENCE_EDITION,
        status: EditionStatus.DRAFT,
        destination: 'Munții Carpați',
        hotelName: 'Cabana de Vis',
        period: '3 zile / 2 nopți',
        minParticipants: 10,
        maxParticipants: 20,
        roomTypes: [{ name: 'Twin', price: 500, description: '2 beds' }],
        includedMeals: ['Mic dejun', 'Prânz', 'Cină'],
        includedFacilities: ['Spa', 'Sală de conferințe'],
        complementaryActivities: ['Drumeție', 'Yoga'],
        indicativeSchedule: 'Ziua 1: check-in și workshop',
        confirmationPolicy: 'Confirmat la 14 zile înainte',
        cancellationPolicy: 'Gratuit până la 30 zile înainte',
        priceStatus: PriceStatus.ON_REQUEST,
      },
    })

    if (experienceEdition.destination !== 'Munții Carpați') throw new Error('Experience destination missing')
    if (experienceEdition.minParticipants !== 10) throw new Error('Experience min participants missing')
    console.log('✓ Experience edition fields: OK')

    // Delete experience edition
    await prisma.edition.delete({ where: { id: experienceEdition.id } })
    console.log('✓ Delete experience edition: OK')

    // Delete main edition
    await prisma.edition.delete({ where: { id: onlineEdition.id } })
    editionId = undefined
    console.log('✓ Delete online edition: OK')

    console.log('\nPhase 05 validation passed.')
  } finally {
    await cleanup({ editionId, programmeId: related.programme.id, priceId: related.price.id, galleryId: related.gallery.id })
    await prisma.$disconnect()
  }
}

runPhase05Validation().catch((err) => {
  console.error(err)
  process.exit(1)
})
export {} 
