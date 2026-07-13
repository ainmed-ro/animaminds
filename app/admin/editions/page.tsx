import Link from 'next/link'
import { getEditions, deleteEdition } from '@/app/admin/actions/cms'

export default async function EditionsPage() {
  const editions = await getEditions()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Editions</h2>
        <Link href="/admin/editions/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Edition
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Programme</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Indiv. Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPD</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registrations</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {editions.map((edition) => (
              <tr key={edition.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{edition.editionTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.programme?.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.deliveryFormat}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.status}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {edition.startDate && new Date(edition.startDate).toLocaleDateString('ro-RO')}
                  {edition.endDate && ` – ${new Date(edition.endDate).toLocaleDateString('ro-RO')}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.contactHours ?? '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.individualActivitiesHours ?? '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.totalLearningHours ?? '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.cpdCredits ?? '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {(() => {
                    const min = edition.minParticipants ?? (() => {
                      switch (edition.deliveryFormat) {
                        case 'ONLINE': return edition.programme?.onlineMinParticipants ?? 15
                        case 'ONSITE': return 15
                        case 'EXPERIENCE_EDITION': return edition.programme?.experienceMinParticipants ?? 20
                        default: return null
                      }
                    })()
                    const max = edition.maxParticipants ?? (() => {
                      switch (edition.deliveryFormat) {
                        case 'ONLINE': return edition.programme?.onlineMaxParticipants ?? 30
                        case 'ONSITE': return edition.programme?.onsiteMaxParticipants ?? 30
                        case 'EXPERIENCE_EDITION': return edition.programme?.experienceMaxParticipants ?? 30
                        default: return null
                      }
                    })()
                    if (min != null && max != null) return `${min}–${max}`
                    if (max != null) return `max ${max}`
                    return '—'
                  })()}
                  {edition.maxSeats && ` / ${edition.maxSeats} seats`}
                  {edition.availableSeats !== null && edition.maxSeats !== null && ` (${edition.availableSeats} available)`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{(edition as any)._count?.registrations || 0}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {edition.registrationDeadline ? new Date(edition.registrationDeadline).toLocaleDateString('ro-RO') : '—'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{edition.displayPrice?.priceCode || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/editions/${edition.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <form action={deleteEdition.bind(null, edition.id)} className="inline">
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
