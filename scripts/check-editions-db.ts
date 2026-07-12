import { prisma } from '../lib/prisma'

async function main() {
  const editions = await prisma.edition.findMany({
    include: { programme: true },
    orderBy: { createdAt: 'desc' },
  })
  console.log(JSON.stringify(editions, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
