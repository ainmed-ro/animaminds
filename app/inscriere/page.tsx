import { notFound } from 'next/navigation'
import { getOpenEditionsForRegistration } from '@/app/admin/actions/cms'
import { PublicRegistrationForm } from './registration-form'

export default async function InscrierePage({ searchParams }: { searchParams: Promise<{ editionId?: string }> }) {
  const { editionId } = await searchParams
  const editions = await getOpenEditionsForRegistration()

  if (editionId && !editions.find((e) => e.id === editionId)) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <PublicRegistrationForm editions={editions} defaultEditionId={editionId} />
    </div>
  )
}
