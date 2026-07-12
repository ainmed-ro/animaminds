import { createProgramme, getProgrammeEditOptions } from '@/app/admin/actions/cms'
import { ProgrammeForm } from '../[id]/programme-form'

export default async function NewProgrammePage() {
  const options = await getProgrammeEditOptions()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">New Programme</h2>
      <ProgrammeForm programme={null} options={options} action={createProgramme} />
    </div>
  )
}
