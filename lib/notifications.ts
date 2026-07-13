import { Resend } from 'resend'
import { prisma } from './prisma'
import type { EmailType, EmailStatus } from '@prisma/client'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'AnimaMinds <noreply@animaminds.ro>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'contact@animaminds.ro'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://animaminds.ro'

interface SendAndLogOptions {
  to: string | string[]
  subject: string
  html: string
  type: EmailType
  recipientName?: string
  relatedType?: string
  relatedId?: string
  metadata?: Record<string, any>
}

async function sendAndLogEmail({
  to,
  subject,
  html,
  type,
  recipientName,
  relatedType,
  relatedId,
  metadata = {},
}: SendAndLogOptions): Promise<{ success: boolean; resendId?: string; emailId?: string }> {
  if (!resend) {
    console.error('Resend not available - missing API key')
    return { success: false }
  }

  const recipients = Array.isArray(to) ? to : [to]
  const results: { success: boolean; resendId?: string; emailId?: string }[] = []

  for (const recipient of recipients) {
    try {
      const response = await resend.emails.send({
        from: FROM_EMAIL,
        to: [recipient],
        subject,
        html,
      })

      const resendId = response.data?.id ?? null
      const email = await prisma.email.create({
        data: {
          resendId,
          recipient,
          recipientName,
          subject,
          fromAddress: FROM_EMAIL,
          type,
          status: 'SENT' as EmailStatus,
          relatedType,
          relatedId,
          metadata: metadata as any,
        },
      })

      results.push({ success: true, resendId: resendId ?? undefined, emailId: email.id })
    } catch (err) {
      console.error('sendAndLogEmail error:', err)
      try {
        await prisma.email.create({
          data: {
            recipient,
            recipientName,
            subject,
            fromAddress: FROM_EMAIL,
            type,
            status: 'FAILED' as EmailStatus,
            relatedType,
            relatedId,
            metadata: { error: String(err), ...metadata } as any,
          },
        })
      } catch (dbErr) {
        console.error('Failed to log failed email:', dbErr)
      }
      results.push({ success: false })
    }
  }

  return results[0] ?? { success: false }
}

export { sendAndLogEmail }

export async function sendAdminNewRegistrationEmail(data: {
  contactName: string
  contactEmail: string
  contactPhone?: string | null
  editionTitle: string
  programmeName: string
  participantCount: number
  createdAt: Date
  registrationId?: string
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

  await sendAndLogEmail({
    to: ADMIN_EMAIL,
    subject: `[AnimaMinds] Înscriere nouă — ${data.contactName} — ${data.programmeName}`,
    html,
    type: 'ADMIN_REGISTRATION',
    recipientName: data.contactName,
    relatedType: 'REGISTRATION',
    relatedId: data.registrationId,
    metadata: {
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      editionTitle: data.editionTitle,
      programmeName: data.programmeName,
      participantCount: data.participantCount,
      createdAt: data.createdAt,
      registrationId: data.registrationId,
    },
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

  await sendAndLogEmail({
    to: ADMIN_EMAIL,
    subject: `[AnimaMinds] Mesaj contact nou — ${data.name} — ${data.subject}`,
    html,
    type: 'ADMIN_CONTACT',
    recipientName: data.name,
    relatedType: 'CONTACT',
    metadata: {
      contactEmail: data.email,
      phone: data.phone,
      organization: data.organization,
      programInteres: data.programInteres,
      subject: data.subject,
      createdAt: data.createdAt,
    },
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

  await sendAndLogEmail({
    to: ADMIN_EMAIL,
    subject: `[AnimaMinds] Rezumat zilnic — ${new Date().toLocaleDateString('ro-RO')}`,
    html,
    type: 'DAILY_SUMMARY',
    metadata: {
      newRegistrations: data.newRegistrations,
      newContacts: data.newContacts,
      openEditionDeadlines: data.openEditionDeadlines,
      upcomingEditions: data.upcomingEditions,
    },
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

  await sendAndLogEmail({
    to: ADMIN_EMAIL,
    subject: `[AnimaMinds] Rezumat săptămânal — Săptămâna ${new Date().toLocaleDateString('ro-RO')}`,
    html,
    type: 'WEEKLY_SUMMARY',
    metadata: {
      totalRegistrations: data.totalRegistrations,
      totalContacts: data.totalContacts,
      newRegistrationsThisWeek: data.newRegistrationsThisWeek,
      newContactsThisWeek: data.newContactsThisWeek,
      upcomingEditions: data.upcomingEditions,
    },
  })
}

export async function sendAdminOrganizationRequestEmail(data: {
  organizationName: string
  organizationType: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  contactPosition?: string
  programmeInterest?: string
  deliveryFormatPreference?: string
  participantCountEstimate?: number
  preferredTimeline?: string
  budgetRange?: string
  specificRequirements?: string
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
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">🏢 Cerere nouă de organizație</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Organizație:</strong> ${data.organizationName}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Tip organizație:</strong> ${data.organizationType}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Contact:</strong> ${data.contactName}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Email:</strong> ${data.contactEmail}</p>
          ${data.contactPhone ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Telefon:</strong> ${data.contactPhone}</p>` : ''}
          ${data.contactPosition ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Poziție:</strong> ${data.contactPosition}</p>` : ''}
          ${data.programmeInterest ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Program interes:</strong> ${data.programmeInterest}</p>` : ''}
          ${data.deliveryFormatPreference ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Format livrare:</strong> ${data.deliveryFormatPreference}</p>` : ''}
          ${data.participantCountEstimate ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Număr participanți:</strong> ${data.participantCountEstimate}</p>` : ''}
          ${data.preferredTimeline ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Timeline preferat:</strong> ${data.preferredTimeline}</p>` : ''}
          ${data.budgetRange ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Buget:</strong> ${data.budgetRange}</p>` : ''}
          ${data.specificRequirements ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Cerințe specifice:</strong> ${data.specificRequirements}</p>` : ''}
          <p style="margin:16px 0 8px;font-size:12px;color:#888;">Data: ${data.createdAt.toLocaleString('ro-RO')}</p>
          <div style="margin-top:24px;">
            <a href="${SITE_URL}/admin" style="display:inline-block;padding:10px 20px;background:#1C2B1E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;">Deschide admin</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return sendAndLogEmail({
    to: ADMIN_EMAIL,
    subject: `[AnimaMinds] Cerere organizație — ${data.organizationName} — ${data.contactName}`,
    html,
    type: 'ADMIN_ORGANIZATION_REQUEST',
    recipientName: data.contactName,
    relatedType: 'ORGANIZATION_REQUEST',
    metadata: {
      organizationName: data.organizationName,
      organizationType: data.organizationType,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      programmeInterest: data.programmeInterest,
      participantCountEstimate: data.participantCountEstimate,
    },
  })
}

export async function sendAdminExperienceEditionEmail(data: {
  name: string
  email: string
  phone: string
  company?: string
  programme: string
  accommodation?: string
  preferredPeriod?: string
  message?: string
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
          <p style="margin:0;color:#fff;font-size:14px;font-weight:bold;">🏔️ Exprimare interes Experience Edition</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Nume:</strong> ${data.name}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Email:</strong> ${data.email}</p>
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Telefon:</strong> ${data.phone}</p>
          ${data.company ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Companie:</strong> ${data.company}</p>` : ''}
          <p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Program:</strong> ${data.programme}</p>
          ${data.accommodation ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Cazare preferată:</strong> ${data.accommodation}</p>` : ''}
          ${data.preferredPeriod ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Perioada preferată:</strong> ${data.preferredPeriod}</p>` : ''}
          ${data.message ? `<p style="margin:0 0 16px;font-size:15px;color:#333;"><strong>Mesaj:</strong> ${data.message}</p>` : ''}
          <p style="margin:16px 0 8px;font-size:12px;color:#888;">Data: ${data.createdAt.toLocaleString('ro-RO')}</p>
          <div style="margin-top:24px;">
            <a href="${SITE_URL}/admin" style="display:inline-block;padding:10px 20px;background:#1C2B1E;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;">Deschide admin</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return sendAndLogEmail({
    to: ADMIN_EMAIL,
    subject: `[AnimaMinds] Experience Edition — ${data.name} — ${data.programme}`,
    html,
    type: 'ADMIN_EXPERIENCE_EDITION' as any,
    recipientName: data.name,
    relatedType: 'EXPERIENCE_EDITION',
    metadata: {
      programme: data.programme,
      email: data.email,
      phone: data.phone,
      company: data.company,
      accommodation: data.accommodation,
    },
  })
}
