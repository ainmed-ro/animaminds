'use server'

import { prisma } from '@/lib/prisma'
import { requireAdminUser } from '@/lib/auth'
import type { EmailEventType } from '@prisma/client'

export async function getEmailStats(days = 30) {
  await requireAdminUser()
  const since = new Date()
  since.setDate(since.getDate() - days)

  const [
    totalSent,
    totalFailed,
    delivered,
    opened,
    clicked,
    bounced,
    complained,
    unsubscribed,
  ] = await Promise.all([
    prisma.email.count({ where: { createdAt: { gte: since } } }),
    prisma.email.count({ where: { createdAt: { gte: since }, status: 'FAILED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'DELIVERED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'OPENED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'CLICKED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'BOUNCED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'COMPLAINED' } }),
    prisma.emailEvent.count({ where: { occurredAt: { gte: since }, type: 'UNSUBSCRIBED' } }),
  ])

  return {
    totalSent,
    totalFailed,
    delivered,
    opened,
    clicked,
    bounced,
    complained,
    unsubscribed,
  }
}

export async function getRecentEmails(take = 100) {
  await requireAdminUser()
  return prisma.email.findMany({
    orderBy: { sentAt: 'desc' },
    take,
    include: { events: { orderBy: { occurredAt: 'asc' } } },
  })
}

export async function getEmailById(id: string) {
  await requireAdminUser()
  return prisma.email.findUnique({
    where: { id },
    include: { events: { orderBy: { occurredAt: 'asc' } } },
  })
}

export async function getEmailsByRecipient(email: string) {
  await requireAdminUser()
  return prisma.email.findMany({
    where: { recipient: { equals: email, mode: 'insensitive' } },
    orderBy: { sentAt: 'desc' },
    include: { events: { orderBy: { occurredAt: 'asc' } } },
  })
}

export async function getEmailsByRelated(relatedType: string, relatedId: string) {
  await requireAdminUser()
  return prisma.email.findMany({
    where: { relatedType, relatedId },
    orderBy: { sentAt: 'desc' },
    include: { events: { orderBy: { occurredAt: 'asc' } } },
  })
}

export async function getEventsByType(type: EmailEventType, take = 100) {
  await requireAdminUser()
  return prisma.emailEvent.findMany({
    where: { type },
    orderBy: { occurredAt: 'desc' },
    take,
    include: { email: true },
  })
}

export async function getContactActivity(email: string) {
  await requireAdminUser()
  const emails = await prisma.email.findMany({
    where: { recipient: { equals: email, mode: 'insensitive' } },
    orderBy: { sentAt: 'desc' },
    include: { events: true },
  })

  const sent = emails.length
  const delivered = emails.filter((e) => e.events.some((ev) => ev.type === 'DELIVERED')).length
  const opened = emails.filter((e) => e.events.some((ev) => ev.type === 'OPENED')).length
  const clicked = emails.filter((e) => e.events.some((ev) => ev.type === 'CLICKED')).length

  const lastEvent = emails
    .flatMap((e) => e.events)
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())[0]

  return {
    email,
    sent,
    delivered,
    opened,
    clicked,
    lastActivity: lastEvent?.occurredAt ?? (emails[0]?.sentAt ?? null),
    emails,
  }
}

export async function getCampaignStats() {
  await requireAdminUser()
  const emails = await prisma.email.groupBy({
    by: ['type'],
    _count: { id: true },
  })

  const events = await prisma.emailEvent.groupBy({
    by: ['type'],
    _count: { id: true },
  })

  return { emails, events }
}
