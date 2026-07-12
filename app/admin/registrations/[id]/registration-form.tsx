import { PaymentStatus, EntityType } from '@prisma/client'
import type { getOpenEditionsForRegistration } from '@/app/admin/actions/cms'

type Edition = Awaited<ReturnType<typeof getOpenEditionsForRegistration>>[number]

interface RegistrationFormProps {
  editions: Edition[]
  defaultEditionId?: string
  defaultValues?: {
    contactName: string
    contactEmail: string
    contactPhone: string | null
    entityType: string
    entityName: string | null
    cui: string | null
    participantCount: number
    paymentStatus: string
    notes: string | null
  }
  action: (formData: FormData) => void
  submitLabel: string
}

export function RegistrationForm({ editions, defaultEditionId, defaultValues, action, submitLabel }: RegistrationFormProps) {
  return (
    <form action={action} className="max-w-2xl space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700">Edition</label>
        <select
          name="editionId"
          defaultValue={defaultEditionId || ''}
          required
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border"
        >
          <option value="">Select edition</option>
          {editions.map((e) => (
            <option key={e.id} value={e.id}>
              {e.programme.name} — {e.editionTitle} ({e.deliveryFormat}) — {e.startDate ? new Date(e.startDate).toLocaleDateString('ro-RO') : 'TBD'}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Name</label>
          <input name="contactName" defaultValue={defaultValues?.contactName || ''} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input name="contactEmail" type="email" defaultValue={defaultValues?.contactEmail || ''} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
          <input name="contactPhone" defaultValue={defaultValues?.contactPhone || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Participant Count</label>
          <input name="participantCount" type="number" min={1} defaultValue={defaultValues?.participantCount || 1} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Entity Type</label>
          <select name="entityType" defaultValue={defaultValues?.entityType || 'INDIVIDUAL'} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
            {Object.values(EntityType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Entity Name</label>
          <input name="entityName" defaultValue={defaultValues?.entityName || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CUI / Tax ID</label>
          <input name="cui" defaultValue={defaultValues?.cui || ''} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Status</label>
          <select name="paymentStatus" defaultValue={defaultValues?.paymentStatus || 'PENDING'} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
            {Object.values(PaymentStatus).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea name="notes" defaultValue={defaultValues?.notes || ''} rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
      </div>

      <input type="hidden" name="participantsJson" value="[]" />

      <div className="pt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{submitLabel}</button>
      </div>
    </form>
  )
}
