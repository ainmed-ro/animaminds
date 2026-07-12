import { getGlobals, updateSiteSettings, updatePublicProcurement, updateTransportInfo, updateNavigation } from '@/app/admin/actions/cms'

export default async function GlobalsPage() {
  const { siteSettings, publicProcurement, transportInfo, navigation } = await getGlobals()

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Globals</h2>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Site Settings</h3>
        <form action={updateSiteSettings} className="space-y-4 max-w-2xl">
          <input name="id" type="hidden" defaultValue={siteSettings?.id || ''} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand Name</label>
            <input name="brandName" defaultValue={siteSettings?.brandName || 'AnimaMinds'} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tagline</label>
            <input name="tagline" defaultValue={siteSettings?.tagline || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="contactEmail" type="email" placeholder="Contact email" defaultValue={siteSettings?.contactEmail || ''} className="rounded-md border-gray-300 px-3 py-2 border" />
            <input name="contactPhone" placeholder="Contact phone" defaultValue={siteSettings?.contactPhone || ''} className="rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Meta Title</label>
            <input name="defaultMetaTitle" defaultValue={siteSettings?.defaultMetaTitle || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Meta Description</label>
            <textarea name="defaultMetaDescription" defaultValue={siteSettings?.defaultMetaDescription || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Site Settings</button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Public Procurement</h3>
        <form action={updatePublicProcurement} className="space-y-4 max-w-2xl">
          <input name="id" type="hidden" defaultValue={publicProcurement?.id || ''} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input name="title" defaultValue={publicProcurement?.title || 'Achiziții publice'} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" defaultValue={publicProcurement?.content || ''} rows={5} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CTA Label</label>
            <input name="ctaLabel" defaultValue={publicProcurement?.ctaLabel || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Public Procurement</button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transport Info</h3>
        <form action={updateTransportInfo} className="space-y-4 max-w-2xl">
          <input name="id" type="hidden" defaultValue={transportInfo?.id || ''} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" defaultValue={transportInfo?.content || ''} rows={5} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Transport Info</button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
        <form action={updateNavigation} className="space-y-4 max-w-2xl">
          <input name="id" type="hidden" defaultValue={navigation?.id || ''} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Header JSON</label>
            <textarea name="header" defaultValue={navigation?.header ? JSON.stringify(navigation.header, null, 2) : '[]'} rows={6} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Footer JSON</label>
            <textarea name="footer" defaultValue={navigation?.footer ? JSON.stringify(navigation.footer, null, 2) : '[]'} rows={6} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border font-mono text-sm" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Navigation</button>
        </form>
      </section>
    </div>
  )
}
