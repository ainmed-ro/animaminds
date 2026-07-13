# FOUNDATION ALIGNMENT IMPLEMENTATION REPORT

**Phase:** Phase 1 — Foundation Alignment  
**Date:** 2026-07-13  
**Reference:** FINAL_ALIGNMENT_DECISION_MATRIX.md (approved)  
**Scope:** Prisma data model, seed data, CMS form/actions, registration capacity rules, removal of Open Cohort

---

## 1. Summary

Phase 1 implementation is complete. The data model, seed data, CMS actions, registration form capacity rules, and material-generation scripts have been aligned with `FINAL_ALIGNMENT_DECISION_MATRIX.md`.

No pricing, certificate, payment, website, or public-page changes were made.

---

## 2. Files Changed

| File | Change |
|---|---|
| `prisma/schema.prisma` | Added `contactHours`, `individualActivitiesHours`, `totalLearningHours`, `cpdCredits` to `Programme`; renamed `cpdHours` → `cpdCredits`; changed `learningHours` to `Float`; added same four fields to `Edition`; kept `directUrl` for Prisma 6.6 migration support |
| `prisma/seed.ts` | Updated all five programme records with approved hours/CPD values; added new fields to seed objects; made `programme.upsert` update existing records so seed is idempotent |
| `app/admin/actions/cms.ts` | Updated `buildProgrammeData` to read `cpdCredits`, `contactHours`, `individualActivitiesHours`, `totalLearningHours`; removed `OPEN_COHORT` from capacity rules; aligned Onsite minimum to 15 |
| `app/admin/programmes/[id]/programme-form.tsx` | Added form inputs for `contactHours`, `individualActivitiesHours`, `totalLearningHours`, `cpdCredits`; renamed `cpdHours` input to `cpdCredits`; added `step="0.5"` to decimal hour fields |
| `app/inscriere/registration-form.tsx` | Removed `OPEN_COHORT` from capacity rules; aligned Onsite minimum to 15 |
| `tests/programme-management.spec.ts` | Renamed `cpdHours` field references to `cpdCredits` |
| `scripts/generate-programme-materials.ts` | Renamed internal `cpdHours` field to `cpdCredits`; updated generated labels from "CPD Hours" to "CPD Credits" |
| `scripts/generate-programme-materials-v2.ts` | Renamed internal `cpdHours` field to `cpdCredits`; updated generated labels from "CPD Hours" to "CPD Credits" |
| `scripts/phase04-validation.ts` | Renamed `cpdHours` field references to `cpdCredits` |
| `package-lock.json` | Downgraded installed Prisma from 7.8.0 to 6.6.0 to match `package.json` |

---

## 3. Database Changes

The following schema changes were applied to the live database (Supabase PostgreSQL):

### 3.1 `Programme` table
- Added `contactHours` (DOUBLE PRECISION)
- Added `individualActivitiesHours` (DOUBLE PRECISION)
- Added `totalLearningHours` (DOUBLE PRECISION)
- Added `cpdCredits` (INTEGER)
- Added capacity columns that were missing from the previous database state:
  - `onlineMinParticipants` (INTEGER)
  - `onlineMaxParticipants` (INTEGER)
  - `onsiteMaxParticipants` (INTEGER)
  - `experienceMinParticipants` (INTEGER)
  - `experienceMaxParticipants` (INTEGER)
- Renamed old column `cpdHours` → `cpdCredits`
- Changed `learningHours` type from INTEGER to DOUBLE PRECISION

### 3.2 `Edition` table
- Added `contactHours` (DOUBLE PRECISION)
- Added `individualActivitiesHours` (DOUBLE PRECISION)
- Added `totalLearningHours` (DOUBLE PRECISION)
- Added `cpdCredits` (INTEGER)

### 3.3 `Price` table
- Added `deliveryFormat` ("DeliveryFormat" enum) — this column was missing from the previous database state

### 3.4 Open Cohort removal
- Deleted zero `OPEN_COHORT` editions and zero linked registrations
- Deleted zero `OPEN_COHORT` prices
- Removed `OPEN_COHORT` from `availableDeliveryFormats` array on all five programmes

**Note:** The changes were applied via manual `ALTER TABLE` statements executed through a Prisma raw-query script, because `prisma migrate dev` could not run non-interactively in this environment and the database had pre-existing schema drift.

---

## 4. Migration Status

| Step | Status |
|---|---|
| Schema file updated | Done |
| Prisma Client regenerated (v6.19.3) | Done |
| Database columns added/renamed | Done |
| Seed applied | Done |
| Open Cohort removed from DB | Done |
| Prisma migration file created | **Not created** — manual SQL was used due to environment constraints and schema drift. A migration should be generated retroactively or the database treated as the baseline. |

---

## 5. Seed Updates

The `prisma/seed.ts` file now seeds the following approved values:

| Programme | learningHours | contactHours | individualActivitiesHours | totalLearningHours | cpdCredits |
|---|---|---|---|---|---|
| AI Fără Haos | 7.5 | 6.5 | 1 | 7.5 | 8 |
| Conversații care Contează | 7.5 | 6.5 | 1 | 7.5 | 8 |
| Calm sub Presiune | 7 | 6 | 1 | 7 | 7 |
| Busola Deciziilor | 7.5 | 6.5 | 1 | 7.5 | 8 |
| Avantajul Uman | 7 | 6 | 1 | 7 | 7 |

Delivery formats remain:
- `ONLINE` (Online Live)
- `ONSITE` (La sediul instituției / organizației)
- `EXPERIENCE_EDITION` (Experience Edition)

Group sizes remain as approved in `PROGRAMME_COMPARISON_MATRIX.md`:
- Online Live: 15–30
- Onsite: 15–30
- Experience Edition: 20–30

---

## 6. Validation Results

| Validation | Command / Method | Result |
|---|---|---|
| Prisma schema validation | `prisma validate` | Pass |
| TypeScript compilation | `tsc --noEmit` | Pass |
| Phase 04 data-model validation script | `tsx scripts/phase04-validation.ts` | Pass |
| Seed execution | `tsx prisma/seed.ts` | Pass |
| Open Cohort DB check | Raw SQL count | 0 editions, 0 prices, 0 programmes |
| Approved values DB check | Prisma query | All 5 programmes match matrix values |

---

## 7. Remaining Inconsistencies / Known Issues

| # | Item | Status | Notes |
|---|---|---|---|
| 1 | Existing test programmes (`PMD_TEST_*`) | Unchanged | Test records created by Playwright have `learningHours=16` and null new fields. They are not part of the five approved programmes and do not affect participant-facing values. |
| 2 | Prisma migration file | Missing | Database changes were applied manually. Recommend generating a migration retroactively if the project returns to `migrate dev` workflow, or documenting the manual baseline. |
| 3 | Material source documents | Not updated | Commercial Sheets, CPD Packages, PMDs, Workbooks, Facilitator Guides remain unchanged per Phase 1 scope. They will be aligned in a later phase. |
| 4 | Website, calendar, public pages | Not updated | Per Phase 1 scope; these are Phase 2/3 items. |
| 5 | Certificates and Competency Records | Not implemented | Data model fields added, but generation workflow not built. |
| 6 | Edition-level hours/CPD | Added fields, not seeded | `Edition.contactHours`, `individualActivitiesHours`, `totalLearningHours`, `cpdCredits` exist in schema and DB but are not populated by seed. Programme-level values are the SSOT for now. |

---

## 8. Commands Used

```powershell
# Prisma Client generate
$env:DATABASE_URL = "..."; $env:DIRECT_URL = "..."; node node_modules/prisma/build/index.js generate --schema=prisma/schema.prisma

# Seed
node -e "require('dotenv').config({ path: '.env.local' }); process.argv = ['node','tsx','prisma/seed.ts']; require('tsx/dist/cli.mjs')"

# Validation
node -e "require('dotenv').config({ path: '.env.local' }); process.argv = ['node','tsx','scripts/phase04-validation.ts']; require('tsx/dist/cli.mjs')"

# TypeScript check
node node_modules/typescript/bin/tsc --noEmit --project tsconfig.json
```

---

## 9. Approval Block

Phase 1 is complete and awaiting approval before moving to Phase 2 (CMS & Admin refinements / Website updates).

No next-phase work has been started.
