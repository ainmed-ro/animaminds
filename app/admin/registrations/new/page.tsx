import { createRegistration, getOpenEditionsForRegistration } from '@/app/admin/actions/cms'
import { RegistrationForm } from '../[id]/registration-form'

export default async function NewRegistrationPage() {
  const editions = await getOpenEditionsForRegistration()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">New Registration</h2>
      <RegistrationForm editions={editions} action={createRegistration} submitLabel="Create Registration" />
    </div>
  )
}
