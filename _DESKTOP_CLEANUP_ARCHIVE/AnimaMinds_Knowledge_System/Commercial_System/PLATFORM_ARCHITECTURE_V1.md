# PLATFORM_ARCHITECTURE_V1.md

**Project:** AnimaMinds Website & Programme Management Platform — Faza 1  
**Status:** Architecture proposal — pending approval  
**Date:** 2026-07-12  
**Version:** 1.0

---

## 1. Executive Summary

This document proposes the architecture for evolving the existing AnimaMinds website into an administrable Programme Management Platform. It is an architecture-only proposal; no implementation is requested or authorized at this stage.

**Core principles:**
- Preserve the existing brand identity (logo, colours, fonts, premium and warm human feel).
- Build around the five approved programmes: AI Fără Haos, Conversații care Contează, Calm sub Presiune, Busola Deciziilor, Avantajul Uman.
- Establish a Single Source of Truth (SSOT) for programme, edition and pricing data.
- Favour evolution of the existing site over full rebuild.
- Keep Phase 1 scope minimal, stable and administrable.
- Design for Phase 2 extensibility without implementing it now.

**Deliverable:** This document only.  
**Next step:** Await business approval before any code, database or CMS work begins.

---

## 2. Current Website Assessment

### Assumptions about current state

- A Next.js website exists at the repository root (`app/` directory visible).
- Content is currently static or partially hardcoded in TSX/MDX files.
- No administrable CMS exists for programmes, editions, prices or pages.
- The existing design system, components and pages can be retained.
- The Knowledge System and programme documents are stored in Markdown files under `AnimaMinds_Knowledge_System/`.

### What must not change now

- Logo, colours, typography, visual style.
- Public brand message: "Locul unde oamenii și ideile cresc împreună."
- Tone of voice: warm, human, premium, non-corporate-training.
- Existing programme names and pedagogical structure.
- Existing documentation (PMDs, Workbooks, Facilitator Guides, Commercial Sheets, CPD Packages).

### What the platform should fix

- Manual duplication of programme information across pages.
- Lack of centralised programme status, dates, prices and seat availability.
- No clear admin workflow for creating editions, pricing variants or FAQ updates.
- No structured data model for target audiences or application areas.
- No dedicated public-procurement / SICAP workflow page.
- No central testimonial and gallery management.

---

## 3. Existing Approved Assets

The platform is built around five approved programmes. Each has the following frozen documents:

| Programme | PMD | Workbook | Facilitator Guide | Commercial Sheet | CPD Package |
|---|---|---|---|---|---|
| AI Fără Haos (PMD_001) | PMD_001_AI_Fara_Haos_v2.md | Workbook_v2.md | Facilitator_Guide_v2.md | Commercial_Sheet_v2.md | CPD_Package_v2.md |
| Conversații care Contează (PMD_002) | PMD_002_Conversatii_care_Conteaza_v2.md | Workbook_v1.md | Facilitator_Guide_v1.md | Commercial_Sheet_v1.md | CPD_Package_v1.md |
| Calm sub Presiune (PMD_003) | PMD_003_Calm_sub_Presiune_v2.md | Workbook_v1.md | Facilitator_Guide_v1.md | Commercial_Sheet_v1.md | CPD_Package_v1.md |
| Busola Deciziilor (PMD_004) | PMD_004_Busola_Deciziilor_v2.md | Workbook_v1.md | Facilitator_Guide_v1.md | Commercial_Sheet_v1.md | CPD_Package_v1.md |
| Avantajul Uman (PMD_005) | PMD_005_Avantajul_Uman_v2.md | Workbook_v1.md | Facilitator_Guide_v1.md | Commercial_Sheet_v1.md | CPD_Package_v1.md |

Additional approved shared asset:
- `EMOTIONAL_SAFETY_PROTOCOL.md` — used by PMD_002 and PMD_003.

These documents remain the authoritative source for pedagogical and professional content. The CMS should allow administrators to reference them and optionally mirror selected fields, but the PMDs themselves are not edited through the CMS in Phase 1.

---

## 4. Proposed System Architecture

### High-level architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AnimaMinds Public Website                 │
│           (Next.js + React + Tailwind + existing design)    │
└───────────────────────┬─────────────────────────────────────┘
                        │ API / Server Components
┌───────────────────────▼─────────────────────────────────────┐
│              CMS / Admin Layer (headless or embedded)        │
│        Programmes | Editions | Prices | Pages | Forms        │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│     SSOT for programmes, editions, prices, registrations    │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│          File / Document Store (Markdown + assets)            │
│   PMDs, Workbooks, Guides, Sheets, CPD Packages, images      │
└─────────────────────────────────────────────────────────────┘
```

### Single source of truth hierarchy

```
Official documentation (PMD + commercial assets)
        ↓
CMS Programme record (mirrors approved fields)
        ↓
CMS Editions, Prices, Pages, FAQ, Testimonials
        ↓
Website pages, cards, checkout, forms
```

**Rule:** A change in the CMS programme record propagates automatically to all dependent pages and components. A change in the underlying PMD still requires a CMS sync step (manual or scripted), because PMDs are not CMS-managed in Phase 1.

---

## 5. Recommended Technology Stack

### Keep existing

| Layer | Technology | Reason |
|---|---|---|
| Frontend framework | Next.js 14+ (App Router) | Existing codebase; minimal migration |
| Styling | Tailwind CSS + existing design tokens | Preserve brand identity |
| Components | React Server Components + Client Components | Performance + interactivity |
| Hosting | Existing hosting (Vercel assumed) | Continuity |

### Add for Phase 1

| Layer | Technology | Reason |
|---|---|---|
| CMS | Payload CMS 3.x (self-hosted) or Sanity | Deep content modelling, self-hosting, role-based access |
| Database | PostgreSQL | Relational data, JSON fields, robust querying |
| ORM | Prisma or Drizzle | Type-safe database access |
| File storage | Local / S3-compatible | Images, documents, gallery assets |
| Search | Postgres full-text or Algolia (later) | Programme and page search |
| Forms | React Hook Form + Zod + API routes | Validated, flexible forms |
| Auth | NextAuth.js or Payload built-in auth | Admin and future user accounts |
| Payments | Stripe (B2C) + manual invoicing (B2B/B2G) | Mature, well-documented |

### Why Payload CMS (recommended)

- Self-hosted alongside Next.js.
- Collections and fields defined in code.
- Strong relationship support (Programme → Editions → Prices).
- Role-based access control.
- Localization and versioning possible later.
- No vendor lock-in comparable to proprietary SaaS CMS.

**Alternative:** Sanity if a fully managed, API-first headless CMS is preferred and self-hosting is not a requirement.

---

## 6. CMS Architecture

### CMS collections (Phase 1)

| Collection | Purpose |
|---|---|
| `Programmes` | Master records for the 5 approved programmes |
| `Editions` | Scheduled occurrences of a programme |
| `Prices` | Price variants linked to programmes and editions |
| `Pages` | Static/dynamic pages (Home, About, Public Procurement, etc.) |
| `Testimonials` | Participant quotes with consent and usage metadata |
| `FAQs` | Question/answer entries linked to programmes or pages |
| `Galleries` | Image groups for programmes, editions or pages |
| `Documents` | Attachments (workbooks, CPD packages, commercial sheets) |
| `BlogPosts` | Articles and thought leadership |
| `Taxonomies` | Target audiences and application areas |
| `Forms` | Form definitions and submissions |
| `Users` | Admins and future facilitators |

### CMS globals (Phase 1)

| Global | Purpose |
|---|---|
| `SiteSettings` | Brand info, contact details, social links, default SEO |
| `Navigation` | Header and footer menus |
| `PublicProcurement` | Content for the „Achiziții publice" page |
| `TransportInfo` | Text for transport support option |

### Field-level constraints

- Required fields enforced in CMS validation.
- Slug generation from programme names.
- Status fields control visibility.
- Rich text limited to approved styles (no custom colours or fonts).

---

## 7. Database Entities

### Entity list

```
Programme
├── Editions (1:N)
├── Prices (1:N)
├── Testimonials (N:M)
├── FAQs (1:N)
├── Galleries (N:M)
├── Documents (N:M)
├── TargetAudiences (N:M)
└── ApplicationAreas (N:M)

Edition
├── Programme (N:1)
├── Prices (1:N)
├── Registrations (1:N)
└── Gallery (1:1 optional)

Price
├── Programme (N:1, optional)
├── Edition (N:1, optional)
└── PriceType (enum)

Page
├── Sections (array)
└── SEO (1:1)

Testimonial
├── Programmes (N:M)
├── ConsentRecord (text)
└── ApprovedUses (array)

FAQ
├── Programme (N:1, optional)
└── Page (N:1, optional)

Registration
├── Edition (N:1)
├── Contact (JSON)
├── EntityType (enum)
├── Status (enum)
└── Notes (text)

FormSubmission
├── Form (N:1)
├── Payload (JSON)
└── Status (enum)
```

---

## 8. Entity Relationships

```
┌────────────────────────────────────────────────────────────┐
│                          Programme                         │
│  id, slug, name, status, commercialFields,                  │
│  professionalFields, audienceIds, areaIds                 │
└──┬─────────────────┬────────────────┬─────────────────┬─┘
   │                 │                │                 │
   ▼                 ▼                ▼                 ▼
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
│ Edition │    │  Price   │    │   FAQ    │    │ Testimonial  │
│         │    │          │    │          │    │              │
└────┬────┘    └──────────┘    └──────────┘    └──────────────┘
     │
     ▼
┌─────────────┐
│ Registration│
└─────────────┘
```

**Cardinality rules:**
- A Programme has many Editions.
- A Programme has many Prices (default or edition-specific).
- An Edition may override Programme prices or inherit them.
- A Testimonial can be linked to one or more Programmes.
- FAQs can be programme-specific or global.

---

## 9. Programme Data Model

### Commercial fields

| Field | Type | Notes |
|---|---|---|
| `programmeName` | Text | Required, unique |
| `slug` | Text | URL-friendly identifier |
| `subtitle` | Text | Short tagline |
| `shortDescription` | Rich text | For cards and previews |
| `fullDescription` | Rich text | Programme detail page |
| `problemSolved` | Rich text | What pain it addresses |
| `programmePromise` | Text | Promise statement |
| `targetAudience` | Relationship | To TargetAudience taxonomy |
| `mainBenefits` | Array of rich text | 4–6 benefit items |
| `whatParticipantsReceive` | Array of rich text | Deliverables |
| `whatParticipantsCanDoNextDay` | Array of rich text | Immediate outcomes |
| `availableDeliveryFormats` | Multi-select | Online, On-site, Open cohort, Experience Edition |
| `standardPrice` | Number | Reference price |
| `launchPrice` | Number | Promotional price |
| `priceDisplayStatus` | Select | Exact / Launch / Standard strikethrough / Coming soon / On request |
| `registrationCTA` | Text | Default button label |
| `offerRequestCTA` | Text | Default button label |
| `featuredImage` | Media | Hero image |
| `gallery` | Media array | Page gallery |
| `testimonials` | Relationship | Linked testimonials |
| `faq` | Relationship | Linked FAQs |
| `attachments` | Relationship | Documents for download |
| `status` | Select | Draft / Pilot / Active / Under Review / Archived |

### Professional fields

| Field | Type | Notes |
|---|---|---|
| `duration` | Text | e.g. "1 day on-site / 2 × 3h online" |
| `learningHours` | Number | Total learning hours |
| `cpdHours` | Number | CPD accredited hours |
| `competenciesDeveloped` | Array of objects | Competency + description |
| `learningOutcomes` | Array of text | 8 LOs as per PMD |
| `programmeObjectives` | Rich text | High-level objectives |
| `learningMethods` | Array of text | e.g. role-play, case study |
| `assessmentMethods` | Array of text | Deliverable, reflection, self-assessment |
| `resourcesOffered` | Array of text | Workbook, checklists, etc. |
| `certificationInfo` | Rich text | Certificate wording summary |
| `followUpProcess` | Rich text | 30-day follow-up emails |
| `industryAdaptations` | Array of objects | Sector + adaptation summary |
| `pmdVersion` | Text | e.g. PMD_001_AI_Fara_Haos_v2.md |
| `lastUpdated` | Date | CMS-managed |
| `programmeOwner` | Relationship | Admin user |
| `reviewer` | Relationship | Admin user |
| `dateApproved` | Date | Governance field |
| `nextReviewDate` | Date | Governance field |
| `displayProfessionalLevel` | Checkbox | Show/hide professional fields publicly |
| `displayGovernanceFields` | Checkbox | Show/hide owner/reviewer/dates publicly |

**Note:** Terminology uses "CPD Hours" and "Learning Hours", never "credits", "puncte", or "ECTS" unless an external authority explicitly approves it.

---

## 10. Edition Data Model

### Common edition fields

| Field | Type | Notes |
|---|---|---|
| `programme` | Relationship (required) | Parent programme |
| `editionTitle` | Text | e.g. "Ediția online — iulie 2026" |
| `slug` | Text | Unique with programme |
| `deliveryFormat` | Select | Online / On-site / Open cohort / Experience Edition |
| `status` | Select | Draft / Open / Full / Closed / Cancelled |
| `startDate` | Date | First session date |
| `endDate` | Date | Last session date |
| `durationText` | Text | Human-readable duration |
| `registrationDeadline` | Date | Last date for registration |
| `maxSeats` | Number | Total capacity |
| `availableSeats` | Number | Computed from registrations |
| `price` | Relationship | Linked price record |
| `featuredImage` | Media | Optional edition hero |
| `gallery` | Media array | Location or event photos |
| `notes` | Rich text | Internal notes |

### Online-specific fields

| Field | Type | Notes |
|---|---|---|
| `platform` | Select | Google Meet / Google Classroom / other |
| `meetLink` | Text | Stored in Admin, not public |
| `classroomLink` | Text | Stored in Admin, not public |
| `sessionDates` | Array of date-time | For multi-session online editions |
| `sessionCount` | Number | Number of live sessions |
| `recordingPolicy` | Text | Whether recordings are provided |

### On-site / Open cohort fields

| Field | Type | Notes |
|---|---|---|
| `city` | Text | e.g. București, Cluj |
| `locationName` | Text | Venue name |
| `address` | Text | Full address |
| `startTime` | Text | e.g. 09:00 |
| `endTime` | Text | e.g. 17:00 |
| `includedServices` | Array of text | Coffee, lunch, materials |
| `excludedServices` | Array of text | Transport, accommodation |
| `hasOwnRoom` | Checkbox | Beneficiary provides room (for B2B/B2G) |
| `roomCostIncluded` | Checkbox | Room cost included in price |

### Experience Edition fields

| Field | Type | Notes |
|---|---|---|
| `destination` | Text | e.g. Munte, Mare, Delta Dunării |
| `hotelName` | Text | Partner hotel |
| `hotelAddress` | Text | Full address |
| `period` | Text | e.g. 3–5 septembrie 2026 |
| `minParticipants` | Number | Minimum to confirm |
| `maxParticipants` | Number | Maximum capacity |
| `roomTypes` | Array of objects | Room type + price supplement |
| `includedMeals` | Array of text | Breakfast, lunch, dinner |
| `includedFacilities` | Array of text | SPA, piscină, etc. |
| `complementaryActivities` | Array of text | Hiking, workshops, etc. |
| `indicativeSchedule` | Rich text | Day-by-day outline |
| `confirmationPolicy` | Rich text | When the edition is confirmed |
| `cancellationPolicy` | Rich text | Refund and cancellation rules |
| `priceStatus` | Select | Coming soon / Exact price / On request |

**Rule:** Google Meet and Google Classroom links are Admin-only fields and are never rendered publicly before payment or registration.

---

## 11. Pricing Data Model

### Price record fields

| Field | Type | Notes |
|---|---|---|
| `priceCode` | Text | Internal reference, e.g. PMD_001-ONLINE-JUL26 |
| `programme` | Relationship (optional) | Default price for a programme |
| `edition` | Relationship (optional) | Specific price for an edition |
| `priceType` | Select | Standard / Launch / Promotional / Per person / Group / B2B / B2G / Experience |
| `amount` | Number | Base price in RON |
| `currency` | Text | RON default |
| `vatIncluded` | Checkbox | Whether VAT is included |
| `vatRate` | Number | e.g. 0.19, nullable |
| `maxParticipantsIncluded` | Number | For group packages |
| `extraParticipantCost` | Number | Per person beyond included count |
| `includedServices` | Array of text | Materials, lunch, workbook, etc. |
| `excludedServices` | Array of text | Transport, accommodation, room rental |
| `validFrom` | Date | Price validity start |
| `validUntil` | Date | Price validity end |
| `status` | Select | Active / Inactive / Coming soon / On request |
| `displayLabel` | Text | e.g. "Preț lansare", "Preț standard" |

### Price display logic

- If `status = Active` and `priceType = Launch`, display launch price with standard price struck through.
- If `status = Coming soon`, display "În curând".
- If `status = On request`, display "La cerere" and show CTA form.
- If `edition.price` is set, it overrides programme default prices for that edition.
- No hardcoded prices in any page component.

### Centralised update rule

A price change in the CMS must propagate automatically to:
- Programme detail page
- Edition detail page
- Pricing / tariffs page
- Calendar / listing pages
- Checkout summary
- Offer request forms
- Landing pages referencing the price

This is enforced by reading prices from the database at build time (SSG) or request time (SSR), never from static files.

---

## 12. CPD and Professional Data Model

### Professional info stored on Programme

- `duration`
- `learningHours`
- `cpdHours`
- `competenciesDeveloped`
- `learningOutcomes`
- `programmeObjectives`
- `learningMethods`
- `assessmentMethods`
- `resourcesOffered`
- `certificationInfo`
- `followUpProcess`
- `industryAdaptations`
- `pmdVersion`
- `lastUpdated`
- `programmeOwner`
- `reviewer`
- `dateApproved`
- `nextReviewDate`

### Display controls

- `displayProfessionalLevel` (default true for Active programmes).
- `displayGovernanceFields` (default false).

### CPD accreditation support

While full CPD automation is Phase 2, Phase 1 should store:
- CPD Hours per programme.
- Certificate wording summary.
- Assessment method summary.
- Learning outcomes (for certificate copy).

This data can be exported manually for submissions to accreditation bodies (e.g. The CPD Group) if needed.

### Terminology guardrails

Use only:
- "CPD Hours"
- "Learning Hours"
- "Certificate of Participation" / "Certificate of Completion"

Do not use:
- "credite profesionale"
- "puncte"
- "ECTS"
- any credit-bearing language without explicit external authority approval.

---

## 13. Target Audience Taxonomies

### Model

```
TargetAudience
├── slug (Text, unique)
├── name (Text, e.g. Profesori)
├── description (Rich text)
├── icon (Media, optional)
├── sortOrder (Number)
└── isPublic (Checkbox)
```

### Initial values

- Profesori
- Directori
- Manageri
- Lideri
- Formatori
- Specialiști HR
- Medici
- Asistenți medicali
- Personal administrativ
- Antreprenori
- Funcționari publici
- Instituții publice
- Companii
- ONG-uri
- Alte categorii

### Use cases

- Programme detail page: show target audiences.
- Filters on programme listing.
- Landing pages per audience.
- Future: automatic programme recommendations.

---

## 14. Application Area Taxonomies

### Model

```
ApplicationArea
├── slug (Text, unique)
├── name (Text, e.g. Educație)
├── description (Rich text)
├── icon (Media, optional)
├── sortOrder (Number)
└── isPublic (Checkbox)
```

### Initial values

- Educație
- Sănătate
- Administrație publică
- Business
- Industrie
- ONG
- Alte domenii

### Use cases

- Sector-specific adaptations display on programme pages.
- Industry landing pages (e.g. /domenii/educatie).
- SEO on verticals.
- Future: filters and recommendation engine.

---

## 15. Payments Model

### B2C / individuals

- Stripe card payment.
- Bank transfer / payment order.
- Registration status: Pending → Paid → Confirmed.

### PFA / SRL / medical practices

- Stripe card payment.
- Bank transfer.
- Fiscal invoice on entity.

### Companies and private organisations

- Select package → request offer → receive offer → sign contract or order → invoice → payment.
- No automatic checkout; form submission creates a lead.

### Public institutions

- Request offer → commercial offer → procurement procedure → contract or firm order → service delivery → reception minutes → invoice → payment per contract terms.
- No SICAP automation in Phase 1.

### Payment status values

| Status | Meaning |
|---|---|
| Pending | Awaiting payment |
| Awaiting invoice | B2B/B2G flow |
| Paid | Payment confirmed |
| Cancelled | Refunded or cancelled |
| On hold | Manual review required |

### Refund and cancellation

- Store policy text in CMS global `SiteSettings`.
- Cancellation rules per edition can override global policy.
- Refunds handled manually in Phase 1.

---

## 16. Public Procurement / SICAP Flow

### Dedicated page: /achizitii-publice

**Scope:** Create a single editable page for public institutions explaining the procurement flow and providing a request form.

### Page content (editable from CMS global `PublicProcurement`)

**Title:** Achiziții publice  
**Intro:**

> AnimaMinds, brand dezvoltat de Niculae Alina Ionela PFA, furnizează servicii de formare și dezvoltare profesională pentru instituții publice, unități de învățământ, instituții medicale, autorități publice și alte entități.
>
> Serviciile pot fi contractate, după caz, prin achiziție directă, prin intermediul SICAP/SEAP, în baza unui contract de prestări servicii sau a unei comenzi ferme, în conformitate cu procedurile aplicabile beneficiarului.
>
> Pentru instituțiile publice, documentația contractuală poate include oferta comercială, contractul sau comanda, documentele privind prestarea serviciului, procesul-verbal de recepție și factura fiscală.

**CTA:** Solicită oferta pentru achiziție publică

### Public procurement form fields

| Field | Type | Required |
|---|---|---|
| Institution name | Text | Yes |
| Institution type | Select | Yes |
| CUI | Text | No |
| Contact person | Text | Yes |
| Role | Text | Yes |
| Email | Email | Yes |
| Phone | Text | Yes |
| Desired programme | Select | Yes |
| Number of participants | Number | Yes |
| City | Text | Yes |
| Desired period | Text | Yes |
| Delivery format | Select | Yes |
| Has own suitable room | Yes / No | Yes |
| AnimaMinds should find a room | Yes / No | Yes |
| Transport support needed | Yes / No | Yes |
| SICAP / SEAP procurement | Yes / No | Yes |
| Observations | Textarea | No |
| GDPR consent | Checkbox | Yes |

### Backend flow

1. Form submission stored as `FormSubmission` with type `public-procurement`.
2. Admin notified by email.
3. Manual preparation of commercial offer.
4. Follow-up handled outside platform (email / phone) in Phase 1.
5. Outcome logged in admin notes.

### SICAP integration

- No API integration in Phase 1.
- The form only collects whether the institution wants SICAP/SEAP info.
- Future Phase 2 can explore API or manual publish assist if feasible.

---

## 17. Transport Support Flow

### Principle

AnimaMinds helps identify a licensed transport operator, but does not act as provider or reseller of transport services.

### Page content

A dedicated section on the institution/organisation offer page:

> Pentru edițiile care presupun deplasarea participanților, AnimaMinds poate identifica o firmă autorizată de transport potrivită grupului. Contractul și plata serviciilor de transport se realizează direct între beneficiar și operatorul de transport.

### Form option

In the general offer request form and public procurement form, include:

> Doresc sprijin pentru identificarea unei soluții de transport. [ ] Da [ ] Nu

### Data storage

- Stored on `FormSubmission`.
- Used during manual offer preparation.
- No integration with transport providers in Phase 1.

---

## 18. Forms Architecture

### Form types

| Form | Purpose | Stored as |
|---|---|---|
| General offer request | B2B/B2G leads | `FormSubmission` |
| Public procurement request | Public institution leads | `FormSubmission` |
| Individual registration | B2C checkout start | `Registration` |
| Group registration | B2C/B2B multiple people | `Registration` + participants JSON |
| Newsletter signup | Marketing | `FormSubmission` (future) |
| Contact | General enquiries | `FormSubmission` |

### Form definition model

| Field | Type | Notes |
|---|---|---|
| `formType` | Select | Internal reference |
| `title` | Text | Public heading |
| `description` | Rich text | Intro text |
| `fields` | Array of field objects | Label, type, required, options |
| `submitLabel` | Text | Button label |
| `successMessage` | Rich text | After submit |
| `notifyEmails` | Array of text | Admin emails |
| `gdprText` | Rich text | Consent wording |

### Validation

- Client-side: React Hook Form + Zod.
- Server-side: Zod schema in API route.
- Rate limiting: per IP and per form.
- Anti-spam: basic honeypot + optional CAPTCHA.

### Submission management

- List view in Admin.
- Filter by status: New / In progress / Closed / Spam.
- Export to CSV.
- Manual status updates and notes.

---

## 19. Admin Panel Structure

### Main navigation groups

#### Content

- Programmes
- Editions
- Prices
- Pages
- Blog Posts
- FAQs
- Testimonials
- Galleries
- Documents

#### Structure

- Target Audiences
- Application Areas
- Navigation
- Site Settings

#### Commercial

- Registrations
- Form Submissions
- Public Procurement Settings
- Transport Info

#### Users

- Users
- Roles

### Programme editing UX

- Tab 1: Commercial
- Tab 2: Professional / CPD
- Tab 3: Editions
- Tab 4: Prices
- Tab 5: Media / Gallery
- Tab 6: SEO
- Tab 7: Governance (restricted)

### Edition editing UX

- Parent programme selector.
- Delivery format selector (drives visible fields).
- Date/time pickers.
- Seat management.
- Price selector or override.
- Admin-only links section.

### Global settings UX

- Brand info.
- Contact details.
- Payment instructions.
- Public procurement page content.
- Transport support text.
- Default SEO.

---

## 20. Roles and Permissions

### Roles

| Role | Permissions |
|---|---|
| Super Admin | Full access |
| Content Manager | Programmes, Editions, Pages, Blog, FAQs, Testimonials, Galleries, Documents |
| Commercial Manager | Prices, Registrations, Form Submissions, Public Procurement settings |
| Facilitator | Read-only access to Programmes and Editions they are assigned to |
| Viewer | Read-only access to most content |

### Permission patterns

- Draft / Archived programmes are not visible to public, only to Content Manager+.
- Governance fields editable only by Super Admin.
- Price records editable by Commercial Manager+.
- Form submissions visible only by Commercial Manager+.
- Users cannot delete programmes; they can only change status to Archived.

### Audit

- Track who last modified each programme, edition and price record.
- Store `updatedBy` and `updatedAt` on all critical collections.

---

## 21. Single Source of Truth Rules

### Rule set

1. **Programme data:** All public programme information originates from the CMS `Programmes` collection.
2. **Editions:** Dates, locations, seats and prices are managed in `Editions` and `Prices`.
3. **No duplication:** The same field is never hardcoded in two different pages.
4. **No manual sync:** Website pages consume data via API or server components.
5. **PMD linkage:** Each programme references its PMD file name and version. If the PMD changes, the CMS record is updated to match.
6. **Price propagation:** A price change updates every page using it within the next build or request.
7. **Status gates:** Only programmes with status `Active` (and optionally `Pilot`) are public. `Draft`, `Under Review` and `Archived` are hidden.

### Validation

- CMS hooks prevent publishing a programme if required fields are missing.
- A programme cannot be set to `Active` without at least one price and one edition.
- Slug uniqueness enforced across programmes and pages.

---

## 22. Content Governance

### Approval workflow

| Status | Who can set | Meaning |
|---|---|---|
| Draft | Content Manager+ | Work in progress |
| Pilot | Content Manager+ | Live for pilot only, not full marketing |
| Active | Super Admin | Approved for public marketing |
| Under Review | Content Manager+ | Pending approval or update |
| Archived | Super Admin | No longer offered |

### Change process

1. Content Manager edits programme.
2. Save as Draft or Under Review.
3. Super Admin reviews and sets Active.
4. Website reflects change automatically.

### Versioning

- Store previous versions of programme and edition records.
- Allow rollback to previous version (Phase 2 full implementation; Phase 1 keeps basic `updatedAt` / `updatedBy`).

### Document links

- Each programme stores links to PMD, Workbook, Facilitator Guide, Commercial Sheet, CPD Package.
- Documents are stored in the `Documents` collection.
- Public downloads respect the programme status.

---

## 23. SEO Architecture

### Per-programme SEO fields

| Field | Type |
|---|---|
| `metaTitle` | Text |
| `metaDescription` | Text |
| `canonicalUrl` | Text |
| `ogTitle` | Text |
| `ogDescription` | Text |
| `ogImage` | Media |
| `noIndex` | Checkbox |
| `structuredData` | JSON (optional) |

### Per-page SEO fields

Same fields as programme, plus:
- `slug`
- `parentPage` (for breadcrumbs)

### SEO taxonomy pages

- `/programe` — listing page.
- `/program/[slug]` — programme detail.
- `/editie/[programmeSlug]/[editionSlug]` — edition detail.
- `/domenii/[areaSlug]` — application area landing page.
- `/public/[audienceSlug]` — target audience landing page.
- `/achizitii-publice` — public procurement.

### Structured data

Phase 1 should include:
- `Course` schema for programmes.
- `Offer` schema when prices are public.
- `FAQPage` schema for FAQ sections.
- `BreadcrumbList` on all pages.

### Sitemap

- Auto-generated from Programmes, Editions, Pages, Taxonomies.
- Respects status and `noIndex` flags.

---

## 24. Phase 1 Scope

### In scope

- CMS setup (Payload CMS or equivalent).
- Database schema for programmes, editions, prices, pages, taxonomies, forms, testimonials, FAQ, documents, users, roles.
- Admin panel with role-based access.
- Public website pages driven by CMS data.
- Programme detail pages.
- Edition listing and detail pages.
- Public procurement page and form.
- General offer request form.
- Individual/group registration flow with Stripe and bank transfer.
- B2B/B2G lead capture (manual offer follow-up).
- Testimonials, FAQ, gallery, documents management.
- SEO fields and structured data.
- Sitemap and robots.txt.
- Content migration from existing static pages.

### Explicitly out of scope

- Full CRM.
- Automatic invoice generation.
- Automatic certificate generation.
- Google Meet / Classroom API integration.
- Mobile app.
- Vouchers and promo codes.
- Instalment payments.
- Advanced marketing automation.
- SICAP API integration.
- Waitlists.
- User accounts for participants.
- Multi-language content (future).

### Minimum viable launch

1. CMS installed and configured.
2. All 5 programmes entered with commercial and professional fields.
3. At least one edition per programme created.
4. Prices configured (even if "On request").
5. Public procurement page live.
6. Offer request forms working.
7. Individual registration flow working.
8. Existing website design preserved.

---

## 25. Phase 2 Preparation

The architecture should allow future extension without rework. The following hooks should be designed into the schema and code structure but not implemented now.

### Planned Phase 2 capabilities

| Capability | Architectural preparation |
|---|---|
| CRM | Add `Contacts` and `Organisations` collections; link to `FormSubmission` and `Registration` |
| Invoicing | Add `Invoices` collection; store fiscal entity details on `Registration` |
| Certificates | Add `Certificates` collection; link to `Registration`; store certificate template |
| Google Meet integration | Store `meetLink` and `classroomLink` already; later automate via API |
| Google Calendar integration | Store event dates; later push events programmatically |
| Promo codes | Add `PromoCodes` collection; link to `Prices` |
| Vouchers | Add `Vouchers` collection; link to `Registrations` |
| Instalments | Add `PaymentPlans` collection; split payments |
| Newsletter segmentation | Add tags to `Contacts`; segment by taxonomy / programme |
| Waitlists | Add `WaitlistEntry` collection linked to `Edition` |
| Mobile app | Expose JSON API; use Next.js API routes |
| SICAP integration | Reserve `sicapReference` field; later evaluate API feasibility |

### Database extensibility

- Use JSON columns for flexible future metadata.
- Avoid hardcoded enum values where possible; store in CMS tables.
- Keep relations explicit so future joins are straightforward.

---

## 26. Migration Plan for Existing Content

### Step 1: Audit existing pages

- List all current routes in the Next.js app.
- Map each route to a CMS `Page` or `Programme` record.
- Identify hardcoded programme information.

### Step 2: Extract data

- Copy programme metadata from PMDs and Commercial Sheets into CMS fields.
- Extract images into `Galleries`.
- Extract FAQs into `FAQs`.
- Extract testimonials into `Testimonials` (or create placeholders).

### Step 3: Build templates

- Create reusable page components: `ProgrammeDetail`, `EditionDetail`, `PageBuilder`.
- Replace static pages with dynamic routes.

### Step 4: Redirects

- Map old URLs to new slugs.
- Preserve SEO equity with 301 redirects.

### Step 5: Content freeze during migration

- Freeze website edits during migration.
- Freeze programme documents (already frozen).
- Launch when all data is validated.

### Rollback

- Keep old static pages in a feature branch for 30 days after launch.
- Document old URLs and redirect rules.

---

## 27. Implementation Roadmap

### Week 1–2: Foundation

- Install and configure CMS + database.
- Define collections and fields in code.
- Set up roles and permissions.
- Deploy staging environment.

### Week 3–4: Content model

- Create all 5 programmes in CMS.
- Create taxonomies.
- Upload documents and images.
- Configure site settings.

### Week 5–6: Public pages

- Build programme detail page.
- Build programme listing page.
- Build edition listing/detail components.
- Build public procurement page.
- Build general offer page.

### Week 7–8: Forms and registrations

- Implement general offer form.
- Implement public procurement form.
- Implement individual registration flow.
- Implement Stripe payment (B2C).
- Implement bank transfer option.

### Week 9: SEO and polish

- Add SEO fields and structured data.
- Generate sitemap.
- Test redirects.
- Performance audit.

### Week 10: Launch

- Content validation with business owner.
- Soft launch / pilot traffic.
- Bug fixes.
- Go-live.

**Note:** Timelines are indicative and depend on resource availability and approval cadence.

---

## 28. Risks and Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope creep into Phase 2 features | High | High | Strict backlog; require business sign-off for anything beyond Phase 1 scope |
| Data migration errors | Medium | High | Validate all migrated content; keep old pages in branch; test redirects |
| CMS choice turns out limiting | Low | High | Use schema-as-code CMS; keep exportable data format; document exit path |
| Brand dilution | Medium | Medium | Lock design tokens; review all new pages against brand guidelines |
| SEO loss during migration | Medium | High | 301 redirects; preserve slugs; structured data; sitemap |
| Payment integration complexity | Medium | Medium | Start with Stripe B2C only; defer B2B automation |
| Public procurement legal nuances | Medium | Medium | Keep content editable; consult local procurement specialist before go-live |
| Seat availability sync issues | Low | Medium | Compute available seats from registrations; add manual override |

---

## 29. Questions Requiring Business Approval

Before implementation begins, the following decisions must be confirmed:

1. **CMS vendor:** Payload CMS (self-hosted) or Sanity (managed)?
2. **Hosting:** Keep current Vercel setup or move to a different provider?
3. **Payment provider:** Stripe only, or also add Netopia / MobilPay for local cards?
4. **Initial prices:** Should the site display exact prices or "On request" until commercial policy is final?
5. **Experience Edition:** Publish pages with "În curând" or hide the format entirely until offers are ready?
6. **Public procurement:** Who will review and respond to SICAP-related enquiries?
7. **Transport support:** Should AnimaMinds publish a list of recommended transport operators or remain purely as facilitator?
8. **User accounts:** Are participant accounts required in Phase 1, or can registration be guest-based?
9. **Multi-language:** Is Romanian-only acceptable for launch, or should English be included?
10. **Approval authority:** Who has final sign-off to move a programme from Pilot/Under Review to Active?

---

## Final note

This document is a proposal. No code, database schema, CMS instance, page, form or integration should be implemented until this architecture receives explicit written approval from the business owner.

Upon approval, the first implementation step is to set up the CMS and database foundation (Week 1–2 of the roadmap).

**Document version:** 1.0  
**Last updated:** 2026-07-12
