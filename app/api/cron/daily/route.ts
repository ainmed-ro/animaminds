import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendDailySummaryEmail } from '@/lib/notifications'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const newRegistrations = await prisma.registration.count({
    where: { createdAt: { gte: yesterday } },
  })

  // Note: contact messages are stored in Supabase, not counted here.
  // A future improvement can query Supabase or migrate contact messages to Prisma.
  const newContacts = 0

  const openEditionDeadlines = await prisma.edition.findMany({
    where: {
      registrationDeadline: { gte: yesterday, lte: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000) },
      status: { in: ['DRAFT', 'OPEN'] },
    },
    select: { editionTitle: true, registrationDeadline: true },
  })

  const upcomingEditions = await prisma.edition.count({
    where: {
      startDate: { gte: now, lte: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000) },
    },
  })

  try {
    await sendDailySummaryEmail({
      newRegistrations,
      newContacts,
      openEditionDeadlines: openEditionDeadlines.map((e) => ({
        title: e.editionTitle,
        deadline: e.registrationDeadline!,
      })),
      upcomingEditions,
    })
    return NextResponse.json({ success: true, newRegistrations, upcomingEditions })
  } catch (err) {
    console.error('Daily summary cron error:', err)
    return NextResponse.json({ error: 'Failed to send daily summary' }, { status: 500 })
  }
}
