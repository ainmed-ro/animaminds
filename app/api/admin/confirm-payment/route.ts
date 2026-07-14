import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = process.env.FROM_EMAIL ?? 'AnimaMinds <noreply@animaminds.ro>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'contact@animaminds.ro'
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'animaminds-admin-2026'

const TABLE_MAP: Record<string, string> = {
  online_live_registration: 'online_live_registrations',
  experience_edition_reservation: 'experience_edition_requests',
  organisation_request: 'organization_requests',
  private_group_request: 'private_group_requests',
}

async function sendPaymentConfirmationEmail(data: {
  participantName: string
  participantEmail: string
  programmeName: string
  format: string
  amount: number
  requestType: string
}): Promise<void> {
  if (!resend) return

  const userHtml = `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;background:#f4f4f4;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;">
        <tr><td style="background:#1C2B1E;padding:18px 28px;">
          <p style="margin:0;color:#7C9A7E;font-size:10px;letter-spacing:4px;text-transform:uppercase;">AnimaMinds</p>
          <p style="margin:6px 0 0;color:#fff;font-size:18px;font-weight:bold;">✅ Plată confirmată</p>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 16px;font-size:16px;color:#333;">Bună, <strong>${data.participantName}</strong>!</p>
          <p style="margin:0 0 24px;font-size:15px;color:#333;">Plata ta pentru <strong>${data.programmeName} – ${data.format}</strong> a fost confirmată cu succes.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;background:#f8faf8;border-radius:8px;">
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e8f0e8;"><b>Program:</b></td><td style="padding:10px 16px;border-bottom:1px solid #e8f0e8;">${data.programmeName}</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e8f0e8;"><b>Format:</b></td><td style="padding:10px 16px;border-bottom:1px solid #e8f0e8;">${data.format}</td></tr>
            <tr><td style="padding:10px 16px;border-bottom:1px solid #e8f0e8;"><b>Sumă:</b></td><td style="padding:10px 16px;border-bottom:1px solid #e8f0e8;"><strong>${data.amount} lei</strong></td></tr>
            <tr><td style="padding:10px 16px;"><b>Status:</b></td><td style="padding:10px 16px;color:#16a34a;font-weight:bold;">ACHITAT</td></tr>
          </table>
          <p style="margin-top:24px;font-size:14px;color:#555;">Vei primi în curând informații suplimentare despre participare. Pentru întrebări: <a href="mailto:contact@animaminds.ro" style="color:#1C2B1E;">contact@animaminds.ro</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const adminHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;padding:20px;">
  <h2 style="color:#1C2B1E;">✅ Plată confirmată — AnimaMinds</h2>
  <table style="border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:4px 12px 4px 0;"><b>Participant:</b></td><td>${data.participantName}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;"><b>Email:</b></td><td>${data.participantEmail}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;"><b>Program:</b></td><td>${data.programmeName}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;"><b>Format:</b></td><td>${data.format}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;"><b>Sumă:</b></td><td><b>${data.amount} lei</b></td></tr>
    <tr><td style="padding:4px 12px 4px 0;"><b>Status:</b></td><td style="color:green;"><b>ACHITAT</b></td></tr>
  </table>
</body></html>`

  await Promise.allSettled([
    resend.emails.send({ from: FROM_EMAIL, to: [data.participantEmail], subject: `✅ Plată confirmată – ${data.programmeName} – AnimaMinds`, html: userHtml }),
    resend.emails.send({ from: FROM_EMAIL, to: [ADMIN_EMAIL], subject: `✅ Plată confirmată – ${data.participantName} – ${data.programmeName}`, html: adminHtml }),
  ])
}

export async function POST(req: NextRequest) {
  try {
    const { secret, id, requestType, participantName, participantEmail, programmeName, format, amount } = await req.json()

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!id || !requestType) {
      return NextResponse.json({ error: 'id and requestType required' }, { status: 400 })
    }

    const table = TABLE_MAP[requestType]
    if (!table) {
      return NextResponse.json({ error: `Unknown requestType: ${requestType}` }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    const { error } = await supabase
      .from(table)
      .update({ payment_status: 'ACHITAT' })
      .eq('id', id)

    if (error) {
      console.error('[ConfirmPayment] Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    sendPaymentConfirmationEmail({ participantName, participantEmail, programmeName, format, amount: amount ?? 0, requestType })
      .catch(e => console.error('[ConfirmPayment] Email error:', e))

    console.log(`[ConfirmPayment] Payment confirmed for ${id} (${requestType})`)
    return NextResponse.json({ success: true, message: 'Plată confirmată cu succes.' })

  } catch (err) {
    console.error('[ConfirmPayment] Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
