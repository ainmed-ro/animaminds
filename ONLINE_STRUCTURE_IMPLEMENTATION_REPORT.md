# Online Structure Implementation Report

**Date:** 2026-07-12
**Status:** Implemented

---

## 1. Approved Online Live Structure

| Programme | Sessions | Total contact hours | Total learning hours | CPD credits |
|---|---|---|---|---|
| Conversații care Contează | 2h + 2h + 2.5h | 6.5h | 7.5h | 8 |
| AI Fără Haos | 2h + 2h + 2.5h | 6.5h | 7.5h | 8 |
| Calm sub Presiune | 2h + 2h + 2h | 6.0h | 7.0h | 7 |
| Busola Deciziilor | 2h + 2h + 2.5h | 6.5h | 7.5h | 8 |
| Avantajul Uman | 2h + 2h + 2h | 6.0h | 7.0h | 7 |

All programmes keep their existing **Total Learning Hours** unchanged.

---

## 2. Implementation Summary

### 2.1 Prisma / CMS

File: `prisma/schema.prisma`
- Removed `OPEN_COHORT` from `DeliveryFormat` enum.
- Delivery formats are now: `ONLINE`, `ONSITE`, `EXPERIENCE_EDITION`.

File: `prisma/seed.ts`
- Updated all five programme seed records:
  - `duration` field populated with the approved per-format structure.
  - `learningHours` and `cpdHours` updated to final values.
  - `availableDeliveryFormats` limited to Online Live, On-site, Experience Edition.

| Programme | `learningHours` | `cpdHours` | `duration` |
|---|---|---|---|
| AI Fără Haos | 8 | 8 | Online Live 3 sesiuni (2h + 2h + 2.5h), la sediu 1 zi (6.5h), Experience Edition 2 zile |
| Conversații care Contează | 8 | 8 | Online Live 3 sesiuni (2h + 2h + 2.5h), la sediu 1 zi (6.5h), Experience Edition 2 zile |
| Calm sub Presiune | 7 | 7 | Online Live 3 sesiuni (2h + 2h + 2h), la sediu 1 zi (6h), Experience Edition 2 zile |
| Busola Deciziilor | 8 | 8 | Online Live 3 sesiuni (2h + 2h + 2.5h), la sediu 1 zi (6.5h), Experience Edition 2 zile |
| Avantajul Uman | 7 | 7 | Online Live 3 sesiuni (2h + 2h + 2h), la sediu 1 zi (6h), Experience Edition 2 zile |

### 2.2 Website

File: `app/programe/page.tsx`
- Reordered programmes to commercial priority: Conversații care Contează, AI Fără Haos, Calm sub Presiune, Busola Deciziilor, Avantajul Uman.
- Removed incorrect "trei zile" reference in Busola Deciziilor description.
- Kept only approved formats on programme cards: Online Live, La sediul instituției / organizației, Experience Edition.

### 2.3 Programme source documents

Updated PMDs (`AnimaMinds_Knowledge_System/PMD_00x_*_v2.md`):
- Removed Open Cohort from the standard format line.
- Renamed "Online" to "Online Live" and "La sediul organizației" to "La sediul instituției / organizației".
- Replaced format tables with approved columns: Sessions, Contact hours, Total learning hours, CPD credits.
- Experience Edition remains **2 zile**.

Updated Commercial Sheets (`AnimaMinds_Knowledge_System/Commercial_System/PMD_00x/Commercial_Sheet*.md`):
- Removed Open Cohort.
- Updated format names, session structure, contact hours, total learning hours and CPD points.
- Rebuilt files that contained duplicate/corrupted tables.

Updated CPD Packages (`AnimaMinds_Knowledge_System/Commercial_System/PMD_00x/CPD_Package*.md`):
- Removed Open Cohort.
- Updated learning-hours-by-format tables with approved Online Live session structure.
- Rebuilt files that contained duplicate/corrupted tables.
- Preserved sample agendas, facilitator qualifications and assessment basis.

Updated Workbooks and Facilitator Guides:
- Updated the `**Formats:**` line to: Online Live · La sediul instituției / organizației · Experience Edition.

Updated ONE_PAGER_PACK.md:
- Updated Duration and CPD information sections for all five programmes to match approved values.

### 2.4 Material generation script

File: `scripts/generate-programme-materials-v2.ts`
- Updated `loadProgramme()` to compute per-programme duration variants based on approved Online Live structure.
- Experience Edition correctly shown as **2 zile / 2 days** with 10h contact / 12 CPD.
- On-site duration matches Online Live contact hours.
- Cover pages, certificates and competency records now display the three approved variants with correct hours and CPD credits.

### 2.5 Regenerated materials

Output folders:
- `C:\Users\Utilizator\Desktop\ANIMAMINDS\AnimaMinds_Materiale_Programme_RO`
- `C:\Users\Utilizator\Desktop\ANIMAMINDS\AnimaMinds_Programme_Materials_EN`

Per programme, the following files were regenerated for both RO and EN:
- Workbook
- Facilitator Guide
- Presentation (PPTX)
- One-pager (DOCX + PDF)
- Certificate
- Competency Record
- Pilot Pack
- Commercial One-pager
- CPD Package
- QA Report

Verified sample: Romanian certificate for Conversații care Contează now shows:
- Online Live 3 sesiuni (2h + 2h + 2.5h): 7.5 ore / 8 CPD
- La sediul instituției / organizației 1 zi (6.5h): 7.5 ore / 8 CPD
- Experience Edition 2 zile: 12 ore / 12 CPD

---

## 3. Remaining Manual Steps

1. **Apply Prisma migration.** `OPEN_COHORT` has been removed from the schema enum. Run:
   ```bash
   npx prisma migrate dev
   ```
   (Requires `DATABASE_URL` to be configured.)

2. **Re-seed the database** if you want the new `duration`, `learningHours` and `cpdHours` values in the CMS:
   ```bash
   npx prisma db seed
   ```

3. **Run the integrity validation script** once the database is available:
   ```bash
   npx tsx scripts/validate-programme-edition-integrity.ts
   ```

4. **Review generated Commercial One-pagers and CPD Packages.** The source documents were rebuilt from existing assets; commercial copy and sector-specific details may need a final human review.

---

## 4. Confirmation Checks

- [x] Open Cohort removed from Prisma schema
- [x] Open Cohort removed from seed data
- [x] Open Cohort removed from admin form (`app/admin/editions/[id]/edition-form.tsx`)
- [x] Open Cohort removed from CMS actions comment
- [x] Open Cohort removed from website programme cards
- [x] Open Cohort removed from PMD source documents
- [x] Open Cohort removed from Commercial Sheets
- [x] Open Cohort removed from CPD Packages
- [x] Open Cohort removed from Workbooks / Facilitator Guides format line
- [x] Programmes reordered on website
- [x] Experience Edition remains 2 days
- [x] Online Live structure implemented as approved
- [x] Total learning hours unchanged
- [x] Generated materials regenerated with correct values
