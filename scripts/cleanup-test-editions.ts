export {}
import { prisma } from '@/lib/prisma'
import { EditionStatus } from '@prisma/client'

async function main() {
  const allEditions = await prisma.edition.findMany({
    include: { programme: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const realProgrammes = new Set([
    'Busola Deciziilor',
    'AI Fără Haos',
    'Conversații care Contează',
    'Calm sub Presiune',
    'Avantajul Uman',
  ])

  const testPatterns = [/Phase 05/i, /Test Edition/i, /\d{13,}$/]

  const toArchive = allEditions.filter((e) => {
    const isRealProgramme = realProgrammes.has(e.programme.name)
    const looksLikeTest = testPatterns.some((p) => p.test(e.editionTitle))
    return isRealProgramme && looksLikeTest
  })

  console.log(`Found ${toArchive.length} test editions to archive:`)
  for (const e of toArchive) {
    console.log(`- [${e.id}] ${e.programme.name} / ${e.editionTitle}`)
  }

  if (toArchive.length === 0) {
    await prisma.$disconnect()
    return
  }

  const ids = toArchive.map((e) => e.id)
  const result = await prisma.edition.updateMany({
    where: { id: { in: ids } },
    data: { status: EditionStatus.CANCELLED },
  })

  console.log(`\nArchived ${result.count} test editions.`)
  await prisma.$disconnect()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
