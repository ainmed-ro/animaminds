import { prisma } from '../lib/prisma'

async function main() {
  await prisma.programme.update({
    where: { slug: 'busola-deciziilor' },
    data: { status: 'ACTIVE' },
  })
  console.log('Busola Deciziilor activated')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
