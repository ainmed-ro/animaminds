import Link from 'next/link'
import { getOpenEditionsForRegistration } from '@/app/admin/actions/cms'

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
  const editions = await getOpenEditionsForRegistration()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Calendar Ediții</h1>
      {editions.length === 0 ? (
        <p className="text-gray-600">Nu există ediții deschise momentan.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {editions.map((edition) => {
            const status =
              edition.status === 'CANCELLED'
                ? 'Anulată'
                : edition.availableSeats !== null && edition.availableSeats <= 0
                  ? 'Sold out'
                  : edition.registrationDeadline && new Date(edition.registrationDeadline) < new Date()
                    ? 'Înscrieri închise'
                    : 'Deschis'

            return (
              <div key={edition.id} data-testid="edition-card" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">{edition.programme.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{edition.editionTitle}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Format:</span> {edition.deliveryFormat}</p>
                  {edition.startDate && (
                    <p><span className="font-medium">Data:</span> {new Date(edition.startDate).toLocaleDateString('ro-RO')}</p>
                  )}
                  {edition.endDate && edition.startDate && edition.endDate !== edition.startDate && (
                    <p><span className="font-medium">Până la:</span> {new Date(edition.endDate).toLocaleDateString('ro-RO')}</p>
                  )}
                  {edition.city && <p><span className="font-medium">Locație:</span> {edition.city}</p>}
                  {edition.maxSeats !== null && (
                    <p><span className="font-medium">Locuri:</span> {edition.availableSeats ?? edition.maxSeats} / {edition.maxSeats} disponibile</p>
                  )}
                  {edition.registrationDeadline && (
                    <p><span className="font-medium">Deadline:</span> {new Date(edition.registrationDeadline).toLocaleDateString('ro-RO')}</p>
                  )}
                  {edition.displayPrice && (
                    <p><span className="font-medium">Preț:</span> {(edition.displayPrice.amount ?? 0) / 100} {edition.displayPrice.currency}</p>
                  )}
                </div>
                <div className="mt-4">
                  <span data-testid="edition-status" className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    status === 'Deschis' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status}
                  </span>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/inscriere?editionId=${edition.id}`}
                    data-testid="register-link"
                    className={`inline-block px-4 py-2 rounded-md text-sm font-medium ${
                      status === 'Deschis'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    {status === 'Deschis' ? 'Înscrie-te' : 'Înscrieri închise'}
                  </Link>
                  </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
