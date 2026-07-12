import { prisma } from '../lib/prisma'

async function main() {
  const busola = await prisma.programme.findUnique({
    where: { slug: 'busola-deciziilor' },
    include: { defaultStandardPrice: true },
  })

  if (!busola) {
    console.error('Busola Deciziilor not found')
    process.exit(1)
  }

  console.log('Busola programmeId:', busola.id)
  console.log('Standard price:', busola.defaultStandardPrice)

  const edition = await prisma.edition.create({
    data: {
      programmeId: busola.id,
      editionTitle: 'Ediție deschisă Busola Deciziilor',
      slug: 'busola-deciziilor-editie-deschisa',
      deliveryFormat: 'ONLINE',
      status: 'OPEN',
      maxSeats: 25,
      availableSeats: 25,
      displayPriceId: busola.defaultStandardPriceId || undefined,
      priceStatus: 'ON_REQUEST',
    },
  })

  console.log('Created edition:', edition.id)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
