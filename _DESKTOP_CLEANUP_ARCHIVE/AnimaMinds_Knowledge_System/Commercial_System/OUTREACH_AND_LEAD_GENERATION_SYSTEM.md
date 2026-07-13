# OUTREACH_AND_LEAD_GENERATION_SYSTEM.md

**Document:** Outreach and Lead Generation System  
**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-13  
**Status:** Architecture / Operational Model — Not Implemented  
**Scope:** Define how AnimaMinds builds, segments, and communicates with its contact database for programme promotion and participant acquisition.

---

## 1. Purpose

This document describes the architecture and operational model for AnimaMinds' lead generation, contact management, and outreach workflows. It covers lead sources, data structure, CRM concepts, email marketing, notifications, GDPR compliance, and integration recommendations.

No code is implemented from this document. It serves as the blueprint for a future commercial and communications module.

---

## 2. Lead Database

### 2.1 Target Organization Types

The lead database tracks organizations that may purchase or promote AnimaMinds programmes.

| Category | Examples |
|----------|----------|
| Institutions | Universities, research institutes, public academies |
| Schools | Primary, secondary, high schools, private schools, school networks |
| City Halls | Local public administration, municipal training departments |
| CCDs (County Centres for Resources / Continuing Education) | Teacher training county centres |
| Hospitals | Public and private hospitals, clinics, medical associations |
| NGOs | Non-governmental organizations, associations, foundations |
| Companies | SMEs, corporations, HR/L&D departments |

### 2.2 Lead Source Tracking

Every lead/contact should record:

- Source channel (website form, referral, event, cold outreach, partner, social media, paid ad).
- Source campaign or UTM parameters.
- Date of first contact.
- Referring person or partner organization.

---

## 3. Contact Structure

### 3.1 Organization Record

| Field | Description |
|-------|-------------|
| `organizationName` | Legal or public name of the organization |
| `organizationType` | Institution, School, City Hall, CCD, Hospital, NGO, Company |
| `email` | General or primary contact email |
| `phone` | General phone number |
| `city` | City |
| `county` | County / region |
| `address` | Full address (optional) |
| `website` | Organization website (optional) |
| `segment` | Market segment used for targeting |
| `status` | Lead lifecycle status |
| `lastContactDate` | Date of last meaningful interaction |
| `notes` | Free-text notes from sales/outreach |
| `assignedTo` | Team member responsible |
| `gdprConsent` | Consent status for communication |
| `createdAt` / `updatedAt` | Audit timestamps |

### 3.2 Contact Person Record

Organizations may have multiple contact persons.

| Field | Description |
|-------|-------------|
| `firstName` | First name |
| `lastName` | Last name |
| `role` | Job title / role (e.g., Director, HR Manager, Training Coordinator) |
| `email` | Direct email |
| `phone` | Direct phone |
| `isDecisionMaker` | Can approve purchases |
| `isPrimaryContact` | Default contact for the organization |
| `lastContactDate` | Last interaction date |
| `status` | Active / Inactive / Do Not Contact |
| `notes` | Interaction notes |

### 3.3 Status Values

Recommended organization/contact lifecycle statuses:

- `NEW` — Added to the database, no contact yet.
- `CONTACTED` — Initial outreach sent.
- `ENGAGED` — Responded or showed interest.
- `QUALIFIED` — Fits target profile and has budget/need.
- `PROPOSAL_SENT` — Offer or programme proposal shared.
- `CONVERTED` — Became a client / registered participant.
- `NURTURING` — Long-term follow-up.
- `DORMANT` — No response after multiple attempts.
- `UNSUBSCRIBED` — Opted out of communications.
- `DO_NOT_CONTACT` — Legal or explicit request to stop contact.

---

## 4. Google Sheets Integration

### 4.1 Role of Google Sheets

Google Sheets remains the operational workspace for the commercial team during the transition to the CMS. It is used for:

- Manual data entry and enrichment.
- Quick filtering and sorting of leads.
- Follow-up tracking before CRM workflows are automated.
- Sharing snapshots with stakeholders who do not use the CMS.

### 4.2 Data Sync Direction

| Direction | Data | Trigger |
|-----------|------|---------|
| Website → CMS → Sheets | New contacts, new registrations | Real-time or near real-time webhook / scheduled job |
| Sheets → CMS | Manual lead updates, bulk imports | Scheduled import or one-time sync |

### 4.3 Recommended Sheet Tabs

1. **Leads** — Organization and contact person records.
2. **Registrations** — Edition registrations synced from CMS.
3. **Participants** — Attended participants.
4. **Past Participants** — Historical participants for re-engagement.
5. **Campaigns** — Email/webinar campaign lists.
6. **Follow-ups** — Tasks and next actions.

### 4.4 Sync Rules

- New website registrations write a row to the **Registrations** tab.
- New contact-form submissions write a row to the **Leads** tab.
- Updates in the CMS overwrite existing rows where a matching email or ID is found.
- Duplicate detection based on email + organization name.

---

## 5. CRM Structure

### 5.1 Entities

| Entity | Definition |
|--------|------------|
| **Lead** | Organization or contact that has not yet registered or purchased. |
| **Contact** | Any person or organization in the database, regardless of status. |
| **Registration** | A person or group enrolled in a specific edition. |
| **Participant** | A person who attended a programme edition. |
| **Past Participant** | A participant from previous editions, tracked for re-engagement and loyalty programmes. |

### 5.2 Relationships

- One **Organization** has many **Contacts**.
- One **Contact** can have many **Registrations** over time.
- One **Registration** belongs to one **Edition** and one **Programme**.
- One **Registration** can include multiple **Participants** (group/corporate bookings).
- A **Participant** becomes a **Past Participant** after the edition ends.

### 5.3 Conversion Funnel

```
Website Visitor
    ↓
Lead (organization + contact)
    ↓
Contacted / Engaged / Qualified
    ↓
Proposal / Offer
    ↓
Registration
    ↓
Participant
    ↓
Past Participant → Re-engagement / Referral
```

---

## 6. Email Marketing

### 6.1 Campaign Architecture

| Campaign Type | Purpose |
|---------------|---------|
| Welcome / Onboarding | Introduce AnimaMinds after first contact |
| Programme Promotion | Announce open editions and new programmes |
| Webinar Invitations | Invite to free webinars, open sessions, or info events |
| Follow-up Sequences | Re-engage leads after no response |
| Post-Programme | Thank you, certificates, feedback surveys |
| Re-engagement | Win-back dormant leads and past participants |
| Seasonal / Thematic | Align with back-to-school, budget cycles, etc. |

### 6.2 Segmentation Dimensions

- Organization type (school, hospital, company, etc.)
- County / city
- Segment or industry
- Lead status
- Past participation history
- Programme interest (inferred from page visits or form submissions)
- Engagement score (opens, clicks, replies)
- Decision-maker vs. influencer

### 6.3 Follow-up Sequences

Recommended sequence for new leads:

1. **Day 0** — Thank-you email after form submission.
2. **Day 3** — Introduce relevant programmes and delivery formats.
3. **Day 7** — Share case study or testimonial.
4. **Day 14** — Invitation to webinar or open cohort.
5. **Day 30** — Direct outreach from commercial team.
6. **Day 60** — Re-engagement with seasonal offer.

### 6.4 Content Templates

Each campaign should have:

- Subject line variants (A/B test ready).
- Personalized greeting.
- One clear call-to-action (CTA).
- Programme/edition-specific value proposition.
- Contact person signature.
- Unsubscribe link.

---

## 7. Notifications

### 7.1 Real-Time Alerts

| Event | Recipients | Channel |
|-------|------------|---------|
| New registration | Commercial team, programme owner | Email |
| New contact / lead | Assigned salesperson | Email |
| Edition reached max seats | Programme manager | Email |
| Registration deadline approaching | Commercial team | Email |

### 7.2 Daily Summary

Sent every morning at a configurable time, containing:

- New registrations in the last 24 hours.
- New contacts/leads.
- Upcoming deadlines (editions with registration closing today/tomorrow).
- Follow-up tasks due today.

### 7.3 Weekly Summary

Sent every Monday, containing:

- Week-over-week registration count.
- Top lead sources.
- Pipeline summary by status.
- Upcoming edition calendar.
- Recommended follow-up actions.

---

## 8. Registration Flow

```
Website
  ↓
Public registration form or contact form
  ↓
Supabase / CMS backend
  ↓
Registration record created in CMS
  ↓
Lead/contact record created or updated
  ↓
Google Sheets updated (Leads / Registrations tabs)
  ↓
Notification sent to commercial team
  ↓
Follow-up sequence triggered (email marketing)
```

### 8.1 Website Forms

- Programme interest form.
- Edition registration form.
- Contact / offer request form.
- Newsletter signup form (with consent).
- Webinar registration form.

### 8.2 Data Captured on Registration

- Contact person details.
- Organization details.
- Selected programme / edition.
- Number of participants.
- Preferred delivery format.
- Budget / timing indication (optional).
- Consent checkboxes.

---

## 9. GDPR and Consent Model

### 9.1 Consent Types

| Consent | Purpose |
|---------|---------|
| Marketing emails | Receive programme promotions, newsletters, webinar invites |
| Sales contact | Be contacted by the AnimaMinds commercial team |
| Data processing | Store and process personal data for registration and communication |
| Third-party sharing | Share data with delivery partners (optional, explicit) |

### 9.2 Consent Collection

- Consent must be affirmative, not pre-ticked.
- Separate consent for marketing and sales contact.
- Record timestamp, IP address, and source form for each consent.
- Link to privacy policy near every consent checkbox.

### 9.3 Data Subject Rights

- **Right to access** — Export all stored data about a contact.
- **Right to rectification** — Update incorrect data.
- **Right to erasure** — Delete data on request.
- **Right to object** — Stop marketing communications.
- **Right to data portability** — Provide data in a machine-readable format.

### 9.4 Retention Policy

- Active leads/contacts: retained while relationship is active or nurturing.
- Dormant/unengaged contacts: reviewed annually.
- Unsubscribed contacts: retained in suppression list only.
- Past participants: retained for legal/tax and re-engagement (with consent).

---

## 10. Future SMS / WhatsApp Integration

### 10.1 Use Cases

- Last-minute seat availability alerts.
- Registration deadline reminders.
- Quick follow-up after missed calls.
- Event location/logistics updates.
- Re-engagement of high-value dormant leads.

### 10.2 Requirements

- Separate explicit consent for SMS/WhatsApp.
- Integration with providers such as Twilio, SendPulse, or MessageBird.
- Template-based messaging for consistency.
- Opt-out handling (e.g., reply STOP).
- Delivery and read receipts where available.

### 10.3 Suggested Approach

- Phase 1: Enable SMS only for registration reminders and deadline alerts.
- Phase 2: Add WhatsApp Business API for two-way conversations.
- Phase 3: Add WhatsApp chatbot for programme information and FAQs.

---

## 11. Tool Recommendations

### 11.1 Email Marketing / CRM

| Tool | Strengths | Best For |
|------|-----------|----------|
| **Brevo** (formerly Sendinblue) | Generous free tier, SMS, CRM, automation, EU-based | Small-to-medium outreach with tight budget |
| **MailerLite** | Simple UI, good automation, landing pages, affordable | Teams needing easy newsletters and sequences |
| **ActiveCampaign** | Advanced automation, segmentation, CRM, scoring | Mature sales process with complex follow-up |
| **HubSpot** | All-in-one CRM, marketing, sales, reporting | Larger team needing full funnel visibility |
| **Mailchimp** | Wide integrations, familiar UI, good templates | Basic email marketing and list management |
| **Moosend** | Cost-effective, automation, landing pages | Budget-conscious growing teams |

### 11.2 Notification / Alerting

- Email notifications can initially use the same email provider.
- For advanced alerting: Zapier / Make.com to route CMS events to Slack, email, or Sheets.

### 11.3 Google Sheets Automation

- **Zapier** or **Make.com** to push CMS data to Google Sheets.
- **Google Apps Script** for custom formatting and scheduled reports.

### 11.4 Recommendation for AnimaMinds

**Short term:**
- Use **Brevo** or **MailerLite** for email marketing and light CRM.
- Sync new registrations and contacts to Google Sheets via Zapier/Make or a custom CMS webhook.
- Use Google Sheets as the transitional follow-up workspace.

**Medium term:**
- Migrate from Sheets to the integrated CMS CRM module.
- Add segmentation and automation based on programme interest and engagement.
- Integrate SMS reminders via Brevo SMS or Twilio.

**Long term:**
- Evaluate **ActiveCampaign** or **HubSpot** if the sales process becomes complex.
- Add WhatsApp Business API for conversational marketing and support.

---

## 12. Success Metrics

| Metric | Definition |
|--------|------------|
| Lead volume | New contacts/leads per month |
| Conversion rate | Leads → registrations |
| Cost per lead | Total outreach spend / new leads |
| Email open rate | % of delivered emails opened |
| Email click rate | % of opened emails with a click |
| Registration rate from email | Registrations attributed to email campaigns |
| Pipeline value | Estimated value of proposals sent |
| Participant retention | % of past participants re-engaged |

---

## 13. Next Steps (Non-Implementation)

1. Validate organization types and segmentation with the commercial team.
2. Choose the email marketing platform (Brevo, MailerLite, or ActiveCampaign).
3. Define the Google Sheets tab structure and sync frequency.
4. Draft consent texts and privacy policy updates.
5. Prepare email templates and follow-up sequences.
6. Plan notification recipients and schedules.
7. Prioritize SMS/WhatsApp integration phase.

---

## 14. Relation to Platform Phases

This document is informational and does not modify code from Phases 01–05. When the platform enters a commercial/CRM phase, this document should be used as the functional specification.
