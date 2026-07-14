import twilio from 'twilio'
import type { AnySubmission } from './form-types'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886'

const ADMIN_PHONES = [
  process.env.ADMIN_PHONE_1 ?? '+40761940041',
  process.env.ADMIN_PHONE_2 ?? '+40752289303',
].filter(Boolean)

function buildMessage(submission: AnySubmission): string {
  const lines: string[] = ['🔔 *AnimaMinds – solicitare nouă*', '']

  lines.push(`*Tip:* ${submission.requestType.replace(/_/g, ' ')}`)

  switch (submission.requestType) {
    case 'online_live_registration':
      lines.push(`*Program:* ${submission.programmeName}`)
      lines.push(`*Format:* ${submission.format}`)
      lines.push(`*Date:* ${submission.dates}`)
      lines.push(`*Preț:* ${submission.price} lei`)
      lines.push(`*CPD:* ${submission.cpdCredits} credite`)
      break

    case 'experience_edition_reservation':
      lines.push(`*Program:* ${submission.programmeName}`)
      lines.push(`*Format:* ${submission.format}`)
      lines.push(`*Ediție:* ${submission.selectedEdition}`)
      lines.push(`*Cameră:* ${submission.selectedRoomType}`)
      lines.push(`*Preț:* ${submission.price} lei`)
      lines.push(`*Locație:* ${submission.location}`)
      break

    case 'organisation_request':
      lines.push(`*Program:* ${submission.programmeName}`)
      lines.push(`*Format:* ${submission.format}`)
      lines.push(`*Organizație:* ${submission.organizationName}`)
      lines.push(`*Tip org:* ${submission.organizationType}`)
      lines.push(`*Participanți:* ${submission.estimatedParticipants}`)
      if (submission.budgetRange) lines.push(`*Buget:* ${submission.budgetRange}`)
      break

    case 'private_group_request':
      lines.push(`*Program:* ${submission.programmeName}`)
      lines.push(`*Format:* ${submission.format}`)
      lines.push(`*Participanți grup:* ${submission.estimatedParticipants}`)
      break

    case 'contact_message':
      lines.push(`*Subiect:* ${submission.subject}`)
      if (submission.programInteres) lines.push(`*Program interes:* ${submission.programInteres}`)
      if (submission.message) lines.push(`*Mesaj:* ${submission.message.substring(0, 200)}`)
      break
  }

  lines.push('')
  lines.push(`*Nume:* ${submission.participantName}`)
  lines.push(`*Telefon:* ${submission.participantPhone || 'nespecificat'}`)
  lines.push(`*Email:* ${submission.participantEmail}`)
  if (submission.institution) lines.push(`*Instituție:* ${submission.institution}`)
  if (submission.role) lines.push(`*Funcție:* ${submission.role}`)
  if (submission.message && submission.requestType !== 'contact_message') {
    lines.push(`*Mesaj:* ${submission.message.substring(0, 150)}`)
  }
  lines.push('')
  lines.push(`*Data:* ${new Date(submission.createdAt ?? Date.now()).toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}`)

  return lines.join('\n')
}

async function sendWhatsApp(to: string, body: string): Promise<void> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.warn('[AdminNotify] Twilio not configured - skipping WhatsApp to', to)
    return
  }
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  const msg = await client.messages.create({
    from: TWILIO_WHATSAPP_FROM,
    to: `whatsapp:${to}`,
    body,
  })
  console.log(`[AdminNotify] WhatsApp sent to ${to}, sid: ${msg.sid}`)
}

export async function sendAdminNotifications(submission: AnySubmission): Promise<void> {
  const message = buildMessage(submission)

  await Promise.allSettled(
    ADMIN_PHONES.map(phone =>
      sendWhatsApp(phone, message).catch(err =>
        console.error(`[AdminNotify] WhatsApp failed to ${phone}:`, err?.message ?? err)
      )
    )
  )
}
