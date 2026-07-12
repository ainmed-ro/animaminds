import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWeeklySummaryEmail } from '@/lib/notifications'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const totalRegistrations = await prisma.registration.count()
  const newRegistrationsThisWeek = await prisma.registration.count({
    where: { createdAt: { gte: weekAgo } },
  })

  const totalContacts = 0 // Supabase contact_messages not queried here
  const newContactsThisWeek = 0

  const upcomingEditions = await prisma.edition.findMany({
    where: {
      startDate: { gte: now, lte: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) },
    },
    select: { editionTitle: true, startDate: true },
    orderBy: { startDate: 'asc' },
  })

  try {
    await sendWeeklySummaryEmail({
      totalRegistrations,
      totalContacts,
      newRegistrationsThisWeek,
      newContactsThisWeek,
      upcomingEditions: upcomingEditions.map((e) => ({ title: e.editionTitle, startDate: e.startDate })),
    })
    return NextResponse.json({ success: true, totalRegistrations, newRegistrationsThisWeek })
  } catch (err) {
    console.error('Weekly summary cron error:', err)
    return NextResponse.json({ error: 'Failed to send weekly summary' }, { status: 500 })
  }
}
