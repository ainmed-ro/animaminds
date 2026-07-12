import { createEdition, getEditionEditOptions } from '@/app/admin/actions/cms'
import { EditionForm } from '../[id]/edition-form'

export default async function NewEditionPage() {
  const options = await getEditionEditOptions()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">New Edition</h2>
      <EditionForm edition={null} options={options} action={createEdition} />
    </div>
  )
}
