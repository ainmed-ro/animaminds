import { getEmailStats, getRecentEmails } from '@/app/admin/actions/emails'
import Link from 'next/link'

export const metadata = { title: 'Email Activity | AnimaMinds CMS' }

export default async function EmailActivityPage() {
  const stats = await getEmailStats(30)
  const emails = await getRecentEmails(50)

  const eventTypes = ['DELIVERED', 'OPENED', 'CLICKED', 'BOUNCED', 'COMPLAINED', 'UNSUBSCRIBED'] as const

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Email Activity</h1>
        <div className="flex gap-3">
          <Link href="/admin/emails/campaigns" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Campaign Analytics
          </Link>
          <Link href="/admin/emails/contacts" className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Contact Activity
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Sent" value={stats.totalSent} />
        <StatCard label="Failed" value={stats.totalFailed} />
        <StatCard label="Delivered" value={stats.delivered} />
        <StatCard label="Opened" value={stats.opened} />
        <StatCard label="Clicked" value={stats.clicked} />
        <StatCard label="Bounced" value={stats.bounced} />
        <StatCard label="Complaints" value={stats.complained} />
        <StatCard label="Unsubscribed" value={stats.unsubscribed} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Emails</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emails.map((email) => (
                <tr key={email.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{email.recipient}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{email.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${email.status === 'SENT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {eventTypes.map((t) => email.events.some((e: any) => e.type === t) ? t[0] : '.').join(' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(email.sentAt).toLocaleString('ro-RO')}</td>
                </tr>
              ))}
              {emails.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No emails recorded yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
