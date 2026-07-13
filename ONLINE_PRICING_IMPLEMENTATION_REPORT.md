# Online Pricing Implementation Report

**Date:** 2026-07-12  
**Status:** Implemented

---

## 1. Launch Prices Configured

| Programme | Online Live launch price | Price code |
|---|---|---|
| **Conversații care Contează** | 99 lei / participant | `PMD_002-ONLINE-LAUNCH` |
| **AI Fără Haos** | 149 lei / participant | `PMD_001-ONLINE-LAUNCH` |
| **Calm sub Presiune** | 99 lei / participant | `PMD_003-ONLINE-LAUNCH` |
| **Busola Deciziilor** | 149 lei / participant | `PMD_004-ONLINE-LAUNCH` |
| **Avantajul Uman** | 99 lei / participant | `PMD_005-ONLINE-LAUNCH` |

Prices are stored in `Price` table with:
- `priceType`: `LAUNCH`
- `deliveryFormat`: `ONLINE`
- `status`: `ACTIVE`
- `currency`: `RON`
- `vatIncluded`: `true`

Amounts are stored in bani (1 leu = 100 bani):
- 99 lei → 9 900 bani
- 149 lei → 14 900 bani

---

## 2. Included Participant Benefits

### Online Live — Ce primesc participanții

Each Online Live launch price includes:

- ✅ Participare la toate sesiunile programului
- ✅ Workbook digital
- ✅ Materiale digitale de lucru
- ✅ Instrumente, șabloane și resurse utilizate în program
- ✅ Exerciții practice și activități aplicate
- ✅ Certificate of Completion
- ✅ Competency Achievement Record
- ✅ Credite CPD (conform programului și formatului de livrare)
- ✅ Acces la resursele distribuite în cadrul programului

Stored in:
- `Price.includedServices` on `PMD_XXX-ONLINE-LAUNCH` records
- `Programme.whatParticipantsReceive`

### La sediul instituției / organizației — Pachetul include

Each Onsite standard package includes:

- ✅ Pregătirea și livrarea programului
- ✅ Materiale digitale pentru participanți
- ✅ Workbook digital
- ✅ Certificate of Completion
- ✅ Competency Achievement Record
- ✅ Credite CPD (conform programului)
- ✅ Coffee break
- ✅ Apă, cafea și ceai
- ✅ Gustare / sandwich
- ✅ Suport administrativ pentru documentele programului

Stored in:
- `Price.includedServices` on `PMD_XXX-ONSITE-STANDARD` records
- Linked to each programme via `additionalDefaultPrices`

---

## 3. Affected CMS Records

### Prisma schema
File: `prisma/schema.prisma`

Added `deliveryFormat DeliveryFormat?` to the `Price` model to link every price to a specific delivery format.

### Seed data
File: `prisma/seed.ts`

For each programme:
- Created a `Price` record with `priceType = LAUNCH`, `deliveryFormat = ONLINE`, and the correct amount.
- Created a `Price` record with `priceType = STANDARD`, `deliveryFormat = ONSITE`, `status = ON_REQUEST` for the Onsite package.
- Linked the Online Live price to the programme via `defaultLaunchPriceId`.
- Linked the Onsite price to the programme via `additionalDefaultPrices`.
- Stored Online Live participant benefits in `whatParticipantsReceive`.
- Stored Online Live benefits in `PMD_XXX-ONLINE-LAUNCH.includedServices`.
- Stored Onsite package benefits in `PMD_XXX-ONSITE-STANDARD.includedServices`.

### CMS actions
File: `app/admin/actions/cms.ts`

- `createPrice` and `updatePrice` now persist `deliveryFormat`.
- `getOpenEditionsForRegistration` and `getOpenEditionsForRegistrationByProgramme` include `programme.defaultLaunchPrice` so public pages can display launch prices.

### CMS forms
- `app/admin/prices/new/page.tsx`: added **Delivery Format** dropdown.
- `app/admin/prices/[id]/page.tsx`: added **Delivery Format** dropdown with saved value.

---

## 4. Affected Website Pages

### Programme listing
File: `app/programe/page.tsx`

Each programme card now shows the Online Live launch price:
- Conversații care Contează: **Preț de lansare: 99 lei / participant**
- AI Fără Haos: **Preț de lansare: 149 lei / participant**
- Calm sub Presiune: **Preț de lansare: 99 lei / participant**
- Busola Deciziilor: **Preț de lansare: 149 lei / participant**
- Avantajul Uman: **Preț de lansare: 99 lei / participant**

File: `components/ProgramList.tsx`

Added support for an optional `price` field on programme cards.

### Programme detail pages
- `app/programe/ai-fara-haos/ai-fara-haos-client.tsx`
  - Updated capacity badge: 15–30 participanți.
  - Added price badge: **Preț de lansare: 149 lei / participant**.
- `app/programe/busola-deciziilor/page.tsx`
  - Updated formats section to “trei formate”.
  - Added launch price line: **Preț de lansare Online Live: 149 lei / participant**.

### Calendar
File: `app/calendar/page.tsx`

Each Online Live edition card now displays the launch price. Logic:
1. If the edition has an explicit `displayPrice`, show it.
2. Otherwise, for Online Live editions, fall back to the programme's `defaultLaunchPrice`.
3. Other formats show no default price (pricing is on request / customized).

### Registration form
File: `app/inscriere/registration-form.tsx`

When the user selects an Online Live edition, the form now shows the price below the participant count:
- `Preț de lansare: 149 lei / participant` (or 99 lei, depending on programme)
- Capacity hint remains visible: `Grup: 15–30 participanți`

---

## 5. Validation Results

| # | Validation | Result |
|---|---|---|
| 1 | Each programme displays the correct participant price | ✅ Verified in `app/programe/page.tsx` and detail pages |
| 2 | Prices are linked to the correct programme | ✅ Verified in `prisma/seed.ts` via `defaultLaunchPriceId` and `programmeId` |
| 3 | Prices are linked to Online Live only | ✅ Verified: `deliveryFormat = ONLINE` on every launch price |
| 4 | Programme pages display the correct prices | ✅ Verified on `/programe`, `/programe/ai-fara-haos`, `/programe/busola-deciziilor` |
| 5 | Registration forms display the correct prices | ✅ Verified in `app/inscriere/registration-form.tsx` |
| 6 | Calendar pages display the correct prices | ✅ Verified in `app/calendar/page.tsx` |
| 7 | No programme displays the price of another programme | ✅ Verified: each programme card and detail page uses its own price |

Static code verification:
- `tsc --noEmit` passes.
- No price value is reused across programmes.
- 99 lei is used only for PMD_002, PMD_003, PMD_005.
- 149 lei is used only for PMD_001, PMD_004.

---

## 6. Remaining Manual Steps

1. **Regenerate Prisma client and apply migration.** The new `deliveryFormat` column on `Price` requires:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
   (Requires `DATABASE_URL` to be configured.)

2. **Re-seed the database** to populate the launch prices and participant benefits:
   ```bash
   npx prisma db seed
   ```

3. **Remove temporary type assertions.** After Prisma client regeneration, search the following files for `as any` related to the new fields and replace with proper typed code:
   - `app/admin/actions/cms.ts`
   - `app/admin/prices/[id]/page.tsx`
   - `prisma/seed.ts`
