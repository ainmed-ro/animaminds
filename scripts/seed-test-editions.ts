import { PrismaClient, DeliveryFormat, EditionStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const programme = await prisma.programme.findFirst({
    where: { programmeCode: 'PMD_001' },
  })

  if (!programme) {
    console.error('Programme PMD_001 not found')
    process.exit(1)
  }

  const price = await prisma.price.findFirst({
    where: { programmeId: programme.id },
  })

  const existingEdition = await prisma.edition.findFirst({
    where: { programmeId: programme.id },
  })

  if (!existingEdition) {
    await prisma.edition.create({
      data: {
        programmeId: programme.id,
        editionTitle: 'Ediție pilot AI Fără Haos',
        slug: 'ai-fara-haos-editie-pilot',
        deliveryFormat: DeliveryFormat.ONLINE,
        status: EditionStatus.DRAFT,
        displayPriceId: price?.id,
        maxSeats: 20,
        availableSeats: 20,
      },
    })
    console.log('Created test edition for PMD_001')
  } else {
    console.log('Test edition already exists')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
export {} 
