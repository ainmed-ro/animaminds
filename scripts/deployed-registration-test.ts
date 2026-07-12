import { chromium } from 'playwright'

const BASE_URL = 'https://animaminds.vercel.app'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    await page.goto(`${BASE_URL}/calendar`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    console.log('Calendar loaded:', await page.title())

    const card = page.locator('[data-testid="edition-card"]').first()
    const status = await card.locator('[data-testid="edition-status"]').textContent().catch(() => null)
    console.log('First edition status:', status)

    if (status !== 'Deschis') {
      console.log('No open edition available for test')
      await browser.close()
      return
    }

    const href = await card.locator('[data-testid="register-link"]').first().getAttribute('href')
    console.log('Register link:', href)

    await page.goto(`${BASE_URL}${href}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    console.log('Registration page loaded:', await page.title())

    const timestamp = Date.now()
    await page.fill('input[name="contactName"]', `Deploy Test ${timestamp}`)
    await page.fill('input[name="contactEmail"]', `deploy+${timestamp}@example.com`)
    await page.fill('input[name="contactPhone"]', '0712345678')
    await page.fill('input[name="participantCount"]', '1')
    await page.fill('input[name="entityName"]', 'Deploy Test Org')
    await page.check('input[name="gdprConsent"]')

    await page.click('button:has-text("Trimite înscrierea")')
    await page.waitForURL(`${BASE_URL}/calendar?success=1`, { timeout: 30000 })

    console.log('Registration submitted successfully')
  } catch (err) {
    console.error('Test failed:', err)
    await page.screenshot({ path: 'tmp/deployed-registration-error.png' })
  } finally {
    await browser.close()
  }
}

main()
export {} 
