import { getGalleries, createGallery, deleteGallery } from '@/app/admin/actions/cms'

export default async function GalleriesPage() {
  const galleries = await getGalleries()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Galleries</h2>
      <form action={createGallery} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input name="name" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Gallery</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {galleries.map((g) => (
              <tr key={g.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{g.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{g.description || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={deleteGallery.bind(null, g.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
