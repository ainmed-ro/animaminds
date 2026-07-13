# PLATFORM_ARCHITECTURE_REVIEW.md

**Project:** AnimaMinds Website & Programme Management Platform — Faza 1  
**Document reviewed:** `PLATFORM_ARCHITECTURE_V1.md`  
**Review date:** 2026-07-12  
**Reviewer:** Senior Solution Architect / Product Designer / CMS Architect / Information Architect  
**Status:** Architecture review — recommendation issued

---

## 1. Overall Recommendation

**Approve with changes**

The proposed architecture is sound, aligned with the existing brand and programmes, and correctly separates concerns between programmes, editions and pricing. It provides a realistic Phase 1 scope and preserves room for Phase 2 growth. However, a small number of clarifications and simplifications are required before implementation begins to avoid duplication, confusion and scope creep.

No implementation should start until the changes listed in Section 10 are accepted and reflected in `PLATFORM_ARCHITECTURE_V1.md`.

---

## 2. Review Criteria and Findings

### 2.1 Is the Single Source of Truth preserved?

**Finding: Mostly yes, with one risk.**

The hierarchy is correctly defined:

```
PMD / official documentation
        ↓
CMS Programme record
        ↓
CMS Editions / Prices / Pages / FAQ / Testimonials
        ↓
Website
```

The rule that website pages consume data from the CMS (not from static files or duplicated hardcoded values) is clearly stated. The architecture also correctly notes that PMDs remain authoritative for pedagogical content and that a CMS sync step is required when PMDs change.

**Risk:** Programme-level price fields (`standardPrice`, `launchPrice`) duplicate data that should live only in the `Prices` collection. This creates a second source of truth for pricing and can lead to stale or inconsistent values across pages. This must be resolved before implementation (see Section 10).

---

### 2.2 Are Programme, Edition and Pricing separated correctly?

**Finding: Correctly separated, but relationship clarity needs improvement.**

- **Programme** = master template for the learning product (commercial + professional fields).
- **Edition** = scheduled occurrence with date, location/seats and a linked price.
- **Price** = independent commercial record that can belong to a programme (default) or an edition (override).

This separation is correct and supports the four delivery formats (Online, On-site, Open cohort, Experience Edition) without treating formats as separate programmes.

**Required clarification:** The architecture states `Edition → Prices (1:N)` in the entity list but `Edition.price` (singular relationship) in the data model. Implementation needs one of the following:

- A single "display price" relationship on Edition, plus an optional list of "additional price variants", or
- A `Prices` collection where each record has `isDisplayPrice` flag and Edition links to multiple Price records.

The recommended change is documented in Section 10.

---

### 2.3 Is the CMS architecture over-engineered?

**Finding: Slightly over-engineered in two areas.**

#### a) Roles

Five roles are defined for Phase 1:

- Super Admin
- Content Manager
- Commercial Manager
- Facilitator
- Viewer

For the current single-administrator/small-team reality, three roles are sufficient for Phase 1:

- **Super Admin** — full access, governance, user management.
- **Content Manager** — programmes, editions, pages, media, testimonials, FAQ.
- **Commercial Manager** — prices, registrations, form submissions, public procurement settings.

`Facilitator` and `Viewer` can be deferred to Phase 2 unless facilitators need immediate access to assigned editions.

#### b) BlogPosts collection

A blog is not mentioned in the original brief. Including `BlogPosts` in Phase 1 adds UI, templating, SEO and migration work without a clear launch requirement. It should be moved to Phase 2 preparation or explicitly approved by the business.

**Verdict:** Not critically over-engineered, but simpler is safer for Phase 1.

---

### 2.4 Is Phase 1 scope realistic?

**Finding: Realistic but tight.**

The proposed 10-week roadmap is achievable with a focused small team if the following conditions are met:

- CMS choice is confirmed early (Payload or Sanity).
- Existing design system is reusable without major rework.
- Stripe account and fiscal entity details are ready before Week 7.
- Content migration (5 programmes, images, FAQ, testimonials) is treated as a parallel workstream, not a last-minute task.
- B2C checkout is implemented with Stripe Checkout (hosted page) rather than a custom payment UI.

**Concern:** The minimum viable launch (MVL) requires "all 5 programmes entered with commercial and professional fields" plus "at least one edition per programme." This is appropriate, but the team should confirm whether exact prices or "On request" status will be used at launch.

---

### 2.5 Are there unnecessary Phase 2 features leaking into Phase 1?

**Finding: Generally clean, with minor exceptions.**

| Feature | Where mentioned | Recommendation |
|---|---|---|
| Blog | CMS collections | Move to Phase 2 or explicitly justify |
| Advanced roles (Facilitator, Viewer) | Roles and Permissions | Defer to Phase 2 |
| Versioning / rollback | Content Governance | Keep as light audit only (updatedBy / updatedAt) |
| Newsletter signup | Forms Architecture | Correctly marked as future |
| CRM, invoicing, certificates, SICAP API, mobile app | Phase 2 Preparation | Correctly excluded |

No critical Phase 2 features are leaking. The two exceptions above are easy to fix.

---

### 2.6 Can a non-technical administrator manage everything?

**Finding: Yes, for content operations. No, for structural changes.**

A non-technical administrator can:
- Create and edit programmes, editions, prices, FAQ, testimonials, pages.
- Upload images and documents.
- Manage registrations and form submissions.
- Update site settings and public procurement text.
- Publish/unpublish content via status fields.

A non-technical administrator **cannot** (and should not be able to in Phase 1):
- Add new CMS collections or fields.
- Change database relationships.
- Modify structured data templates.

This is the correct trade-off for Phase 1: content is editable, structure is code-defined.

**Recommendation:** The CMS admin UI should use clear Romanian labels for field names and group related fields into tabs, as already proposed in the architecture.

---

### 2.7 Are CPD requirements fully supported?

**Finding: Core CPD data is supported, but two fields should be added.**

The architecture correctly models:
- `cpdHours`
- `learningHours`
- `learningOutcomes`
- `competenciesDeveloped`
- `assessmentMethods`
- `certificationInfo`
- Terminology guardrails (no "credits" or "puncte")

**Missing for robust CPD support:**

1. **Accreditation body reference** — e.g. "The CPD Group".
2. **CPD provider reference / ID** — if one is assigned.
3. **CPD approval date** — useful for governance.

These are lightweight additions and do not expand Phase 1 scope. They are included in the recommended changes (Section 10).

---

### 2.8 Is the pricing model flexible enough?

**Finding: Flexible, but only if the duplicate Programme price fields are removed.**

The `Prices` collection supports:
- Standard / launch / promotional / per person / group / B2B / B2G / Experience.
- VAT handling.
- Included/excluded participant counts and extra costs.
- Included/excluded services.
- Validity dates.
- Status (Active / Inactive / Coming soon / On request).

This is sufficient for the current commercial model.

**Critical fix:** Remove `standardPrice` and `launchPrice` number fields from the Programme model. Instead, the Programme should reference a default active `Price` record (or two: one standard, one launch). All price rendering should read from the `Prices` collection. This preserves the centralised update rule stated in the architecture.

---

### 2.9 Is Experience Edition correctly modelled as a delivery format?

**Finding: Yes.**

Experience Edition is:
- A value in the `deliveryFormat` select on Edition, not a separate programme.
- Supported by dedicated fields on Edition (destination, hotel, period, room types, meals, facilities, activities, policies).
- Allowed to have `priceStatus = Coming soon` until final offers are received.

This modelling is consistent with the instruction: "Nu prezenta modalitățile de livrare ca programe separate."

---

### 2.10 What architecture changes are required before implementation?

The following changes are required before the architecture is approved for implementation:

| # | Change | Priority | Reason |
|---|---|---|---|
| 1 | Remove `standardPrice` and `launchPrice` number fields from `Programme`. Replace with relationships to `Prices` records. | Critical | Eliminates duplicate source of truth for pricing. |
| 2 | Clarify Edition–Price relationship: Edition links to one display Price + optional additional Price variants, or use `isDisplayPrice` flag in `Prices` collection. | Critical | Resolves 1:N vs singular field inconsistency. |
| 3 | Add CPD fields to `Programme`: `accreditationBody`, `cpdProviderReference`, `cpdApprovalDate`. | Recommended | Supports CPD submission and governance. |
| 4 | Add `programmeCode` field to `Programme` (PMD_001, PMD_002, etc.) separate from `slug`. | Recommended | Stable internal reference independent of URL changes. |
| 5 | Simplify Phase 1 roles to: Super Admin, Content Manager, Commercial Manager. Defer Facilitator and Viewer to Phase 2. | Recommended | Reduces complexity for small team. |
| 6 | Move `BlogPosts` collection from Phase 1 to Phase 2 preparation, unless explicitly approved. | Recommended | Avoids scope creep. |
| 7 | Add `emotionalSafetyProtocol` boolean/reference to `Programme` for PMD_002 and PMD_003. | Recommended | Aligns with existing shared protocol asset. |
| 8 | Add `dataRetentionPolicy` reference field to `Programme` (link to document or summary). | Recommended | Aligns with CPD Package data retention sections. |
| 9 | Default all price display statuses to "On request" until the commercial policy and exact prices are confirmed. | Recommended | Prevents premature public price commitments. |
| 10 | Document the PMD-to-CMS sync process: who initiates it, how fields are validated, and how version drift is detected. | Recommended | Reduces operational risk when PMDs are updated. |

---

## 3. Strengths of the Proposed Architecture

- **Brand preservation:** Existing logo, colours, fonts and tone are protected.
- **Programme-centric design:** Built around the five approved programmes, not generic training categories.
- **SSOT discipline:** Correctly positions the CMS as the operational SSOT and PMDs as the authoritative pedagogical source.
- **Format separation:** Online, On-site, Open cohort and Experience Edition are modelled as delivery options, not programmes.
- **Phase-aware:** Clear separation between Phase 1 (administrable content + B2C payments + forms) and Phase 2 (CRM, automation, integrations).
- **Taxonomy-first approach:** Target audiences and application areas are modelled as taxonomies, enabling future filtering and landing pages.
- **Public procurement support:** Dedicated page and form structure respects B2G workflow without premature SICAP automation.
- **Non-technical admin friendly:** Content operations are UI-driven; structural changes remain developer-controlled.

---

## 4. Risks if Changes Are Not Applied

| Risk | Consequence |
|---|---|
| Duplicate price fields remain | Price updates must be made in two places; risk of inconsistent display across programme pages, cards and checkout. |
| Edition–Price relationship unclear | Developers may implement a single price link, preventing group/early-bird/B2B variants per edition. |
| Too many roles | Confusing permission setup, delayed launch, possible security misconfiguration. |
| Blog in Phase 1 | Additional design, templating, content and SEO workload without proven need. |
| Missing CPD accreditation fields | Manual rework required when submitting programmes to accreditation bodies. |

---

## 5. Final Recommendation

**Approve with changes.**

The architecture is a solid foundation. Apply the 10 changes listed in Section 2.10, update `PLATFORM_ARCHITECTURE_V1.md` to reflect them, and then proceed to implementation planning.

If the business prefers to keep all original scope (including Blog and 5 roles), the recommendation becomes **Revision required** for the pricing model alone, because the duplicate Programme price fields break the Single Source of Truth principle.

---

**Review version:** 1.0  
**Last updated:** 2026-07-12
