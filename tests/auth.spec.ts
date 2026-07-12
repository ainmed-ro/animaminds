import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'
const ADMIN_URL = `${BASE_URL}/admin`
const LOGIN_URL = `${BASE_URL}/login`

const roles = [
  { email: 'admin@animaminds.ro', role: 'SUPER_ADMIN', canEditPrices: true, canManageUsers: true },
  { email: 'content@animaminds.ro', role: 'CONTENT_MANAGER', canEditPrices: false, canManageUsers: false },
  { email: 'commercial@animaminds.ro', role: 'COMMERCIAL_MANAGER', canEditPrices: true, canManageUsers: false },
]

const DEFAULT_PASSWORD = 'Animaminds2026!'

async function login(page: any, email: string) {
  await page.goto(`${LOGIN_URL}`, { waitUntil: 'domcontentloaded' })
  await page.fill('input#email', email)
  await page.fill('input#password', DEFAULT_PASSWORD)
  await page.click('button[type="submit"]')
  await page.waitForURL(ADMIN_URL, { timeout: 10000 })
}

test.describe('Phase 03 Authentication', () => {
  test('anonymous user is redirected from admin to login', async ({ page }) => {
    await page.goto(`${ADMIN_URL}`, { waitUntil: 'domcontentloaded' })
    await page.waitForURL(`${LOGIN_URL}?**`, { timeout: 10000 })
    expect(page.url()).toContain(`${LOGIN_URL}?callbackUrl=`)
    expect(page.url()).toContain(encodeURIComponent(ADMIN_URL))
  })

  for (const role of roles) {
    test(`${role.role} can log in and access admin`, async ({ page }) => {
      await login(page, role.email)
      await expect(page.locator('text=AnimaMinds CMS')).toBeVisible()
      await expect(page.locator('aside').locator(`text=${role.role}`).first()).toBeVisible()
    })

    test(`${role.role} can access admin routes after login`, async ({ page }) => {
      await login(page, role.email)
      await page.goto(`${BASE_URL}/admin/programmes`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('h2:has-text("Programmes")')).toBeVisible()
      await expect(page.locator('text=AnimaMinds CMS')).toBeVisible()
    })
  }

  test('logout redirects to login and prevents admin access', async ({ page }) => {
    await login(page, 'admin@animaminds.ro')
    await page.goto(`${ADMIN_URL}`, { waitUntil: 'domcontentloaded' })
    await page.click('text=Sign out')
    await page.waitForURL(LOGIN_URL, { timeout: 10000 })

    await page.goto(`${ADMIN_URL}`, { waitUntil: 'domcontentloaded' })
    await page.waitForURL(`${LOGIN_URL}?**`, { timeout: 10000 })
    expect(page.url()).toContain(`${LOGIN_URL}?callbackUrl=`)
  })

  test('invalid credentials show error', async ({ page }) => {
    await page.goto(`${LOGIN_URL}`, { waitUntil: 'domcontentloaded' })
    await page.fill('input#email', 'admin@animaminds.ro')
    await page.fill('input#password', 'wrongpassword')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid email or password')).toBeVisible()
  })

  test('price pages are restricted for Content Manager', async ({ page }) => {
    await login(page, 'content@animaminds.ro')
    await page.goto(`${BASE_URL}/admin/prices`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('text=New Price')).not.toBeVisible()
  })

  test('price pages are accessible for Commercial Manager', async ({ page }) => {
    await login(page, 'commercial@animaminds.ro')
    await page.goto(`${BASE_URL}/admin/prices`, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('text=New Price')).toBeVisible()
  })
})
