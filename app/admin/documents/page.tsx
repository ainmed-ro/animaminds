import { getDocuments, createDocument, deleteDocument } from '@/app/admin/actions/cms'

export default async function DocumentsPage() {
  const documents = await getDocuments()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
      <form action={createDocument} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="title" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">File URL</label>
          <input name="fileUrl" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="fileType" placeholder="File type (pdf, md)" className="rounded-md border-gray-300 px-3 py-2 border" />
          <input name="description" placeholder="Description" className="rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Document</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{doc.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{doc.fileType || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={deleteDocument.bind(null, doc.id)} className="inline">
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
