import Link from 'next/link'
import { DeliveryFormat } from '@prisma/client'
import { getPublicEditions } from '@/app/admin/actions/cms'

export const dynamic = 'force-dynamic'

// Helper function to get effective capacity for an edition
function getEffectiveCapacity(edition: any) {
  // Use edition overrides if available, otherwise use programme defaults
  const min = edition.minParticipants ?? (() => {
    switch (edition.deliveryFormat) {
      case 'ONLINE': return edition.programme.onlineMinParticipants ?? 15
      case 'ONSITE': return 15
      case 'EXPERIENCE_EDITION': return edition.programme.experienceMinParticipants ?? 20
      default: return null
    }
  })()
  
  const max = edition.maxParticipants ?? (() => {
    switch (edition.deliveryFormat) {
      case 'ONLINE': return edition.programme.onlineMaxParticipants ?? 30
      case 'ONSITE': return edition.programme.onsiteMaxParticipants ?? 30
      case 'EXPERIENCE_EDITION': return edition.programme.experienceMaxParticipants ?? 30
      default: return null
    }
  })()
  
  if (min != null && max != null) return `${min}–${max} participanți`
  if (max != null) return `max ${max} participanți`
  return ''
}

// Helper function to get pricing information for Experience Edition
function getPricingText(edition: any) {
  if (edition.deliveryFormat === 'EXPERIENCE_EDITION') {
    return 'Prețul va fi anunțat în curând'
  }
  
  if (edition.displayPrice) {
    return edition.displayPrice.priceCode
  }
  
  return 'Preț de lansare'
}

export default async function CalendarPage() {
  // Force deployment - registration UX fixes
  const editions = await getPublicEditions()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Calendar Ediții</h1>
      {editions.length === 0 ? (
        <p className="text-gray-600">Nu există ediții deschise momentan.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {editions.map((edition) => {
            const status =
              edition.availableSeats !== null && edition.availableSeats <= 0
                ? 'Sold out'
                : edition.registrationDeadline && new Date(edition.registrationDeadline) < new Date()
                  ? 'Înscrieri închise'
                  : 'Deschis'

            return (
              <div key={edition.id} data-testid="edition-card" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">{edition.programme.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{edition.editionTitle}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Format:</span> {
                    edition.deliveryFormat === 'ONLINE' ? 'Online Live' :
                    edition.deliveryFormat === 'ONSITE' ? 'La sediul instituției / organizației' :
                    'Experience Edition'
                  }</p>
                  {edition.startDate && (
                    <p><span className="font-medium">Data:</span> {new Date(edition.startDate).toLocaleDateString('ro-RO')}</p>
                  )}
                  {edition.endDate && edition.startDate && edition.endDate !== edition.startDate && (
                    <p><span className="font-medium">Până la:</span> {new Date(edition.endDate).toLocaleDateString('ro-RO')}</p>
                  )}
                  {edition.city && <p><span className="font-medium">Locație:</span> {edition.city}</p>}
                  <p><span className="font-medium">Capacitate:</span> {getEffectiveCapacity(edition)}</p>
                  {edition.maxSeats !== null && (
                    <p><span className="font-medium">Locuri disponibile:</span> {edition.availableSeats ?? edition.maxSeats} / {edition.maxSeats}</p>
                  )}
                  {edition.registrationDeadline && (
                    <p><span className="font-medium">Deadline:</span> {new Date(edition.registrationDeadline).toLocaleDateString('ro-RO')}</p>
                  )}
                  {(edition.contactHours || edition.totalLearningHours || edition.cpdCredits) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {edition.contactHours && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Contact: {edition.contactHours}h
                        </span>
                      )}
                      {edition.individualActivitiesHours && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Individual: {edition.individualActivitiesHours}h
                        </span>
                      )}
                      {edition.totalLearningHours && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Total: {edition.totalLearningHours}h
                        </span>
                      )}
                      {edition.cpdCredits && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          CPD: {edition.cpdCredits} credite
                        </span>
                      )}
                    </div>
                  )}
                  <p className="font-medium mt-2">{getPricingText(edition)}</p>
                </div>
                <div className="mt-4">
                  <span data-testid="edition-status" className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    status === 'Deschis' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="mt-4">
                  {edition.deliveryFormat === 'ONSITE' ? (
                    <Link
                      href={`/colaboreaza?programme=${edition.programme.slug}`}
                      data-testid="request-link"
                      className="inline-block px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Solicită ofertă
                    </Link>
                  ) : (
                    <Link
                      href={`/inscriere?editionId=${edition.id}&programmeSlug=${edition.programme.slug}`}
                      data-testid="register-link"
                      className={`inline-block px-4 py-2 rounded-md text-sm font-medium ${
                        status === 'Deschis'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      {status === 'Deschis' ? 'Înscrie-te' : 'Înscrieri închise'}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
