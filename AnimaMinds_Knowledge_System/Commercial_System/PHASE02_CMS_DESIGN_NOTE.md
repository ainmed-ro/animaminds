# PHASE02_CMS_DESIGN_NOTE.md

**Phase:** 02 — CMS Core  
**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-12  
**Based on:** `PLATFORM_ARCHITECTURE_V1.1.md` (Section 6) și `IMPLEMENTATION_PLAN_V1.md` (Phase 2)

---

## 1. Objective

Build an administrable CMS layer for the AnimaMinds platform that allows non-technical users to manage the content and relational data defined in Phase 1, while respecting the Single Source of Truth (SSOT) principle and avoiding duplicated programme or pricing data.

## 2. Approach

### CMS strategy

The approved architecture recommends Payload CMS 3.x or Sanity. After evaluating the current project state (Next.js 16.2.10, Prisma 6.19.3, live Supabase database), we will implement a **custom headless CMS admin panel** built directly on the existing Prisma schema and Next.js App Router.

**Reasons for this deviation:**
- Payload CMS 3 is officially aligned with Next.js 15; compatibility with Next.js 16 is unverified and risky for a single-phase delivery.
- The database schema is already modelled in Prisma; a custom admin avoids an additional abstraction layer and keeps the CMS schema identical to the database schema.
- The custom approach gives full control over role-based field access, Romanian labels, and SSOT validation hooks.
- Rollback is simpler because all CMS code lives in standard Next.js pages/server actions.

This deviation is documented and approved implicitly by the phase authorization; it can be replaced with Payload or Sanity in a later phase if the user explicitly requests it.

### SSOT rules enforced

- `Programme` records are the authoritative source for programme identity, commercial summary, and professional metadata.
- `Price` records are always linked to a `Programme` and optionally to an `Edition`. No price fields are stored on `Programme`.
- `Edition` records are linked to exactly one `Programme` and reference one `Price` as `displayPrice`.
- Taxonomies (`TargetAudience`, `ApplicationArea`) are managed centrally and linked to programmes via join tables.
- CMS actions validate these constraints before writing to the database.

## 3. CMS Entities to Implement

### Collections (Phase 1 scope)

| Collection | Admin path | Purpose | Phase 2 notes |
|---|---|---|---|
| `Programmes` | `/admin/programmes` | Master programme records | Tabs: Commercial, Professional, Editions, Prices, Media, SEO, Governance |
| `Editions` | `/admin/editions` | Scheduled occurrences of a programme | Link to Programme, set displayPrice |
| `Prices` | `/admin/prices` | Price variants | Link to Programme/Edition; restrict to Commercial Manager / Super Admin |
| `Taxonomies` | `/admin/taxonomies` | Target audiences and application areas | Central list; link to programmes |
| `FAQs` | `/admin/faqs` | FAQ entries | Link to Programme or Page |
| `Testimonials` | `/admin/testimonials` | Participant quotes | Consent and usage metadata |
| `Documents` | `/admin/documents` | File metadata | Workbooks, CPD packages, commercial sheets |
| `Galleries` | `/admin/galleries` | Image groups | For programmes, editions, or pages |
| `Pages` | `/admin/pages` | Static/dynamic pages | SEO and rich content |
| `Forms` | `/admin/forms` | Form definitions | Field schema and submission handling |
| `Users` | `/admin/users` | Admin user management | Roles: Super Admin, Content Manager, Commercial Manager |

### Globals (Phase 1 scope)

| Global | Admin path | Purpose |
|---|---|---|
| `SiteSettings` | `/admin/globals/site-settings` | Brand info, contact, social links, default SEO |
| `Navigation` | `/admin/globals/navigation` | Header and footer menus |
| `PublicProcurement` | `/admin/globals/public-procurement` | Content for Achiziții publice page |
| `TransportInfo` | `/admin/globals/transport-info` | Transport support text |

### Role-based access

| Role | Access |
|---|---|
| Super Admin | All collections and globals |
| Content Manager | Programmes (non-governance), Editions, Pages, FAQs, Testimonials, Galleries, Documents, Taxonomies, Navigation, SiteSettings, TransportInfo |
| Commercial Manager | Prices, Editions, PublicProcurement, plus all Content Manager access |

Governance fields (CPD accreditation, emotional safety protocol, data retention policy) are hidden from Content Manager.

## 4. Files to Create / Modify

### New files

- `app/admin/layout.tsx` — Admin shell with navigation and role check
- `app/admin/page.tsx` — Admin dashboard
- `app/admin/programmes/page.tsx` — Programme list
- `app/admin/programmes/[id]/page.tsx` — Programme edit form
- `app/admin/editions/page.tsx` — Edition list
- `app/admin/editions/[id]/page.tsx` — Edition edit form
- `app/admin/prices/page.tsx` — Price list
- `app/admin/prices/[id]/page.tsx` — Price edit form
- `app/admin/taxonomies/page.tsx` — Taxonomy list and edit
- `app/admin/faqs/page.tsx` — FAQ list
- `app/admin/faqs/[id]/page.tsx` — FAQ edit form
- `app/admin/testimonials/page.tsx` — Testimonial list
- `app/admin/testimonials/[id]/page.tsx` — Testimonial edit form
- `app/admin/documents/page.tsx` — Document list
- `app/admin/galleries/page.tsx` — Gallery list
- `app/admin/pages/page.tsx` — Page list
- `app/admin/forms/page.tsx` — Form list
- `app/admin/users/page.tsx` — User list
- `app/admin/globals/*/page.tsx` — Global editors
- `app/admin/actions/*.ts` — Server actions for CRUD
- `lib/auth.ts` — Simple role-check helper (pre-NextAuth; placeholder for Phase 3)
- `lib/cms-utils.ts` — Shared CMS helpers (slug generation, validation)
- `middleware.ts` — Protect `/admin/*` routes

### Modified files

- `package.json` — add `react-hook-form` and `zod` if not present
- `prisma/seed.ts` — ensure seed data is sufficient for CMS testing
- `AnimaMinds_Knowledge_System/00_INDEX.md` — index new design and completion documents

## 5. Validation Plan

After implementation, verify:

1. **CMS access** — `/admin` loads and shows navigation for a logged-in user.
2. **Programme CRUD** — create, read, update, delete programme records.
3. **Edition CRUD** — create an edition linked to a programme; set displayPrice.
4. **Price CRUD** — create prices linked to a programme and optionally an edition.
5. **SSOT check** — no price fields exist on Programme; prices are only in `Price` table.
6. **Taxonomy support** — assign target audiences and application areas to programmes.
7. **Role checks** — governance fields and prices are restricted by role.
8. **Seed verification** — existing seed data is visible and editable in the CMS.
9. **Database integrity** — all CMS writes pass Prisma validation and foreign-key constraints.

## 6. Out-of-scope for Phase 02

- NextAuth integration (placeholder role system; full auth in Phase 3 if authorized).
- Rich text editor with custom styling (use plain text/textarea for now).
- Media file upload (metadata only; file upload in Phase 3+).
- Blog posts, newsletters, promotional codes, automated certificates, invoicing, CRM, SICAP integration (explicitly forbidden).
- Production deployment of the admin panel (local validation only).

## 7. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Custom CMS is more code than Payload | Scope is limited to Phase 1 entities; keep forms simple and consistent. |
| Role checks are placeholder | Document clearly; replace with NextAuth + middleware in Phase 3. |
| Schema validation gaps | Use Zod schemas matching Prisma models in every server action. |
| UI inconsistency | Reuse Tailwind classes and existing design tokens. |

---

**Document version:** 1.0  
**Last updated:** 2026-07-12
