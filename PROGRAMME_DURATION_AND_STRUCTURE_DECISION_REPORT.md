# Programme Duration and Structure Decision Report

**Date:** 2026-07-12
**Status:** Pending user approval — Open Cohort removal and site reorder implemented; CPD values not changed yet

---

## 1. Approved Decisions (Implemented)

### 1.1 Eliminate Open Cohort

Open Cohort is removed from the AnimaMinds delivery model. Customer-facing and CMS formats are now:

- **Online Live**
- **La sediul instituției / organizației**
- **Experience Edition**

### 1.2 Reorder programmes on the website

The public programmes page (`app/programe/page.tsx`) now lists programmes in this order:

1. **Conversații care Contează**
2. **AI Fără Haos**
3. **Calm sub Presiune**
4. **Busola Deciziilor**
5. **Avantajul Uman**

---

## 2. Rejected Proposal (Not Implemented)

- **Experience Edition = 3 days** was rejected.
- Experience Edition remains **2 days**, aligned with existing programme documents.

---

## 3. Open Cohort Removal Confirmation

### 3.1 Prisma schema

File: `prisma/schema.prisma`

```prisma
enum DeliveryFormat {
  ONLINE
  ONSITE
  EXPERIENCE_EDITION
}
```

`OPEN_COHORT` has been removed from the enum.

### 3.2 CMS seed data

File: `prisma/seed.ts`

All five programme seed records now use:

```ts
availableDeliveryFormats: [DeliveryFormat.ONLINE, DeliveryFormat.ONSITE, DeliveryFormat.EXPERIENCE_EDITION]
```

### 3.3 Admin edition form

File: `app/admin/editions/[id]/edition-form.tsx`

- Removed `OPEN_COHORT` from the on-site/open cohort conditional.
- Section heading changed from "On-site / Open Cohort" to "On-site".
- Variable renamed from `isOnsiteOrOpen` to `isOnsite`.

### 3.4 CMS actions

File: `app/admin/actions/cms.ts`

- Comment updated from `// On-site / open cohort` to `// On-site`.

### 3.5 Public website

File: `app/programe/page.tsx`

Programme cards already listed only:

- Online Live
- La sediul instituției / organizației
- Experience Edition

No Open Cohort references existed on the public website.

### 3.6 Documentation (this report and previous reports)

- This report no longer includes Open Cohort in recommended variants.
- The previous `PROGRAMME_STRUCTURE_AND_DURATION_REPORT.md` remains as a historical audit document and will be updated separately if required.

### 3.7 Remaining Open Cohort references

Open Cohort still appears in the original source markdown files under `AnimaMinds_Knowledge_System/` and `AnimaMinds_Knowledge_System/Commercial_System/`. These are source-content documents and were intentionally not modified because the user instructed not to change existing documents before approval. They will be cleaned up once the CPD standard is approved.

---

## 4. Final Standardization Proposal: Contact Hours, Learning Hours, CPD Credits

### 4.1 Definitions (one consistent definition across all surfaces)

| Term | Definition | Where used |
|---|---|---|
| **Contact Hours** | Time participants spend in live, facilitated sessions (modules + activities led by the facilitator). | PMD, Workbook, Facilitator Guide, Commercial Sheet, CPD Package, CMS, Website, Certificates |
| **Individual Activities / Self-Study** | Structured individual work assigned outside live sessions: reflection, worksheets, reading, action-planning. | Commercial Sheet, CPD Package, Workbook |
| **Total Learning Hours** | Contact Hours + Individual Activities. This is the figure used for CPD accreditation. | CPD Package, CMS, Website, Certificates |
| **CPD Credits** | 1 CPD credit = 1 Total Learning Hour. Round to the nearest whole number (0.5 rounds up). | CPD Package, CMS, Website, Certificates |

### 4.2 Per-programme contact hours (from PMD module timings)

| Programme | Modules | Total contact time |
|---|---|---|
| Conversații care Contează | 6 modules | 390 min = **6.5 h** |
| AI Fără Haos | 6 modules | 390 min = **6.5 h** |
| Calm sub Presiune | 6 modules | 360 min = **6.0 h** |
| Busola Deciziilor | 6 modules | 390 min = **6.5 h** |
| Avantajul Uman | 6 modules | 360 min = **6.0 h** |

### 4.3 Recommended final variants

#### Conversații care Contează

| Format | Sessions | Contact Hours | Individual Activities | Total Learning Hours | CPD Credits |
|---|---|---|---|---|---|
| Online Live | 2 × 3.5 h | 6.5 h | 1 h | 7.5 h | **8** |
| La sediul instituției / organizației | 1 day (6.5 h) | 6.5 h | 1 h | 7.5 h | **8** |
| Experience Edition | 2 days | 10 h | 2 h | 12 h | **12** |

#### AI Fără Haos

| Format | Sessions | Contact Hours | Individual Activities | Total Learning Hours | CPD Credits |
|---|---|---|---|---|---|
| Online Live | 2 × 3.5 h | 6.5 h | 1 h | 7.5 h | **8** |
| La sediul instituției / organizației | 1 day (6.5 h) | 6.5 h | 1 h | 7.5 h | **8** |
| Experience Edition | 2 days | 10 h | 2 h | 12 h | **12** |

#### Calm sub Presiune

| Format | Sessions | Contact Hours | Individual Activities | Total Learning Hours | CPD Credits |
|---|---|---|---|---|---|
| Online Live | 2 × 3 h | 6.0 h | 1 h | 7.0 h | **7** |
| La sediul instituției / organizației | 1 day (6 h) | 6.0 h | 1 h | 7.0 h | **7** |
| Experience Edition | 2 days | 10 h | 2 h | 12 h | **12** |

#### Busola Deciziilor

| Format | Sessions | Contact Hours | Individual Activities | Total Learning Hours | CPD Credits |
|---|---|---|---|---|---|
| Online Live | 2 × 3.5 h | 6.5 h | 1 h | 7.5 h | **8** |
| La sediul instituției / organizației | 1 day (6.5 h) | 6.5 h | 1 h | 7.5 h | **8** |
| Experience Edition | 2 days | 10 h | 2 h | 12 h | **12** |

#### Avantajul Uman

| Format | Sessions | Contact Hours | Individual Activities | Total Learning Hours | CPD Credits |
|---|---|---|---|---|---|
| Online Live | 2 × 3 h | 6.0 h | 1 h | 7.0 h | **7** |
| La sediul instituției / organizației | 1 day (6 h) | 6.0 h | 1 h | 7.0 h | **7** |
| Experience Edition | 2 days | 10 h | 2 h | 12 h | **12** |

### 4.4 Rationale

- **Online Live** contact hours match the PMD module sums, split into practical session lengths.
- **On-site** contact hours are the same as Online Live (content is the same), delivered in one day.
- **Experience Edition** keeps the existing documented 10 h contact + 2 h individual work = 12 CPD, spread over 2 days as in the current PMD.
- **CPD credits** are calculated as Total Learning Hours, rounded to the nearest whole number.
- No generic formula such as "1 day = 7 hours" was used.

### 4.5 Single source of truth

Once approved, the CPD Package table becomes the single source of truth for hours/credits. The same values must be propagated to:

- PMD Format details table (use "Contact hours" and "Total learning hours" labels consistently)
- Workbook cover page and summary
- Facilitator Guide cover page and summary
- Commercial Sheet
- CPD Package
- CMS fields: `duration` (text), `learningHours` (Total Learning Hours for the default format), `cpdHours` (CPD Credits for the default format)
- Website programme cards and detail pages
- Certificate and competency record

---

## 5. Programme → Edition Integrity

**Schema:** `Edition.programmeId` is non-nullable and references `Programme.id`. Each edition belongs to exactly one programme.

**Code:** The public registration flow (`app/inscriere/page.tsx`) and calendar (`app/calendar/page.tsx`) now pass `programmeSlug` and filter editions by programme. This prevents Busola Deciziilor from displaying AI Fără Haos editions.

**Database verification:** cannot run without `DATABASE_URL`. The validation script `scripts/validate-programme-edition-integrity.ts` is ready.

---

## 6. Implementation Checklist (Pending Final Approval)

- [ ] Approve CPD standardization values from Section 4.
- [ ] Update PMD source documents to remove Open Cohort and align hours/credits labels.
- [ ] Update Commercial Sheets and CPD Packages with final values.
- [ ] Update Workbooks and Facilitator Guides cover pages.
- [ ] Update CMS seed values for `learningHours` and `cpdHours`.
- [ ] Update website programme detail pages with final durations.
- [ ] Update certificate and competency record to print the correct CPD values per programme/format.
- [ ] Regenerate all programme materials.
- [ ] Run `npx prisma migrate dev` to apply the enum change to the database (or generate a new migration after removing `OPEN_COHORT`).
- [ ] Run `scripts/validate-programme-edition-integrity.ts` to verify database integrity.

---

## 7. Open Questions

1. **Avantajul Uman seed currently has `learningHours: 10, cpdHours: 12`.** Should this be aligned with the proposed 7/7/12 values, or does Avantajul Uman have a different approved structure?
2. **CMS single-field limitation:** `Programme.learningHours` and `Programme.cpdHours` store one integer per programme. Should these represent the default format (e.g. Online Live), or should the CMS model be extended to store per-format hours?
3. **On-site session length for 6.5 h programmes:** single 6.5 h day, or split into 2 sessions even on-site?
