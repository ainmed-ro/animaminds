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

test.describe('Registration Management', () => {
  test('lists registrations in admin', async ({ page }) => {
    await login(page)
    await page.goto(`${BASE_URL}/admin/registrations`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h2:has-text("Registrations")')).toBeVisible()
    await expect(page.locator('th:has-text("Contact")')).toBeVisible()
  })
})
