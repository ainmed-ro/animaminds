import { prisma } from '@/lib/prisma'

async function main() {
  const registrations = await prisma.registration.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { edition: { select: { editionTitle: true } } },
  })
  console.log(JSON.stringify(registrations, null, 2))
  console.log(`Total registrations: ${await prisma.registration.count()}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
