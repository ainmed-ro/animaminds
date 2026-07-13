# MASTER ALIGNMENT AND GAP ANALYSIS REPORT

**Date:** 2026-07-13  
**Scope:** Website · CMS · Database · Programmes · Editions · Pricing · Calendar · Registrations · Certificates · Competency Records · CPD · Workbooks · Facilitator Guides · PMDs · Commercial Sheets · CPD Packages · Notifications · Google Sheets · Supabase  
**Status:** Audit only — no implementation

---

## 1. What is Fully Aligned

### 1.1 Programme identity (names + slugs)
| Programme | PMD code | Website slug | Seed slug | Status |
|---|---|---|---|---|
| AI Fără Haos | PMD_001 | `ai-fara-haos` | `ai-fara-haos` | ✅ Aligned |
| Conversații care Contează | PMD_002 | `conversatii-care-conteaza` | `conversatii-care-conteaza` | ✅ Aligned |
| Calm sub Presiune | PMD_003 | `calm-sub-presiune` | `calm-sub-presiune` | ✅ Aligned |
| Busola Deciziilor | PMD_004 | `busola-deciziilor` | `busola-deciziilor` | ✅ Aligned |
| Avantajul Uman | PMD_005 | `avantajul-uman` | `avantajul-uman` | ✅ Aligned |

### 1.2 Online Live launch prices
| Programme | Seed amount (bani) | Website display | Status |
|---|---|---|---|
| AI Fără Haos | 14 900 (149 lei) | Preț de lansare: 149 lei / participant | ✅ Aligned |
| Conversații care Contează | 9 900 (99 lei) | Preț de lansare: 99 lei / participant | ✅ Aligned |
| Calm sub Presiune | 9 900 (99 lei) | Preț de lansare: 99 lei / participant | ✅ Aligned |
| Busola Deciziilor | 14 900 (149 lei) | Preț de lansare: 149 lei / participant | ✅ Aligned |
| Avantajul Uman | 9 900 (99 lei) | Preț de lansare: 99 lei / participant | ✅ Aligned |

### 1.3 Delivery format labels
The three delivery formats are consistent across PMDs, Commercial Sheets, CPD Packages, schema and CMS:
- Online Live
- La sediul instituției / organizației
- Experience Edition

### 1.4 Programme module lists
Each PMD v2, Workbook v2 and Facilitator Guide v2 contains the same 6 modules per programme, in the same sequence, with identical durations.

### 1.5 CPD points per format
PMDs, Commercial Sheets and CPD Packages all agree:
- Online Live / Onsite short formats: 8 points (AI, Conversații, Busola) or 7 points (Calm, Avantajul Uman)
- Experience Edition: 12 points

### 1.6 Contact Hours and Total Learning Hours
PMDs, Commercial Sheets and CPD Packages are consistent:
- AI / Conversații / Busola: 6.5h contact → 7.5h total
- Calm / Avantajul Uman: 6h contact → 7h total
- Experience Edition: 10h contact → 12h total

### 1.7 Session count and duration per format
PMDs, Commercial Sheets and CPD Packages agree:
- Online Live: 3 sesiuni (2h + 2h + 2.5h) — AI, Conversații, Busola; 3 sesiuni (2h + 2h + 2h) — Calm, Avantajul Uman
- Onsite: 1 zi (6.5h or 6h)
- Experience Edition: 2 zile (3h + 7h)

### 1.8 CMS programme form fields
The CMS programme form includes fields for name, slug, description, delivery formats, learning hours, CPD hours, capacity rules, pricing, benefits and governance metadata.

### 1.9 Google Sheets integration
Contact form submissions and public registrations are synced to Google Sheets via `GOOGLE_SHEETS_URL`.

### 1.10 Supabase contact storage
Contact messages are stored in Supabase `contact_messages` table.

### 1.11 Admin notifications
Email notifications exist for:
- New contact message (admin)
- New registration (admin)
- Daily summary
- Weekly summary

---

## 2. What is Partially Aligned

### 2.1 Group size limits
| Source | Online Live | Onsite | Experience Edition |
|---|---|---|---|
| PMD v2 | 8–20 (Calm 8–16) | 10–25 (Calm 10–20) | 10–18 (Calm 10–16) |
| Seed / CMS | 15–30 | max 30 | 20–30 |
| Website listing | 15–30 | max 30 | 20–30 |

**Finding:** A deliberate business decision set group sizes to 15–30 / max 30 / 20–30, but this overrides the PMD-authored ranges. The source documents (PMD, Commercial Sheet, CPD Package) and the operational system (seed, website) are not aligned. Needs explicit decision and update of one side.

### 2.2 `whatParticipantsReceive` content
| Source | Content |
|---|---|
| Seed / CMS | The new 9-item Online Live list and 10-item Onsite list (participant-facing, benefits-focused) |
| PMD v2 | Lists activities and deliverables (workbook, templates, certificate) |
| Commercial Sheet | "Participant workbook (PDF), one-pager, 30-day action plan template, certificate of completion, optional 4-week follow-up email sequence" |
| CPD Package | Not detailed |

**Finding:** The participant benefits wording is not identical across assets. The CMS seed uses a newer, more marketing-oriented list, while PMD/Commercial Sheet use a more operational list. Needs one canonical version.

### 2.3 Learning hours in seed vs PMD
| Programme | PMD Total Learning Hours | Seed `learningHours` | Match |
|---|---|---|---|
| AI Fără Haos | 7.5h | 8 | ❌ |
| Conversații care Contează | 7.5h | 8 | ❌ |
| Calm sub Presiune | 7h | 7 | ✅ |
| Busola Deciziilor | 7.5h | 8 | ❌ |
| Avantajul Uman | 7h | 7 | ✅ |

**Finding:** Three programmes have `learningHours` = 8 in seed, while PMDs state 7.5h total. The `cpdHours` field matches CPD points (8 or 7), but the field name implies hours, not points.

### 2.4 Contact Hours / Individual Activities Hours in database
The database has `Programme.learningHours` and `Programme.cpdHours`, but no fields for:
- `contactHours`
- `individualActivitiesHours` (self-study/reflection)
- `totalLearningHours`

The schema cannot store the full breakdown from PMD/Commercial Sheet/CPD Package.

### 2.5 Module / session architecture
The database has no models or JSON fields to store:
- Programme modules
- Module durations
- Module-to-session mapping
- Session sequence

This data lives only in the PMD/Workbook/Facilitator Guide documents and the `FINAL_PROGRAMME_DELIVERY_ARCHITECTURE.md` report.

### 2.6 Programme detail pages
Some detail pages (AI Fără Haos, Busola Deciziilor) show the launch price and capacity, but:
- Not all programme pages have been updated to display the new launch prices
- Module lists and CPD information are not shown on public pages
- Participant benefits are hardcoded and may not match the CMS seed

### 2.7 Calendar page
The calendar displays editions with format, dates, capacity and price, but does not show:
- CPD credits
- Module/session structure
- Participant benefits
- Registration deadline time (only date)

### 2.8 Registration form
The form collects contact and participant count, but:
- `participantsJson` is hardcoded to `[]` — no individual participant data is collected
- No dietary, accessibility or sector fields
- No invoice/billing address collection
- No participant confirmation email sent
- After submission redirects to `/calendar?success=1` instead of a dedicated confirmation page

### 2.9 CPD information
- CPD points are stored in `Programme.cpdHours` (semantically confusing name)
- No public-facing CPD explanation
- No CPD accreditation body reference displayed on website
- No CPD record/certificate generation

### 2.10 Terms and legal pages
- `/termeni-si-conditii` exists
- No dedicated `/politica-de-confidentialitate` or `/gdpr` page found
- The registration form references a privacy policy that does not exist as a page

### 2.11 Notifications
Admin notifications exist, but participant-facing notifications are missing:
- Registration confirmation
- Payment instructions / reminder
- Pre-program reminder
- Post-program follow-up sequence (mentioned in PMDs)
- Certificate ready notification

### 2.12 Google Sheets / Supabase split
- Registrations are in Prisma and synced to Google Sheets
- Contact messages are in Supabase and synced to Google Sheets
- This creates two data sources for CRM/analytics

---

## 3. What is Not Aligned

### 3.1 Group size: PMDs vs operational system
The most significant misalignment. PMDs specify smaller, format-specific group sizes, while the website and seed use uniform 15–30 / max 30 / 20–30 ranges. This affects pricing logic, calendar capacity and registration validation.

### 3.2 Learning hours: seed vs PMD
Three programmes show 8h in the database while PMDs say 7.5h. If the website or certificates read from `learningHours`, they will display incorrect values.

### 3.3 CPD field naming
`Programme.cpdHours` stores CPD points/credits, not hours. This is misleading and risks incorrect certificate/record wording.

### 3.4 Participant benefits: PMD vs CMS
The PMDs and Commercial Sheets describe deliverables (workbook, one-pager, certificate, follow-up emails). The CMS seed describes benefits (participare, materiale, exerciții, certificate, CPD). These are different framings and may confuse participants.

### 3.5 Programme order
PMD numbering is PMD_001 AI, PMD_002 Conversații, PMD_003 Calm, PMD_004 Busola, PMD_005 Avantajul.  
Website listing order is: Conversații, AI, Calm, Busola, Avantajul.  
This is a marketing choice, not a misalignment per se, but should be documented.

### 3.6 Experience Edition capacity
PMDs: 10–18 (Calm 10–16).  
Seed / website: 20–30.  
This is a large operational gap, especially for retreat-style logistics.

---

## 4. What is Missing

### 4.1 Database models
| Missing model | Impact |
|---|---|
| `Certificate` | Cannot issue completion certificates |
| `CompetencyRecord` | Cannot issue competency records |
| `CPDRecord` | Cannot track CPD credits per participant |
| `Notification` / `NotificationTemplate` | Cannot manage participant communications |
| `Invoice` / `Payment` | Cannot track billing and payment status |
| `Participant` (separate from `Registration`) | Cannot store individual names, emails, attendance, certificates |
| `ProgrammeModule` or module JSON | Cannot store module architecture in CMS |
| `ProgrammeSession` | Cannot store session schedules per format |
| `FacilitatorAssignment` | Cannot assign facilitators to editions |
| `Testimonial` is present but not linked to a source edition/programme validation |

### 4.2 Website pages
| Missing page | Impact |
|---|---|
| Privacy policy (`/politica-de-confidentialitate`) | GDPR/legal compliance gap |
| Cookie policy | Legal compliance gap |
| Cancellation / refund policy | Participant expectation gap |
| Payment instructions page | Registration-to-payment journey gap |
| Confirmation page after registration | UX gap |
| Certificate download page | Post-program participant journey gap |
| CPD information page | Professional accreditation transparency gap |
| Programme-specific FAQ pages (some have FAQ model but not public pages) | Content gap |

### 4.3 CMS features
| Missing feature | Impact |
|---|---|
| Certificate template management | Cannot generate branded certificates |
| Competency record template management | Cannot generate competency records |
| CPD record export | Cannot report CPD credits |
| Module/session scheduler | Cannot build editions from programme architecture |
| Facilitator management | Cannot assign or track facilitators |
| Payment status workflow | Registrations stuck in `PENDING` |
| Bulk registration import | Operational gap |
| Edition cloning | Operational gap |

### 4.4 Workflows
| Missing workflow | Impact |
|---|---|
| Registration → payment → confirmation → reminder → attendance → certificate → follow-up | Participant journey incomplete |
| CPD credit assignment and reporting | Professional accreditation incomplete |
| Certificate generation and delivery | Completion recognition incomplete |
| Follow-up email sequence (Day 2, 7, 14, 30) mentioned in PMDs | Retention and outcomes incomplete |

### 4.5 Participant journey gaps
Website → Programme Page ✅ → Calendar ✅ → Registration ✅ → Email ❌ (no participant confirmation) → Certificate ❌ → Competency Record ❌

### 4.6 Google Sheets integration gaps
- No sheet sync for certificate issuance
- No sheet sync for CPD records
- No sheet sync for facilitator assignments
- No sheet sync for payment status updates

---

## 5. What Should be Fixed Before Launch

### 5.1 Critical fixes
1. **Resolve group size conflict** — decide whether to use PMD ranges or the 15–30 business rule, then update PMDs, seed, schema validation and website.
2. **Fix `learningHours` values** — align seed with PMD (7.5h vs 8h for AI, Conversații, Busola).
3. **Rename or clarify `cpdHours`** — it stores CPD credits, not hours. Add a migration or clear documentation.
4. **Add contact hours and individual activities hours fields** to `Programme` or `Edition` so the full CPD breakdown can be stored.
5. **Create Privacy Policy page** and link it from the registration form footer.
6. **Add participant confirmation email** after registration.
7. **Fix `participantsJson`** to collect actual participant data, or remove it and add a proper `Participant` model.

### 5.2 High-priority fixes
8. **Canonicalize `whatParticipantsReceive`** — align PMD, Commercial Sheet, Workbook and CMS seed to one approved list.
9. **Display CPD info on website** — programme pages, calendar and registration should show CPD credits and learning hours.
10. **Display module/session structure on website** — use the approved delivery architecture.
11. **Add certificate and competency record models** — even if generation is manual at first, the data model must exist.
12. **Add payment/invoice tracking** — registrations should not remain in `PENDING` indefinitely.
13. **Build a dedicated registration confirmation page** instead of redirecting to calendar.

### 5.3 Medium-priority fixes
14. **Add module/session data to CMS** — `ProgrammeModule` and `ProgrammeSession` models or structured JSON.
15. **Add facilitator assignment** to editions.
16. **Implement follow-up email sequence** (Day 2, 7, 14, 30) from PMDs.
17. **Add cancellation / refund policy page**.
18. **Add cookie consent banner and policy**.
19. **Unify contact/registration data source** — consider migrating Supabase contact messages to Prisma or document the dual-source architecture.

---

## 6. Critical Issues

| # | Issue | Severity | Why it blocks launch |
|---|---|---|---|
| 1 | Privacy policy page missing | Critical | GDPR/legal compliance risk |
| 2 | Group sizes conflict between PMDs and operational system | Critical | Affects pricing, capacity, logistics and customer expectations |
| 3 | `learningHours` mismatch (8 vs 7.5) for 3 programmes | Critical | Certificates and CPD records will be incorrect |
| 4 | No participant confirmation email | Critical | Poor UX; participants do not receive proof of registration |
| 5 | `participantsJson` is always empty array | Critical | No individual participant data; attendance, certificates and CPD records impossible |
| 6 | No certificate / competency record / CPD record models | Critical | Core programme promise (Certificate of Completion, Competency Achievement Record, CPD credits) cannot be fulfilled |
| 7 | No payment workflow | Critical | Cannot collect revenue or confirm paid registrations |

---

## 7. Recommended Improvements

### 7.1 Data model
- Add `ProgrammeModule` and `ProgrammeSession` models linked to `Programme` and `Edition`.
- Add `Participant`, `Certificate`, `CompetencyRecord`, `CPDRecord`, `Invoice`, `Payment` models.
- Add `Notification` and `NotificationTemplate` models.
- Rename `cpdHours` to `cpdCredits` and add `contactHours`, `individualActivitiesHours`, `totalLearningHours`.

### 7.2 CMS
- Certificate template editor.
- Edition scheduler with module-to-session mapping.
- Facilitator assignment.
- Payment status workflow.

### 7.3 Website
- Public privacy, cookie, cancellation and payment pages.
- Programme pages showing modules, CPD, benefits and prices from CMS.
- Calendar showing CPD and module highlights.
- Registration confirmation page.
- Participant portal for certificates and CPD records.

### 7.4 Notifications
- Participant registration confirmation.
- Payment reminder and confirmation.
- Pre-program reminder (24h / 1h before).
- Post-program follow-up sequence.
- Certificate ready notification.

### 7.5 Reporting
- Admin dashboard for registrations, payments, certificates, CPD records.
- Export to Google Sheets for all key events.

---

## 8. Launch Readiness Score

| Area | Weight | Score | Notes |
|---|---|---|---|
| Website structure | 15% | 70% | Pages exist but content is hardcoded and some are missing |
| CMS data model | 20% | 60% | Core entities exist, missing certificate/CPD/payment/participant models |
| Programme content alignment | 15% | 55% | PMDs align internally, but seed/website diverge on hours and group sizes |
| Pricing | 10% | 85% | Online Live launch prices aligned; Onsite is ON_REQUEST only |
| Registration flow | 15% | 50% | Form works but lacks confirmation, payment and participant data |
| Notifications | 10% | 40% | Admin notifications only; no participant emails |
| Legal / compliance | 10% | 30% | Terms exist; privacy/cookie/refund policies missing |
| Certificates / CPD | 5% | 10% | No data model or generation workflow |

**Weighted total:** **53 / 100**

**Interpretation:** The platform is structurally in place but not launch-ready. Core operational workflows (registration → payment → certificate → CPD) are incomplete, and several content/data misalignments need resolution before public launch.

---

## Appendix A: Cross-reference matrix

| Asset / System | PMD | Workbook | Facilitator Guide | Commercial Sheet | CPD Package | CMS Seed | Website | Status |
|---|---|---|---|---|---|---|---|---|
| Programme names | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Aligned |
| Module names | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Missing in CMS/website |
| Module durations | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Missing in CMS/website |
| Session structure | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Missing in CMS/website |
| Contact Hours | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Not stored in DB |
| Individual Activities | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Not stored in DB |
| Total Learning Hours | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | Partial (seed has wrong values for 3 programmes) |
| CPD Credits | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | Partial (`cpdHours` name mismatch; not displayed) |
| Group sizes | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Misaligned |
| Participant benefits | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ❌ | Wording not canonical |
| Certificate wording | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Not implemented |
| Competency wording | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | Not implemented |

**Legend:** ✅ Aligned · ⚠️ Partially aligned · ❌ Missing or misaligned
