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

export async function syncOnlineLiveToGoogleSheets(data: {
  formType: 'ONLINE_LIVE_REGISTRATION'
  programme: string
  format: string
  price: number
  duration: number
  cpd: number
  dates: string
  name: string
  email: string
  phone: string
  institution?: string
  role?: string
  gdprConsent: boolean
  calendarConfirmation: boolean
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
        formType: 'ÎNSCRIERI',
        program: data.programme,
        editie: data.dates,
        format: data.format,
        pret: String(data.price),
        cpd: String(data.cpd),
        nume: data.name,
        email: data.email,
        telefon: data.phone,
        institutie: data.institution || '',
        functie: data.role || '',
        participanti: '1',
        statusPlata: 'NEACHITAT',
        observatii: `Format: ${data.format} | Preț: ${data.price} lei | CPD: ${data.cpd} | Date: ${data.dates}`,
        data: data.createdAt.toISOString(),
      }),
      mode: 'no-cors',
    })
    console.log('Online Live registration synced to Google Sheets:', data.email)
  } catch (err) {
    console.error('Google Sheets Online Live sync error:', err)
  }
}

export async function syncPrivateGroupToGoogleSheets(data: {
  formType: 'PRIVATE_GROUP_REQUEST'
  requesterName: string
  email: string
  phone: string
  programmeRequested: string
  estimatedGroupSize: number
  message?: string
  requestType: string
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
        numeSolicitant: data.requesterName,
        email: data.email,
        telefon: data.phone,
        programSolicitat: data.programmeRequested,
        dimensiuneGrup: data.estimatedGroupSize,
        mesaj: data.message || '',
        tipCerere: data.requestType,
        data: data.createdAt.toISOString(),
      }),
      mode: 'no-cors',
    })
    console.log('Private Group request synced to Google Sheets:', data.email)
  } catch (err) {
    console.error('Google Sheets Private Group sync error:', err)
  }
}
