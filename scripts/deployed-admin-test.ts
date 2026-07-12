import { chromium } from 'playwright'

const BASE_URL = 'https://animaminds.vercel.app'
const EMAIL = 'admin@animaminds.ro'
const PASSWORD = 'Animaminds2026!'

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    console.log('Admin redirect URL:', page.url())

    await page.fill('input#email', EMAIL)
    await page.fill('input#password', PASSWORD)
    await page.click('button[type="submit"]')

    await page.waitForURL(`${BASE_URL}/admin`, { timeout: 30000 })
    console.log('Logged in, URL:', page.url())
    console.log('Admin page title:', await page.title())

    await page.goto(`${BASE_URL}/admin/registrations`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    console.log('Registrations page title:', await page.title())
    await page.waitForSelector('h2:has-text("Registrations")', { timeout: 10000 })
    console.log('Registrations list visible')
  } catch (err) {
    console.error('Admin test failed:', err)
    await page.screenshot({ path: 'tmp/deployed-admin-error.png' })
  } finally {
    await browser.close()
  }
}

main()
export {} 
