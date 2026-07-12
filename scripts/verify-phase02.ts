import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const counts = {
    users: await prisma.user.count(),
    targetAudiences: await prisma.targetAudience.count(),
    applicationAreas: await prisma.applicationArea.count(),
    programmes: await prisma.programme.count(),
    programmeSEO: await prisma.programmeSEO.count(),
    editions: await prisma.edition.count(),
    prices: await prisma.price.count(),
    registrations: await prisma.registration.count(),
    testimonials: await prisma.testimonial.count(),
    faqs: await prisma.fAQ.count(),
    documents: await prisma.document.count(),
    galleries: await prisma.gallery.count(),
    pages: await prisma.page.count(),
    forms: await prisma.form.count(),
    formSubmissions: await prisma.formSubmission.count(),
    siteSettings: await prisma.siteSettings.count(),
    navigation: await prisma.navigation.count(),
    publicProcurement: await prisma.publicProcurement.count(),
    transportInfo: await prisma.transportInfo.count(),
  }

  console.log('CMS entity counts:')
  console.table(counts)

  // Verify Programme → Edition → Price relationships
  const programmesWithRelations = await prisma.programme.findMany({
    include: {
      editions: { include: { displayPrice: true } },
      targetAudiences: { include: { targetAudience: true } },
      applicationAreas: { include: { applicationArea: true } },
    },
    take: 5,
  })

  console.log('\nProgramme → Edition → Price relationships:')
  for (const p of programmesWithRelations) {
    const prices = await prisma.price.findMany({ where: { programmeId: p.id } })
    console.log(`- ${p.name} (${p.programmeCode})`)
    console.log(`  targetAudiences: ${p.targetAudiences.map((t) => t.targetAudience.name).join(', ') || '—'}`)
    console.log(`  applicationAreas: ${p.applicationAreas.map((a) => a.applicationArea.name).join(', ') || '—'}`)
    console.log(`  prices: ${prices.length} records`)
    for (const e of p.editions) {
      console.log(`  edition: ${e.editionTitle} -> displayPrice: ${e.displayPrice?.priceCode || '—'}`)
    }
  }

  // SSOT check: Programme should not have price fields
  const programmePriceFields = ['amount', 'currency', 'price', 'vat']
  const programmeSchema = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Programme'
  `
  const programmeColumns = (programmeSchema as { column_name: string }[]).map((c) => c.column_name.toLowerCase())
  const violation = programmePriceFields.some((f) => programmeColumns.includes(f))
  console.log('\nSSOT check: Programme has no direct price fields:', !violation)

  // Taxonomy support check
  const programmeTaxonomyLinks = await prisma.programme.findMany({
    where: {
      OR: [
        { targetAudiences: { some: {} } },
        { applicationAreas: { some: {} } },
      ],
    },
    select: { id: true, name: true, _count: { select: { targetAudiences: true, applicationAreas: true } } },
  })
  console.log('\nProgrammes linked to taxonomies:', programmeTaxonomyLinks.length)

  console.log('\nPhase 02 CMS verification complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
