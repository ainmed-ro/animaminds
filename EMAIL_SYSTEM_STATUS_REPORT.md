# Email System Status Report

**Generated:** 2026-07-12
**Scope:** Current Resend integration in the AnimaMinds Next.js app.
**Source:** Code review of `lib/notifications.ts`, `lib/email-templates.ts`, `app/api/contact/route.ts`, `app/api/registrations/route.ts`, `app/admin/actions/cms.ts`, `app/api/cron/*`, `prisma/schema.prisma`.

---

## 1. Is Resend currently configured and sending emails?

**Partially — YES, for sending.**

- `resend` package is installed (`package.json` line 31, version `^6.17.1`).
- Two places instantiate the Resend client:
  - `lib/notifications.ts` line 3: `const resend = new Resend(process.env.RESEND_API_KEY)`
  - `app/api/registrations/route.ts` line 6: `const resend = new Resend(process.env.RESEND_API_KEY)`
- Required environment variables (not present in repo, expected at runtime):
  - `RESEND_API_KEY`
  - `FROM_EMAIL` (defaults to `AnimaMinds <noreply@animaminds.ro>`)
  - `ADMIN_EMAIL` (defaults to `contact@animaminds.ro`)
  - `NEXT_PUBLIC_SITE_URL`
  - `CRON_SECRET` (for cron routes)
- All sends are wrapped in `try/catch`, so a Resend failure does **not** block the form submission.

**Caveat:** This report is based on code only. Actual deliverability (domain verification, sender reputation, API key validity) cannot be verified from the codebase.

---

## 2. What emails are sent when somebody submits the Contact or Registration forms?

### Contact Form (`/contact` → `app/api/contact/route.ts`)

| Trigger | Email sent? | To | Content | Sender |
|---|---|---|---|---|
| Submit contact form | **YES** | `ADMIN_EMAIL` | Admin notification with name, email, phone, organization, program interest, subject, message | `FROM_EMAIL` |

Function: `sendAdminNewContactEmail` in `lib/notifications.ts` lines 58-103.

### Public Registration Form (`/inscriere` → `app/admin/actions/cms.ts` `submitPublicRegistration`)

| Trigger | Email sent? | To | Content | Sender |
|---|---|---|---|---|
| Submit public registration | **YES** | `ADMIN_EMAIL` | Admin notification with contact name, email, phone, edition, programme, participant count | `FROM_EMAIL` |

Function: `sendAdminNewRegistrationEmail` in `lib/notifications.ts` lines 8-56.

### Legacy Registration API (`/api/registrations` — `app/api/registrations/route.ts`)

| Trigger | Email sent? | To | Content | Sender |
|---|---|---|---|---|
| POST to `/api/registrations` | **YES** | Participant (`reg.email`) | Confirmation email — "Manifestarea dumneavoastră de interes a fost înregistrată" | `FROM_EMAIL` |
| Same POST | **YES** | `ADMIN_EMAIL` | Admin notification with registration details | `FROM_EMAIL` |

Functions: `participantEmailHtml` and `adminEmailHtml` in `lib/email-templates.ts`.

### Automated Summary Emails

| Trigger | Email sent? | To | Content |
|---|---|---|---|
| Daily cron (`/api/cron/daily`) | **YES** | `ADMIN_EMAIL` | Count of new registrations, upcoming edition deadlines |
| Weekly cron (`/api/cron/weekly`) | **YES** | `ADMIN_EMAIL` | Weekly registration/contact totals and upcoming editions |

Functions: `sendDailySummaryEmail` and `sendWeeklySummaryEmail` in `lib/notifications.ts`.

**Known limitation:** Daily/weekly summaries report `newContacts = 0` because contact messages are stored in Supabase, not queried from Prisma. Comment in `app/api/cron/daily/route.ts` line 19-20 acknowledges this.

---

## 3. Can we currently track email metrics?

| Metric | Currently trackable? |
|---|---|
| **Delivered** | **NO** |
| **Opened** | **NO** |
| **Clicked** | **NO** |
| **Bounced** | **NO** |
| **Spam Complaints** | **NO** |

There is no webhook endpoint, no tracking pixel, no link wrapping, no event storage, and no `resendId` returned from sends is persisted anywhere in the database.

---

## 4. If YES — where can I see it?

Not applicable. None of the metrics above are currently tracked in the app.

The only place you could see any email performance data today is:

- **Resend dashboard** — `https://resend.com/emails` and `https://resend.com/analytics` (requires logging in with the Resend account that owns the API key).

There is no link, widget, or page inside the AnimaMinds admin/CMS that displays email metrics.

---

## 5. If NO — what is missing?

To track the five metrics, the following components are missing:

1. **Resend webhook endpoint** in the app (e.g. `/api/webhooks/resend`) to receive `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained` events.
2. **Database table(s)** to store email sends and events. Currently `prisma/schema.prisma` has no `Email`, `EmailEvent`, or `EmailLog` model.
3. **Storing the Resend `id`** returned by `resend.emails.send(...)` so webhook events can be matched to a sent email.
4. **Tracking pixels / link rewriting** — technically handled by Resend when open/click tracking is enabled on the Resend domain/sender, but the app does not request or configure this.
5. **Admin UI page** to view email logs and metrics.

---

## 6. Can these metrics be added without additional monthly cost?

**Yes, mostly.**

- **Resend webhooks are free.** You configure the webhook URL in the Resend dashboard and Resend pushes events to your endpoint at no extra charge.
- **Storing events in your existing database** (Prisma/PostgreSQL on Supabase or Vercel Postgres) uses existing infrastructure.
- **Resend Analytics dashboard** has higher-level metrics; some advanced analytics may require a paid Resend plan, but webhook event data is available on all plans.
- **Potential cost:** if email volume grows beyond the Resend free tier (currently 100 emails/day on the free plan), you move to a paid plan. Tracking itself does not increase cost.

---

## 7. Can these metrics be stored in Supabase and displayed in the CMS?

**Yes.**

Recommended minimal implementation:

1. Add Prisma models:
   - `Email` — stores recipient, subject, `resendId`, related record type/id (registration/contact), send timestamp.
   - `EmailEvent` — stores event type (`delivered`, `opened`, `clicked`, `bounced`, `complained`), timestamp, IP/URL metadata.
2. Update every `resend.emails.send(...)` call to capture and store the returned `id`.
3. Create `app/api/webhooks/resend/route.ts` to validate Resend signature and write events to `EmailEvent`.
4. Add an admin page (e.g. `/admin/emails`) listing sends and their statuses.
5. Add a small dashboard card showing counts per event type.

This is a standard webhook + CRUD pattern and fits the existing Next.js + Prisma + React stack.

---

## 8. Current Resend Integration Architecture

```
┌─────────────────┐     ┌─────────────────────────┐     ┌──────────────────────┐
│  Website Form   │────▶│  Next.js API / Action   │────▶│   Resend SDK         │
│  (/contact,     │     │  (lib/notifications.ts, │     │   (lib + /api/       │
│   /inscriere)   │     │   app/admin/actions)    │     │    registrations)    │
└─────────────────┘     └─────────────────────────┘     └──────────────────────┘
                                                                │
                                                                ▼
                                                       ┌──────────────────────┐
                                                       │   Resend REST API    │
                                                       └──────────────────────┘
                                                                │
                                                                ▼
                                                       ┌──────────────────────┐
                                                       │   Email delivery     │
                                                       │   (no event loopback)│
                                                       └──────────────────────┘
```

**Notes:**
- `resend.emails.send(...)` is called synchronously but not awaited in a way that blocks the user response.
- The returned send `id` is **not captured**.
- No webhook listener exists to receive delivery/open/click/bounce/complaint events.

---

## 9. Website → Email Sent → Delivery Tracking → Analytics Flow

### Current Flow

```
Website Form Submission
        │
        ▼
┌─────────────────────────────┐
│ Server Action / API Route     │
│  - saves data to DB/Supabase  │
│  - calls Resend SDK           │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│ Resend API accepts email    │
│ Returns a send ID           │
│ (ID is discarded)           │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│ Resend delivers to recipient│
│ No delivery status stored   │
└─────────────────────────────┘
        │
        ▼
   Tracking / Analytics ends here.
   Nothing is recorded back to the app.
```

### What the flow should look like for full tracking

```
Website Form Submission
        │
        ▼
┌─────────────────────────────┐
│ Server Action / API Route     │
│  - saves form data            │
│  - calls Resend SDK           │
│  - stores returned resendId │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│ Resend API                    │
│ Returns send ID               │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│ Resend delivers / opens /   │
│ clicks / bounces / complains│
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│ POST /api/webhooks/resend   │
│ Writes EmailEvent rows        │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│ Admin CMS reads Email +     │
│ EmailEvent tables           │
└─────────────────────────────┘
```

---

## 10. Final Conclusion

### What already works

- Resend SDK is installed and instantiated.
- Admin notification emails are sent for:
  - New contact form submissions.
  - New public registrations.
- Participant confirmation email is sent by the legacy `/api/registrations` endpoint.
- Daily and weekly summary emails are set up via cron routes.
- All sends are non-blocking (form submission succeeds even if email fails).

### What is partially implemented

- Summary cron jobs exist but do **not** count contact messages because those live in Supabase, not Prisma.
- The registration flow uses two different email paths (`lib/notifications.ts` for public form, `lib/email-templates.ts` for legacy API).
- Environment variables are not validated at startup; missing `RESEND_API_KEY` only surfaces as a logged error.

### What still needs implementation

- **Email tracking is entirely missing.** No database models, no webhook endpoint, no capture of Resend send IDs.
- **No CMS / admin view** for email performance metrics.
- **No bounce / complaint handling** (e.g. disabling invalid emails, alerting admin).
- **No open/click tracking configuration** in Resend sends.
- **Contact-message counts** are not included in daily/weekly summaries.
- **No retry mechanism** for failed critical emails.

### Recommended next steps (if you want tracking)

1. Add `Email` and `EmailEvent` Prisma models.
2. Capture the `id` returned by every `resend.emails.send(...)` call.
3. Implement `/api/webhooks/resend` and register it in the Resend dashboard.
4. Build `/admin/emails` to view sends and event counts.
5. Enable open/click tracking in Resend for the verified sender domain.

---

**Bottom line:** The app can send emails through Resend today, but it cannot track whether they were delivered, opened, clicked, bounced, or marked as spam. The only way to see any metrics right now is to log in to the Resend dashboard directly.
