export {}
import { prisma } from '@/lib/prisma'

async function main() {
  const editions = await prisma.edition.findMany({
    include: { programme: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })
  console.log(JSON.stringify(editions.map((e) => ({ id: e.id, title: e.editionTitle, status: e.status, programme: e.programme.name })), null, 2))
  await prisma.$disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
