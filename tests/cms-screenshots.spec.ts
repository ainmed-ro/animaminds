import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

const routes = [
  { path: '/admin', name: 'dashboard' },
  { path: '/admin/programmes', name: 'programmes-list' },
  { path: '/admin/programmes/new', name: 'programmes-new' },
  { path: '/admin/editions', name: 'editions-list' },
  { path: '/admin/editions/new', name: 'editions-new' },
  { path: '/admin/prices', name: 'prices-list' },
  { path: '/admin/prices/new', name: 'prices-new' },
  { path: '/admin/taxonomies', name: 'taxonomies' },
  { path: '/admin/faqs', name: 'faqs' },
  { path: '/admin/testimonials', name: 'testimonials' },
  { path: '/admin/documents', name: 'documents' },
  { path: '/admin/galleries', name: 'galleries' },
  { path: '/admin/pages', name: 'pages' },
  { path: '/admin/forms', name: 'forms' },
  { path: '/admin/users', name: 'users' },
  { path: '/admin/globals', name: 'globals' },
]

test.describe('CMS Screenshots', () => {
  test('capture all admin pages', async ({ page }) => {
    for (const route of routes) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' })
      await page.screenshot({
        path: `cms-review-screenshots/${route.name}.png`,
        fullPage: true,
      })
      const response = await page.goto(`${BASE_URL}${route.path}`)
      expect(response?.status()).toBe(200)
    }
  })
})
