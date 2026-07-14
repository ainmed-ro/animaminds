import { Resend } from 'resend'
import type { AnySubmission } from './form-types'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'AnimaMinds <noreply@animaminds.ro>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'contact@animaminds.ro'

function buildRows(submission: AnySubmission): string {
  const row = (label: string, value: string | number | undefined) =>
    value ? `<tr><td style="padding:4px 12px 4px 0;color:#666;font-size:13px;white-space:nowrap;"><b>${label}</b></td><td style="padding:4px 0;font-size:13px;color:#222;">${value}</td></tr>` : ''

  let specific = ''
  switch (submission.requestType) {
    case 'online_live_registration':
      specific = row('Program', submission.programmeName) + row('Format', submission.format) + row('Date', submission.dates) + row('Preț', `${submission.price} lei`) + row('CPD', `${submission.cpdCredits} credite`)
      break
    case 'experience_edition_reservation':
      specific = row('Program', submission.programmeName) + row('Format', submission.format) + row('Ediție', submission.selectedEdition) + row('Cameră', submission.selectedRoomType) + row('Preț', `${submission.price} lei`) + row('Locație', submission.location)
      break
    case 'organisation_request':
      specific = row('Program', submission.programmeName) + row('Format', submission.format) + row('Organizație', submission.organizationName) + row('Tip org.', submission.organizationType) + row('Participanți', String(submission.estimatedParticipants)) + row('Buget', submission.budgetRange)
      break
    case 'contact_message':
      specific = row('Subiect', submission.subject) + row('Program interes', submission.programInteres) + row('Mesaj', submission.message?.substring(0, 300))
      break
  }

  return specific +
    row('Nume', submission.participantName) +
    row('Email', submission.participantEmail) +
    row('Telefon', submission.participantPhone) +
    row('Instituție', submission.institution) +
    row('Funcție', submission.role) +
    row('Data', new Date(submission.createdAt ?? Date.now()).toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' }))
}

export async function sendAdminNotifications(submission: AnySubmission): Promise<void> {
  if (!resend) {
    console.warn('[AdminNotify] Resend not configured')
    return
  }

  const typeLabel = submission.requestType.replace(/_/g, ' ')
  const subject = `🔔 AnimaMinds – solicitare nouă: ${typeLabel} – ${submission.participantName}`
  const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;background:#f4f4f4;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:18px 28px;">
          <p style="margin:0;color:#7C9A7E;font-size:10px;letter-spacing:4px;text-transform:uppercase;">AnimaMinds Admin</p>
          <p style="margin:6px 0 0;color:#fff;font-size:17px;font-weight:bold;">🔔 Solicitare nouă — ${typeLabel}</p>
        </td></tr>
        <tr><td style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            ${buildRows(submission)}
          </table>
          <div style="margin-top:24px;padding:12px 16px;background:#f0f7f0;border-left:4px solid #1C2B1E;border-radius:4px;">
            <p style="margin:0;font-size:12px;color:#555;">Verifică înregistrarea în <a href="https://animaminds.ro/admin" style="color:#1C2B1E;">panoul de administrare</a>.</p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  try {
    const res = await resend.emails.send({ from: FROM_EMAIL, to: [ADMIN_EMAIL], subject, html })
    if (res.error) console.error('[AdminNotify] Resend error:', res.error)
    else console.log('[AdminNotify] Admin email sent, id:', res.data?.id)
  } catch (err) {
    console.error('[AdminNotify] Failed to send admin email:', err)
  }
}
