import { notFound } from 'next/navigation'
import { getProgramme, updateProgramme, getProgrammeEditOptions } from '@/app/admin/actions/cms'
import { ProgrammeForm } from './programme-form'

export default async function EditProgrammePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [programme, options] = await Promise.all([getProgramme(id), getProgrammeEditOptions()])
  if (!programme) notFound()

  const update = updateProgramme.bind(null, id)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Programme</h2>
      <ProgrammeForm programme={programme} options={options} action={update} />
    </div>
  )
}
