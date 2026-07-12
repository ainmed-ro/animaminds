import { notFound } from 'next/navigation'
import { getOpenEditionsForRegistration } from '@/app/admin/actions/cms'
import { PublicRegistrationForm } from './registration-form'

export default async function InscrierePage({ searchParams }: { searchParams: Promise<{ editionId?: string; programme?: string }> }) {
  const { editionId, programme } = await searchParams
  let editions = await getOpenEditionsForRegistration()

  if (programme) {
    editions = editions.filter((e) => e.programme.slug === programme)
  }

  if (editionId && !editions.find((e) => e.id === editionId)) {
    notFound()
  }

  if (editions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Înscriere</h1>
        <p className="text-gray-600">Momentan nu există ediții deschise pentru acest program. Te rugăm să ne contactezi.</p>
        <a href="/contact" className="mt-4 inline-block text-blue-600 hover:underline">Contactează-ne</a>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <PublicRegistrationForm editions={editions} defaultEditionId={editionId} />
    </div>
  )
}
