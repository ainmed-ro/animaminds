import { notFound } from 'next/navigation'
import { getRegistration, updateRegistration, getOpenEditionsForRegistration } from '@/app/admin/actions/cms'
import { RegistrationForm } from './registration-form'

export default async function EditRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [registration, editions] = await Promise.all([
    getRegistration(id),
    getOpenEditionsForRegistration(),
  ])
  if (!registration) notFound()

  const update = updateRegistration.bind(null, id)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Registration</h2>
      <RegistrationForm
        editions={editions}
        defaultEditionId={registration.editionId}
        defaultValues={{
          contactName: registration.contactName,
          contactEmail: registration.contactEmail,
          contactPhone: registration.contactPhone,
          entityType: registration.entityType,
          entityName: registration.entityName,
          cui: registration.cui,
          participantCount: Array.isArray(registration.participantsJson) ? registration.participantsJson.length : 1,
          paymentStatus: registration.paymentStatus,
          notes: registration.notes,
        }}
        action={update}
        submitLabel="Update Registration"
      />
    </div>
  )
}
