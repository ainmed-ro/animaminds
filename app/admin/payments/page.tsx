'use client'

import { useEffect, useState, useCallback } from 'react'

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? 'animaminds-admin-2026'

type PaymentStatus = 'NEACHITAT' | 'PLATĂ ÎN AȘTEPTARE' | 'ACHITAT' | 'ANULAT' | 'RAMBURSAT'

interface Registration {
  id: string
  requestType: string
  created_at: string
  payment_status?: PaymentStatus
  status?: string
  name?: string
  requester_name?: string
  contact_name?: string
  organization_name?: string
  email?: string
  contact_email?: string
  phone?: string
  contact_phone?: string
  programme?: string
  programme_requested?: string
  programme_interest?: string
  format?: string
  delivery_format_preference?: string
  price?: number
  accommodation?: string
  preferred_period?: string
  estimated_group_size?: number
  participant_count_estimate?: number
  dates?: string
}

const STATUS_COLORS: Record<PaymentStatus, string> = {
  'NEACHITAT': 'bg-red-100 text-red-700',
  'PLATĂ ÎN AȘTEPTARE': 'bg-yellow-100 text-yellow-700',
  'ACHITAT': 'bg-green-100 text-green-700',
  'ANULAT': 'bg-gray-100 text-gray-500',
  'RAMBURSAT': 'bg-blue-100 text-blue-700',
}

const TYPE_LABELS: Record<string, string> = {
  online_live_registration: 'Online Live',
  experience_edition_reservation: 'Experience Edition',
  organisation_request: 'Organizație',
  private_group_request: 'Grup Privat',
}

function getName(r: Registration): string {
  return r.name ?? r.requester_name ?? r.contact_name ?? '—'
}

function getEmail(r: Registration): string {
  return r.email ?? r.contact_email ?? '—'
}

function getPhone(r: Registration): string {
  return r.phone ?? r.contact_phone ?? '—'
}

function getProgramme(r: Registration): string {
  return r.programme ?? r.programme_requested ?? r.programme_interest ?? '—'
}

function getFormat(r: Registration): string {
  if (r.requestType === 'online_live_registration') return 'Online Live'
  if (r.requestType === 'experience_edition_reservation') return `Experience Edition™ – ${r.accommodation ?? ''}`
  if (r.requestType === 'organisation_request') return r.delivery_format_preference ?? 'Organizație'
  if (r.requestType === 'private_group_request') return 'Grup Privat'
  return '—'
}

function getAmount(r: Registration): number {
  if (r.requestType === 'online_live_registration') return r.price ?? 199
  if (r.requestType === 'experience_edition_reservation') return r.price ?? 1200
  if (r.requestType === 'organisation_request') return r.price ?? 3500
  return 0
}

export default function PaymentsAdminPage() {
  const [rows, setRows] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [confirming, setConfirming] = useState<string | null>(null)
  const [message, setMessage] = useState<string>('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/registrations?secret=${ADMIN_SECRET}`)
      const json = await res.json()
      setRows(json.registrations ?? [])
    } catch {
      setMessage('Eroare la încărcarea datelor.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function confirmPayment(r: Registration) {
    setConfirming(r.id)
    setMessage('')
    try {
      const res = await fetch('/api/admin/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: ADMIN_SECRET,
          id: r.id,
          requestType: r.requestType,
          participantName: getName(r),
          participantEmail: getEmail(r),
          programmeName: getProgramme(r),
          format: getFormat(r),
          amount: getAmount(r),
        }),
      })
      const json = await res.json()
      if (json.success) {
        setMessage(`✅ Plată confirmată pentru ${getName(r)}. Email trimis.`)
        setRows(prev => prev.map(row => row.id === r.id ? { ...row, payment_status: 'ACHITAT' } : row))
      } else {
        setMessage(`❌ Eroare: ${json.error}`)
      }
    } catch {
      setMessage('❌ Eroare de rețea.')
    } finally {
      setConfirming(null)
    }
  }

  const filtered = filter === 'all' ? rows : filter === 'neachitat' ? rows.filter(r => r.payment_status !== 'ACHITAT' && r.requestType !== 'contact_message') : rows.filter(r => r.requestType === filter)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Panou Plăți — AnimaMinds</h1>
          <p className="text-sm text-gray-500 mt-1">Gestionează statusurile de plată pentru toate înregistrările</p>
        </div>

        {message && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${message.startsWith('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="flex gap-2 mb-4 flex-wrap">
          {[
            { key: 'all', label: 'Toate' },
            { key: 'neachitat', label: 'Neachitate' },
            { key: 'online_live_registration', label: 'Online Live' },
            { key: 'experience_edition_reservation', label: 'Experience Edition' },
            { key: 'organisation_request', label: 'Organizații' },
            { key: 'private_group_request', label: 'Grupuri Private' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === key ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {label}
            </button>
          ))}
          <button onClick={load} className="ml-auto px-3 py-1.5 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:bg-gray-50">
            🔄 Reîncarcă
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400">Se încarcă...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400">Nicio înregistrare găsită.</div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Data</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Tip</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Participant</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Program</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Sumă</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status Plată</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Acțiune</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString('ro-RO')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {TYPE_LABELS[r.requestType] ?? r.requestType}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{getName(r)}</td>
                    <td className="px-4 py-3 text-gray-600">{getEmail(r)}</td>
                    <td className="px-4 py-3 text-gray-700">{getProgramme(r)}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {getAmount(r) > 0 ? `${getAmount(r)} lei` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${STATUS_COLORS[r.payment_status as PaymentStatus] ?? 'bg-gray-100 text-gray-500'}`}>
                        {r.payment_status ?? 'NEACHITAT'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.payment_status !== 'ACHITAT' && r.requestType !== 'contact_message' ? (
                        <button
                          onClick={() => confirmPayment(r)}
                          disabled={confirming === r.id}
                          className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {confirming === r.id ? '...' : '✅ Marchează Achitat'}
                        </button>
                      ) : r.payment_status === 'ACHITAT' ? (
                        <span className="text-green-600 text-xs font-medium">✓ Confirmat</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400 text-center">
          Total: {filtered.length} înregistrări | AnimaMinds Admin Panel
        </p>
      </div>
    </div>
  )
}
