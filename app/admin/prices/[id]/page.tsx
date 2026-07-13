import { notFound } from 'next/navigation'
import { getPrice, updatePrice, getProgrammesForSelect } from '@/app/admin/actions/cms'
import { PriceType, PriceStatus, DeliveryFormat } from '@prisma/client'

export default async function EditPricePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [price, programmes] = await Promise.all([getPrice(id), getProgrammesForSelect()])
  if (!price) notFound()

  const update = updatePrice.bind(null, id)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Price</h2>
      <form action={update} className="max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Code</label>
          <input name="priceCode" defaultValue={price.priceCode} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Programme</label>
          <select name="programmeId" defaultValue={price.programmeId || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border">
            <option value="">None</option>
            {programmes.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price Type</label>
          <select name="priceType" defaultValue={price.priceType} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border">
            {Object.values(PriceType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Format</label>
          <select name="deliveryFormat" defaultValue={(price as any).deliveryFormat || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border">
            <option value="">Any / All formats</option>
            {Object.values(DeliveryFormat).map((df) => (
              <option key={df} value={df}>{df}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (bani)</label>
            <input name="amount" type="number" defaultValue={price.amount || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <input name="currency" defaultValue={price.currency} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select name="status" defaultValue={price.status} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border">
            {Object.values(PriceStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Display Label</label>
          <input name="displayLabel" defaultValue={price.displayLabel || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border" />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input name="vatIncluded" type="checkbox" value="true" defaultChecked={price.vatIncluded} />
            <span className="text-sm text-gray-700">VAT included</span>
          </label>
        </div>
        <div className="pt-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update Price</button>
        </div>
      </form>
    </div>
  )
}
