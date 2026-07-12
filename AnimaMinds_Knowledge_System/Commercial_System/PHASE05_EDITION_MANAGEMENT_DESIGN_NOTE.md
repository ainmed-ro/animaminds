# PHASE05_EDITION_MANAGEMENT_DESIGN_NOTE.md

**Phase:** 05 — Edition Management  
**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-13  
**Status:** Approved and implemented

---

## 1. Objective

Implement full edition lifecycle management for programmes. Support every delivery format (online, on-site, open cohort, and Experience Edition), capacity limits, registration deadlines, status workflows, price linkage, and programme linkage, while preserving the RBAC established in Phase 03.

---

## 2. Requirements

1. Full edition lifecycle — create, read, update, delete editions.
2. Online editions — platform, links, session dates, recording policy.
3. Open editions — city, location, address, schedule, services.
4. In-house delivery — room options, included/excluded services.
5. Experience Edition support — destination, hotel, room types, meals, facilities, activities, policies.
6. Capacity management — max seats and available seats.
7. Registration deadlines — configurable deadline per edition.
8. Edition status management — `DRAFT`, `OPEN`, `FULL`, `CLOSED`, `CANCELLED`.
9. Programme linkage — every edition belongs to one programme.
10. Price linkage — display price, additional default prices, and additional edition prices.

---

## 3. Data Model

The `Edition` model in `prisma/schema.prisma` already contained all required fields. Phase 05 wires them into the admin UI and server actions.

- `programmeId` — required parent programme.
- `editionTitle`, `slug`, `deliveryFormat`, `status` — core identity.
- `startDate`, `endDate`, `durationText`, `registrationDeadline` — scheduling.
- `maxSeats`, `availableSeats` — capacity.
- `displayPriceId` — linked `Price` for display/pricing.
- Online-specific: `platform`, `meetLink`, `classroomLink`, `sessionDates`, `sessionCount`, `recordingPolicy`.
- On-site / open cohort: `city`, `locationName`, `address`, `startTime`, `endTime`, `includedServices`, `excludedServices`, `hasOwnRoom`, `roomCostIncluded`.
- Experience Edition: `destination`, `hotelName`, `hotelAddress`, `period`, `minParticipants`, `maxParticipants`, `roomTypes`, `includedMeals`, `includedFacilities`, `complementaryActivities`, `indicativeSchedule`, `confirmationPolicy`, `cancellationPolicy`, `priceStatus`.
- Relations: `additionalPrices` via `EditionAdditionalPrice`, `galleries` via `EditionGallery`, `registrations`.

---

## 4. Server Actions

### 4.1 `getEditions`

Returns all editions with programme name, display price, additional prices, galleries, and registration count (`_count`).

### 4.2 `getEdition`

Returns a single edition with programme, display price, additional prices, galleries, and registrations for the edit UI.

### 4.3 `getEditionEditOptions`

Fetches selectable catalogues in parallel: programmes, prices (programme-specific or global), and galleries.

### 4.4 `createEdition`

Creates an edition from `FormData`, links the selected display price, additional prices, and galleries, and stores all delivery-format-specific fields.

### 4.5 `updateEdition`

Updates scalar fields, rebuilds `additionalPrices` and `galleries` relations, and preserves programme linkage (programme cannot be changed after creation).

### 4.6 `buildEditionData`

Central helper that:

- Slugifies the title if no slug is provided.
- Conditionally includes Experience Edition fields only when `deliveryFormat === EXPERIENCE_EDITION`.
- Parses date arrays, numbers, dates, and optional strings via existing helpers.

---

## 5. UI Components

### 5.1 `EditionForm`

Client component used by `/admin/editions/new` and `/admin/editions/[id]`. It tracks the selected `deliveryFormat` in React state and conditionally renders:

- Basic Information (title, slug, programme, format, status, featured image, notes)
- Schedule & Capacity (dates, deadline, max/available seats)
- Pricing (display price + additional prices)
- Online Delivery (platform, links, session dates, recording policy)
- On-site / Open Cohort (location, schedule, services, room flags)
- Experience Edition (destination, hotel, room types, meals, facilities, activities, policies)
- Related Content (galleries)

### 5.2 Shared Inputs

- `StringArrayInput` — included/excluded services, meals, facilities, activities.
- `DateArrayInput` — repeatable session dates.
- `RoomTypeArrayInput` — structured `roomTypes` JSON.
- `RelationSelector` — additional prices and galleries.

---

## 6. List View Enhancements

The editions list now shows:

- Title, programme, format, status.
- Date range.
- Capacity (`maxSeats` + `availableSeats`).
- Registration count.
- Registration deadline.
- Display price code.

---

## 7. RBAC Preservation

All edition mutations require `canManageContent(user)`. The admin routes remain protected by Phase 03 middleware.

---

## 8. Validation & Testing

### 8.1 Automated Checks

- `npm run build` — TypeScript compilation and route generation.
- `npx tsx --env-file=.env.local scripts/phase05-validation.ts` — direct Prisma CRUD, capacity, deadline, relationship, and Experience Edition field checks.
- `npx playwright test tests/edition-management.spec.ts` — browser-based create/edit flow with capacity, deadline, price, and gallery assertions.
- Regression: `tests/auth.spec.ts` and `tests/programme-management.spec.ts`.

### 8.2 SSOT Validation

- `prisma/schema.prisma` — every field referenced in `buildEditionData` exists on the `Edition` model or its relations.
- `app/admin/actions/cms.ts` — source of truth for edition server actions.
- `app/admin/editions/[id]/edition-form.tsx` — form field names match `buildEditionData` keys.

---

## 9. Files Changed

- `app/admin/actions/cms.ts` — extended edition actions and added `buildEditionData`, `getEditionEditOptions`, `getGalleriesForSelect`.
- `app/admin/editions/[id]/edition-form.tsx` — new comprehensive client form.
- `app/admin/editions/[id]/page.tsx` — refactored to use `EditionForm`.
- `app/admin/editions/new/page.tsx` — refactored to use `EditionForm`.
- `app/admin/editions/page.tsx` — enhanced list columns.
- `app/admin/components/date-array-input.tsx` — new date array input.
- `app/admin/components/room-type-array-input.tsx` — new room type JSON input.
- `tests/edition-management.spec.ts` — new Playwright E2E test.
- `scripts/phase05-validation.ts` — new direct Prisma validation script.

---

## 10. Decisions & Notes

- `programmeId` is disabled on edit to preserve relation integrity and avoid orphaning registrations/prices.
- Experience Edition fields are only written to the database when the format is `EXPERIENCE_EDITION`; other formats leave them undefined.
- Session dates are stored as a `DateTime[]` array and edited via a repeatable date picker.
- The display price select surfaces both programme-scoped and global prices so editions can reuse catalogue prices.
