import { notFound } from 'next/navigation'
import { getPublicEditions, getPublicEditionsByProgramme, getPublicProgramme } from '@/app/admin/actions/cms'
import { PublicRegistrationForm } from './registration-form'
import ExperienceEditionForm from '@/components/ExperienceEditionForm'

export default async function InscrierePage({ searchParams }: { searchParams: Promise<{ editionId?: string; programmeSlug?: string }> }) {
  // Force deployment - make live site match code
  const { editionId, programmeSlug } = await searchParams
  
  // Get editions - only Conversații care Contează is active
  let editions = programmeSlug
    ? await getPublicEditionsByProgramme(programmeSlug)
    : await getPublicEditionsByProgramme('conversatii-care-conteaza')

  // If no editions found for specific programme, don't fall back to all editions
  // Keep editions empty to show proper "no editions available" message

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
    // Show Experience Edition form even if no editions found
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Înscriere - Conversații care Contează
          </h1>
          <p className="text-gray-600 mb-6">
            Completează formularul de mai jos pentru a te înscrie la programul Conversații care Contează.
          </p>
        </div>
        <ExperienceEditionForm />
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
