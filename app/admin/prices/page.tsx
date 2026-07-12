import Link from 'next/link'
import { getPrices, deletePrice } from '@/app/admin/actions/cms'
import { getCurrentAdminUser, canEditPrices } from '@/lib/auth'

export default async function PricesPage() {
  const user = await getCurrentAdminUser()
  const prices = await getPrices()
  const canEdit = user ? canEditPrices(user) : false

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Prices</h2>
        {canEdit && (
          <Link href="/admin/prices/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">New Price</Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Currency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Programme</th>
              {canEdit && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prices.map((price) => (
              <tr key={price.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{price.priceCode}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{price.priceType}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{price.amount ? (price.amount / 100).toFixed(2) : '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{price.currency}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{price.status}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{price.programme?.name || '—'}</td>
                {canEdit && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`/admin/prices/${price.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                    <form action={deletePrice.bind(null, price.id)} className="inline">
                      <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                    </form>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
