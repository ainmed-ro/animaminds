import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'animaminds-admin-2026'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Database not available' }, { status: 500 })
  }

  const [ol, ee, pg, org] = await Promise.allSettled([
    supabase.from('online_live_registrations').select('id, name, email, phone, programme, format, price, dates, payment_status, status, created_at').order('created_at', { ascending: false }).limit(200),
    supabase.from('experience_edition_requests').select('id, name, email, phone, programme, accommodation, preferred_period, payment_status, status, created_at').order('created_at', { ascending: false }).limit(200),
    supabase.from('private_group_requests').select('id, requester_name, email, phone, programme_requested, estimated_group_size, payment_status, status, created_at').order('created_at', { ascending: false }).limit(200),
    supabase.from('organization_requests').select('id, organization_name, contact_name, contact_email, contact_phone, programme_interest, delivery_format_preference, participant_count_estimate, payment_status, status, created_at').order('created_at', { ascending: false }).limit(200),
  ])

  const normalize = (result: PromiseSettledResult<any>, requestType: string) => {
    if (result.status === 'rejected') return []
    if (result.value.error) { console.error(`[Admin] ${requestType}:`, result.value.error); return [] }
    return (result.value.data ?? []).map((r: any) => ({ ...r, requestType }))
  }

  const all = [
    ...normalize(ol, 'online_live_registration'),
    ...normalize(ee, 'experience_edition_reservation'),
    ...normalize(pg, 'private_group_request'),
    ...normalize(org, 'organisation_request'),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json({ registrations: all })
}
