import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'
const ADMIN_URL = `${BASE_URL}/admin`
const LOGIN_URL = `${BASE_URL}/login`
const DEFAULT_PASSWORD = 'Animaminds2026!'

async function login(page: any, email: string = 'admin@animaminds.ro') {
  await page.goto(`${LOGIN_URL}`, { waitUntil: 'domcontentloaded' })
  await page.fill('input#email', email)
  await page.fill('input#password', DEFAULT_PASSWORD)
  await page.click('button[type="submit"]')
  await page.waitForURL(ADMIN_URL, { timeout: 10000 })
}

async function createPrice(page: any, code: string): Promise<string> {
  await page.goto(`${BASE_URL}/admin/prices/new`, { waitUntil: 'domcontentloaded' })
  await page.fill('input[name="priceCode"]', code)
  await page.selectOption('select[name="priceType"]', 'STANDARD')
  await page.fill('input[name="amount"]', '1000')
  await page.fill('input[name="currency"]', 'RON')
  await page.selectOption('select[name="status"]', 'ACTIVE')
  await page.click('button:has-text("Create Price")')
  await page.waitForURL(`${BASE_URL}/admin/prices`, { timeout: 10000 })

  const row = page.locator('tr', { hasText: code }).first()
  const editLink = row.locator('a:has-text("Edit")')
  const href = await editLink.getAttribute('href')
  return href!.split('/').pop()!
}

async function getOptionValueByText(page: any, selectName: string, text: string): Promise<string | null> {
  const option = page.locator(`select[name="${selectName}"] option:has-text("${text}")`).first()
  return option.getAttribute('value')
}

async function createGallery(page: any, name: string) {
  await page.goto(`${BASE_URL}/admin/galleries`, { waitUntil: 'domcontentloaded' })
  await page.fill('input[name="name"]', name)
  await page.click('button:has-text("Add Gallery")')
  await page.waitForURL(`${BASE_URL}/admin/galleries`, { timeout: 10000 })
}

async function getFirstRealSelectValue(page: any, name: string): Promise<string | null> {
  const options = page.locator(`select[name="${name}"] option`).filter({ hasNotText: /select/i })
  const first = options.first()
  return first.getAttribute('value')
}

async function getFirstCheckboxValue(page: any, name: string): Promise<string | null> {
  const checkbox = page.locator(`input[type="checkbox"][name="${name}"]`).first()
  return checkbox.getAttribute('value')
}

test.describe('Phase 05 Edition Management', () => {
  const timestamp = Date.now()
  const editionTitle = `Phase 05 Online Edition ${timestamp}`
  const priceCode = `P05_${timestamp}`
  const galleryName = `Phase 05 Gallery ${timestamp}`

  test('creates and edits an edition with capacity, deadline, price and gallery', async ({ page }) => {
    await login(page)
    const priceId = await createPrice(page, priceCode)
    await createGallery(page, galleryName)

    await page.goto(`${BASE_URL}/admin/editions/new`, { waitUntil: 'domcontentloaded' })

    const programmeId = await getFirstRealSelectValue(page, 'programmeId')
    expect(programmeId).toBeTruthy()
    await page.selectOption('select[name="programmeId"]', programmeId!)

    await page.fill('input[name="editionTitle"]', editionTitle)
    await page.fill('input[name="slug"]', `phase-05-${timestamp}`)
    await page.selectOption('select[name="deliveryFormat"]', 'ONLINE')
    await page.selectOption('select[name="status"]', 'OPEN')

    await page.fill('input[name="startDate"]', '2026-10-01')
    await page.fill('input[name="endDate"]', '2026-10-02')
    await page.fill('input[name="registrationDeadline"]', '2026-09-25')
    await page.fill('input[name="maxSeats"]', '30')
    await page.fill('input[name="availableSeats"]', '25')

    await page.selectOption('select[name="displayPriceId"]', priceId)

    const galleryId = await getFirstCheckboxValue(page, 'galleryIds')
    if (galleryId) await page.check(`input[type="checkbox"][name="galleryIds"][value="${galleryId}"]`)

    await page.click('button:has-text("Create Edition")')
    await page.waitForURL(`${BASE_URL}/admin/editions`, { timeout: 10000 })

    await expect(page.locator(`text=${editionTitle}`).first()).toBeVisible()
    await expect(page.locator('text=30 (25 available)').first()).toBeVisible()

    await page.locator(`text=${editionTitle}`).first().locator('xpath=ancestor::tr').locator('a:has-text("Edit")').click()
    await page.waitForURL(/\/admin\/editions\/[^/]+$/, { timeout: 10000 })

    await expect(page.locator('input[name="maxSeats"]')).toHaveValue('30')
    await expect(page.locator('input[name="availableSeats"]')).toHaveValue('25')
    await expect(page.locator('input[name="registrationDeadline"]')).toHaveValue('2026-09-25')

    // Switch to on-site and add location
    await page.selectOption('select[name="deliveryFormat"]', 'ONSITE')
    await page.fill('input[name="city"]', 'București')
    await page.fill('input[name="locationName"]', 'Hotel Intercontinental')

    await page.click('button:has-text("Update Edition")')
    await page.waitForURL(`${BASE_URL}/admin/editions`, { timeout: 10000 })

    await page.locator(`text=${editionTitle}`).first().locator('xpath=ancestor::tr').locator('a:has-text("Edit")').click()
    await page.waitForURL(/\/admin\/editions\/[^/]+$/, { timeout: 10000 })
    await expect(page.locator('input[name="city"]')).toHaveValue('București')
    await expect(page.locator('input[name="locationName"]')).toHaveValue('Hotel Intercontinental')
  })
})
