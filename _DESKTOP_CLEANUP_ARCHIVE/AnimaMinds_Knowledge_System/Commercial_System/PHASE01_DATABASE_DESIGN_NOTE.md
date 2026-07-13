# PHASE01_DATABASE_DESIGN_NOTE.md

**Phase:** 01 — Database Layer  
**Project:** AnimaMinds Website & Programme Management Platform — Faza 1  
**Date:** 2026-07-12  
**Status:** Design note — ready for implementation

---

## 1. Objective

Create the database schema that will serve as the Single Source of Truth for all Phase 1 entities: Programmes, Editions, Prices, Pages, Testimonials, FAQs, Documents, Galleries, Taxonomies, Forms, Registrations, Form Submissions and Users/Roles.

---

## 2. Technology Choices

| Layer | Choice | Justification |
|---|---|---|
| Database | PostgreSQL | Required by architecture; robust relational support + JSON fields |
| ORM | Prisma | Mature, excellent Next.js integration, clear migration workflow |
| Migration | Prisma Migrate | Version-controlled, reversible, team-friendly |
| Seeding | Prisma seed script | Type-safe content seeding for 5 programmes and taxonomies |

**Note:** Payload CMS was recommended in the architecture, but for the database layer we will define the Prisma schema explicitly. Payload's own collections will map to these tables, or Payload will be configured to use this Prisma schema as the source of truth. This keeps the database layer independent and portable.

---

## 3. Entities and Tables

### Core tables

- `Programme`
- `Edition`
- `Price`
- `Page`
- `Testimonial`
- `FAQ`
- `Document`
- `Gallery`
- `TargetAudience`
- `ApplicationArea`
- `Form`
- `FormSubmission`
- `Registration`
- `User`
- `Role`

### Join tables

- `ProgrammeTargetAudience`
- `ProgrammeApplicationArea`
- `ProgrammeTestimonial`
- `ProgrammeFAQ`
- `ProgrammeDocument`
- `ProgrammeGallery`
- `EditionGallery`
- `EditionAdditionalPrice`

---

## 4. Key Design Decisions

1. **No price duplication:** `Programme` does not store numeric prices. It references `Price` records via `defaultStandardPriceId` and `defaultLaunchPriceId`.
2. **Edition price clarity:** `Edition` has one required `displayPriceId` and optional additional prices via `EditionAdditionalPrice`.
3. **Status enums stored as native PostgreSQL enums** for type safety.
4. **Soft references to PMDs:** `Programme.pmdVersion` stores the file name; the CMS sync process tracks this manually in Phase 1.
5. **JSON fields for flexible metadata** only where needed (form payload, SEO structured data).
6. **Audit fields** `createdAt`, `updatedAt`, `createdById`, `updatedById` on all core tables.

---

## 5. Files to Create / Modify

### New files

- `prisma/schema.prisma`
- `prisma/migrations/20260712000000_init/migration.sql`
- `prisma/seed.ts`
- `lib/prisma.ts` — singleton Prisma client
- `.env.example` — database connection template
- `package.json` scripts update for `db:seed`, `db:migrate`, `db:generate`

### Modified files

- `package.json` — add `@prisma/client`, `prisma`, `tsx` dependencies
- `.gitignore` — ensure `.env` is ignored
- `README.md` — add database setup instructions (optional, minimal)

---

## 6. Seeding Strategy

Seed script will create:

1. Roles: Super Admin, Content Manager, Commercial Manager.
2. Users: one Super Admin user placeholder.
3. Target audiences (15 values).
4. Application areas (7 values).
5. Programmes: 5 programmes with `programmeCode`, status `Draft`, linked PMD version, CPD fields.
6. Editions: at least one draft edition per programme.
7. Prices: one "On request" price per programme, default status.
8. Sample FAQ, Testimonial, Document placeholders.

---

## 7. Migration and Rollback

- Initial migration generated with `prisma migrate dev`.
- Rollback: apply `prisma migrate resolve --rolled-back <migration_name>` or restore from pre-migration backup.
- Staging database will be wiped and re-seeded during early phases; production database will be migrated only after final testing.

---

## 8. Validation Plan

After implementation, verify:

- [ ] `prisma generate` runs without errors.
- [ ] `prisma migrate dev` applies cleanly.
- [ ] `prisma db seed` populates all 5 programmes and taxonomies.
- [ ] Foreign key constraints prevent orphaned records.
- [ ] Enum values match architecture (e.g. `OnRequest` default for new prices).

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| Schema changes later are expensive | Keep changes minimal; align with architecture |
| Prisma and Payload CMS schema conflicts | Define Prisma as SSOT; configure Payload to respect it |
| Missing indexes hurt performance | Add indexes on foreign keys and slug fields now |

---

**Next step:** Implement schema, migration and seed script; then create `PHASE01_DATABASE_COMPLETION_REPORT.md`.
