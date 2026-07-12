'use client'

import { useState, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { EntityType } from '@prisma/client'
import { submitPublicRegistration } from '@/app/admin/actions/cms'
import type { getOpenEditionsForRegistration } from '@/app/admin/actions/cms'

type Edition = Awaited<ReturnType<typeof getOpenEditionsForRegistration>>[number]

interface Props {
  editions: Edition[]
  defaultEditionId?: string
}

export function PublicRegistrationForm({ editions, defaultEditionId }: Props) {
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)

  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => {
      try {
        await submitPublicRegistration(formData)
        router.push('/calendar?success=1')
        return { success: true }
      } catch (err: any) {
        setMessage(err.message || 'A apărut o eroare. Încercați din nou.')
        return { success: false }
      }
    },
    { success: false }
  )

  return (
    <form action={formAction} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Înscriere</h1>

      {message && (
        <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">{message}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Ediție</label>
        <select
          name="editionId"
          defaultValue={defaultEditionId || ''}
          required
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border"
        >
          <option value="">Selectează ediția</option>
          {editions.map((e) => {
            const label = `${e.programme.name} — ${e.editionTitle} (${e.deliveryFormat})${e.city ? ` — ${e.city}` : ''}`
            return (
              <option key={e.id} value={e.id}>{label}</option>
            )
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nume și prenume</label>
          <input name="contactName" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="contactEmail" type="email" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <input name="contactPhone" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Număr participanți</label>
          <input name="participantCount" type="number" min={1} defaultValue={1} required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tip entitate</label>
          <select name="entityType" defaultValue="INDIVIDUAL" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
            {Object.values(EntityType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Organizație / Companie</label>
          <input name="entityName" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CUI / Tax ID</label>
        <input name="cui" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observații</label>
        <textarea name="notes" rows={3} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" name="gdprConsent" value="true" required className="mt-1" />
        <label className="text-sm text-gray-600">
          Sunt de acord cu prelucrarea datelor personale conform politicii de confidențialitate și primesc informații despre programele AnimaMinds.
        </label>
      </div>

      <input type="hidden" name="participantsJson" value="[]" />

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? 'Se trimite...' : 'Trimite înscrierea'}
      </button>
    </form>
  )
}
