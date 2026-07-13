import { getContactActivity } from '@/app/admin/actions/emails'
import Link from 'next/link'

export const metadata = { title: 'Contact Activity | AnimaMinds CMS' }

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function ContactActivityPage({ searchParams }: Props) {
  const { email } = await searchParams
  let activity: Awaited<ReturnType<typeof getContactActivity>> | null = null
  if (email) {
    activity = await getContactActivity(email)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Contact Activity</h1>
        <Link href="/admin/emails" className="text-sm text-blue-600 hover:underline">← Back to Email Activity</Link>
      </div>

      <form action="/admin/emails/contacts" method="GET" className="flex gap-3 max-w-xl">
        <input
          type="email"
          name="email"
          defaultValue={email}
          placeholder="Search by email address..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          Search
        </button>
      </form>

      {activity && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard label="Email Sent" value={activity.sent} />
            <StatCard label="Delivered" value={activity.delivered} />
            <StatCard label="Opened" value={activity.opened} />
            <StatCard label="Clicked" value={activity.clicked} />
            <StatCard label="Last Activity" value={activity.lastActivity ? new Date(activity.lastActivity).toLocaleString('ro-RO') : '—'} />
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Emails for {activity.email}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activity.emails.map((e: any) => (
                    <tr key={e.id}>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-sm truncate">{e.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{e.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(e.sentAt).toLocaleString('ro-RO')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {e.events.map((ev: any) => ev.type).join(', ') || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!activity && email && (
        <p className="text-gray-500">No activity found for {email}.</p>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
