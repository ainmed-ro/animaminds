import Link from 'next/link'
import { getProgrammes, deleteProgramme } from '@/app/admin/actions/cms'

export default async function ProgrammesPage() {
  const programmes = await getProgrammes()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Programmes</h2>
        <Link
          href="/admin/programmes/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          New Programme
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learning Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indiv. Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hrs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPD</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Audiences</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {programmes.map((programme) => (
              <tr key={programme.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{programme.programmeCode}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{programme.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.learningHours ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.contactHours ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.individualActivitiesHours ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.totalLearningHours ?? '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.cpdCredits ?? '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {programme.availableDeliveryFormats.map((f) => (
                    <span key={f} className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-700 mr-1">{f}</span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{programme.editions.length}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {programme.targetAudiences.map((ta) => ta.targetAudience.name).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <Link href={`/admin/programmes/${programme.id}`} className="text-blue-600 hover:text-blue-900">
                    Edit
                  </Link>
                  <form action={deleteProgramme.bind(null, programme.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
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
