import { prisma } from '../lib/prisma'

async function main() {
  const programmes = await prisma.programme.findMany({
    select: { id: true, name: true, slug: true, programmeCode: true, status: true },
    orderBy: { createdAt: 'desc' },
  })
  console.log(JSON.stringify(programmes, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
