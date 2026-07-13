import { getCampaignStats } from '@/app/admin/actions/emails'
import Link from 'next/link'

export const metadata = { title: 'Campaign Analytics | AnimaMinds CMS' }

export default async function CampaignAnalyticsPage() {
  const { emails, events } = await getCampaignStats()

  const emailTypeOrder = ['ADMIN_CONTACT', 'ADMIN_REGISTRATION', 'PARTICIPANT_CONFIRMATION', 'DAILY_SUMMARY', 'WEEKLY_SUMMARY'] as const
  const eventTypeOrder = ['DELIVERED', 'OPENED', 'CLICKED', 'BOUNCED', 'COMPLAINED', 'UNSUBSCRIBED'] as const

  const emailByType = (type: string) => emails.find((e: any) => e.type === type)?._count?.id ?? 0
  const eventByType = (type: string) => events.find((e: any) => e.type === type)?._count?.id ?? 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
        <Link href="/admin/emails" className="text-sm text-blue-600 hover:underline">← Back to Email Activity</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Emails by Type</h2>
          <div className="space-y-3">
            {emailTypeOrder.map((type) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{type}</span>
                <span className="text-sm font-bold text-gray-900">{emailByType(type)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Events by Type</h2>
          <div className="space-y-3">
            {eventTypeOrder.map((type) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{type}</span>
                <span className="text-sm font-bold text-gray-900">{eventByType(type)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
