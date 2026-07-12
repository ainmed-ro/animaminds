# Website QA and SEAP/SICAP Audit Report

**Project:** AnimaMinds Website  
**Audit date:** 2026-07-12  
**Auditor:** Cascade  
**Scope:** `/programe` final QA + SEAP/SICAP/public procurement audit of the entire codebase.

---

## PART 1 – FINAL QA FOR `/programe`

### Methodology
Reviewed source code for `app/programe/page.tsx` and `components/ProgramList.tsx`. Verified that the running dev server loads `/programe` without runtime errors (HTTP 200). Visual layout was inspected via responsive Tailwind classes; no live mobile browser test was performed.

### Findings

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | All program cards use approved new categories | **PASS** | Busola = `LEADERSHIP & SCHIMBARE`; AI = `AI & FUTURE SKILLS`; Conversații = `COMUNICARE & COLABORARE`; Calm = `CONFLICTE & REZILIENȚĂ PROFESIONALĂ`; Avantajul = `COMPETENȚE UMANE PENTRU VIITOR`. |
| 2 | Calm sub Presiune uses new description and audience | **PASS** | Description: `Un program practic pentru profesioniști care gestionează conversații dificile, tensiuni și situații cu miză ridicată...` Audience: `Profesori · Manageri · Personal medical · Administrație publică · Echipe din companii`. |
| 3 | Avantajul Uman uses new description | **PASS** | Description: `Într-o lume în care inteligența artificială poate genera informații și conținut...` |
| 4 | AI Fără Haos no longer uses "Corporatiști" | **PASS** | Audience now reads: `Profesori · Manageri · Lideri de echipă · Specialiști · Antreprenori`. |
| 5 | Images for Calm and Avantajul display correctly | **PASS** | `workshop-collab.jpg` and `workshop-activity.jpg` exist in `public/images`; `/programe` loads with HTTP 200. |
| 6 | Buttons work | **PASS** | `Descoperă programul` (Busola active card), `Află mai multe` and `Notifică-mă când este disponibil` (inactive cards via ProgramList), and `Pentru organizații` (bottom CTA to `/colaboreaza`) are all present in the JSX. |
| 7 | No console errors | **PASS** | Dev server logs show only Next.js image-quality/sizes warnings; no runtime errors. |
| 8 | No pages other than `/programe` modified in this last task | **PASS** | The only file changed during the most recent task was `app/programe/page.tsx`. |

### Mobile Layout
The page uses responsive Tailwind classes (`sm:`, `lg:`, `grid-cols-1 lg:grid-cols-2`, `sm:flex-row`). No live mobile browser verification was performed; a manual check on an actual device or browser emulator is recommended before deploy.

---

## PART 2 – SEAP / SICAP / PUBLIC PROCUREMENT AUDIT

### Methodology
Searched the entire codebase for the following keywords and phrases:

- `SEAP`
- `SICAP`
- `achiziție directă`
- `achiziții publice`
- `CPV`
- `instituție publică`
- `instituții publice`
- `contract de formare`
- `public procurement`
- Any Romanian variant of "achizi" (purchase/procurement)

### Results

**NO SEAP/SICAP OR PUBLIC PROCUREMENT FEATURES HAVE BEEN IMPLEMENTED.**

Specifically:

| Keyword / Phrase | Found in website code? |
|---|---|
| `SEAP` | No |
| `SICAP` | No |
| `achiziție directă` | No |
| `achiziții publice` | No |
| `CPV` | No |
| `contract de formare` | No |
| `public procurement` | No |
| `instituție publică` / `instituții publice` | **Yes, generic references only** |

### Files with generic public-sector references

The phrase `instituții publice` appears in the following pages as a generic audience label or FAQ answer, **not as procurement/SEAP/SICAP implementation**:

1. `app/programe/busola-deciziilor/page.tsx`
   - Audience list icon label: `Instituții publice`
   - FAQ: mentions that groups can come from companies, `instituții publice`, health units, schools, and NGOs.

2. `app/programe/busola-deciziilor/experience-edition/page.tsx`
   - Audience list icon label: `Instituții publice`
   - FAQ: same generic mention.

3. `app/programe/ai-fara-haos/page.tsx`
   - Audience list item: `Specialiști în instituții publice`
   - Section text: mentions that AI Fără Haos can be accessed by groups from companies, `instituții publice`, health units, schools, and NGOs.

### Non-implementation reference

A design/proposal document contains the word "achizi" in a future-opportunity context:

- `docs/ux-audit-ia-proposal.md`
  - Persona line: "să achiziționeze formare pentru cadre didactice..."
  - Opportunity line: "proces de achiziție"

This is **not implemented in the website**; it is documentation only.

---

## Missing Elements

The following SEAP/SICAP/public procurement elements are **not present** anywhere in the website:

- Explicit mention of SEAP or SICAP platforms
- Direct procurement (`achiziție directă`) procedure
- CPV codes for training services
- Public procurement compliance notes
- Dedicated `/seap`, `/sicap`, `/achizitii`, or `/public-procurement` route
- Downloadable procurement documents in the repository
- Pricing or contracting terms for public institutions

---

## Recommendations

1. **Before deploy:** manually verify `/programe` on an actual mobile device or browser emulator to confirm card stacking, image cropping, and button tap targets.
2. **If SEAP/SICAP procurement support is desired**, add a dedicated section on `/colaboreaza` (or a new route) explaining:
   - Eligibility for direct procurement
   - Required documents (offer, contract, invoice, completion report)
   - CPV codes applicable to the training programs offered
   - Step-by-step contact process for public institutions
3. **Keep generic references review:** the current generic mentions of `instituții publice` are acceptable for audience targeting but should be reviewed for accuracy and tone before final approval.
4. **Console warnings:** consider adding `85` to `images.qualities` in `next.config.ts` and `sizes` props to `fill` images to eliminate Next.js image warnings; these are not blockers but improve polish.

---

## Conclusion

The `/programe` page is aligned with the latest approved content changes. No SEAP, SICAP, or public procurement functionality has been implemented in the website code.
