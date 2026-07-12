import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

async function getFirstOpenEditionLink(page: any): Promise<{ href: string | null; status: string | null }> {
  const card = page.locator('[data-testid="edition-card"]').first()
  const status = await card.locator('[data-testid="edition-status"]').textContent().catch(() => null)
  const link = card.locator('a[data-testid="register-link"]').first()
  const href = await link.getAttribute('href').catch(() => null)
  return { href, status }
}

test.describe('Public Registration Flow', () => {
  test('calendar shows editions and registration form submits', async ({ page }) => {
    await page.goto(`${BASE_URL}/calendar`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1:has-text("Calendar Ediții")')).toBeVisible()

    const { href, status } = await getFirstOpenEditionLink(page)

    if (!href || status !== 'Deschis') {
      test.skip()
      return
    }

    await page.goto(`${BASE_URL}${href}`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1:has-text("Înscriere")')).toBeVisible()

    const timestamp = Date.now()
    await page.fill('input[name="contactName"]', `Test Participant ${timestamp}`)
    await page.fill('input[name="contactEmail"]', `test+${timestamp}@example.com`)
    await page.fill('input[name="contactPhone"]', '0712345678')
    await page.fill('input[name="participantCount"]', '1')
    await page.fill('input[name="entityName"]', 'Test Organization')
    await page.check('input[name="gdprConsent"]')

    await page.click('button:has-text("Trimite înscrierea")')
    await page.waitForURL(`${BASE_URL}/calendar?success=1`, { timeout: 10000 })

    await expect(page.locator('h1:has-text("Calendar Ediții")')).toBeVisible()
  })
})
