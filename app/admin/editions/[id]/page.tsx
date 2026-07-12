import { notFound } from 'next/navigation'
import { getEdition, updateEdition, getEditionEditOptions } from '@/app/admin/actions/cms'
import { EditionForm } from './edition-form'

export default async function EditEditionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [edition, options] = await Promise.all([
    getEdition(id),
    getEditionEditOptions(),
  ])
  if (!edition) notFound()

  const update = updateEdition.bind(null, id)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Edition</h2>
      <EditionForm edition={edition} options={options} action={update} />
    </div>
  )
}
