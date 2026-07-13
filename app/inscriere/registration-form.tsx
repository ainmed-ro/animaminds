'use client'

import { useState, useActionState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { EntityType, DeliveryFormat } from '@prisma/client'
import { submitPublicRegistration } from '@/app/admin/actions/cms'
import type { getPublicEditions, getPublicEditionsByProgramme, getPublicProgramme } from '@/app/admin/actions/cms'

type Edition = Awaited<ReturnType<typeof getPublicEditions>>[number]
type Programme = Awaited<ReturnType<typeof getPublicProgramme>>

interface Props {
  editions: Edition[]
  defaultEditionId?: string
  programme?: Programme | null
}

const entityTypeLabels: Record<EntityType, string> = {
  INDIVIDUAL: 'Persoană fizică',
  PFA: 'PFA',
  SRL: 'SRL',
  MEDICAL_PRACTICE: 'Practică medicală',
  COMPANY: 'Companie',
  NGO: 'ONG',
  PUBLIC_INSTITUTION: 'Instituție publică',
}

function getCapacityHint(edition: Edition) {
  // Use edition overrides if available, otherwise use programme defaults
  const min = edition.minParticipants ?? (() => {
    switch (edition.deliveryFormat) {
      case 'ONLINE': return edition.programme.onlineMinParticipants ?? 15
      case 'ONSITE': return 15
      case 'EXPERIENCE_EDITION': return edition.programme.experienceMinParticipants ?? 20
      default: return 1
    }
  })()
  
  const max = edition.maxParticipants ?? (() => {
    switch (edition.deliveryFormat) {
      case 'ONLINE': return edition.programme.onlineMaxParticipants ?? 30
      case 'ONSITE': return edition.programme.onsiteMaxParticipants ?? 30
      case 'EXPERIENCE_EDITION': return edition.programme.experienceMaxParticipants ?? 30
      default: return 30
    }
  })()
  
  switch (edition.deliveryFormat) {
    case 'ONLINE':
      return `${min}–${max} participanți`
    case 'ONSITE':
      return `maxim ${max} participanți`
    case 'EXPERIENCE_EDITION':
      return `${min}–${max} participanți`
    default:
      return ''
  }
}

function getMinParticipants(edition: Edition) {
  return edition.minParticipants ?? (() => {
    switch (edition.deliveryFormat) {
      case 'ONLINE': return edition.programme.onlineMinParticipants ?? 15
      case 'ONSITE': return 15
      case 'EXPERIENCE_EDITION': return edition.programme.experienceMinParticipants ?? 20
      default: return 1
    }
  })()
}

function getMaxParticipants(edition: Edition) {
  return edition.maxParticipants ?? (() => {
    switch (edition.deliveryFormat) {
      case 'ONLINE': return edition.programme.onlineMaxParticipants ?? 30
      case 'ONSITE': return edition.programme.onsiteMaxParticipants ?? 30
      case 'EXPERIENCE_EDITION': return edition.programme.experienceMaxParticipants ?? 30
      default: return 30
    }
  })()
}

function getPriceText(edition: Edition) {
  // Experience Edition pricing
  if (edition.deliveryFormat === 'EXPERIENCE_EDITION') {
    return 'Prețul va fi anunțat în curând'
  }
  
  // On-site format doesn't show price - it's request-based
  if (edition.deliveryFormat === 'ONSITE') {
    return null
  }
  
  // Online pricing
  if (edition.displayPrice) {
    return edition.displayPrice.priceCode
  }
  
  return 'Preț de lansare'
}

export function PublicRegistrationForm({ editions, defaultEditionId, programme }: Props) {
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)
  const [participationMethod, setParticipationMethod] = useState<'individual' | 'organization'>('individual')
  const [selectedEditionId, setSelectedEditionId] = useState<string>(defaultEditionId || '')

  const selectedEdition = useMemo(() => editions.find((e) => e.id === selectedEditionId), [editions, selectedEditionId])

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
          value={selectedEditionId}
          onChange={(e) => setSelectedEditionId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border"
        >
          <option value="">Selectează ediția</option>
          {editions.map((e) => {
            const formatName = e.deliveryFormat === 'ONLINE' ? 'Online Live' :
                              e.deliveryFormat === 'ONSITE' ? 'La sediul instituției / organizației' :
                              'Experience Edition'
            
            const dateInfo = e.startDate ? new Date(e.startDate).toLocaleDateString('ro-RO') : ''
            const locationInfo = e.city ? ` — ${e.city}` : ''
            
            // Add hours and CPD information
            const learningInfo = []
            if (e.totalLearningHours) learningInfo.push(`${e.totalLearningHours}h`)
            if (e.cpdCredits) learningInfo.push(`${e.cpdCredits} CPD`)
            
            const learningInfoText = learningInfo.length > 0 ? ` [${learningInfo.join(', ')}]` : ''
            
            const label = `${e.programme.name} — ${e.editionTitle} (${formatName})${dateInfo ? ` — ${dateInfo}` : ''}${locationInfo}${learningInfoText}`
            return (
              <option key={e.id} value={e.id}>{label}</option>
            )
          })}
        </select>
      </div>

      {selectedEdition && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Detalii ediție</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Program:</span> {selectedEdition.programme.name}</p>
            <p><span className="font-medium">Ediție:</span> {selectedEdition.editionTitle}</p>
            <p><span className="font-medium">Format:</span> {
              selectedEdition.deliveryFormat === 'ONLINE' ? 'Online Live' :
              selectedEdition.deliveryFormat === 'ONSITE' ? 'La sediul instituției / organizației' :
              'Experience Edition'
            }</p>
            {selectedEdition.startDate && (
              <p><span className="font-medium">Data:</span> {new Date(selectedEdition.startDate).toLocaleDateString('ro-RO')}</p>
            )}
            {selectedEdition.endDate && selectedEdition.startDate && selectedEdition.endDate !== selectedEdition.startDate && (
              <p><span className="font-medium">Până la:</span> {new Date(selectedEdition.endDate).toLocaleDateString('ro-RO')}</p>
            )}
            {selectedEdition.city && <p><span className="font-medium">Locație:</span> {selectedEdition.city}</p>}
            
            {/* Learning information */}
            {(selectedEdition.contactHours || selectedEdition.individualActivitiesHours || selectedEdition.totalLearningHours || selectedEdition.cpdCredits) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedEdition.contactHours && (
                  <span className="text-xs bg-white px-2 py-1 rounded border">
                    Contact: {selectedEdition.contactHours}h
                  </span>
                )}
                {selectedEdition.individualActivitiesHours && (
                  <span className="text-xs bg-white px-2 py-1 rounded border">
                    Individual: {selectedEdition.individualActivitiesHours}h
                  </span>
                )}
                {selectedEdition.totalLearningHours && (
                  <span className="text-xs bg-white px-2 py-1 rounded border">
                    Total: {selectedEdition.totalLearningHours}h
                  </span>
                )}
                {selectedEdition.cpdCredits && (
                  <span className="text-xs bg-white px-2 py-1 rounded border">
                    CPD: {selectedEdition.cpdCredits} credite
                  </span>
                )}
              </div>
            )}
            
            {/* Format-specific information */}
            {selectedEdition.deliveryFormat === 'ONLINE' && selectedEdition.sessionDates && selectedEdition.sessionDates.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Sesiuni online:</p>
                <ul className="list-disc list-inside text-xs">
                  {selectedEdition.sessionDates.map((date: Date, index: number) => (
                    <li key={index}>{date.toLocaleDateString('ro-RO')} {selectedEdition.startTime || 'Ora 18:00'}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedEdition.deliveryFormat === 'EXPERIENCE_EDITION' && (
              <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                <p className="font-medium text-yellow-800">Experience Edition</p>
                <p className="text-yellow-700">Prețul va fi anunțat în curând. Vei fi contactat pentru detalii.</p>
              </div>
            )}
            
            {selectedEdition.deliveryFormat === 'ONSITE' && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                <p className="font-medium text-blue-800">La sediul instituției / organizației</p>
                <p className="text-blue-700">Programul se poate livra la sediul beneficiarului sau într-o locație agreată.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Modalitate de participare</label>
        <select
          value={participationMethod}
          onChange={(e) => setParticipationMethod(e.target.value as 'individual' | 'organization')}
          className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border"
        >
          <option value="individual">Înscriere individuală</option>
          <option value="organization">Instituție / organizație beneficiară</option>
        </select>
      </div>

      {participationMethod === 'individual' ? (
        <input type="hidden" name="entityType" value="INDIVIDUAL" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tip entitate</label>
            <select name="entityType" defaultValue="COMPANY" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              {Object.values(EntityType).filter((t) => t !== 'INDIVIDUAL').map((t) => (
                <option key={t} value={t}>{entityTypeLabels[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Organizație / Companie</label>
            <input name="entityName" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
      )}

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
          <input
            key={selectedEditionId || 'none'}
            name="participantCount"
            type="number"
            min={selectedEdition ? getMinParticipants(selectedEdition) : 1}
            max={selectedEdition ? getMaxParticipants(selectedEdition) : undefined}
            defaultValue={selectedEdition ? getMinParticipants(selectedEdition) : 1}
            required
            className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border"
          />
          {selectedEdition && (
            <p className="mt-1 text-xs text-gray-500">Grup: {getCapacityHint(selectedEdition)}</p>
          )}
          {selectedEdition && getPriceText(selectedEdition) && (
            <p className="mt-1 text-xs font-semibold" style={{ color: '#A0715A' }}>{getPriceText(selectedEdition)}</p>
          )}
        </div>
      </div>

      {participationMethod === 'organization' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">CUI / Tax ID</label>
          <input name="cui" className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
        </div>
      )}

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
