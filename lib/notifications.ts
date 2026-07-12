import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'AnimaMinds <noreply@animaminds.ro>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'contact@animaminds.ro'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://animaminds.ro'

export async function sendAdminNewRegistrationEmail(data: {
  contactName: string
  contactEmail: string
  contactPhone?: string | null
  editionTitle: string
  programmeName: string
  participantCount: number
  createdAt: Date
}) {
  const html = `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:20px 32px;">
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">🔔 Înscriere nouă</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="6" cellspacing="0">
            <tr><td style="color:#666;font-size:13px;width:140px;">Nume:</td><td style="font-size:14px;color:#333;font-weight:bold;">${data.contactName}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Email:</td><td style="font-size:14px;color:#333;">${data.contactEmail}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Telefon:</td><td style="font-size:14px;color:#333;">${data.contactPhone || '—'}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Program:</td><td style="font-size:14px;color:#333;">${data.programmeName}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Ediție:</td><td style="font-size:14px;color:#333;">${data.editionTitle}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Participanți:</td><td style="font-size:14px;color:#333;">${data.participantCount}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Data:</td><td style="font-size:14px;color:#333;">${data.createdAt.toLocaleString('ro-RO')}</td></tr>
          </table>
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid #eee;">
            <a href="${SITE_URL}/admin/registrations" style="display:inline-block;padding:10px 20px;background:#1C2B1E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;">
              Deschide dashboard-ul
            </a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[AnimaMinds] Înscriere nouă — ${data.contactName} — ${data.programmeName}`,
    html,
  })
}

export async function sendAdminNewContactEmail(data: {
  name: string
  email: string
  phone?: string
  organization?: string
  subject: string
  message: string
  programInteres?: string
  createdAt: Date
}) {
  const html = `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#9B7EBD;padding:20px 32px;">
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">📩 Mesaj de contact nou</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="6" cellspacing="0">
            <tr><td style="color:#666;font-size:13px;width:140px;">Nume:</td><td style="font-size:14px;color:#333;font-weight:bold;">${data.name}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Email:</td><td style="font-size:14px;color:#333;">${data.email}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Telefon:</td><td style="font-size:14px;color:#333;">${data.phone || '—'}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Organizație:</td><td style="font-size:14px;color:#333;">${data.organization || '—'}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Program interes:</td><td style="font-size:14px;color:#333;">${data.programInteres || '—'}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Subiect:</td><td style="font-size:14px;color:#333;">${data.subject}</td></tr>
            <tr><td style="color:#666;font-size:13px;vertical-align:top;">Mesaj:</td><td style="font-size:14px;color:#333;">${data.message.replace(/\n/g, '<br/>')}</td></tr>
            <tr><td style="color:#666;font-size:13px;">Data:</td><td style="font-size:14px;color:#333;">${data.createdAt.toLocaleString('ro-RO')}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[AnimaMinds] Mesaj contact nou — ${data.name} — ${data.subject}`,
    html,
  })
}

export async function sendDailySummaryEmail(data: {
  newRegistrations: number
  newContacts: number
  openEditionDeadlines: Array<{ title: string; deadline: Date }>
  upcomingEditions: number
}) {
  const html = `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:20px 32px;">
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">📅 Rezumat zilnic AnimaMinds</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Înscrieri noi:</strong> ${data.newRegistrations}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Mesaje contact noi:</strong> ${data.newContacts}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Ediții viitoare:</strong> ${data.upcomingEditions}</p>
          ${data.openEditionDeadlines.length > 0 ? `
          <p style="margin:16px 0 8px;font-size:15px;color:#333;font-weight:bold;">Deadline-uri deschise:</p>
          <ul style="margin:0 0 16px;padding-left:20px;font-size:14px;color:#555;">
            ${data.openEditionDeadlines.map((e) => `<li>${e.title} — ${new Date(e.deadline).toLocaleDateString('ro-RO')}</li>`).join('')}
          </ul>` : ''}
          <div style="margin-top:24px;">
            <a href="${SITE_URL}/admin/registrations" style="display:inline-block;padding:10px 20px;background:#1C2B1E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;">Vezi înscrieri</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[AnimaMinds] Rezumat zilnic — ${new Date().toLocaleDateString('ro-RO')}`,
    html,
  })
}

export async function sendWeeklySummaryEmail(data: {
  totalRegistrations: number
  totalContacts: number
  newRegistrationsThisWeek: number
  newContactsThisWeek: number
  upcomingEditions: Array<{ title: string; startDate: Date | null }>
}) {
  const html = `
<!DOCTYPE html>
<html lang="ro">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:32px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:20px 32px;">
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">📊 Rezumat săptămânal AnimaMinds</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Înscrieri totale:</strong> ${data.totalRegistrations}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Înscrieri săptămâna aceasta:</strong> ${data.newRegistrationsThisWeek}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Mesaje contact totale:</strong> ${data.totalContacts}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Mesaje contact săptămâna aceasta:</strong> ${data.newContactsThisWeek}</p>
          ${data.upcomingEditions.length > 0 ? `
          <p style="margin:16px 0 8px;font-size:15px;color:#333;font-weight:bold;">Ediții în următoarele 14 zile:</p>
          <ul style="margin:0 0 16px;padding-left:20px;font-size:14px;color:#555;">
            ${data.upcomingEditions.map((e) => `<li>${e.title}${e.startDate ? ` — ${new Date(e.startDate).toLocaleDateString('ro-RO')}` : ''}</li>`).join('')}
          </ul>` : ''}
          <div style="margin-top:24px;">
            <a href="${SITE_URL}/admin" style="display:inline-block;padding:10px 20px;background:#1C2B1E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;">Deschide admin</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[AnimaMinds] Rezumat săptămânal — Săptămâna ${new Date().toLocaleDateString('ro-RO')}`,
    html,
  })
}
