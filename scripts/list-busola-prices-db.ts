import { prisma } from '../lib/prisma'

async function main() {
  const busola = await prisma.programme.findUnique({
    where: { slug: 'busola-deciziilor' },
    include: {
      defaultStandardPrice: true,
      defaultLaunchPrice: true,
      additionalDefaultPrices: true,
    },
  })
  console.log('Busola Deciziilor programme:')
  console.log(JSON.stringify(busola, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
