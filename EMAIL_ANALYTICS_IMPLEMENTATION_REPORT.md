# Email Analytics Implementation Report

**Generated:** 2026-07-12
**Scope:** Resend webhook integration, Prisma/Superbase storage, CMS analytics pages.

---

## 1. Summary

Implemented an end-to-end email analytics system that:

- Captures every email sent through Resend inside the app.
- Receives Resend webhook events (`delivered`, `opened`, `clicked`, `bounced`, `complained`, `unsubscribed`).
- Stores email metadata and events in the existing PostgreSQL database via Prisma.
- Exposes three CMS pages: **Email Activity**, **Campaign Analytics**, **Contact Activity**.
- Adds email KPI cards to the admin dashboard.

---

## 2. Files Created / Modified

### Database schema

- `prisma/schema.prisma`
  - Added enums: `EmailType`, `EmailStatus`, `EmailEventType`.
  - Added models: `Email`, `EmailEvent` with indexes.

### Email sending

- `lib/notifications.ts`
  - Added `sendAndLogEmail` helper.
  - Updated `sendAdminNewRegistrationEmail`, `sendAdminNewContactEmail`, `sendDailySummaryEmail`, `sendWeeklySummaryEmail` to store `Email` rows and capture `resendId`.
- `app/api/registrations/route.ts`
  - Replaced direct `resend.emails.send` calls with `sendAndLogEmail`.
  - Participant confirmation and admin notification are now tracked.
- `app/admin/actions/cms.ts`
  - `submitPublicRegistration` now passes `registrationId` to `sendAdminNewRegistrationEmail`.

### Webhook

- `app/api/webhooks/resend/route.ts`
  - `POST` endpoint that verifies `Resend-Signature` (when `RESEND_WEBHOOK_SECRET` is set).
  - Maps Resend event types to `EmailEventType` enum values.
  - Looks up the `Email` record by `resendId` and creates an `EmailEvent` row.

### CMS pages

- `app/admin/emails/page.tsx` — Email Activity list + 30-day stats.
- `app/admin/emails/campaigns/page.tsx` — Campaign Analytics (emails/events grouped by type).
- `app/admin/emails/contacts/page.tsx` — Contact Activity search + per-contact stats.
- `app/admin/actions/emails.ts` — Server actions powering the pages.
- `app/admin/layout.tsx` — Added "Email Analytics" to the sidebar.
- `app/admin/page.tsx` — Added email KPI cards to the dashboard.

### Environment variables

The following variables are required/used:

| Variable | Required? | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes | Send emails through Resend. |
| `RESEND_WEBHOOK_SECRET` | Recommended | Verify Resend webhook signatures. |
| `FROM_EMAIL` | No | Sender address (defaults to `AnimaMinds <noreply@animaminds.ro>`). |
| `ADMIN_EMAIL` | No | Admin recipient (defaults to `contact@animaminds.ro`). |

---

## 3. Data Model

### `Email`

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Internal CUID. |
| `resendId` | `String?` | Resend email ID (unique, used for webhook matching). |
| `recipient` | `String` | To address. |
| `recipientName` | `String?` | Display name when known. |
| `subject` | `String` | Email subject. |
| `fromAddress` | `String` | From address. |
| `type` | `EmailType` | `ADMIN_CONTACT`, `ADMIN_REGISTRATION`, `PARTICIPANT_CONFIRMATION`, `DAILY_SUMMARY`, `WEEKLY_SUMMARY`. |
| `status` | `EmailStatus` | `SENT` or `FAILED`. |
| `relatedType` | `String?` | `CONTACT`, `REGISTRATION`, etc. |
| `relatedId` | `String?` | ID of the related record (e.g. Prisma `Registration.id` or Supabase `contact_messages.id`). |
| `metadata` | `Json?` | Extra context (programme, edition, participant count, error message). |
| `sentAt` | `DateTime` | When the email was sent. |

### `EmailEvent`

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Internal CUID. |
| `emailId` | `String` | FK to `Email`. |
| `type` | `EmailEventType` | `DELIVERED`, `OPENED`, `CLICKED`, `BOUNCED`, `COMPLAINED`, `UNSUBSCRIBED`. |
| `occurredAt` | `DateTime` | Timestamp from Resend. |
| `data` | `Json?` | Raw webhook payload data. |

---

## 4. Architecture

```
Website Form
     │
     ▼
Next.js API / Server Action
     │  - saves form data
     │  - calls sendAndLogEmail()
     ▼
Resend SDK ──creates──► Email row (status=SENT, resendId captured)
     │
     ▼
Resend API delivers email
     │
     ▼
Resend Webhook ──POST──► /api/webhooks/resend
     │                      (signature verified)
     ▼
EmailEvent row created (DELIVERED / OPENED / CLICKED / ...)
     │
     ▼
CMS pages read Email + EmailEvent via Prisma
```

---

## 5. CMS Pages

### Email Activity (`/admin/emails`)

- 30-day statistics cards: Sent, Failed, Delivered, Opened, Clicked, Bounced, Complained, Unsubscribed.
- Paginated-style table of recent emails with recipient, subject, type, status, events, sent time.
- Links to Campaign Analytics and Contact Activity.

### Campaign Analytics (`/admin/emails/campaigns`)

- Emails grouped by `EmailType`.
- Events grouped by `EmailEventType`.
- Useful to compare performance of admin alerts vs. participant confirmations vs. summaries.

### Contact Activity (`/admin/emails/contacts?email=...`)

- Search by email address.
- Per-contact rollup: Email Sent, Delivered, Opened, Clicked, Last Activity.
- Table of every email sent to that address and its events.

### Dashboard (`/admin`)

- Added cards: Emails Sent (30d), Opened (30d), Clicked (30d), Bounced (30d).

---

## 6. Linking Analytics to Leads, Contacts, Institutions, Registrations

- **Registrations:** every admin/participant email stores `relatedType = 'REGISTRATION'` and `relatedId = <registrationId>`.
- **Contacts:** contact-form admin emails store `relatedType = 'CONTACT'`. The `relatedId` is currently set from `registrationId` only where available; to fully link a contact message you can extend `sendAdminNewContactEmail` to also receive the Supabase `contact_messages.id` and store it as `relatedId`.
- **Leads / Institutions:** the system does not have a dedicated `Lead` or `Institution` model. Leads can be treated as `CONTACT` records (from Supabase) or `REGISTRATION` records (from Prisma). Institution names are stored in `Email.metadata.organization` or `Registration.entityName`.

**Recommended follow-up:**
- When inserting a contact message, pass the returned `id` into `sendAdminNewContactEmail` and store it as `relatedId`.
- If a dedicated `Lead` or `Institution` model is added later, extend `Email.relatedType` values accordingly.

---

## 7. Verification Steps

### 7.1 Apply the database migration

Run in the project directory:

```bash
npx prisma migrate dev --name add_email_analytics
```

Or on a hosted environment:

```bash
npx prisma migrate deploy
```

### 7.2 Regenerate Prisma Client

Already done via `npm run db:generate`. Re-run if you change the schema:

```bash
npm run db:generate
```

### 7.3 Configure Resend webhook

1. Go to `https://resend.com/webhooks`.
2. Add a webhook URL: `https://animaminds.ro/api/webhooks/resend` (replace domain with your actual deployed domain).
3. Select events:
   - `email.delivered`
   - `email.opened`
   - `email.clicked`
   - `email.bounced`
   - `email.complained`
   - `email.unsubscribed`
4. Copy the webhook signing secret into `RESEND_WEBHOOK_SECRET`.

### 7.4 Test webhook locally (with a public tunnel)

Use `ngrok` or `cloudflared` to expose `http://localhost:3000`:

```bash
npx ngrok http 3000
```

Set the ngrok URL + `/api/webhooks/resend` in Resend, then submit a contact or registration form.

### 7.5 Manual webhook test with curl

```bash
curl -X POST https://your-domain.com/api/webhooks/resend \
  -H "Content-Type: application/json" \
  -d '{
    "type": "email.delivered",
    "created_at": "2026-07-12T12:00:00.000Z",
    "data": { "id": "SOME_RESEND_ID", "to": ["admin@example.com"], "from": "noreply@animaminds.ro", "subject": "Test" }
  }'
```

Expected response: `{"received":true}`.

### 7.6 Verify data in Prisma Studio

```bash
npx prisma studio
```

Check:
- `Email` rows are created after form submissions.
- `EmailEvent` rows are created after webhook deliveries.

### 7.7 Verify CMS pages

1. Log in to `/admin`.
2. Open `/admin/emails` and confirm the recent email appears.
3. Open `/admin/emails/campaigns` and confirm grouping.
4. Open `/admin/emails/contacts?email=contact@animaminds.ro` and confirm stats.

---

## 8. Known Limitations / Next Improvements

- `relatedId` for contact messages is not yet populated because the contact form currently does not pass the Supabase `contact_messages.id` to the email sender. This can be added in a follow-up.
- The app does not have dedicated `Lead` or `Institution` models; they are currently represented by `CONTACT` and `REGISTRATION` records.
- Open/click tracking depends on Resend's domain-level open/click tracking being enabled for the verified sender domain.
- Webhook signature verification is skipped if `RESEND_WEBHOOK_SECRET` is not set; always set it in production.

---

## 9. Conclusion

Email analytics is now implemented end-to-end:

- ✅ Resend webhooks integrated.
- ✅ All requested events stored: Delivered, Opened, Clicked, Bounced, Complained, Unsubscribed.
- ✅ Prisma models created: `Email`, `EmailEvent`.
- ✅ CMS pages created: Email Activity, Campaign Analytics, Contact Activity.
- ✅ Analytics linked to Registrations and Contacts; extensible to future Leads/Institutions.
- ✅ Per-contact metrics: Email Sent, Delivered, Opened, Clicked, Last Activity.
- ✅ Dashboard statistics added.

The remaining step is to run the database migration and configure the Resend webhook URL + secret in production.
