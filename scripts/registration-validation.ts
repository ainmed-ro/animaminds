import { PrismaClient, EditionStatus, ProgrammeStatus, PaymentStatus, DeliveryFormat } from '@prisma/client'

const prisma = new PrismaClient()

const timestamp = Date.now().toString()
const runId = timestamp.slice(-6)

async function createTestData() {
  const [programme, edition] = await Promise.all([
    prisma.programme.create({
      data: {
        programmeCode: `REG_PRG_${runId}`,
        slug: `reg-programme-${runId}`,
        name: `Reg Validation Programme ${runId}`,
        status: ProgrammeStatus.DRAFT,
      },
    }),
    null,
  ])

  const createdEdition = await prisma.edition.create({
    data: {
      programmeId: programme.id,
      editionTitle: `Reg Validation Edition ${runId}`,
      slug: `reg-edition-${runId}`,
      deliveryFormat: DeliveryFormat.ONLINE,
      status: EditionStatus.OPEN,
      startDate: new Date('2026-11-01'),
      registrationDeadline: new Date('2026-10-25'),
      maxSeats: 20,
      availableSeats: 20,
    },
  })

  return { programme, edition: createdEdition }
}

async function cleanup(ids: { registrationId?: string; editionId: string; programmeId: string }) {
  if (ids.registrationId) {
    await prisma.registration.delete({ where: { id: ids.registrationId } }).catch(() => {})
  }
  await prisma.edition.delete({ where: { id: ids.editionId } }).catch(() => {})
  await prisma.programme.delete({ where: { id: ids.programmeId } }).catch(() => {})
}

export async function runRegistrationValidation() {
  const related = await createTestData()
  let registrationId: string | undefined

  try {
    // Create registration should decrement available seats
    const registration = await prisma.$transaction([
      prisma.registration.create({
        data: {
          editionId: related.edition.id,
          contactName: 'Test Participant',
          contactEmail: `test+${runId}@example.com`,
          contactPhone: '0712345678',
          entityType: 'INDIVIDUAL',
          paymentStatus: 'PENDING',
          participantsJson: [{ name: 'Test Participant' }],
        },
      }),
      prisma.edition.update({
        where: { id: related.edition.id },
        data: { availableSeats: { decrement: 1 } },
      }),
    ])

    registrationId = registration[0].id

    const updatedEdition = await prisma.edition.findUnique({ where: { id: related.edition.id } })
    if (updatedEdition?.availableSeats !== 19) throw new Error(`Expected 19 available seats, got ${updatedEdition?.availableSeats}`)
    console.log('✓ Create registration decrements capacity: OK')

    // Read with relations
    const read = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { edition: { include: { programme: true } } },
    })
    if (!read || read.edition.programme.id !== related.programme.id) throw new Error('Registration relation missing')
    console.log('✓ Registration read with relations: OK')

    // Update payment status
    const updated = await prisma.registration.update({
      where: { id: registrationId },
      data: { paymentStatus: PaymentStatus.PAID },
    })
    if (updated.paymentStatus !== PaymentStatus.PAID) throw new Error('Payment status update failed')
    console.log('✓ Update registration: OK')

    // Delete should restore capacity
    await prisma.$transaction([
      prisma.registration.delete({ where: { id: registrationId } }),
      prisma.edition.update({
        where: { id: related.edition.id },
        data: { availableSeats: { increment: 1 } },
      }),
    ])
    registrationId = undefined

    const restoredEdition = await prisma.edition.findUnique({ where: { id: related.edition.id } })
    if (restoredEdition?.availableSeats !== 20) throw new Error(`Expected 20 available seats after delete, got ${restoredEdition?.availableSeats}`)
    console.log('✓ Delete registration restores capacity: OK')

    console.log('\nRegistration validation passed.')
  } finally {
    await cleanup({ registrationId, editionId: related.edition.id, programmeId: related.programme.id })
    await prisma.$disconnect()
  }
}

runRegistrationValidation().catch((err) => {
  console.error(err)
  process.exit(1)
})
export {} 
