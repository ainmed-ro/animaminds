import type { AnySubmission } from './form-types'

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL

export async function syncToGoogleSheets(submission: AnySubmission): Promise<void> {
  if (!GOOGLE_SHEETS_URL) {
    console.warn('GOOGLE_SHEETS_URL not configured, skipping Sheets sync')
    return
  }

  const createdAt = submission.createdAt ?? new Date().toISOString()

  let experience = ''
  let editie = ''
  let format = ''
  let price = ''
  let duration = ''
  let cpd = ''
  let name = ''
  let email = ''
  let phone = ''
  let participanti = '1'
  let observatii = ''
  let formType = 'ÎNSCRIERI'

  switch (submission.requestType) {
    case 'online_live_registration': {
      experience = `${submission.programmeName} - ${submission.format}`
      editie = submission.dates
      format = submission.format
      price = String(submission.price)
      duration = String(submission.duration)
      cpd = String(submission.cpdCredits)
      name = submission.participantName
      email = submission.participantEmail
      phone = submission.participantPhone || ''
      participanti = '1'
      observatii = `Format: ${submission.format} | Preț: ${submission.price} lei | CPD: ${submission.cpdCredits} | Date: ${submission.dates}`
      break
    }

    case 'experience_edition_reservation': {
      experience = `${submission.programmeName} - ${submission.format}`
      editie = submission.selectedEdition
      format = submission.format
      price = String(submission.price)
      duration = String(submission.duration)
      cpd = String(submission.cpdCredits)
      name = submission.participantName
      email = submission.participantEmail
      phone = submission.participantPhone || ''
      participanti = '1'
      observatii = `Cameră: ${submission.selectedRoomType} | Locație: ${submission.location} | Mesaj: ${submission.message || ''}`
      break
    }

    case 'organisation_request': {
      experience = `${submission.programmeName} - Organizație`
      editie = ''
      format = submission.format
      price = String(submission.price)
      duration = ''
      cpd = ''
      name = submission.participantName
      email = submission.participantEmail
      phone = submission.participantPhone || ''
      participanti = String(submission.estimatedParticipants)
      observatii = `Org: ${submission.organizationName} | Tip: ${submission.organizationType} | Timeline: ${submission.preferredTimeline || ''} | Buget: ${submission.budgetRange || ''} | Cerințe: ${submission.message || ''}`
      break
    }

    case 'private_group_request': {
      experience = `${submission.programmeName} - Grup Privat`
      editie = ''
      format = submission.format
      price = submission.price
      duration = ''
      cpd = ''
      name = submission.participantName
      email = submission.participantEmail
      phone = submission.participantPhone || ''
      participanti = String(submission.estimatedParticipants)
      observatii = submission.message || ''
      break
    }

    case 'contact_message': {
      formType = 'CONTACT'
      name = submission.participantName
      email = submission.participantEmail
      observatii = submission.message || ''
      break
    }
  }

  try {
    if (formType === 'CONTACT') {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'CONTACT',
          timestamp: createdAt,
          nume: name,
          email,
          organizatie: (submission as any).organizationName || 'Nespecificat',
          subiect: (submission as any).subject || '',
          mesaj: observatii,
          programInteres: (submission as any).programInteres || 'Nu a fost selectat',
        }),
        mode: 'no-cors',
      })
    } else {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'ÎNSCRIERI',
          experience,
          editie,
          format,
          pret: price,
          durata: duration,
          cpd,
          nume: name,
          email,
          telefon: phone,
          participanti,
          observatii,
          status: 'INTERESAT',
          paymentStatus: 'NEACHITAT',
          data: createdAt,
        }),
        mode: 'no-cors',
      })
    }
    console.log(`[Sheets] Synced ${submission.requestType} for ${email}`)
  } catch (err) {
    console.error(`[Sheets] Sync error for ${submission.requestType}:`, err)
  }
}
