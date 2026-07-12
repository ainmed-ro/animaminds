import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

const routes = [
  '/admin',
  '/admin/programmes',
  '/admin/programmes/new',
  '/admin/editions',
  '/admin/editions/new',
  '/admin/prices',
  '/admin/prices/new',
  '/admin/taxonomies',
  '/admin/faqs',
  '/admin/testimonials',
  '/admin/documents',
  '/admin/galleries',
  '/admin/pages',
  '/admin/forms',
  '/admin/users',
  '/admin/globals',
]

test.describe('CMS Review', () => {
  test('all admin routes are accessible', async ({ page }) => {
    for (const route of routes) {
      const response = await page.goto(`${BASE_URL}${route}`)
      expect(response?.status(), `Route ${route} should return 200`).toBe(200)
      await expect(page.locator('text=AnimaMinds CMS')).toBeVisible()
    }
  })

  test('programme editing works', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/programmes`)
    await page.getByRole('link', { name: /Edit/i }).first().click()
    await expect(page.getByRole('heading', { name: /Edit Programme/i })).toBeVisible()

    const unique = Date.now().toString()
    await page.getByLabel('Short Description').fill(`Updated short description ${unique}`)
    await page.getByRole('button', { name: /Update Programme/i }).click()

    await page.waitForURL(`${BASE_URL}/admin/programmes`)
    await expect(page.locator(`text=Updated short description ${unique}`)).not.toBeVisible()

    // Verify persistence via edit page
    await page.goto(`${BASE_URL}/admin/programmes`)
    await page.getByRole('link', { name: /Edit/i }).first().click()
    await expect(page.getByLabel('Short Description')).toHaveValue(`Updated short description ${unique}`)
  })

  test('edition editing works', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/editions`)
    await page.getByRole('link', { name: /Edit/i }).first().click()
    await expect(page.getByRole('heading', { name: /Edit Edition/i })).toBeVisible()

    const unique = Date.now().toString()
    await page.getByLabel('Edition Title').fill(`Updated edition title ${unique}`)
    await page.getByRole('button', { name: /Update Edition/i }).click()

    await page.waitForURL(`${BASE_URL}/admin/editions`)
    await expect(page.locator(`text=Updated edition title ${unique}`)).toBeVisible()
  })

  test('pricing editing works', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/prices`)
    await page.getByRole('link', { name: /Edit/i }).first().click()
    await expect(page.getByRole('heading', { name: /Edit Price/i })).toBeVisible()

    const unique = Date.now().toString()
    await page.getByLabel('Display Label').fill(`Updated label ${unique}`)
    await page.getByRole('button', { name: /Update Price/i }).click()

    await page.waitForURL(`${BASE_URL}/admin/prices`)
    await expect(page.locator(`text=Updated label ${unique}`)).toBeVisible()
  })

  test('site settings editing works', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/globals`)
    await expect(page.getByRole('heading', { name: /Site Settings/i })).toBeVisible()

    const unique = Date.now().toString()
    await page.getByLabel('Brand Name').fill(`AnimaMinds Test ${unique}`)
    await page.getByRole('button', { name: /Save Site Settings/i }).click()

    await page.waitForURL(`${BASE_URL}/admin/globals`)
    await expect(page.getByLabel('Brand Name')).toHaveValue(`AnimaMinds Test ${unique}`)

    // Restore original value
    await page.getByLabel('Brand Name').fill('AnimaMinds')
    await page.getByRole('button', { name: /Save Site Settings/i }).click()
    await page.waitForURL(`${BASE_URL}/admin/globals`)
  })

  test('taxonomies editing works', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/taxonomies`)
    await expect(page.getByRole('heading', { name: /Taxonomies/i })).toBeVisible()

    const unique = `Test Audience ${Date.now()}`
    await page.locator('section').filter({ hasText: 'Target Audiences' }).getByPlaceholder('Name').fill(unique)
    await page.locator('section').filter({ hasText: 'Target Audiences' }).getByRole('button', { name: /Add Target Audience/i }).click()

    await page.waitForURL(`${BASE_URL}/admin/taxonomies`)
    await expect(page.locator(`text=${unique}`)).toBeVisible()

    // Cleanup
    await page.locator('li', { hasText: unique }).getByRole('button', { name: /Delete/i }).click()
    await expect(page.locator(`text=${unique}`)).not.toBeVisible()
  })

  test('no SSOT violations in programme list', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin/programmes`)
    const headers = await page.locator('th').allInnerTexts()
    const forbidden = ['amount', 'price', 'currency', 'vat']
    for (const f of forbidden) {
      expect(headers.join(' ').toLowerCase()).not.toContain(f)
    }
  })
})
