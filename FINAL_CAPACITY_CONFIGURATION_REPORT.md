# Final Capacity Configuration Report

**Date:** 2026-07-12  
**Status:** Implemented

---

## 1. Final Capacity Rules

| Delivery format | Minimum participants | Maximum participants | Public display rule |
|---|---|---|---|
| **Online Live** | 15 | 30 | Show range `15–30` |
| **La sediul instituției / organizației** | — (no fixed public minimum) | 30 | Show only maximum; internally recommended `15–30` |
| **Experience Edition** | 20 | 30 | Show range `20–30` |

Rules apply to **all five AnimaMinds programmes** by default.

---

## 2. Programme Metadata

### Prisma schema
File: `prisma/schema.prisma`

Added default capacity fields to the `Programme` model:
- `onlineMinParticipants`
- `onlineMaxParticipants`
- `onsiteMaxParticipants`
- `experienceMinParticipants`
- `experienceMaxParticipants`

### Seed data
File: `prisma/seed.ts`

All five programme records now include:
```ts
onlineMinParticipants: 15,
onlineMaxParticipants: 30,
onsiteMaxParticipants: 30,
experienceMinParticipants: 20,
experienceMaxParticipants: 30,
```

---

## 3. Edition Metadata

The existing `Edition` model already stores:
- `maxSeats` — used as the edition-specific public maximum for Online Live and On-site editions.
- `minParticipants` / `maxParticipants` — used to override defaults for Experience Edition editions.

The admin edition form now displays a capacity help text:
> Final capacity rules: Online Live 15–30 participants, On-site max 30 (recommended 15–30), Experience Edition 20–30. Use Max Seats to override the public maximum for a specific edition.

---

## 4. Registration Rules

Files: `app/admin/actions/cms.ts`, `app/inscriere/registration-form.tsx`

### Server-side validation (`cms.ts`)
Added `DEFAULT_CAPACITY` and `validateParticipantCount()` helpers:
- Enforce Online Live: 15–30 participants.
- Enforce On-site: maximum 30 participants (no public minimum).
- Enforce Experience Edition: 20–30 participants.
- Validation runs in:
  - `createRegistration()`
  - `updateRegistration()`
  - `submitPublicRegistration()`

### Public registration form
- Participant count input now receives dynamic `min` and `max` based on selected edition format.
- A hint shows the expected group size (e.g. `Grup: 15–30 participanți`).
- Input is remounted when the selected edition changes so the default value matches the format minimum.

---

## 5. Calendar Display

File: `app/calendar/page.tsx`

Each edition card now shows a `Capacitate` line:
- Online Live: `15–30 participanți`
- On-site: `maxim 30 participanți`
- Experience Edition: `20–30 participanți`

Available seats continue to be shown when `maxSeats` is set on the edition.

---

## 6. CMS Display Texts

File: `app/admin/editions/[id]/edition-form.tsx`

Updated the "Schedule & Capacity" section with the final capacity rules and guidance on using `Max Seats` as an edition override.

---

## 7. Public Website Texts

### Programme listing
File: `app/programe/page.tsx`

All five programme cards now display:
```
🌐 Online Live (15–30) · 🏢 La sediu (max 30) · 🏔️ Experience Edition (20–30)
```

### Programme detail pages
- `app/programe/ai-fara-haos/ai-fara-haos-client.tsx`
- `app/programe/busola-deciziilor/page.tsx`

Format cards now include capacity in their descriptions.

### Busola Deciziilor Experience Edition fixes
- `app/programe/busola-deciziilor/page.tsx`: Experience Edition description changed from `3 zile` to `2 zile`; metadata updated to `3 formate`.
- `app/programe/busola-deciziilor/layout.tsx`: metadata updated to `3 formate`.
- `app/programe/busola-deciziilor/experience-edition/layout.tsx`: metadata changed from `3 zile` to `2 zile`; dates updated.
- `app/programe/busola-deciziilor/experience-edition/experience-edition-client.tsx`: dates changed to 2-day ranges, all `3 zile` references changed to `2 zile`, `MAX_SPOTS` set to 30, `MIN_CONFIRM` set to 20.

---

## 8. Affected Pages

| Page | What changed |
|---|---|
| `/programe` | Capacity shown on each programme card |
| `/programe/ai-fara-haos` | Format descriptions include capacity |
| `/programe/busola-deciziilor` | Format descriptions include capacity; Experience Edition now 2 days |
| `/programe/busola-deciziilor/experience-edition` | Duration, dates and capacity updated to 2 days / 20–30 participants |
| `/calendar` | Edition cards show format-specific capacity text |
| `/inscriere` | Participant count enforces format min/max with dynamic hints |
| `/admin/editions` | Capacity help text added to edition form |
| `/admin/registrations` | Server-side capacity validation on create/update |

---

## 9. Affected CMS Records

- `Programme` table: new default capacity columns; seed values set for PMD_001–PMD_005.
- `Edition` table: existing `maxSeats` / `minParticipants` / `maxParticipants` continue to act as edition-level overrides.
- `Registration` logic: server validates against programme defaults.

---

## 10. Validation Results

- `tsc --noEmit` passes.
- Open Cohort references remain only in the historical migration file `prisma/migrations/20260712064505_init/migration.sql`, which will be superseded by the next migration.
- Capacity helper defaults match the seeded programme metadata:
  - Online Live: 15–30
  - On-site: max 30
  - Experience Edition: 20–30

---

## 11. Remaining Manual Steps

1. **Regenerate Prisma client and apply migration.** The new capacity columns require:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
   (Requires `DATABASE_URL` to be configured.)

2. **Re-seed the database** if you want the default capacity values populated for existing programmes:
   ```bash
   npx prisma db seed
   ```

3. **Remove temporary type assertions.** After Prisma client regeneration, search `app/admin/actions/cms.ts` for `as any` related to the capacity select and replace with proper typed selects.

4. **Review live CMS data.** If editions already exist, optionally set `maxSeats` / `minParticipants` to match the new rules.
