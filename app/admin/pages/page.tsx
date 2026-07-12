import { getPages, createPage, deletePage } from '@/app/admin/actions/cms'

export default async function PagesPage() {
  const pages = await getPages()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pages</h2>
      <form action={createPage} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="title" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (optional)</label>
          <input name="slug" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea name="content" rows={5} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <label className="flex items-center gap-2">
          <input name="isPublished" type="checkbox" value="true" />
          <span className="text-sm text-gray-700">Published</span>
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Page</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{page.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.isPublished ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={deletePage.bind(null, page.id)} className="inline">
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
