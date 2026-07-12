import { getTestimonials, createTestimonial, deleteTestimonial } from '@/app/admin/actions/cms'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Testimonials</h2>
      <form action={createTestimonial} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quote</label>
          <textarea name="quote" required rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input name="authorName" placeholder="Author name" className="rounded-md border-gray-300 px-3 py-2 border" />
          <input name="authorRole" placeholder="Role" className="rounded-md border-gray-300 px-3 py-2 border" />
          <input name="authorSector" placeholder="Sector" className="rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <label className="flex items-center gap-2">
          <input name="isPublic" type="checkbox" value="true" defaultChecked />
          <span className="text-sm text-gray-700">Public</span>
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Testimonial</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Public</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{t.quote}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.authorName || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{t.isPublic ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={deleteTestimonial.bind(null, t.id)} className="inline">
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
