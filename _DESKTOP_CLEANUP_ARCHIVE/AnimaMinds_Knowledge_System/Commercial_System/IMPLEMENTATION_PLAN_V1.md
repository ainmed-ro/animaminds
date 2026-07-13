# IMPLEMENTATION_PLAN_V1.md

**Project:** AnimaMinds Website & Programme Management Platform — Faza 1  
**Status:** Implementation plan — pending authorization to begin work  
**Based on:** `PLATFORM_ARCHITECTURE_V1.1.md`  
**Date:** 2026-07-12  
**Version:** 1.0

---

## 1. Executive Summary

This document breaks the implementation of the AnimaMinds Programme Management Platform into discrete, sequenced phases. It is based on the approved architecture in `PLATFORM_ARCHITECTURE_V1.1.md`.

**Purpose:** Provide a clear implementation roadmap with dependencies, effort estimates, risks, deliverables and rollback options for each phase.

**Constraint:** No code, database or CMS work is authorized until this plan receives explicit approval.

---

## Implementation Principles

- Implement only Phase 1 scope defined in `PLATFORM_ARCHITECTURE_V1.1.md`.
- Preserve the existing Next.js website and design system.
- Build database-first, then CMS, then public-facing features.
- Test each phase before moving to the next.
- Keep production website operational throughout.
- All changes run through staging before production.

---

## 2. Overall Timeline

| Phase | Name | Estimated Effort | Cumulative |
|---|---|---|---|
| 0 | Pre-implementation setup | 2–3 days | Week 1 |
| 1 | Database layer | 3–4 days | Week 1 |
| 2 | CMS layer | 4–5 days | Week 2 |
| 3 | Programme management | 4–5 days | Week 3 |
| 4 | Edition management | 3–4 days | Week 4 |
| 5 | Pricing management | 3–4 days | Week 4 |
| 6 | Forms | 4–5 days | Week 5 |
| 7 | SEO | 2–3 days | Week 6 |
| 8 | Public procurement page | 2–3 days | Week 6 |
| 9 | Admin area refinements | 3–4 days | Week 7 |
| 10 | Testing | 5–6 days | Week 8 |
| 11 | Migration and launch | 4–5 days | Week 9 |

**Total estimated effort:** 8–9 weeks for one senior full-stack developer plus part-time QA and content support.

---

## Phase 0: Pre-Implementation Setup

### Dependencies

- Approved `PLATFORM_ARCHITECTURE_V1.1.md`.
- Answers to the 10 business approval questions documented in Section 30 of the architecture.
- Access to current repository, hosting and DNS.
- Stripe (or chosen payment provider) account created.
- CMS vendor decision confirmed.

### Estimated Effort

2–3 days

### Deliverables

- Decision log (CMS vendor, hosting, payment provider, multi-language scope).
- Staging environment configured.
- Feature branch created from current `main`.
- Design tokens and component inventory documented.
- Initial data migration spreadsheet (programme fields → CMS fields).
- Tooling setup: linting, formatting, type checking, database client.

### Risks

| Risk | Mitigation |
|---|---|
| Delayed vendor decisions block Week 1 | Prepare default choices (Payload CMS + Vercel + Stripe) and validate assumptions |
| Existing repo has undocumented dependencies | Run full build and test suite before any changes |
| Missing credentials | List all required accounts and keys; assign owner |

### Rollback Considerations

- No production changes in this phase.
- All work happens in local environment and staging.
- Branch can be discarded if tooling choices change.

---

## Phase 1: Database Layer

### Dependencies

- Phase 0 completed.
- PostgreSQL instance available (local or cloud).
- ORM selected (Prisma or Drizzle).

### Estimated Effort

3–4 days

### Deliverables

- Database schema mirroring the entities defined in `PLATFORM_ARCHITECTURE_V1.1.md` Sections 7–12.
- Migration scripts (version-controlled, reversible).
- Seed data for 5 programmes with `programmeCode`, status, minimal professional fields.
- Seed data for target audiences and application areas taxonomies.
- Seed Price records with default status `On request`.
- Database connection layer in the codebase.
- Basic validation rules (required fields, slug uniqueness, status enums).

### Schema Coverage

| Entity | Included |
|---|---|
| Programmes | Yes |
| Editions | Yes |
| Prices | Yes |
| Registrations | Yes (lightweight) |
| FormSubmissions | Yes |
| Pages | Yes |
| Testimonials | Yes |
| FAQs | Yes |
| Galleries / Documents | Yes (file metadata) |
| Taxonomies | Yes |
| Users / Roles | Yes |

### Risks

| Risk | Mitigation |
|---|---|
| Schema changes later are costly | Use schema-as-code; review with architecture before first migration |
| JSON columns overused | Reserve JSON only for flexible metadata; keep core fields typed |
| Missing relation indexes | Add indexes on foreign keys and frequently filtered fields |

### Rollback Considerations

- Every migration must have a `down` script.
- Keep a database dump before applying migrations to staging.
- Schema changes after data entry require careful data migration scripts, not re-creating tables.

---

## Phase 2: CMS Layer

### Dependencies

- Phase 1 completed.
- CMS vendor confirmed.
- Admin UI requirements agreed.

### Estimated Effort

4–5 days

### Deliverables

- CMS installed and configured in the codebase.
- Collection definitions for: Programmes, Editions, Prices, Pages, Testimonials, FAQs, Documents, Galleries, Taxonomies, Forms, Users.
- CMS globals for: SiteSettings, Navigation, PublicProcurement, TransportInfo.
- Role-based access control for 3 Phase 1 roles.
- Validation rules, hooks and field labels in Romanian where needed.
- Media upload configuration.
- CMS deployment to staging.
- Basic content entry guide for non-technical administrators.

### CMS Configuration Notes

- Use tabs in Programme edit view: Commercial, Professional, Editions, Prices, Media, SEO, Governance.
- Hide governance fields from Content Manager.
- Restrict Price editing to Commercial Manager and Super Admin.
- Configure slug generation from programme name with manual override.

### Risks

| Risk | Mitigation |
|---|---|
| CMS self-hosting adds deployment complexity | Use managed DB and document env variables |
| CMS field API differs from architecture | Review collection config against architecture before data entry |
| Media storage quota exceeded | Configure S3-compatible storage early |

### Rollback Considerations

- CMS config lives in code; revert commit to roll back.
- Do not store uploaded media only in CMS local storage; use external storage to avoid data loss on redeploy.
- Test CMS login and basic CRUD before proceeding.

---

## Phase 3: Programme Management

### Dependencies

- Phase 2 completed.
- CMS collections for Programmes, Taxonomies, Documents, Testimonials, FAQ are functional.
- PMD content mapping spreadsheet ready.

### Estimated Effort

4–5 days

### Deliverables

- Full Programme data model in CMS.
- All commercial fields populated for 5 programmes.
- All professional/CPD fields populated, including:
  - `cpdHours`, `learningHours`
  - `accreditationBody`, `cpdProviderReference`, `cpdApprovalDate`
  - `emotionalSafetyProtocol` reference (PMD_002, PMD_003)
  - `dataRetentionPolicy` reference/summary
- Programme status workflow implemented.
- Validation: active programmes require at least one edition and one price.
- Public programme listing page consuming CMS data.
- Public programme detail page consuming CMS data.
- Document attachment links on programme detail page.

### Risks

| Risk | Mitigation |
|---|---|
| Content not ready for all 5 programmes | Allow "On request" prices and placeholder editions; programme status stays Pilot |
| Rich text breaks brand styles | Restrict rich text options to approved styles |
| Long forms overwhelm administrators | Use tabs and collapsible sections |

### Rollback Considerations

- Keep original static programme pages in a feature branch.
- Add redirects only after new pages are verified.
- Programme status controls visibility; set to Draft to hide without deleting.

---

## Phase 4: Edition Management

### Dependencies

- Phase 3 completed.
- CMS Edition collection configured.
- Delivery format requirements confirmed.

### Estimated Effort

3–4 days

### Deliverables

- Edition data model in CMS with conditional fields per delivery format.
- At least one edition created for each programme.
- Seat availability computed from registrations with manual override.
- Admin-only fields for Google Meet and Google Classroom links.
- Public edition detail / schedule display.
- Edition cards on programme pages.
- Edition status workflow (Draft / Open / Full / Closed / Cancelled).
- Date and deadline validation (e.g. registrationDeadline before startDate).

### Risks

| Risk | Mitigation |
|---|---|
| Conditional fields complex in CMS | Use format-dependent field groups or custom admin components |
| Seat count sync issues | Compute available seats in hook; allow manual override for edge cases |
| Online links exposed publicly | Mark fields admin-only and test API response does not leak them |

### Rollback Considerations

- Editions can be set to Draft or Cancelled without deletion.
- Test that changing edition status updates public pages within acceptable cache window.
- Keep backup of seat count before first registrations.

---

## Phase 5: Pricing Management

### Dependencies

- Phase 4 completed.
- Price collection in CMS configured.
- Commercial policy decisions confirmed (or default "On request" accepted).

### Estimated Effort

3–4 days

### Deliverables

- Price collection fully configured with all fields from architecture.
- Default price records created for each programme (status "On request" if exact values not yet approved).
- Edition-specific price overrides working.
- Price display logic implemented:
  - Active price shown
  - Launch price with standard price struck through
  - "În curând" for Coming soon
  - "La cerere" + form CTA for On request
- Price change propagates to all public pages.
- B2C checkout reads price from CMS.
- Group / B2B pricing displayed as context, with CTA to request offer.

### Risks

| Risk | Mitigation |
|---|---|
| Price display inconsistent across pages | Centralize price component; never hardcode |
| VAT changes later | Store VAT fields but default to current applicable rate |
| Currency / rounding issues | Use integer values (RON bani) or fixed decimals |

### Rollback Considerations

- Price records are never deleted; status changed to Inactive.
- Keep history of price changes via `updatedAt` / `updatedBy`.
- Test checkout amount calculation against CMS value before launch.

---

## Phase 6: Forms

### Dependencies

- Phase 5 completed.
- SMTP / email provider configured.
- Form validation library installed.

### Estimated Effort

4–5 days

### Deliverables

- General offer request form.
- Public procurement request form.
- Individual registration form (with entity type selection).
- Group registration form.
- Contact form.
- GDPR consent handling.
- Form submissions stored in CMS / database.
- Email notifications to configured admin addresses.
- Admin list view with status filtering and CSV export.
- Anti-spam measures (honeypot, rate limiting, optional CAPTCHA).

### Risks

| Risk | Mitigation |
|---|---|
| Form spam | Honeypot + rate limiting; CAPTCHA if spam persists |
| Email delivery failures | Use transactional email provider; log bounces |
| Sensitive form data leaked | Never expose submissions in public API; restrict to Commercial Manager+ |

### Rollback Considerations

- Forms can be disabled by unpublishing the route or form definition.
- Keep form submission data backed up before any schema change.
- Test notification emails in staging.

---

## Phase 7: SEO

### Dependencies

- Phase 3 and 4 completed (programme and edition pages exist).
- Domain and hosting confirmed.

### Estimated Effort

2–3 days

### Deliverables

- SEO fields on Programme and Page collections.
- Meta tags, Open Graph tags, canonical URLs rendered server-side.
- Structured data JSON-LD for:
  - `Course` (programme pages)
  - `Offer` (when price is Active and public)
  - `FAQPage` (FAQ sections)
  - `BreadcrumbList` (all pages)
- Auto-generated sitemap.xml respecting status and noIndex.
- robots.txt with sitemap reference.
- Slug and redirect strategy documented.
- 301 redirects from old static routes to new dynamic routes.

### Risks

| Risk | Mitigation |
|---|---|
| SEO traffic loss during migration | Preserve slugs where possible; implement redirects before go-live |
| Structured data errors | Validate with Google's Rich Results Test |
| Canonical conflicts | Ensure pagination and filters use correct canonicals |

### Rollback Considerations

- SEO changes are reversible by reverting code or CMS values.
- Keep pre-launch sitemap and robots.txt for comparison.
- Monitor search console after launch for crawl errors.

---

## Phase 8: Public Procurement Page

### Dependencies

- Phase 2 completed (CMS globals).
- Phase 6 completed (forms).

### Estimated Effort

2–3 days

### Deliverables

- `/achizitii-publice` page.
- Content editable from CMS global `PublicProcurement`.
- Public procurement form with all required fields.
- Form includes SICAP/SEAP option, room and transport support questions.
- Form submissions tagged as `public-procurement`.
- Dedicated email notification routing.
- Clear statement that SICAP integration is manual in Phase 1.

### Risks

| Risk | Mitigation |
|---|---|
| Legal wording not accurate | Review page text with procurement specialist before go-live |
| Form too long for users | Use clear grouping; mark optional fields |
| High volume of non-qualified leads | Add validation and required fields |

### Rollback Considerations

- Page can be set to draft or hidden via noIndex.
- Form can be disabled independently.
- Content can be edited without code deployment.

---

## Phase 9: Admin Area Refinements

### Dependencies

- Phase 2 completed.
- Phases 3–8 completed (admin features used in practice).

### Estimated Effort

3–4 days

### Deliverables

- Romanian labels and help text throughout admin.
- Dashboard landing page with key metrics (active programmes, open editions, pending submissions, recent registrations).
- Bulk actions for common tasks (publish/unpublish, export).
- Seat availability override UI.
- User management UI for the 3 Phase 1 roles.
- Audit log view (updatedBy / updatedAt) for programmes, editions and prices.
- Content entry guide updated with screenshots.

### Risks

| Risk | Mitigation |
|---|---|
| Admin UX too technical | Test all flows with a non-technical user before launch |
| Permissions misconfigured | Write integration tests for each role |
| Dashboard becomes cluttered | Show only actionable metrics in Phase 1 |

### Rollback Considerations

- Admin config is code; revert commit if needed.
- User permissions can be adjusted without data loss.
- Keep Super Admin access unrestricted.

---

## Phase 10: Testing

### Dependencies

- Phases 1–9 completed in staging.
- Realistic test data for all 5 programmes.

### Estimated Effort

5–6 days

### Deliverables

- Unit tests for price calculation, seat availability, form validation, slug generation.
- Integration tests for CMS API consumption, registration flow, form submission.
- End-to-end tests for:
  - Programme listing and detail pages
  - Edition selection and registration
  - Price display variations
  - Public procurement form submission
  - Admin login and role permissions
- Cross-browser and mobile responsiveness checks.
- Performance audit (Core Web Vitals).
- Accessibility audit.
- Security review:
  - Admin routes protected
  - Google Meet / Classroom links not leaked
  - Form submissions not exposed publicly
  - Payment data handled by Stripe, not stored locally
- Content review with business owner.

### Test Scenarios

| Scenario | Expected Result |
|---|---|
| Change programme price | All pages using that price update |
| Set programme to Draft | Programme hidden from public |
| Register last available seat | Edition status changes to Full |
| Submit public procurement form | Commercial Manager receives email; submission stored |
| Visit old static URL | 301 redirect to new dynamic page |
| Non-admin accesses admin | Access denied |

### Risks

| Risk | Mitigation |
|---|---|
| Insufficient test coverage | Prioritize critical user paths over edge cases |
| Test data does not reflect real content | Use actual PMD-derived data for final tests |
| Performance issues with CMS API | Add caching and optimize queries |

### Rollback Considerations

- Testing phase does not modify production.
- Bugs found are fixed in staging before launch.
- Maintain a known-issues list with launch/blocker classification.

---

## Phase 11: Migration and Launch

### Dependencies

- Phase 10 completed and signed off.
- Production environment ready.
- DNS and SSL configured.
- Content validated by business owner.

### Estimated Effort

4–5 days

### Deliverables

- Final production database migration.
- Content migration from staging to production.
- 301 redirect rules deployed.
- Sitemap and robots.txt deployed.
- Google Search Console updated.
- Stripe webhook endpoints configured for production.
- Email notifications tested in production.
- Soft launch to limited audience.
- Final go-live.
- Post-launch monitoring plan (48-hour watch).

### Launch Checklist

- [ ] All 5 programmes entered in CMS.
- [ ] At least one edition per programme created.
- [ ] Prices exist (even if "On request").
- [ ] Public procurement page live.
- [ ] Offer request form tested.
- [ ] Registration and payment flow tested end-to-end.
- [ ] Redirects from old URLs active.
- [ ] Admin users created with correct roles.
- [ ] Backup of old static site branch documented.
- [ ] Rollback runbook reviewed.

### Risks

| Risk | Mitigation |
|---|---|
| Data migration fails in production | Rehearse migration in staging; keep database backup |
| Downtime during switch | Use zero-downtime deployment; pre-warm caches |
| Post-launch critical bug | Keep rollback branch ready; monitor closely for 48 hours |
| DNS / SSL issues | Verify certificates and redirects before launch |

### Rollback Considerations

- Keep old static site deployable from feature branch for 30 days.
- Document exact steps to revert DNS and redirects.
- Maintain production database snapshots before and after migration.
- If CMS issues occur, set all dynamic routes to fallback static pages.

---

## 3. Cross-Phase Dependencies

```
Pre-implementation setup
        ↓
Database layer
        ↓
CMS layer
        ↓
Programme management
        ↓
Edition management
        ↓
Pricing management
        ↓
Forms
        ↓
SEO + Public procurement page (parallel)
        ↓
Admin refinements
        ↓
Testing
        ↓
Migration and launch
```

---

## 4. Resource Requirements

| Role | Effort | Responsibilities |
|---|---|---|
| Senior Full-Stack Developer | Full-time | Architecture implementation, CMS config, forms, payments |
| CMS / Frontend Developer | Part-time | Admin UX, public page components |
| QA / Tester | Part-time (intensive in Week 8) | Test plans, E2E testing, bug reporting |
| Content Manager | Part-time (Weeks 3–4, 10) | Enter programme data, validate migration |
| Commercial Manager | Ad-hoc | Validate pricing logic, public procurement flow |
| Business Owner | Ad-hoc | Approve phases, sign off launch |

---

## 5. Post-Launch Support Plan

| Period | Activities |
|---|---|
| Days 1–2 | Monitor error logs, form submissions, payment webhooks, site performance |
| Week 2 | Gather first user feedback; triage non-critical issues |
| Month 1 | Produce launch retrospective; update CMS guide; plan Phase 2 |

---

## 6. Final Note

This is a plan only. No implementation should begin until this document is approved alongside `PLATFORM_ARCHITECTURE_V1.1.md`.

Upon approval, the first task is Phase 0: Pre-Implementation Setup.

**Document version:** 1.0  
**Last updated:** 2026-07-12
