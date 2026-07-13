# PHASE 2: CMS IMPLEMENTATION PLAN

**Status:** Draft — awaiting approval before implementation  
**Scope:** CMS refinement, admin interfaces, programme management screens, delivery format management, group size management, and display of Contact Hours / Individual Activities Hours / Total Learning Hours / CPD Credits.

**Out of scope for Phase 2:** public website pages, certificates, pricing, calendar, email templates.

---

## 1. Goals

1. Make the newly aligned foundation data visible and editable in the CMS.
2. Allow admins to manage per-programme default group sizes for each approved delivery format.
3. Allow admins to override group sizes and learning/CPD values at the edition level.
4. Ensure the admin list screens give a quick overview of hours and CPD credits.
5. Add server-side validation for capacity rules and hour/CPD consistency without breaking existing flows.

---

## 2. Screens Affected

| Screen | Location | Purpose in Phase 2 |
|---|---|---|
| Programmes list | `/admin/programmes` | Add columns for Learning Hours, Contact Hours, Individual Activities Hours, Total Learning Hours, CPD Credits, and Delivery Formats. |
| Programme create/edit | `/admin/programmes/[id]` | Add a **Group Size & Capacity** section; display the three approved delivery formats with default capacity rules. Hours/CPD inputs already exist from Phase 1 and remain. |
| Editions list | `/admin/editions` | Add columns for Contact Hours, Individual Activities Hours, Total Learning Hours, CPD Credits, and effective group size (min/max). |
| Edition create/edit | `/admin/editions/[id]` | Add **Learning & CPD Overrides** section; add **Group Size Overrides** section for all delivery formats (not only Experience Edition). |

No new top-level navigation items are proposed. Delivery format management is handled inside the Programme and Edition forms because `DeliveryFormat` is a Prisma enum; moving it to a DB table is out of Phase 2 scope.

---

## 3. Files Affected

| File | Change Type |
|---|---|
| `app/admin/programmes/page.tsx` | Display — add columns |
| `app/admin/programmes/[id]/programme-form.tsx` | UI — add capacity inputs and delivery-format reference |
| `app/admin/editions/page.tsx` | Display — add columns |
| `app/admin/editions/[id]/edition-form.tsx` | UI — add hour/CPD override inputs and group-size override inputs |
| `app/admin/actions/cms.ts` | Logic — add capacity fields to `buildProgrammeData`, add hour/CPD/capacity fields to `buildEditionData`, add validation helpers |
| `tests/programme-management.spec.ts` | Tests — extend to cover capacity fields |
| `tests/edition-management.spec.ts` (if exists) or `tests/programme-management.spec.ts` | Tests — add edition hour/CPD/capacity assertions |

---

## 4. Admin UI Changes

### 4.1 Programme list (`/admin/programmes`)

Current columns: Code, Name, Status, Editions, Target Audiences, Actions.

**New columns (after Status, before Editions):**
- `Learning Hours`
- `Contact Hours`
- `Individual Activities`
- `Total Learning Hours`
- `CPD Credits`
- `Delivery Formats` (badges or comma-separated list)

This gives an immediate SSOT view of the aligned values.

### 4.2 Programme form (`/admin/programmes/[id]`)

Current sections include **Professional & CPD Data** (hours/CPD inputs already present) and **Delivery & CTAs** (format checkboxes).

**New section: Group Size & Capacity**
Placed after **Professional & CPD Data** and before **Governance**.

Inputs:
- **Online Live**
  - Min Participants (`onlineMinParticipants`, default 15)
  - Max Participants (`onlineMaxParticipants`, default 30)
- **La sediul instituției / organizației**
  - Recommended Min Participants (read-only display of 15, stored as `onsiteMaxParticipants` max only; min is driven by business rule)
  - Max Participants (`onsiteMaxParticipants`, default 30)
- **Experience Edition**
  - Min Participants (`experienceMinParticipants`, default 20)
  - Max Participants (`experienceMaxParticipants`, default 30)

Helper text:
> Final capacity business rules: Online Live 15–30, On-site recommended 15–30 / max 30, Experience Edition 20–30.

**Delivery & CTAs section update**
- Rename section title to **Delivery Formats**.
- Keep the three approved format checkboxes.
- Add a read-only reference card showing the default capacity rule for each selected format.

### 4.3 Edition list (`/admin/editions`)

Current columns: Title, Programme, Format, Status, Dates, Capacity, Registrations, Deadline, Display Price, Actions.

**New columns (after Format, before Status):**
- `Contact Hours`
- `Indiv. Activities`
- `Total Learning Hours`
- `CPD Credits`

**Capacity column update**
Currently shows `maxSeats` and `availableSeats`. Update to show effective min/max participants:
- If edition has `minParticipants` / `maxParticipants`, show those.
- Otherwise fall back to programme defaults based on `deliveryFormat`.

### 4.4 Edition form (`/admin/editions/[id]`)

**New section: Learning & CPD Overrides**
Placed after **Basic Information** and before **Schedule & Capacity**.

Inputs (all optional; when blank, values inherit from programme):
- Contact Hours (`contactHours`, number, step 0.5)
- Individual Activities Hours (`individualActivitiesHours`, number, step 0.5)
- Total Learning Hours (`totalLearningHours`, number, step 0.5)
- CPD Credits (`cpdCredits`, integer)

Helper text:
> Leave blank to inherit values from the parent programme. Use these fields only when this edition differs from the programme defaults.

**Schedule & Capacity section update**
- Add **Min Participants** and **Max Participants** inputs for **all** delivery formats (currently only Experience Edition shows them).
- Pre-fill these fields on create with programme defaults based on the selected delivery format.
- Keep the existing `maxSeats` / `availableSeats` fields for operational seat control.
- Add helper text explaining that min/max participants are the business-rule bounds, while Max Seats is the operational cap for this edition.

---

## 5. Fields Added to CMS Actions

### 5.1 `app/admin/actions/cms.ts` — `buildProgrammeData`

Add to the returned object:
- `onlineMinParticipants`
- `onlineMaxParticipants`
- `onsiteMaxParticipants`
- `experienceMinParticipants`
- `experienceMaxParticipants`

These fields already exist in `prisma/schema.prisma` and are returned by `getProgramme`/`getProgrammes`; they only need to be parsed from `FormData`.

### 5.2 `app/admin/actions/cms.ts` — `buildEditionData`

Add to the returned object:
- `contactHours`
- `individualActivitiesHours`
- `totalLearningHours`
- `cpdCredits`
- `minParticipants` (always, not only for Experience Edition)
- `maxParticipants` (always, not only for Experience Edition)

Remove the `isExperience` guard around `minParticipants` / `maxParticipants` so they are persisted for Online and Onsite editions too.

### 5.3 Validation helpers (new)

Add server-side validation inside `createProgramme` / `updateProgramme` / `createEdition` / `updateEdition`:

1. **Capacity min <= max**
   - For each format, if both min and max are provided, ensure `min <= max`.
   - For editions, ensure `minParticipants <= maxParticipants`.

2. **Hour arithmetic (warning only, not blocking)**
   - If all three hour fields are provided on a programme or edition, verify that `contactHours + individualActivitiesHours` equals `totalLearningHours`.
   - Treat as a non-blocking warning/message rather than a hard error, because some formats may legitimately differ.

3. **CPD Credits positive integer**
   - Ensure `cpdCredits >= 0` if provided.

4. **Delivery format enum sanity**
   - Already enforced by Prisma; no extra code needed.

No changes to registration validation (`validateParticipantCount`) are required because it already uses the programme default capacity rules.

---

## 6. Data Displayed

| Location | Data |
|---|---|
| Programme list | `learningHours`, `contactHours`, `individualActivitiesHours`, `totalLearningHours`, `cpdCredits`, `availableDeliveryFormats` |
| Programme form | All hour/CPD inputs; new capacity inputs; selected delivery formats with capacity reference |
| Edition list | `contactHours`, `individualActivitiesHours`, `totalLearningHours`, `cpdCredits`, effective `minParticipants` / `maxParticipants` |
| Edition form | Override inputs for hour/CPD; override inputs for `minParticipants` / `maxParticipants` for all formats |

The displayed values are always the stored values; fallback values (e.g. edition inheriting from programme) are computed on the client for display but stored explicitly only when the admin enters an override.

---

## 7. Validation Impact

| Area | Impact |
|---|---|
| Server actions | New validation helpers enforce capacity min <= max and basic hour/CPD sanity. Existing `validateParticipantCount` remains unchanged and continues to work for registrations. |
| Client UI | Input type `number` with `step="0.5"` for hour fields and `step="1"` for capacity/CPD fields. No complex client validation added in this phase. |
| Database | No schema changes. All required columns already exist after Phase 1. |
| Seed | No seed changes required. Programme defaults are already seeded; edition overrides remain null by design. |
| Tests | Playwright tests need new assertions for capacity fields and edition hour/CPD overrides. |

---

## 8. Implementation Sequence

1. Update `app/admin/actions/cms.ts`
   - Add capacity fields to `buildProgrammeData`.
   - Add hour/CPD/capacity fields to `buildEditionData` and remove Experience-only guard.
   - Add validation helpers.
2. Update `app/admin/programmes/page.tsx` — add list columns.
3. Update `app/admin/programmes/[id]/programme-form.tsx` — add Group Size section and delivery-format reference card.
4. Update `app/admin/editions/page.tsx` — add list columns and improve capacity display.
5. Update `app/admin/editions/[id]/edition-form.tsx` — add Learning & CPD Overrides and Group Size Overrides sections.
6. Update tests to cover new fields.
7. Run `tsc --noEmit` and relevant Playwright tests.

---

## 9. Risks & Notes

| Risk | Mitigation |
|---|---|
| Removing the `isExperience` guard on `minParticipants`/`maxParticipants` might expose those columns for Online/Onsite editions where they were previously null. | This is the intended Phase 2 behaviour; the columns are nullable and existing null values remain valid. New defaults come from programme rules. |
| Capacity values on existing editions are null; the UI must show programme defaults clearly. | The form will pre-fill defaults on create; on edit it will show inherited values as placeholders or helper text when the edition fields are null. |
| Adding many columns to the list tables may cause horizontal scroll on smaller screens. | Keep values compact (e.g. one decimal place, small text) and consider hiding less critical columns at smaller breakpoints if needed. |

---

## 10. Approval Block

This plan is ready for review. Implementation will begin only after approval.
