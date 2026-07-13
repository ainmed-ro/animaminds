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

export async function syncOrganizationRequestToGoogleSheets(data: {
  formType: 'ORGANIZATION_REQUEST'
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
        numeOrganizatie: data.organizationName,
        tipOrganizatie: data.organizationType,
        numeContact: data.contactName,
        emailContact: data.contactEmail,
        telefonContact: data.contactPhone || '',
        pozitieContact: data.contactPosition || '',
        programInteres: data.programmeInterest || '',
        formatLivrare: data.deliveryFormatPreference || '',
        numarParticipanti: data.participantCountEstimate?.toString() || '',
        timelinePreferat: data.preferredTimeline || '',
        buget: data.budgetRange || '',
        cerinteSpecifice: data.specificRequirements || '',
        data: data.createdAt.toISOString(),
      }),
      mode: 'no-cors',
    })
    console.log('Organization request synced to Google Sheets:', data.contactEmail)
  } catch (err) {
    console.error('Google Sheets organization request sync error:', err)
  }
}

export async function syncExperienceEditionToGoogleSheets(data: {
  formType: 'EXPERIENCE_EDITION_INTEREST'
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
        telefon: data.phone,
        companie: data.company || '',
        program: data.programme,
        cazare: data.accommodation || '',
        perioadaPreferata: data.preferredPeriod || '',
        mesaj: data.message || '',
        data: data.createdAt.toISOString(),
      }),
      mode: 'no-cors',
    })
    console.log('Experience Edition interest synced to Google Sheets:', data.email)
  } catch (err) {
    console.error('Google Sheets Experience Edition sync error:', err)
  }
}
