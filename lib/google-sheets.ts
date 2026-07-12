const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL

export async function syncRegistrationToGoogleSheets(data: {
  formType: 'ÎNSCRIERI'
  programme: string
  edition: string
  contactName: string
  contactEmail: string
  contactPhone?: string | null
  participantCount: number
  entityName?: string | null
  entityType?: string
  paymentStatus: string
  notes?: string | null
  createdAt: Date
}) {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('GOOGLE_SHEETS_URL not configured, skipping Sheets sync')
    return
  }

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: data.formType,
        program: data.programme,
        editie: data.edition,
        nume: data.contactName,
        email: data.contactEmail,
        telefon: data.contactPhone || '',
        participanti: String(data.participantCount),
        organizatie: data.entityName || '',
        tipEntitate: data.entityType || '',
        statusPlata: data.paymentStatus,
        observatii: data.notes || '',
        data: data.createdAt.toISOString(),
      }),
      mode: 'no-cors',
    })
    console.log('Registration synced to Google Sheets:', data.contactEmail)
  } catch (err) {
    console.error('Google Sheets registration sync error:', err)
  }
}

export async function syncContactToGoogleSheets(data: {
  formType: 'CONTACT'
  name: string
  email: string
  phone?: string
  organization?: string
  programInteres?: string
  subject: string
  message: string
  createdAt: Date
}) {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('GOOGLE_SHEETS_URL not configured, skipping Sheets sync')
    return
  }

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: data.formType,
        nume: data.name,
        email: data.email,
        telefon: data.phone || '',
        organizatie: data.organization || 'Nespecificat',
        programInteres: data.programInteres || 'Nu a fost selectat',
        subiect: data.subject,
        mesaj: data.message,
        data: data.createdAt.toISOString(),
      }),
      mode: 'no-cors',
    })
    console.log('Contact synced to Google Sheets:', data.email)
  } catch (err) {
    console.error('Google Sheets contact sync error:', err)
  }
}
