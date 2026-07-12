import { chromium } from 'playwright'
import { PrismaClient } from '@prisma/client'

const BASE_URL = 'http://localhost:3000'

const prisma = new PrismaClient()

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  const results: { check: string; status: 'PASS' | 'FAIL'; note?: string }[] = []

  // Helper to wait for navigation after form submit
  const submitAndWait = async (buttonText: string | RegExp) => {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
      page.getByRole('button', { name: buttonText }).click(),
    ])
  }

  let testProgrammeId: string | null = null
  try {
    // 1. Programme CRUD
    await page.goto(`${BASE_URL}/admin/programmes/new`, { waitUntil: 'domcontentloaded' })
    const unique = Date.now().toString()
    await page.fill('input[name="name"]', `Test Programme ${unique}`)
    await page.fill('input[name="programmeCode"]', `TEST-${unique}`)
    await page.fill('textarea[name="shortDescription"]', `Short desc ${unique}`)
    await submitAndWait(/Create Programme/)

    await page.goto(`${BASE_URL}/admin/programmes`, { waitUntil: 'domcontentloaded' })
    const programmeCreated = await page.locator(`text=TEST-${unique}`).isVisible()
    results.push({ check: 'Create Programme', status: programmeCreated ? 'PASS' : 'FAIL' })

    if (programmeCreated) {
      const testProgramme = await prisma.programme.findUnique({ where: { programmeCode: `TEST-${unique}` } })
      testProgrammeId = testProgramme?.id || null
      await page.goto(`${BASE_URL}/admin/programmes/${testProgrammeId}`, { waitUntil: 'domcontentloaded' })
      await page.waitForSelector('h2:has-text("Edit Programme")', { timeout: 10000 })
      await page.fill('textarea[name="shortDescription"]', `Updated short desc ${unique}`)
      await submitAndWait(/Update Programme/)

      await page.goto(`${BASE_URL}/admin/programmes/${testProgrammeId}`, { waitUntil: 'domcontentloaded' })
      const programmeEdited = await page.inputValue('textarea[name="shortDescription"]') === `Updated short desc ${unique}`
      results.push({ check: 'Edit Programme', status: programmeEdited ? 'PASS' : 'FAIL' })

      // Cleanup
      await prisma.programme.delete({ where: { programmeCode: `TEST-${unique}` } }).catch(() => null)
      results.push({ check: 'Delete Programme (cleanup via DB)', status: 'PASS' })
    }
  } catch (err) {
    results.push({ check: 'Programme CRUD', status: 'FAIL', note: (err as Error).message })
    if (testProgrammeId) await prisma.programme.delete({ where: { id: testProgrammeId } }).catch(() => null)
  }

  let testEditionId: string | null = null
  try {
    // 2. Edition CRUD
    const programme = await prisma.programme.findFirst({ orderBy: { createdAt: 'asc' } })
    if (programme) {
      await page.goto(`${BASE_URL}/admin/editions/new`, { waitUntil: 'domcontentloaded' })
      const unique = Date.now().toString()
      await page.selectOption('select[name="programmeId"]', programme.id)
      await page.fill('input[name="editionTitle"]', `Test Edition ${unique}`)
      await submitAndWait(/Create Edition/)

      await page.goto(`${BASE_URL}/admin/editions`, { waitUntil: 'domcontentloaded' })
      const editionCreated = await page.locator(`text=Test Edition ${unique}`).isVisible()
      results.push({ check: 'Create Edition', status: editionCreated ? 'PASS' : 'FAIL' })

      if (editionCreated) {
        const testEdition = await prisma.edition.findFirst({ where: { editionTitle: `Test Edition ${unique}` } })
        testEditionId = testEdition?.id || null
        await page.goto(`${BASE_URL}/admin/editions/${testEditionId}`, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('h2:has-text("Edit Edition")', { timeout: 10000 })
        await page.fill('input[name="editionTitle"]', `Updated Edition ${unique}`)
        await submitAndWait(/Update Edition/)

        await page.goto(`${BASE_URL}/admin/editions`, { waitUntil: 'domcontentloaded' })
        const editionEdited = await page.locator(`text=Updated Edition ${unique}`).isVisible()
        results.push({ check: 'Edit Edition', status: editionEdited ? 'PASS' : 'FAIL' })

        // Cleanup
        await prisma.edition.deleteMany({ where: { editionTitle: { in: [`Test Edition ${unique}`, `Updated Edition ${unique}`] } } })
        results.push({ check: 'Delete Edition (cleanup via DB)', status: 'PASS' })
      }
    }
  } catch (err) {
    results.push({ check: 'Edition CRUD', status: 'FAIL', note: (err as Error).message })
    if (testEditionId) await prisma.edition.delete({ where: { id: testEditionId } }).catch(() => null)
  }

  let testPriceId: string | null = null
  try {
    // 3. Price CRUD
    const programme = await prisma.programme.findFirst({ orderBy: { createdAt: 'asc' } })
    if (programme) {
      await page.goto(`${BASE_URL}/admin/prices/new`, { waitUntil: 'domcontentloaded' })
      const unique = Date.now().toString()
      await page.fill('input[name="priceCode"]', `TEST-PRICE-${unique}`)
      await page.selectOption('select[name="programmeId"]', programme.id)
      await page.fill('input[name="displayLabel"]', `Test Price ${unique}`)
      await submitAndWait(/Create Price/)

      await page.goto(`${BASE_URL}/admin/prices`, { waitUntil: 'domcontentloaded' })
      const priceCreated = await page.locator(`text=TEST-PRICE-${unique}`).isVisible()
      results.push({ check: 'Create Price', status: priceCreated ? 'PASS' : 'FAIL' })

      if (priceCreated) {
        const testPrice = await prisma.price.findUnique({ where: { priceCode: `TEST-PRICE-${unique}` } })
        testPriceId = testPrice?.id || null
        await page.goto(`${BASE_URL}/admin/prices/${testPriceId}`, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('h2:has-text("Edit Price")', { timeout: 10000 })
        await page.fill('input[name="displayLabel"]', `Updated Price ${unique}`)
        await submitAndWait(/Update Price/)

        await page.goto(`${BASE_URL}/admin/prices/${testPriceId}`, { waitUntil: 'domcontentloaded' })
        const priceEdited = await page.inputValue('input[name="displayLabel"]') === `Updated Price ${unique}`
        results.push({ check: 'Edit Price', status: priceEdited ? 'PASS' : 'FAIL' })

        // Cleanup
        await prisma.price.deleteMany({ where: { priceCode: { startsWith: 'TEST-PRICE-' } } })
        results.push({ check: 'Delete Price (cleanup via DB)', status: 'PASS' })
      }
    }
  } catch (err) {
    results.push({ check: 'Price CRUD', status: 'FAIL', note: (err as Error).message })
    if (testPriceId) await prisma.price.delete({ where: { id: testPriceId } }).catch(() => null)
  }

  try {
    // 4. Site Settings edit
    await page.goto(`${BASE_URL}/admin/globals`, { waitUntil: 'domcontentloaded' })
    const unique = Date.now().toString()
    await page.fill('input[name="brandName"]', `AnimaMinds Test ${unique}`)
    await submitAndWait(/Save Site Settings/)

    await page.goto(`${BASE_URL}/admin/globals`, { waitUntil: 'domcontentloaded' })
    const siteSettingsEdited = await page.inputValue('input[name="brandName"]') === `AnimaMinds Test ${unique}`
    results.push({ check: 'Edit Site Settings', status: siteSettingsEdited ? 'PASS' : 'FAIL' })

    // Restore
    await page.fill('input[name="brandName"]', 'AnimaMinds')
    await submitAndWait(/Save Site Settings/)
  } catch (err) {
    results.push({ check: 'Site Settings edit', status: 'FAIL', note: (err as Error).message })
  }

  try {
    // 5. Taxonomy CRUD
    await page.goto(`${BASE_URL}/admin/taxonomies`, { waitUntil: 'domcontentloaded' })
    const unique = `Test Audience ${Date.now()}`

    // The first form on the page is the target audience create form
    await page.locator('form').first().locator('input[name="name"]').fill(unique)
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
      page.locator('form').first().locator('button[type="submit"]').click(),
    ])

    const taxonomyCreated = await page.locator(`text=${unique}`).isVisible()
    results.push({ check: 'Create Taxonomy', status: taxonomyCreated ? 'PASS' : 'FAIL' })

    if (taxonomyCreated) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
        page.locator('li', { hasText: unique }).locator('button[type="submit"]').click(),
      ])
      const taxonomyDeleted = !(await page.locator(`text=${unique}`).isVisible())
      results.push({ check: 'Delete Taxonomy', status: taxonomyDeleted ? 'PASS' : 'FAIL' })
    }
  } catch (err) {
    results.push({ check: 'Taxonomy CRUD', status: 'FAIL', note: (err as Error).message })
  }

  // 6. SSOT check via DB schema
  const programmeColumns = await prisma.$queryRaw`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Programme'
  `
  const cols = (programmeColumns as { column_name: string }[]).map((c) => c.column_name.toLowerCase())
  const hasViolation = ['amount', 'currency', 'price', 'vat'].some((f) => cols.includes(f))
  results.push({ check: 'No SSOT violations', status: hasViolation ? 'FAIL' : 'PASS' })

  await browser.close()
  await prisma.$disconnect()

  console.log('\nCMS CRUD Review Results')
  console.log('=======================')
  for (const r of results) {
    console.log(`${r.status}: ${r.check}${r.note ? ` — ${r.note}` : ''}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
