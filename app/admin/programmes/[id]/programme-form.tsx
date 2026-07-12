import { ProgrammeStatus, DeliveryFormat } from '@prisma/client'
import { StringArrayInput } from '@/app/admin/components/string-array-input'
import { CompetencyArrayInput } from '@/app/admin/components/json-array-input'
import { RelationSelector } from '@/app/admin/components/relation-selector'
import type { getProgramme } from '@/app/admin/actions/cms'
import type { getProgrammeEditOptions } from '@/app/admin/actions/cms'

type Programme = Awaited<ReturnType<typeof getProgramme>>
type Options = Awaited<ReturnType<typeof getProgrammeEditOptions>>

interface ProgrammeFormProps {
  programme: NonNullable<Programme> | null
  options: Options
  action: (formData: FormData) => void
}

export function ProgrammeForm({ programme, options, action }: ProgrammeFormProps) {
  const p = programme || {
    id: '',
    slug: '',
    programmeCode: '',
    name: '',
    status: 'DRAFT' as ProgrammeStatus,
    subtitle: null,
    shortDescription: null,
    fullDescription: null,
    problemSolved: null,
    programmePromise: null,
    mainBenefits: [],
    whatParticipantsReceive: [],
    whatParticipantsCanDoNextDay: [],
    availableDeliveryFormats: [] as DeliveryFormat[],
    registrationCTA: 'Înscrie-te',
    offerRequestCTA: 'Solicită ofertă',
    featuredImageUrl: null,
    duration: null,
    learningHours: null,
    cpdHours: null,
    accreditationBody: null,
    cpdProviderReference: null,
    cpdApprovalDate: null,
    competenciesDeveloped: null,
    learningOutcomes: [],
    programmeObjectives: null,
    learningMethods: [],
    assessmentMethods: [],
    resourcesOffered: [],
    certificationInfo: null,
    followUpProcess: null,
    industryAdaptations: null,
    emotionalSafetyProtocol: null,
    dataRetentionPolicy: null,
    pmdVersion: null,
    displayProfessionalLevel: true,
    displayGovernanceFields: false,
    programmeOwnerId: null,
    reviewerId: null,
    dateApproved: null,
    nextReviewDate: null,
    defaultStandardPriceId: null,
    defaultLaunchPriceId: null,
    targetAudiences: [],
    applicationAreas: [],
    faqs: [],
    documents: [],
    galleries: [],
    testimonials: [],
    additionalDefaultPrices: [],
    editions: [],
    seo: null,
    programmeOwner: null,
    reviewer: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdById: null,
    updatedById: null,
    lastUpdated: new Date(),
  }

  const selectedTargetAudienceIds = p.targetAudiences.map((ta: any) => ta.targetAudienceId)
  const selectedApplicationAreaIds = p.applicationAreas.map((aa: any) => aa.applicationAreaId)
  const selectedFaqIds = p.faqs.map((f: any) => f.id)
  const selectedDocumentIds = p.documents.map((d: any) => d.document.id)
  const selectedGalleryIds = p.galleries.map((g: any) => g.gallery.id)
  const selectedAdditionalPriceIds = p.additionalDefaultPrices.map((pr: any) => pr.id)

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }

  const competencies = (p.competenciesDeveloped as Array<{ name?: string; description?: string }> | undefined) || []

  return (
    <form action={action} className="max-w-4xl space-y-8">
      <input type="hidden" name="seoId" defaultValue={p.seo?.id || ''} />

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" defaultValue={p.name} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Programme Code</label>
            <input name="programmeCode" defaultValue={p.programmeCode} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input name="slug" defaultValue={p.slug} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" defaultValue={p.status} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              {Object.values(ProgrammeStatus).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input name="subtitle" defaultValue={p.subtitle || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
          <input name="featuredImageUrl" defaultValue={p.featuredImageUrl || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Commercial Copy</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea name="shortDescription" defaultValue={p.shortDescription || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Description</label>
          <textarea name="fullDescription" defaultValue={p.fullDescription || ''} rows={5} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Problem Solved</label>
          <textarea name="problemSolved" defaultValue={p.problemSolved || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Programme Promise</label>
          <input name="programmePromise" defaultValue={p.programmePromise || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StringArrayInput name="mainBenefits" label="Main Benefits" defaultValues={p.mainBenefits} placeholder="Benefit" />
          <StringArrayInput name="whatParticipantsReceive" label="What Participants Receive" defaultValues={p.whatParticipantsReceive} placeholder="Item" />
        </div>
        <StringArrayInput name="whatParticipantsCanDoNextDay" label="What Participants Can Do Next Day" defaultValues={p.whatParticipantsCanDoNextDay} placeholder="Outcome" />
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Professional & CPD Data</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input name="duration" defaultValue={p.duration || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Learning Hours</label>
            <input name="learningHours" type="number" defaultValue={p.learningHours || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPD Hours</label>
            <input name="cpdHours" type="number" defaultValue={p.cpdHours || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Accreditation Body</label>
            <input name="accreditationBody" defaultValue={p.accreditationBody || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPD Provider Reference</label>
            <input name="cpdProviderReference" defaultValue={p.cpdProviderReference || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPD Approval Date</label>
          <input name="cpdApprovalDate" type="date" defaultValue={formatDate(p.cpdApprovalDate)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Programme Objectives</label>
          <textarea name="programmeObjectives" defaultValue={p.programmeObjectives || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <StringArrayInput name="learningOutcomes" label="Learning Outcomes" defaultValues={p.learningOutcomes} placeholder="Learning outcome" />
        <CompetencyArrayInput name="competenciesDeveloped" label="Competencies Developed" defaultValue={competencies} />
        <div className="grid grid-cols-2 gap-4">
          <StringArrayInput name="learningMethods" label="Learning Methods" defaultValues={p.learningMethods} placeholder="Method" />
          <StringArrayInput name="assessmentMethods" label="Assessment Methods" defaultValues={p.assessmentMethods} placeholder="Method" />
        </div>
        <StringArrayInput name="resourcesOffered" label="Resources Offered" defaultValues={p.resourcesOffered} placeholder="Resource" />
        <div>
          <label className="block text-sm font-medium text-gray-700">Certification Info</label>
          <textarea name="certificationInfo" defaultValue={p.certificationInfo || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Follow-up Process</label>
          <textarea name="followUpProcess" defaultValue={p.followUpProcess || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="displayProfessionalLevel" value="true" defaultChecked={p.displayProfessionalLevel} />
            <span className="text-sm text-gray-700">Display Professional Level</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="displayGovernanceFields" value="true" defaultChecked={p.displayGovernanceFields} />
            <span className="text-sm text-gray-700">Display Governance Fields</span>
          </label>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Governance</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Programme Owner</label>
            <select name="programmeOwnerId" defaultValue={p.programmeOwnerId || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              <option value="">None</option>
              {options.users.map((u) => (
                <option key={u.id} value={u.id}>{u.name || u.email}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reviewer</label>
            <select name="reviewerId" defaultValue={p.reviewerId || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              <option value="">None</option>
              {options.users.map((u) => (
                <option key={u.id} value={u.id}>{u.name || u.email}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Approved</label>
            <input name="dateApproved" type="date" defaultValue={formatDate(p.dateApproved)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Next Review Date</label>
            <input name="nextReviewDate" type="date" defaultValue={formatDate(p.nextReviewDate)} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Emotional Safety Protocol</label>
          <input name="emotionalSafetyProtocol" defaultValue={p.emotionalSafetyProtocol || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Retention Policy</label>
          <textarea name="dataRetentionPolicy" defaultValue={p.dataRetentionPolicy || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PMD Version</label>
          <input name="pmdVersion" defaultValue={p.pmdVersion || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Standard Price</label>
            <select name="defaultStandardPriceId" defaultValue={p.defaultStandardPriceId || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              <option value="">None</option>
              {options.prices.map((price) => (
                <option key={price.id} value={price.id}>{price.priceCode} — {price.displayLabel}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Launch Price</label>
            <select name="defaultLaunchPriceId" defaultValue={p.defaultLaunchPriceId || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              <option value="">None</option>
              {options.prices.map((price) => (
                <option key={price.id} value={price.id}>{price.priceCode} — {price.displayLabel}</option>
              ))}
            </select>
          </div>
        </div>
        <RelationSelector
          name="additionalDefaultPriceIds"
          label="Additional Default Prices"
          items={options.prices.map((price) => ({ id: price.id, name: `${price.priceCode} — ${price.displayLabel}` }))}
          defaultSelectedIds={selectedAdditionalPriceIds}
        />
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Taxonomies</h3>
        <div className="grid grid-cols-2 gap-4">
          <RelationSelector
            name="targetAudienceIds"
            label="Target Audiences"
            items={options.taxonomies?.targetAudiences.map((ta) => ({ id: ta.id, name: ta.name })) || []}
            defaultSelectedIds={selectedTargetAudienceIds}
          />
          <RelationSelector
            name="applicationAreaIds"
            label="Application Areas"
            items={options.taxonomies?.applicationAreas.map((aa) => ({ id: aa.id, name: aa.name })) || []}
            defaultSelectedIds={selectedApplicationAreaIds}
          />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Delivery & CTAs</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Delivery Formats</label>
          <div className="flex flex-wrap gap-4">
            {Object.values(DeliveryFormat).map((df) => (
              <label key={df} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="availableDeliveryFormats"
                  value={df}
                  defaultChecked={p.availableDeliveryFormats.includes(df)}
                />
                <span className="text-sm text-gray-700">{df}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration CTA</label>
            <input name="registrationCTA" defaultValue={p.registrationCTA} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Offer Request CTA</label>
            <input name="offerRequestCTA" defaultValue={p.offerRequestCTA} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Related Content</h3>
        <div className="grid grid-cols-3 gap-4">
          <RelationSelector
            name="faqIds"
            label="FAQs"
            items={options.faqs.map((f) => ({ id: f.id, name: f.question.slice(0, 60) + (f.question.length > 60 ? '...' : '') }))}
            defaultSelectedIds={selectedFaqIds}
          />
          <RelationSelector
            name="documentIds"
            label="Documents"
            items={options.documents.map((d) => ({ id: d.id, name: d.title }))}
            defaultSelectedIds={selectedDocumentIds}
          />
          <RelationSelector
            name="galleryIds"
            label="Galleries"
            items={options.galleries.map((g) => ({ id: g.id, name: g.name }))}
            defaultSelectedIds={selectedGalleryIds}
          />
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">SEO</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meta Title</label>
            <input name="metaTitle" defaultValue={p.seo?.metaTitle || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Canonical URL</label>
            <input name="canonicalUrl" defaultValue={p.seo?.canonicalUrl || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
          <textarea name="metaDescription" defaultValue={p.seo?.metaDescription || ''} rows={2} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">OG Title</label>
            <input name="ogTitle" defaultValue={p.seo?.ogTitle || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">OG Image URL</label>
            <input name="ogImageUrl" defaultValue={p.seo?.ogImageUrl || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OG Description</label>
          <textarea name="ogDescription" defaultValue={p.seo?.ogDescription || ''} rows={2} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Structured Data (JSON)</label>
          <textarea
            name="structuredData"
            defaultValue={p.seo?.structuredData ? JSON.stringify(p.seo.structuredData, null, 2) : ''}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border font-mono text-sm"
          />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="noIndex" value="true" defaultChecked={p.seo?.noIndex} />
          <span className="text-sm text-gray-700">No Index</span>
        </label>
      </section>

      <div className="pt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {programme ? 'Update Programme' : 'Create Programme'}
        </button>
      </div>
    </form>
  )
}
