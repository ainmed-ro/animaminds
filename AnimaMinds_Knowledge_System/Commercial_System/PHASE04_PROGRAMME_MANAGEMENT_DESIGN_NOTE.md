# PHASE04_PROGRAMME_MANAGEMENT_DESIGN_NOTE.md

**Phase:** 04 — Programme Management UI Completion  
**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-13  
**Status:** Approved and implemented

---

## 1. Objective

Complete the Programme Management UI by extending the programme editing experience to support the full professional data model, CPD fields, learning outcomes, competencies, gallery integration, FAQ linkage, and document linkage. This phase delivers a single, consolidated interface for defining every structured attribute of a programme while preserving the Phase 03 RBAC rules.

---

## 2. Requirements

1. Programme editing experience covering all `Programme` model fields.
2. Professional data model support (duration, learning hours, learning outcomes, competencies, methods, resources, certification).
3. CPD fields support (CPD hours, accreditation body, provider reference, approval date).
4. Learning Outcomes management as a repeatable string list.
5. Competencies management as a structured JSON array.
6. Gallery integration linking existing galleries to a programme.
7. FAQ linkage connecting existing FAQs to a programme.
8. Document linkage connecting existing documents to a programme.
9. Preserve RBAC: only `SUPER_ADMIN`, `CONTENT_MANAGER`, and `COMMERCIAL_MANAGER` may edit programmes.
10. Validate through CRUD testing, relationship testing, CPD field testing, and SSOT validation.

---

## 3. Data Model

The Prisma schema already contained the required models. Phase 04 wires them into the admin UI and server actions.

- `Programme` — central entity with commercial, professional, CPD, governance, and SEO fields.
- `TargetAudience` / `ApplicationArea` / `ProgrammeTargetAudience` / `ProgrammeApplicationArea` — taxonomy relations.
- `Price` / `Programme.additionalDefaultPrices` / `defaultStandardPrice` / `defaultLaunchPrice` — commercial pricing.
- `FAQ` — `programmeId` foreign key enabling direct FAQ linkage.
- `Document` / `ProgrammeDocument` — many-to-many document linkage.
- `Gallery` / `ProgrammeGallery` — many-to-many gallery linkage.
- `ProgrammeSEO` — one-to-one SEO metadata.
- `User` — `Programme.programmeOwnerId` and `Programme.reviewerId` governance relations.

Key programme fields surfaced in the UI:

- Commercial copy: `subtitle`, `shortDescription`, `fullDescription`, `problemSolved`, `programmePromise`, `mainBenefits`, `whatParticipantsReceive`, `whatParticipantsCanDoNextDay`, `registrationCTA`, `offerRequestCTA`.
- Professional/CPD: `duration`, `learningHours`, `cpdHours`, `accreditationBody`, `cpdProviderReference`, `cpdApprovalDate`, `programmeObjectives`, `learningOutcomes`, `competenciesDeveloped`, `learningMethods`, `assessmentMethods`, `resourcesOffered`, `certificationInfo`, `followUpProcess`, `displayProfessionalLevel`.
- Governance: `programmeOwnerId`, `reviewerId`, `dateApproved`, `nextReviewDate`, `emotionalSafetyProtocol`, `dataRetentionPolicy`, `pmdVersion`, `displayGovernanceFields`.
- Delivery: `availableDeliveryFormats`.
- Media/SEO: `featuredImageUrl`, `ProgrammeSEO`.

---

## 4. Server Actions

### 4.1 `getProgramme`

Returns a single programme with all relations required for the editing UI:

- `targetAudiences`
- `applicationAreas`
- `editions`
- `defaultStandardPrice`
- `defaultLaunchPrice`
- `additionalDefaultPrices`
- `faqs`
- `documents` (with `document`)
- `galleries` (with `gallery`)
- `testimonials` (with `testimonial`)
- `seo`
- `programmeOwner`
- `reviewer`

### 4.2 `getProgrammeEditOptions`

Fetches in parallel all selectable catalogues for the form:

- Prices
- FAQs
- Documents
- Galleries
- Users
- Taxonomies (`TargetAudience`, `ApplicationArea`)

### 4.3 `createProgramme`

Creates a programme and links all relations in one Prisma `create` call:

- Target audiences and application areas via join-table creation.
- FAQs via direct `connect`.
- Documents and galleries via join-table creation.
- Additional default prices via `connect`.
- Calls `saveProgrammeSEO` to persist SEO data.

### 4.4 `updateProgramme`

Updates a programme atomically:

- Replaces scalar fields using `buildProgrammeData`.
- Rebuilds join-table relations (`targetAudiences`, `applicationAreas`, `documents`, `galleries`) with `deleteMany` + `create`.
- Replaces direct M-N sets (`faqs`, `additionalDefaultPrices`) using `set`.
- Persists or updates the related `ProgrammeSEO` record.

### 4.5 `saveProgrammeSEO` (private helper)

Upserts `ProgrammeSEO` keyed by `programmeId` or existing `seoId`. Handles JSON `structuredData` parsing safely.

### 4.6 FormData helpers

- `getStrings` — repeatable string values.
- `getNumber` — optional numeric values.
- `getDate` — ISO date parsing.
- `getJson` — safe JSON parsing.
- `getOptional` — optional string values.
- `buildProgrammeData` — central mapping of form fields to Prisma input.

---

## 5. UI Components

### 5.1 `ProgrammeForm`

Single form used by both `/admin/programmes/new` and `/admin/programmes/[id]`. It accepts a nullable `programme` and renders defaults when creating. Sections:

1. Basic Information
2. Commercial Copy
3. Professional & CPD Data
4. Governance
5. Pricing
6. Taxonomies
7. Delivery & CTAs
8. Related Content (FAQs, Documents, Galleries)
9. SEO

### 5.2 Shared Inputs

- `StringArrayInput` — dynamic add/remove text fields for repeatable strings.
- `CompetencyArrayInput` — dynamic name/description pairs stored as JSON.
- `RelationSelector` — checkbox multi-select for M-N relations.

---

## 6. RBAC Preservation

All programme mutations require `canManageContent(user)`. The UI buttons are visible only to authenticated admin users because the entire `/admin` area is protected by Phase 03 middleware.

---

## 7. Validation & Testing

### 7.1 Automated Checks

- `npm run build` — TypeScript compilation and route generation.
- Playwright tests for authenticated CRUD on programmes.
- Relationship tests verifying that linked FAQs, documents, and galleries persist after save.
- CPD field tests verifying `cpdHours`, `accreditationBody`, `cpdProviderReference`, and `cpdApprovalDate` round-trip.

### 7.2 SSOT Validation

The implementation is cross-checked against:

- `prisma/schema.prisma` — all fields used exist in the model.
- `app/admin/actions/cms.ts` — source of truth for server actions.
- `app/admin/programmes/[id]/programme-form.tsx` — UI matches action expectations.

---

## 8. Files Changed

- `app/admin/actions/cms.ts` — extended `getProgramme`, added `getProgrammeEditOptions`, `saveProgrammeSEO`, `buildProgrammeData`, FormData helpers, updated `createProgramme` and `updateProgramme`.
- `app/admin/programmes/[id]/programme-form.tsx` — new comprehensive form component.
- `app/admin/programmes/[id]/page.tsx` — refactored to use `ProgrammeForm`.
- `app/admin/programmes/new/page.tsx` — refactored to use `ProgrammeForm`.
- `app/admin/components/string-array-input.tsx` — new repeatable string input.
- `app/admin/components/json-array-input.tsx` — new competency JSON input.
- `app/admin/components/relation-selector.tsx` — new M-N checkbox selector.

---

## 9. Decisions & Notes

- Kept FAQ linkage via the existing `FAQ.programmeId` relation rather than introducing a join table, matching the current schema.
- Documents and galleries use join tables (`ProgrammeDocument`, `ProgrammeGallery`) as defined in the schema.
- `competenciesDeveloped` is stored as a JSON array of `{ name, description }` objects, giving flexibility without schema migrations.
- The same form component serves create and edit to avoid duplication and drift.
