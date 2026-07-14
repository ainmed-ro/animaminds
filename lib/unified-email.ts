import { Resend } from 'resend'
import type { AnySubmission } from './form-types'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'AnimaMinds <noreply@animaminds.ro>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'contact@animaminds.ro'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://animaminds.ro'

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!resend) {
    console.error('[Email] Resend not available - RESEND_API_KEY missing')
    return
  }
  try {
    const response = await resend.emails.send({ from: FROM_EMAIL, to: [to], subject, html })
    if (response.error) {
      console.error(`[Email] Resend error to ${to}:`, response.error)
    } else {
      console.log(`[Email] Sent to ${to}, id: ${response.data?.id}`)
    }
  } catch (err) {
    console.error(`[Email] Failed to send to ${to}:`, err)
  }
}

function userSubject(submission: AnySubmission): string {
  switch (submission.requestType) {
    case 'online_live_registration':
      return `Înscriere Confirmată – ${submission.programmeName} – Online Live`
    case 'experience_edition_reservation':
      return `Rezervare Confirmată – ${submission.programmeName} – Experience Edition™`
    case 'organisation_request':
      return `Solicitare Organizație Înregistrată – AnimaMinds`
    case 'private_group_request':
      return `Solicitare Grup Privat Înregistrată – AnimaMinds`
    case 'contact_message':
      return `Mesajul tău a fost transmis – AnimaMinds`
  }
}

function userBody(submission: AnySubmission): string {
  const name = submission.participantName

  let details = ''

  switch (submission.requestType) {
    case 'online_live_registration':
      details = `
        <p>Înscrierea ta la <strong>${submission.programmeName} – Online Live</strong> a fost înregistrată cu succes.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
          <tr><td style="padding:6px 0;"><strong>Date:</strong></td><td>${submission.dates}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Format:</strong></td><td>${submission.format}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Investiție:</strong></td><td>${submission.price} lei</td></tr>
          <tr><td style="padding:6px 0;"><strong>Durată:</strong></td><td>${submission.duration} ore</td></tr>
          <tr><td style="padding:6px 0;"><strong>CPD:</strong></td><td>${submission.cpdCredits} credite</td></tr>
        </table>
        <p style="margin-top:16px;">Vei primi pe email detaliile de plată și linkul Google Meet după confirmare.</p>`
      break

    case 'experience_edition_reservation':
      details = `
        <p>Rezervarea ta pentru <strong>${submission.programmeName} – Experience Edition™</strong> a fost înregistrată.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
          <tr><td style="padding:6px 0;"><strong>Ediție:</strong></td><td>${submission.selectedEdition}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Cameră:</strong></td><td>${submission.selectedRoomType}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Preț:</strong></td><td>${submission.price} lei</td></tr>
          <tr><td style="padding:6px 0;"><strong>Locație:</strong></td><td>${submission.location}</td></tr>
          <tr><td style="padding:6px 0;"><strong>CPD:</strong></td><td>${submission.cpdCredits} credite</td></tr>
        </table>
        <p style="margin-top:16px;">Plata se realizează după confirmarea formării grupei minime de participanți.</p>`
      break

    case 'organisation_request':
      details = `
        <p>Solicitarea transmisă de organizația <strong>${submission.organizationName}</strong> a fost înregistrată.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
          <tr><td style="padding:6px 0;"><strong>Program:</strong></td><td>${submission.programmeName}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Format:</strong></td><td>${submission.format}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Participanți estimați:</strong></td><td>${submission.estimatedParticipants}</td></tr>
        </table>
        <p style="margin-top:16px;">Te vom contacta în curând cu o ofertă personalizată.</p>`
      break

    case 'private_group_request':
      details = `
        <p>Solicitarea pentru <strong>grup privat – ${submission.programmeName}</strong> a fost înregistrată.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
          <tr><td style="padding:6px 0;"><strong>Participanți estimați:</strong></td><td>${submission.estimatedParticipants}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Preț:</strong></td><td>${submission.price}</td></tr>
        </table>
        <p style="margin-top:16px;">Te vom contacta în curând cu detalii și o ofertă.</p>`
      break

    case 'contact_message':
      details = `
        <p>Mesajul tău a fost transmis echipei AnimaMinds.</p>
        <p style="margin-top:16px;">Îți vom răspunde în cel mai scurt timp.</p>`
      break
  }

  return `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:20px 32px;">
          <p style="margin:0;color:#7C9A7E;font-size:11px;letter-spacing:4px;text-transform:uppercase;">AnimaMinds</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:16px;color:#333;">Bună, <strong>${name}</strong>!</p>
          ${details}
          <p style="margin-top:24px;font-size:14px;color:#555;">Pentru orice întrebări: <a href="mailto:contact@animaminds.ro" style="color:#2563eb;">contact@animaminds.ro</a></p>
          <div style="margin-top:24px;">
            <a href="${SITE_URL}" style="display:inline-block;padding:10px 20px;background:#1C2B1E;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;">Vizitează site-ul</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

function adminBody(submission: AnySubmission): string {
  const rows = Object.entries(submission)
    .map(([k, v]) => `<tr><td style="padding:4px 8px;font-weight:bold;color:#555;white-space:nowrap;">${k}</td><td style="padding:4px 8px;color:#333;">${String(v)}</td></tr>`)
    .join('')

  return `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:20px 32px;">
          <p style="margin:0;color:#7C9A7E;font-size:11px;letter-spacing:4px;text-transform:uppercase;">AnimaMinds Admin</p>
          <p style="margin:4px 0 0;color:#fff;font-size:16px;font-weight:bold;">Nouă înregistrare: ${submission.requestType}</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            ${rows}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

export async function sendUnifiedEmails(submission: AnySubmission): Promise<void> {
  const userEmail = submission.participantEmail
  const uSubject = userSubject(submission)
  const uBody = userBody(submission)
  const aSubject = `[AnimaMinds Admin] ${submission.requestType} – ${submission.participantName}`
  const aBody = adminBody(submission)

  await Promise.allSettled([
    sendEmail(userEmail, uSubject, uBody),
    sendEmail(ADMIN_EMAIL, aSubject, aBody),
  ])
}
