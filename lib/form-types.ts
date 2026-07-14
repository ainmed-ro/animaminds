export type RequestType =
  | 'online_live_registration'
  | 'experience_edition_reservation'
  | 'organisation_request'
  | 'private_group_request'
  | 'contact_message'

export interface BaseSubmission {
  requestType: RequestType
  participantName: string
  participantEmail: string
  participantPhone?: string
  institution?: string
  role?: string
  message?: string
  gdprConsent?: boolean
  createdAt?: string
}

export interface OnlineLiveSubmission extends BaseSubmission {
  requestType: 'online_live_registration'
  programmeName: 'Conversații care Contează'
  programmeSlug: 'conversatii-care-conteaza'
  format: 'Online Live'
  price: 199
  duration: 7.5
  cpdCredits: 8
  dates: '8, 15, 22 Septembrie 2026'
  calendarConfirmation: boolean
}

export interface ExperienceEditionSubmission extends BaseSubmission {
  requestType: 'experience_edition_reservation'
  programmeName: 'Conversații care Contează'
  programmeSlug: 'conversatii-care-conteaza'
  format: 'Experience Edition™'
  selectedEdition: string
  selectedRoomType: string
  price: number
  duration: 7.5
  cpdCredits: 8
  location: 'Hotel Afrodita, Vălenii de Munte'
  participationType?: string
  groupSize?: number
  cui?: string
  locality?: string
  dietaryRequirements?: string
}

export interface OrganisationSubmission extends BaseSubmission {
  requestType: 'organisation_request'
  programmeName: string
  programmeSlug?: string
  format: 'Online dedicat organizației' | 'La sediul beneficiarului'
  price: 3500 | 5000
  organizationName: string
  organizationType: string
  estimatedParticipants: number
  preferredTimeline?: string
  budgetRange?: string
}

export interface PrivateGroupSubmission extends BaseSubmission {
  requestType: 'private_group_request'
  programmeName: string
  programmeSlug?: string
  format: 'Grup privat'
  estimatedParticipants: number
  price: 'Pe bază de ofertă'
}

export interface ContactSubmission extends BaseSubmission {
  requestType: 'contact_message'
  subject: string
  organizationName?: string
  programInteres?: string
}

export type AnySubmission =
  | OnlineLiveSubmission
  | ExperienceEditionSubmission
  | OrganisationSubmission
  | PrivateGroupSubmission
  | ContactSubmission
