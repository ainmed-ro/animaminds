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

async function createFAQ(page: any, question: string, answer: string) {
  await page.goto(`${BASE_URL}/admin/faqs`, { waitUntil: 'domcontentloaded' })
  await page.fill('textarea[name="question"]', question)
  await page.fill('textarea[name="answer"]', answer)
  await page.click('button:has-text("Add FAQ")')
  await page.waitForURL(`${BASE_URL}/admin/faqs`, { timeout: 10000 })
  await expect(page.locator('text=' + question).first()).toBeVisible()
}

async function createDocument(page: any, title: string, fileUrl: string) {
  await page.goto(`${BASE_URL}/admin/documents`, { waitUntil: 'domcontentloaded' })
  await page.fill('input[name="title"]', title)
  await page.fill('input[name="fileUrl"]', fileUrl)
  await page.click('button:has-text("Add Document")')
  await page.waitForURL(`${BASE_URL}/admin/documents`, { timeout: 10000 })
  await expect(page.locator('text=' + title).first()).toBeVisible()
}

async function createGallery(page: any, name: string) {
  await page.goto(`${BASE_URL}/admin/galleries`, { waitUntil: 'domcontentloaded' })
  await page.fill('input[name="name"]', name)
  await page.click('button:has-text("Add Gallery")')
  await page.waitForURL(`${BASE_URL}/admin/galleries`, { timeout: 10000 })
  await expect(page.locator('text=' + name).first()).toBeVisible()
}

async function getFirstCheckboxValue(page: any, name: string): Promise<string | null> {
  const checkbox = page.locator(`input[type="checkbox"][name="${name}"]`).first()
  return checkbox.getAttribute('value')
}

test.describe('Phase 04 Programme Management', () => {
  const timestamp = Date.now()
  const faqQuestion = `Phase 04 FAQ ${timestamp}`
  const docTitle = `Phase 04 Document ${timestamp}`
  const galleryName = `Phase 04 Gallery ${timestamp}`
  const programmeName = `Phase 04 Programme ${timestamp}`
  const programmeCode = `PMD_TEST_${timestamp}`

  test('sets up related content and creates a programme with CPD fields and relations', async ({ page }) => {
    await login(page)
    await createFAQ(page, faqQuestion, 'Test answer for Phase 04.')
    await createDocument(page, docTitle, 'https://example.com/phase04.pdf')
    await createGallery(page, galleryName)

    await page.goto(`${BASE_URL}/admin/programmes/new`, { waitUntil: 'domcontentloaded' })

    await page.fill('input[name="name"]', programmeName)
    await page.fill('input[name="programmeCode"]', programmeCode)
    await page.fill('input[name="slug"]', `phase-04-${timestamp}`)
    await page.selectOption('select[name="status"]', 'ACTIVE')

    await page.fill('textarea[name="shortDescription"]', 'Short desc for Phase 04 programme.')
    await page.fill('textarea[name="fullDescription"]', 'Full description for Phase 04 programme.')

    await page.fill('input[name="duration"]', '2 zile')
    await page.fill('input[name="learningHours"]', '16')
    await page.fill('input[name="contactHours"]', '12')
    await page.fill('input[name="individualActivitiesHours"]', '4')
    await page.fill('input[name="totalLearningHours"]', '16')
    await page.fill('input[name="cpdCredits"]', '8')
    await page.fill('input[name="accreditationBody"]', 'CPD Test Body')
    await page.fill('input[name="cpdProviderReference"]', 'CPD-REF-04')
    await page.fill('input[name="cpdApprovalDate"]', '2026-01-15')

    await page.fill('input[name="learningOutcomes"]', 'Outcome A')
    await page.locator('section:has-text("Professional & CPD Data") button:has-text("+ Add item")').first().click()
    await page.locator('section:has-text("Professional & CPD Data") input[name="learningOutcomes"]').nth(1).fill('Outcome B')

    await page.fill('input[placeholder="Competency name"]', 'Decision Making')
    await page.fill('input[placeholder="Description"]', 'Improved structured decision making')

    await page.fill('input[name="emotionalSafetyProtocol"]', 'Safety protocol v1')
    await page.fill('textarea[name="dataRetentionPolicy"]', 'Retain for 3 years.')
    await page.fill('input[name="pmdVersion"]', '1.0.0')

    await page.check('input[name="displayProfessionalLevel"][value="true"]')

    const faqId = await getFirstCheckboxValue(page, 'faqIds')
    const docId = await getFirstCheckboxValue(page, 'documentIds')
    const galleryId = await getFirstCheckboxValue(page, 'galleryIds')

    if (faqId) await page.check(`input[type="checkbox"][name="faqIds"][value="${faqId}"]`)
    if (docId) await page.check(`input[type="checkbox"][name="documentIds"][value="${docId}"]`)
    if (galleryId) await page.check(`input[type="checkbox"][name="galleryIds"][value="${galleryId}"]`)

    await page.click('button:has-text("Create Programme")')
    await page.waitForURL(`${BASE_URL}/admin/programmes`, { timeout: 10000 })

    await expect(page.locator(`text=${programmeName}`).first()).toBeVisible()

    // Verify the programme appears in the list with new columns
    await expect(page.locator(`text=${programmeName}`).first()).toBeVisible()
    await expect(page.locator('text=16')).toBeVisible() // Learning Hours
    await expect(page.locator('text=12')).toBeVisible() // Contact Hours
    await expect(page.locator('text=4')).toBeVisible()  // Individual Activities Hours
    await expect(page.locator('text=8')).toBeVisible()  // CPD Credits

    // Verify edit page loads with persisted hour/CPD fields and capacity defaults
    await page.locator(`text=${programmeName}`).first().locator('xpath=ancestor::tr').locator('a:has-text("Edit")').click()
    await page.waitForURL(/\/admin\/programmes\/[^/]+$/, { timeout: 10000 })
    await expect(page.locator('input[name="learningHours"]')).toHaveValue('16')
    await expect(page.locator('input[name="contactHours"]')).toHaveValue('12')
    await expect(page.locator('input[name="individualActivitiesHours"]')).toHaveValue('4')
    await expect(page.locator('input[name="totalLearningHours"]')).toHaveValue('16')
    await expect(page.locator('input[name="cpdCredits"]')).toHaveValue('8')
    await expect(page.locator('input[name="accreditationBody"]')).toHaveValue('CPD Test Body')
    await expect(page.locator('input[name="cpdProviderReference"]')).toHaveValue('CPD-REF-04')
    await expect(page.locator('input[name="cpdApprovalDate"]')).toHaveValue('2026-01-15')
    
    // Verify Group Size & Capacity defaults are present
    await expect(page.locator('input[name="onlineMinParticipants"]')).toHaveValue('15')
    await expect(page.locator('input[name="onlineMaxParticipants"]')).toHaveValue('30')
    await expect(page.locator('input[name="onsiteMaxParticipants"]')).toHaveValue('30')
    await expect(page.locator('input[name="experienceMinParticipants"]')).toHaveValue('20')
    await expect(page.locator('input[name="experienceMaxParticipants"]')).toHaveValue('30')
  })
})
