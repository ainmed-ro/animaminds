# IMPLEMENTATION IMPACT PLAN

**Status:** Draft — awaiting approval before any changes  
**Date:** 2026-07-13  
**Reference:** FINAL_ALIGNMENT_DECISION_MATRIX.md (approved)  
**Scope:** CMS, Website, Seed data, Certificates, Competency Records, Commercial Sheets, CPD Packages, Registration flow, Calendar, Google Sheets, Email templates  

---

## 1. Executive Summary

This plan lists every system component that must be updated so that the values approved in `FINAL_ALIGNMENT_DECISION_MATRIX.md` (durations, contact hours, individual activities, total learning hours, CPD credits, group sizes and delivery formats) are reflected consistently across the entire AnimaMinds platform and programme ecosystem.

**No changes should be implemented until this plan is approved.**

---

## 2. Impact by System

### 2.1 CMS (Content Management System)

**Current state:**
- `Programme` model has `learningHours` (Int) and `cpdHours` (Int).
- No fields for `contactHours`, `individualActivitiesHours`, `totalLearningHours`.
- No module/session data.
- Group sizes stored as `onlineMinParticipants`, `onlineMaxParticipants`, `onsiteMaxParticipants`, `experienceMinParticipants`, `experienceMaxParticipants`.
- `whatParticipantsReceive` and `includedServices` are string arrays.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Add `contactHours` field to `Programme` model | `prisma/schema.prisma` | Int or Float; per-programme default, can be overridden per edition/format |
| Add `individualActivitiesHours` field to `Programme` model | `prisma/schema.prisma` | Int or Float |
| Rename `cpdHours` to `cpdCredits` (or add `cpdCredits` alias) | `prisma/schema.prisma` | Avoid semantic confusion |
| Add `totalLearningHours` computed/stored field | `prisma/schema.prisma` or CMS form | `contactHours + individualActivitiesHours` |
| Add `ProgrammeModule` and `ProgrammeSession` models or structured JSON | `prisma/schema.prisma` | Store module names, sequence, durations and per-format session mapping |
| Update `programme-form.tsx` | `app/admin/programmes/[id]/programme-form.tsx` | Add inputs for contact hours, individual activities, CPD credits, total learning hours |
| Update CMS actions | `app/admin/actions/cms.ts` | Handle new fields in `createProgramme` / `updateProgramme` |
| Update group size fields to match approved values | `prisma/seed.ts`, CMS form | Online 15–30, Onsite 15–30, Experience 20–30 |
| Update `whatParticipantsReceive` to canonical list | `prisma/seed.ts`, CMS form | Participant workbook, one-pager, 30-day action plan, certificate, optional follow-up |

**Values to apply:**
- AI / Conversații / Busola: Contact 6.5h, Individual 1h, Total 7.5h, CPD 8
- Calm / Avantajul: Contact 6h, Individual 1h, Total 7h, CPD 7
- Experience Edition (all): Contact 10h, Individual 2h, Total 12h, CPD 12

---

### 2.2 Website

**Current state:**
- Programme listing (`/programe`) has hardcoded cards with prices, formats, durations, group sizes.
- Programme detail pages (`/programe/[slug]`) have hardcoded content.
- Calendar (`/calendar`) displays editions with display price and capacity.
- Public registration form (`/inscriere`) collects contact and participant count only.
- No CPD details, module lists or individual activities shown publicly.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Update programme cards with approved hours/CPD | `app/programe/page.tsx`, `components/ProgramList.tsx` | Pull from CMS or hardcode approved values |
| Update programme detail pages | `app/programe/[slug]/page.tsx` and client components | Display duration, contact hours, individual activities, total learning hours, CPD credits |
| Add CPD information block | All programme detail pages | CPD credits, learning hours, accreditation note |
| Add module/session structure display | Programme detail pages | Approved delivery architecture |
| Update group size display | Programme listing and detail pages | 15–30 / 15–30 / 20–30 |
| Update calendar | `app/calendar/page.tsx` | Show approved duration, CPD credits, capacity per edition |
| Update registration form | `app/inscriere/registration-form.tsx` | Show selected edition duration, CPD, group size; add GDPR link |
| Add privacy policy page | New file: `app/politica-de-confidentialitate/page.tsx` | Required by registration form consent text |
| Add confirmation page | New file: `app/inscriere/confirmare/page.tsx` | Post-registration participant-facing confirmation |

**Values to apply:** Same as CMS values above.

---

### 2.3 Seed Data

**Current state:**
- `prisma/seed.ts` creates 5 programmes with `learningHours` and `cpdHours`.
- `learningHours` is 8 for AI, Conversații, Busola (should be 7.5).
- `cpdHours` matches CPD credits but field name is ambiguous.
- Group sizes use business-approved values (15–30 / max 30 / 20–30) which is correct.
- `whatParticipantsReceive` uses the new participant-facing list.
- No `contactHours` or `individualActivitiesHours` seeded.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Update `learningHours` to total learning hours | `prisma/seed.ts` | AI/Conversații/Busola: 7.5; Calm/Avantajul: 7 |
| Rename `cpdHours` to `cpdCredits` or document semantic | `prisma/seed.ts`, schema | Keep values 8/7/12 |
| Add `contactHours` to seed | `prisma/seed.ts` | Per programme/format |
| Add `individualActivitiesHours` to seed | `prisma/seed.ts` | Per programme/format |
| Verify group sizes | `prisma/seed.ts` | Already 15–30 / max 30 / 20–30; confirm alignment with matrix |
| Verify `whatParticipantsReceive` | `prisma/seed.ts` | Align with canonical Commercial Sheet list |
| Update `duration` text | `prisma/seed.ts` | Use approved session descriptions |
| Casting to `any` | `prisma/seed.ts` | Remove after schema types are regenerated |

**Values to apply:** Same as CMS values above.

---

### 2.4 Certificates

**Current state:**
- No certificate model.
- No certificate generation workflow.
- No certificate templates.
- Certificate wording exists in PMDs/Commercial Sheets/CPD Packages.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Add `Certificate` model to schema | `prisma/schema.prisma` | Fields: id, registrationId/participantId, programmeId, editionId, issueDate, templateVersion, status, downloadUrl |
| Add certificate template(s) | New: `templates/certificate-template.html` or similar | Design branded certificate |
| Add certificate generation service | New: `lib/certificates.ts` | Generate PDF from template + data |
| Add certificate admin page | New: `app/admin/certificates/page.tsx` | Issue, revoke, download |
| Add certificate participant download page | New: `app/certificat/[token]/page.tsx` | Public/secure download |
| Add certificate data fields | Template + service | Participant name, programme name, duration, contact hours, total learning hours, CPD credits, issue date, certificate number |
| Add certificate trigger | `app/admin/actions/cms.ts` or cron | Issue after edition completion / attendance confirmation |

**Certificate wording (to match approved values):**
- "Certificate of Completion"
- Programme name, total learning hours, contact hours, CPD credits earned
- Delivery format and dates
- Accreditation body / CPD provider reference (when available)

---

### 2.5 Competency Records

**Current state:**
- No competency record model.
- Competency wording exists in PMDs and seed benefits.
- No generation workflow.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Add `CompetencyRecord` model to schema | `prisma/schema.prisma` | Fields: id, participantId, programmeId, editionId, competenciesDeveloped (JSON), issueDate, status |
| Define `competenciesDeveloped` per programme | `prisma/seed.ts` or CMS | Map PMD competencies to structured JSON |
| Add competency record template | New: `templates/competency-record-template.html` | Branded PDF |
| Add generation service | New: `lib/competency-records.ts` | Generate PDF |
| Add admin and participant views | New admin page + public download | Issue and download |

**Competency wording:**
- "Competency Achievement Record"
- List of competencies developed per programme (from PMD learning outcomes)
- Link to programme duration, contact hours, CPD credits

---

### 2.6 Commercial Sheets

**Current state:**
- Commercial Sheets v1 exist in `AnimaMinds_Knowledge_System/Commercial_System/PMD_00X/Commercial_Sheet_v1.md`.
- Values already match approved matrix.
- Some programmes have v2 commercial sheets.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Verify all v1 Commercial Sheets match matrix | `Commercial_System/PMD_001...005/Commercial_Sheet_v1.md` | Duration, contact hours, self-study, total learning hours, CPD points |
| Archive or update v2 Commercial Sheets | `Commercial_System/PMD_001/Commercial_Sheet_v2.md` | Ensure v2 does not contradict v1/matrix |
| Add group size note | All Commercial Sheets | Reference approved group sizes from matrix (15–30 / 15–30 / 20–30) if different from PMD |
| Add pricing placeholders | All Commercial Sheets | If pricing section exists, leave as ON REQUEST until pricing is approved |

---

### 2.7 CPD Packages

**Current state:**
- CPD Packages v2 exist for AI and possibly others.
- Values generally match matrix.
- Some sample agendas may be empty for Online/Onsite.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Verify all CPD Packages match matrix | `Commercial_System/PMD_00X/CPD_Package_v2.md` | Hours, CPD credits, assessment methods |
| Complete empty sample agendas | CPD Packages | Add Online Live and Onsite module-to-session mapping where missing |
| Add group size note | CPD Packages | Reference approved group sizes |
| Add CPD record wording | CPD Packages | Ensure wording matches certificate/competency record |

---

### 2.8 Registration Flow

**Current state:**
- Public registration form at `/inscriere`.
- `participantsJson` is hardcoded to `[]`.
- No participant confirmation email.
- No payment workflow.
- No individual participant data collection.
- Redirects to `/calendar?success=1`.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Collect individual participant data | `app/inscriere/registration-form.tsx` | Replace empty `participantsJson` with fields for name, email, role, phone per participant |
| Add validation against min/max group size | `app/inscriere/registration-form.tsx`, `app/admin/actions/cms.ts` | Use approved group sizes |
| Add participant confirmation email | `lib/notifications.ts`, `app/admin/actions/cms.ts` | Send after `submitPublicRegistration` |
| Add payment status workflow | `Registration` model + UI | Pending → Awaiting Invoice → Paid / On Hold |
| Add invoice request fields | Registration form + model | Billing address, CUI, entity details |
| Add dedicated confirmation page | New: `app/inscriere/confirmare/page.tsx` | Show registration summary and next steps |
| Add GDPR privacy policy link | Registration form | Link to `/politica-de-confidentialitate` |

**Values to apply:**
- Min/max participant count per format from approved group sizes.
- Display approved duration and CPD credits on the form.

---

### 2.9 Calendar

**Current state:**
- `/calendar` displays open editions.
- Shows programme name, edition title, format, dates, city, available seats, price.
- Does not show CPD credits or total learning hours.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Display approved duration per edition | `app/calendar/page.tsx` | Pull from edition/programme data |
| Display CPD credits | `app/calendar/page.tsx` | Per edition format |
| Display total learning hours | `app/calendar/page.tsx` | Per edition format |
| Display group size range | `app/calendar/page.tsx` | Min–max per format |
| Link to registration with pre-selected edition | `app/calendar/page.tsx` | Pass edition ID |

**Values to apply:** Same as CMS values above.

---

### 2.10 Google Sheets Fields

**Current state:**
- `lib/google-sheets.ts` syncs contacts and registrations.
- Registration sync includes: programme, edition, contact info, participant count, entity, payment status, notes, date.
- Contact sync includes: name, email, phone, organization, program interest, subject, message, date.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Add approved hours/CPD columns to registration sync | `lib/google-sheets.ts` | Contact hours, total learning hours, CPD credits |
| Add delivery format column explicitly | `lib/google-sheets.ts` | Already passed via edition; ensure column exists |
| Add group size columns | `lib/google-sheets.ts` | Min/max participants for the edition |
| Add certificate issue status column | `lib/google-sheets.ts` | Future: when certificate is issued |
| Add competency record status column | `lib/google-sheets.ts` | Future |
| Update Google Apps Script | `UPDATED_GOOGLE_APPS_SCRIPT.js` | Accept new fields and write to correct columns |
| Update `GOOGLE_SHEET_SETUP.md` | `GOOGLE_SHEET_SETUP.md` | Document new columns |

**Values to apply:**
- Contact hours, total learning hours, CPD credits per registration.
- Group size min/max per edition format.

---

### 2.11 Email Templates

**Current state:**
- Admin emails: new registration, new contact, daily summary, weekly summary.
- No participant-facing emails.

**Required changes:**

| Change | Files | Details |
|---|---|---|
| Add participant registration confirmation email | `lib/notifications.ts` | Include programme, edition, dates, duration, CPD credits, payment instructions |
| Add payment reminder email | `lib/notifications.ts` | Trigger based on payment status |
| Add payment confirmation email | `lib/notifications.ts` | After payment status updated to PAID |
| Add pre-program reminder email | `lib/notifications.ts` | 24h and 1h before first session |
| Add post-program follow-up sequence | `lib/notifications.ts` | Day 2, Day 7, Day 14, Day 30 (as mentioned in PMDs) |
| Add certificate ready email | `lib/notifications.ts` | Include download link |
| Add competency record ready email | `lib/notifications.ts` | Include download link |
| Update admin registration email | `lib/notifications.ts` | Include approved hours/CPD and participant count validation against group size |
| Add email trigger logic | `app/admin/actions/cms.ts` | Send confirmation after `submitPublicRegistration`; payment reminders via cron |

**Email values to apply:**
- Duration per format from matrix.
- Contact hours, total learning hours, CPD credits.
- Group size min/max.
- Programme-specific competencies/outcomes.

---

## 3. Cross-Cutting Changes

### 3.1 Database migration
A single Prisma migration is required after schema changes:
- Add `contactHours`, `individualActivitiesHours`, `cpdCredits` fields.
- Add `Certificate`, `CompetencyRecord`, `Participant` models.
- Optionally rename `cpdHours` → `cpdCredits` with data migration.

### 3.2 CMS admin navigation
Add admin menu items for:
- Certificates
- Competency Records
- Participants
- Notification Templates

### 3.3 Tests
Update or add Playwright tests for:
- Programme page displays approved hours/CPD.
- Calendar displays approved values.
- Registration form enforces group size min/max.
- Confirmation email sent after registration.

### 3.4 Legal pages
Create before launch:
- `/politica-de-confidentialitate`
- `/cookie-policy` or banner
- `/termeni-si-conditii` already exists

---

## 4. Implementation Sequence Recommendation

| Phase | Items | Rationale |
|---|---|---|
| **Phase 1: Foundation** | Schema migration, seed update, CMS fields | Data model must be correct before UI |
| **Phase 2: CMS & Admin** | Programme forms, edition scheduler, group sizes, price links | Content source of truth |
| **Phase 3: Public Website** | Programme pages, calendar, registration form, privacy policy | Participant-facing accuracy |
| **Phase 4: Notifications** | Confirmation, reminder, payment emails | Complete participant journey |
| **Phase 5: Payments & Invoices** | Payment workflow, invoice fields | Revenue readiness |
| **Phase 6: Certificates & CPD** | Certificate/CompetencyRecord models, templates, generation | Post-programme delivery |
| **Phase 7: Reporting** | Google Sheets fields, admin dashboard | Operations and analytics |

---

## 5. Risk Summary

| Risk | Impact | Mitigation |
|---|---|---|
| `cpdHours` field name confusion | Incorrect certificates, CPD records | Rename to `cpdCredits` in schema and all code |
| `learningHours` mismatch persists in seed | Website displays wrong total hours | Update seed and all hardcoded website values |
| Group sizes differ from PMDs | Customer expectations / logistics issues | Document business decision in Commercial Sheets and CPD Packages |
| Missing privacy policy | Legal/GDPR risk | Create `/politica-de-confidentialitate` before launch |
| No payment workflow | Cannot collect revenue | Implement Phase 5 before opening paid editions |
| No certificate workflow | Cannot deliver promised certificates | Implement Phase 6 before first edition completion |

---

## 6. Approval Block

**This plan is frozen pending approval.**

Do not modify any code, schema, seed data, templates, Google Sheets scripts, or programme documents until this impact plan is explicitly approved.
