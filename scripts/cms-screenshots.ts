import { chromium } from 'playwright'
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const BASE_URL = 'http://localhost:3000'

const prisma = new PrismaClient()

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

async function capture(page: any, url: string, name: string) {
  const outputDir = 'cms-review-screenshots'
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: true })
    console.log(`✅ ${url}`)
  } catch (err) {
    console.error(`❌ ${url}: ${(err as Error).message}`)
  }
}

async function main() {
  const outputDir = 'cms-review-screenshots'
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  for (const route of routes) {
    await capture(page, `${BASE_URL}${route.path}`, route.name)
  }

  const programme = await prisma.programme.findFirst({ orderBy: { createdAt: 'asc' } })
  const edition = await prisma.edition.findFirst({ orderBy: { createdAt: 'asc' } })
  const price = await prisma.price.findFirst({ orderBy: { createdAt: 'asc' } })

  if (programme) await capture(page, `${BASE_URL}/admin/programmes/${programme.id}`, 'programmes-edit')
  if (edition) await capture(page, `${BASE_URL}/admin/editions/${edition.id}`, 'editions-edit')
  if (price) await capture(page, `${BASE_URL}/admin/prices/${price.id}`, 'prices-edit')

  await browser.close()
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
