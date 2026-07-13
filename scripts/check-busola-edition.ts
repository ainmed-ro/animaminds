import { prisma } from '../lib/prisma'

async function main() {
  const editions = await prisma.edition.findMany({
    where: { programme: { slug: 'busola-deciziilor' } },
    include: { programme: { select: { name: true, slug: true, status: true } }, displayPrice: true },
  })
  console.log(JSON.stringify(editions, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
