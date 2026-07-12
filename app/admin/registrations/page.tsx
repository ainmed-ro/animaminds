import Link from 'next/link'
import { getRegistrations, deleteRegistration } from '@/app/admin/actions/cms'

export default async function RegistrationsPage() {
  const registrations = await getRegistrations()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Registrations</h2>
        <Link href="/admin/registrations/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Registration
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Programme</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Edition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.map((reg) => (
              <tr key={reg.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{new Date(reg.createdAt).toLocaleDateString('ro-RO')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{reg.edition.programme.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{reg.edition.editionTitle}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{reg.contactName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{reg.contactEmail}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{Array.isArray(reg.participantsJson) ? reg.participantsJson.length : 1}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{reg.paymentStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/registrations/${reg.id}`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                  <form action={deleteRegistration.bind(null, reg.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
