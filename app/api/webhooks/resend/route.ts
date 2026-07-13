import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import type { EmailEventType } from '@prisma/client'

const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET

const EVENT_MAP: Record<string, EmailEventType> = {
  'email.delivered': 'DELIVERED',
  'email.opened': 'OPENED',
  'email.clicked': 'CLICKED',
  'email.bounced': 'BOUNCED',
  'email.complained': 'COMPLAINED',
  'email.unsubscribed': 'UNSUBSCRIBED',
}

function verifySignature(payload: string, signatureHeader: string | null): boolean {
  if (!WEBHOOK_SECRET || !signatureHeader) return false
  const [timestamp, signature] = signatureHeader.split(',')
  if (!timestamp || !signature) return false
  const expected = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(`${timestamp}.${payload}`)
    .digest('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const signatureHeader = req.headers.get('resend-signature') ?? req.headers.get('Resend-Signature')

  if (WEBHOOK_SECRET && !verifySignature(payload, signatureHeader)) {
    console.warn('Resend webhook signature verification failed')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let event: any
  try {
    event = JSON.parse(payload)
  } catch (err) {
    console.error('Invalid Resend webhook payload:', err)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const eventType = EVENT_MAP[event.type]
  if (!eventType) {
    console.log(`Unhandled Resend event type: ${event.type}`)
    return NextResponse.json({ received: true })
  }

  const resendId = event.data?.id
  const recipient = event.data?.to?.[0]
  const occurredAt = event.created_at ? new Date(event.created_at) : new Date()

  try {
    if (resendId) {
      const email = await prisma.email.findUnique({ where: { resendId } })
      if (email) {
        await prisma.emailEvent.create({
          data: {
            emailId: email.id,
            type: eventType,
            occurredAt,
            data: event.data ?? {},
          },
        })
      } else {
        console.warn(`Resend webhook: email with resendId ${resendId} not found`)
      }
    } else {
      console.warn('Resend webhook: no email id in payload')
    }
  } catch (err) {
    console.error('Failed to store Resend webhook event:', err)
    return NextResponse.json({ error: 'Failed to store event' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
