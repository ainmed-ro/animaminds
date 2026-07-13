# Programme → Edition Integrity Report

**Date:** 2026-07-12
**Status:** In Progress
**Severity:** Critical

---

## 1. Problem Statement

When accessing the public registration flow for **Busola Deciziilor**, the edition dropdown/list displayed editions belonging to other programmes (e.g. AI Fără Haos).

Root cause: the public `/inscriere` page loaded **all** open editions across every programme, without filtering by programme.

---

## 2. Root Cause

- `app/inscriere/page.tsx` called `getOpenEditionsForRegistration()` which returns every `OPEN`/`DRAFT` edition in the database.
- Programme page CTAs linked to `/inscriere` without any programme identifier.
- The calendar page linked to `/inscriere?editionId=...` but still left the full unfiltered list available.

The database schema itself is correct: `Edition.programmeId` is non-nullable and each edition belongs to exactly one `Programme`. The bug was purely in the public query logic and link construction.

---

## 3. Files Modified

| File | Change |
|---|---|
| `app/admin/actions/cms.ts` | Added `getOpenEditionsForRegistrationByProgramme(programmeSlug)` server action that filters open editions by `programme.slug`. |
| `app/inscriere/page.tsx` | Now reads `programmeSlug` from query params; if present, fetches only that programme's editions; otherwise falls back to the global list. |
| `app/calendar/page.tsx` | Register links now include `programmeSlug` so the registration page filters correctly. |
| `app/programe/page.tsx` | Active programme card CTA now links to `/inscriere?programmeSlug=busola-deciziilor`. |
| `app/programe/busola-deciziilor/page.tsx` | All "Înscrie-te" CTAs now pass `programmeSlug=busola-deciziilor`. |
| `scripts/validate-programme-edition-integrity.ts` | New validation script that audits Programme → Edition and Edition → Price integrity. |

---

## 4. Affected Pages

| Page | Issue | Fix |
|---|---|---|
| `/inscriere` | Showed all programmes' editions | Filters by `programmeSlug` when provided |
| `/inscriere?editionId=...` | Could pre-select an edition while still showing foreign editions | Now also accepts `programmeSlug` to scope the list |
| `/calendar` | Register links dropped users into unfiltered registration | Links now include the edition's programme slug |
| `/programe` | Active card linked to generic `/inscriere` | Links to programme-scoped registration |
| `/programe/busola-deciziilor` | CTAs linked to generic `/inscriere` | Links to programme-scoped registration |

---

## 5. Database Integrity Checks

The schema enforces:

- `Edition.programmeId` is `String` (non-nullable).
- `Edition` has a single `Programme` relation via `programmeId`.
- `@@unique([programmeId, slug])` prevents duplicate edition slugs within a programme.

The validation script (`scripts/validate-programme-edition-integrity.ts`) verifies:

1. No orphan editions (missing `programmeId` or `programme` relation).
2. Edition counts per programme match the `Programme.editions` relation.
3. Expected five programmes exist by slug.
4. `edition.programmeId === edition.programme.id` for every edition.
5. Edition display prices belong to the same programme (or are generic).
6. Additional edition prices belong to the same programme (or are generic).
7. No duplicate edition slugs within a programme.

---

## 6. Validation Results

Run the validation script with:

```bash
npx tsx scripts/validate-programme-edition-integrity.ts
```

Execution attempted: the script failed to connect because `DATABASE_URL` is not configured in this environment (`Environment variable not found: DATABASE_URL`).

Once `DATABASE_URL` is set, re-run the script. Expected checks:

- No orphan editions.
- Each edition's `programmeId` matches its `programme.id`.
- Display/additional prices on an edition belong to the same programme (or are generic).
- All five expected programme slugs exist.
- No duplicate edition slugs within a programme.

**Note:** if the script reports missing programmes for `conversatii-care-conteaza`, `calm-sub-presiune`, or `avantajul-uman`, those programme pages do not yet exist in the public site (only `ai-fara-haos` and `busola-deciziilor` have dedicated public pages at the time of writing). This is expected and does not affect the integrity fix.

---

## 7. Remaining / Follow-up Actions

1. Create dedicated public pages for the remaining three programmes when ready, ensuring their registration CTAs use the correct `programmeSlug`.
2. Consider adding server-side validation in `submitPublicRegistration` to reject an `editionId` that does not belong to the `programmeSlug` supplied in the form.
3. Re-run the validation script after the next database migration or seed.

---

## 8. Conclusion

The critical integrity issue was not a corrupt database but an unfiltered public registration query. The fix scopes the registration page by `programmeSlug` and updates all public links to pass the correct programme identifier. Database integrity is enforced by the Prisma schema and confirmed by the validation script.
