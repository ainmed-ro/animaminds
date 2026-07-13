import { notFound } from 'next/navigation'
import { getPublicEditions, getPublicEditionsByProgramme, getPublicProgramme } from '@/app/admin/actions/cms'
import { PublicRegistrationForm } from './registration-form'

export default async function InscrierePage({ searchParams }: { searchParams: Promise<{ editionId?: string; programmeSlug?: string }> }) {
  // Force deployment - make live site match code
  const { editionId, programmeSlug } = await searchParams
  
  // Get editions - filtered by programme if specified
  let editions = programmeSlug
    ? await getPublicEditionsByProgramme(programmeSlug)
    : await getPublicEditions()

  // If no editions found for specific programme, fall back to all editions
  if (editions.length === 0 && programmeSlug) {
    editions = await getPublicEditions()
  }

  // Validate that the requested edition exists and belongs to the right programme
  if (editionId) {
    const requestedEdition = editions.find((e) => e.id === editionId)
    if (!requestedEdition || (programmeSlug && requestedEdition.programme.slug !== programmeSlug)) {
      notFound()
    }
  }

  // Get programme information if programmeSlug is provided
  let programme = null
  if (programmeSlug) {
    programme = await getPublicProgramme(programmeSlug)
    if (!programme) {
      notFound()
    }
  }

  if (editions.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {programme ? `Înscriere - ${programme.name}` : 'Înscriere'}
        </h1>
        <p className="text-gray-600">
          {programme 
            ? `Momentan nu există ediții deschise pentru ${programme.name}. Te rugăm să ne contactezi.`
            : 'Momentan nu există ediții deschise. Te rugăm să ne contactezi.'
          }
        </p>
        <a href="/contact" className="mt-4 inline-block text-blue-600 hover:underline">Contactează-ne</a>
        {programme && (
          <div className="mt-6">
            <a href={`/programe/${programme.slug}`} className="inline-block text-blue-600 hover:underline">
              ← Înapoi la {programme.name}
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <PublicRegistrationForm 
        editions={editions} 
        defaultEditionId={editionId}
        programme={programme}
      />
    </div>
  )
}
