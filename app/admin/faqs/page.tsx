import { getFAQs, createFAQ, deleteFAQ, getProgrammesForSelect } from '@/app/admin/actions/cms'

export default async function FAQsPage() {
  const [faqs, programmes] = await Promise.all([getFAQs(), getProgrammesForSelect()])

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
      <form action={createFAQ} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Question</label>
          <textarea name="question" required rows={2} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <textarea name="answer" required rows={4} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order</label>
            <input name="order" type="number" defaultValue="0" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Programme (optional)</label>
            <select name="programmeId" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              <option value="">None</option>
              {programmes.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add FAQ</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Programme</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faqs.map((faq) => (
              <tr key={faq.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{faq.question}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{faq.programme?.name || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{faq.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={deleteFAQ.bind(null, faq.id)} className="inline">
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
