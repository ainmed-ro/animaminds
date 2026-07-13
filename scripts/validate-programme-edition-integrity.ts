import { prisma } from '../lib/prisma'

const EXPECTED_PROGRAMMES = [
  { slug: 'ai-fara-haos', nameContains: 'AI Fără Haos' },
  { slug: 'conversatii-care-conteaza', nameContains: 'Conversații' },
  { slug: 'calm-sub-presiune', nameContains: 'Calm sub Presiune' },
  { slug: 'busola-deciziilor', nameContains: 'Busola Deciziilor' },
  { slug: 'avantajul-uman', nameContains: 'Avantajul Uman' },
]

async function main() {
  console.log('=== Programme/Edition Integrity Validation ===\n')

  const programmes = await prisma.programme.findMany({
    include: { editions: { select: { id: true, editionTitle: true, slug: true, deliveryFormat: true, status: true } } },
    orderBy: { name: 'asc' },
  })

  const editions = await prisma.edition.findMany({
    include: { programme: { select: { id: true, slug: true, name: true } }, displayPrice: true, additionalPrices: { include: { price: true } } },
    orderBy: { createdAt: 'asc' },
  })

  const prices = await prisma.price.findMany({
    include: { programme: { select: { id: true, slug: true, name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  const issues: string[] = []

  // 1. Each edition belongs to exactly one programme
  console.log('1. Checking edition -> programme relationships...')
  const editionsWithoutProgramme = editions.filter((e) => !e.programmeId || !e.programme)
  if (editionsWithoutProgramme.length) {
    issues.push(`Found ${editionsWithoutProgramme.length} edition(s) without a programme`)
    editionsWithoutProgramme.forEach((e) => console.log(`  ORPHAN edition: ${e.id} - ${e.editionTitle}`))
  } else {
    console.log('  OK: all editions have a programme')
  }

  // 2. Check for cross-programme contamination by looking at edition counts per programme
  console.log('\n2. Editions per programme:')
  for (const p of programmes) {
    const programmeEditions = editions.filter((e) => e.programmeId === p.id)
    const relationCount = p.editions.length
    if (programmeEditions.length !== relationCount) {
      issues.push(`Mismatch for programme ${p.slug}: counted ${programmeEditions.length}, relation ${relationCount}`)
    }
    console.log(`  ${p.name} (${p.slug}): ${programmeEditions.length} editions`)
    for (const e of programmeEditions) {
      console.log(`    - ${e.editionTitle} [${e.deliveryFormat}] (${e.status})`)
    }
  }

  // 3. Verify expected programmes exist
  console.log('\n3. Expected programmes:')
  for (const expected of EXPECTED_PROGRAMMES) {
    const found = programmes.find((p) => p.slug === expected.slug)
    if (!found) {
      issues.push(`Missing expected programme: ${expected.slug}`)
      console.log(`  MISSING: ${expected.slug}`)
    } else {
      console.log(`  OK: ${found.name} (${found.slug})`)
    }
  }

  // 4. Check for editions whose programme relation does not match programmeId
  console.log('\n4. Checking programmeId / programme relation consistency...')
  const inconsistent = editions.filter((e) => e.programme && e.programmeId !== e.programme.id)
  if (inconsistent.length) {
    issues.push(`Found ${inconsistent.length} edition(s) with inconsistent programme relation`)
    inconsistent.forEach((e) => console.log(`  INCONSISTENT: edition ${e.id} has programmeId ${e.programmeId} but relation points to ${e.programme.id}`))
  } else {
    console.log('  OK: all programme relations are consistent')
  }

  // 5. Edition -> Price integrity
  console.log('\n5. Checking edition -> price relationships...')
  const editionsWithWrongPrice = editions.filter((e) => {
    if (!e.displayPriceId) return false
    if (!e.displayPrice) return false
    // A display price can be generic (programmeId null) or belong to the same programme
    if (!e.displayPrice.programmeId) return false
    return e.displayPrice.programmeId !== e.programmeId
  })
  if (editionsWithWrongPrice.length) {
    issues.push(`Found ${editionsWithWrongPrice.length} edition(s) with a display price from another programme`)
    editionsWithWrongPrice.forEach((e) => console.log(`  WRONG PRICE: edition ${e.id} (${e.editionTitle}) has displayPrice programme ${e.displayPrice?.programmeId}, expected ${e.programmeId}`))
  } else {
    console.log('  OK: all edition display prices belong to the correct programme (or are generic)')
  }

  const additionalPriceIssues = editions.filter((e) =>
    e.additionalPrices.some((ap) => ap.price.programmeId && ap.price.programmeId !== e.programmeId)
  )
  if (additionalPriceIssues.length) {
    issues.push(`Found ${additionalPriceIssues.length} edition(s) with additional prices from another programme`)
    additionalPriceIssues.forEach((e) => console.log(`  WRONG ADDITIONAL PRICE: edition ${e.id} (${e.editionTitle})`))
  } else {
    console.log('  OK: all additional prices belong to the correct programme (or are generic)')
  }

  // 6. Duplicate edition slugs within a programme
  console.log('\n6. Checking duplicate edition slugs within programmes...')
  const slugMap = new Map<string, string[]>()
  for (const e of editions) {
    const key = `${e.programmeId}:${e.slug}`
    if (!slugMap.has(key)) slugMap.set(key, [])
    slugMap.get(key)!.push(e.id)
  }
  let duplicateFound = false
  for (const [key, ids] of slugMap.entries()) {
    if (ids.length > 1) {
      duplicateFound = true
      issues.push(`Duplicate edition slug within programme: ${key}`)
      console.log(`  DUPLICATE: ${key} -> ${ids.join(', ')}`)
    }
  }
  if (!duplicateFound) console.log('  OK: no duplicate edition slugs within programmes')

  // Summary
  console.log('\n=== Validation Summary ===')
  if (issues.length === 0) {
    console.log('PASS: No integrity issues found.')
  } else {
    console.log(`FAIL: ${issues.length} issue(s) found:`)
    issues.forEach((issue) => console.log(`  - ${issue}`))
    process.exitCode = 1
  }

  console.log(`\nTotal programmes: ${programmes.length}`)
  console.log(`Total editions: ${editions.length}`)
  console.log(`Total prices: ${prices.length}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
