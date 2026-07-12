import { getTaxonomies, deleteTargetAudience, deleteApplicationArea, createTargetAudience, createApplicationArea } from '@/app/admin/actions/cms'

export default async function TaxonomiesPage() {
  const { targetAudiences, applicationAreas } = await getTaxonomies()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Taxonomies</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Audiences</h3>
          <form action={createTargetAudience} className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <input name="name" placeholder="Name" required className="rounded-md border-gray-300 px-3 py-2 border" />
              <input name="slug" placeholder="Slug (optional)" className="rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <input name="description" placeholder="Description" className="w-full rounded-md border-gray-300 px-3 py-2 border" />
            <input name="sortOrder" type="number" placeholder="Sort order" defaultValue="0" className="w-full rounded-md border-gray-300 px-3 py-2 border" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Target Audience</button>
          </form>

          <ul className="divide-y divide-gray-200">
            {targetAudiences.map((ta) => (
              <li key={ta.id} className="py-3 flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{ta.name}</p>
                  <p className="text-sm text-gray-500">{ta.slug}</p>
                </div>
                <form action={deleteTargetAudience.bind(null, ta.id)}>
                  <button type="submit" className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Areas</h3>
          <form action={createApplicationArea} className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <input name="name" placeholder="Name" required className="rounded-md border-gray-300 px-3 py-2 border" />
              <input name="slug" placeholder="Slug (optional)" className="rounded-md border-gray-300 px-3 py-2 border" />
            </div>
            <input name="description" placeholder="Description" className="w-full rounded-md border-gray-300 px-3 py-2 border" />
            <input name="sortOrder" type="number" placeholder="Sort order" defaultValue="0" className="w-full rounded-md border-gray-300 px-3 py-2 border" />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Application Area</button>
          </form>

          <ul className="divide-y divide-gray-200">
            {applicationAreas.map((aa) => (
              <li key={aa.id} className="py-3 flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{aa.name}</p>
                  <p className="text-sm text-gray-500">{aa.slug}</p>
                </div>
                <form action={deleteApplicationArea.bind(null, aa.id)}>
                  <button type="submit" className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
