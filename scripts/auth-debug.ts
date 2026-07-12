import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:3000'

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  // Test 1: anonymous redirect
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded' })
  console.log('After /admin redirect:', page.url())
  await page.screenshot({ path: 'auth-debug/anon-redirect.png', fullPage: true })

  // Test 2: login form
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'domcontentloaded' })
  await page.fill('input#email', 'admin@animaminds.ro')
  await page.fill('input#password', 'Animaminds2026!')
  await page.click('button[type="submit"]')
  await page.waitForTimeout(3000)
  console.log('After login submit:', page.url())
  await page.screenshot({ path: 'auth-debug/after-login.png', fullPage: true })

  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
