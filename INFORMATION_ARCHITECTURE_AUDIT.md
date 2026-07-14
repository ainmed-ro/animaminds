# INFORMATION ARCHITECTURE & USER JOURNEY AUDIT
## AnimaMinds Website - Complete CTA Analysis

### SOURCE OF TRUTH
**Program:** Conversații care Contează
**Formats:** 
1. Online Live
2. Experience Edition™
3. Pentru organizații
4. Grupuri private

---

## COMPLETE CTA AUDIT TABLE

| PAGE | BUTTON | CURRENT DESTINATION | EXPECTED DESTINATION | STATUS | ISSUES |
|------|--------|-------------------|-------------------|--------|---------|

### HOMEPAGE CTAs

| Homepage | "Vezi programele" (Navbar) | `/programe` | `/programe` | ✅ OK | - |
| Homepage | "Vezi programele" (Hero) | `/programe` | `/programe` | ✅ OK | - |
| Homepage | "Pentru organizații" (Hero) | `/colaboreaza` | `/colaboreaza` | ✅ OK | - |
| Homepage | "Vezi ediția online" (Format Card) | `/programe#conversatii-care-conteaza` | **PAGE MISSING** | ❌ BROKEN | No dedicated Online Live page |
| Homepage | "Vezi edițiile disponibile" (Format Card) | `/programe/experience-edition/conversatii-care-conteaza` | `/programe/experience-edition/conversatii-care-conteaza` | ✅ OK | - |
| Homepage | "Solicită ofertă" (Format Card) | `/colaboreaza#solicita-oferta` | `/colaboreaza#solicita-oferta` | ✅ OK | - |
| Homepage | "Solicită ofertă pentru grup" (Format Card) | `/colaboreaza#solicita-oferta` | **PAGE MISSING** | ❌ BROKEN | No dedicated Private Groups page |
| Homepage | "Discută cu un specialist" | `/contact` | `/contact` | ✅ OK | - |
| Homepage | "Vezi locația" (Experience Edition) | `https://hotelafrodita.ro/valeni/` | `https://hotelafrodita.ro/valeni/` | ✅ OK | - |

### PROGRAMS PAGE CTAs

| Programs | "Înscrie-te acum" | `/inscriere` | **WRONG FLOW** | ❌ BROKEN | Goes to generic form |
| Programs | "Află mai multe" | `/programe/conversatii-care-conteaza` | **PAGE MISSING** | ❌ BROKEN | No dedicated program page |

### NAVIGATION & FOOTER CTAs

| Navbar/Footer | "Programe" | `/programe` | `/programe` | ✅ OK | - |
| Navbar/Footer | "Colaborează" | `/colaboreaza` | `/colaboreaza` | ✅ OK | - |
| Navbar/Footer | "Contact" | `/contact` | `/contact` | ✅ OK | - |

---

## CRITICAL ISSUES IDENTIFIED

### 1. ONLINE LIVE FLOW - COMPLETELY BROKEN
**Expected Flow:** Programme info → Calendar → 199 lei → 8 CPD → Online Live registration
**Current Reality:** No dedicated page, button goes to generic programs list

**Missing Pages:**
- `/programe/conversatii-care-conteaza` (dedicated program page)
- `/programe/conversatii-care-conteaza#online-live` (Online Live section)

### 2. PRIVATE GROUPS FLOW - BROKEN
**Expected Flow:** Group request form
**Current Reality:** Button goes to organization page, no dedicated group flow

**Missing Pages:**
- No dedicated Private Groups form/flow

### 3. EXPERIENCE EDITION™ FLOW - PARTIALLY WORKING
**Expected Flow:** 3 editions → Hotel Afrodita → room selection → reservation
**Current Reality:** Page exists but may show wrong information

**Working:** `/programe/experience-edition/conversatii-care-conteaza`

### 4. ORGANIZATIONS FLOW - PARTIALLY WORKING
**Expected Flow:** Online/on-site → 3500/5000 lei → organization form
**Current Reality:** Generic organization form, no pricing clarity

**Working:** `/colaboreaza#solicita-oferta`
**Missing:** Clear pricing (3500/5000 lei), format separation

---

## EXISTING PAGES INVENTORY

### ✅ WORKING PAGES
- `/` (Homepage)
- `/programe` (Programs list)
- `/programe/experience-edition/conversatii-care-conteaza` (Experience Edition)
- `/colaboreaza` (Organizations)
- `/contact` (Contact)
- `/inscriere` (Generic registration)

### ❌ MISSING PAGES
- `/programe/conversatii-care-conteaza` (Dedicated program page)
- `/programe/conversatii-care-conteaza#online-live` (Online Live section)
- `/programe/conversatii-care-conteaza#experience-edition` (Experience Edition section)
- `/grupuri-privata` or similar (Private Groups)
- `/programe/online-live/conversatii-care-conteaza` (Online Live dedicated)

---

## USER JOURNEY ANALYSIS

### ONLINE LIVE USER JOURNEY - BROKEN
1. User clicks "Vezi ediția online" 
2. **CURRENT:** Goes to `/programe#conversatii-care-conteaza` (generic list)
3. **EXPECTED:** Should go to dedicated program page with Online Live details
4. **MISSING:** Programme information, calendar, 199 lei pricing, 8 CPD info, Online Live registration

### EXPERIENCE EDITION™ USER JOURNEY - PARTIALLY WORKING
1. User clicks "Vezi edițiile disponibile"
2. **CURRENT:** Goes to `/programe/experience-edition/conversatii-care-conteaza`
3. **WORKING:** Shows Experience Edition form with Hotel Afrodita
4. **NEEDS:** Clear 3 editions display, room selection flow

### ORGANIZATIONS USER JOURNEY - PARTIALLY WORKING
1. User clicks "Solicită ofertă"
2. **CURRENT:** Goes to `/colaboreaza#solicita-oferta`
3. **WORKING:** Shows organization request form
4. **MISSING:** Clear pricing (3500/5000 lei), format options separation

### PRIVATE GROUPS USER JOURNEY - BROKEN
1. User clicks "Solicită ofertă pentru grup"
2. **CURRENT:** Goes to `/colaboreaza#solicita-oferta` (same as organizations)
3. **EXPECTED:** Should go to dedicated private groups flow
4. **MISSING:** Dedicated group request form

---

## REQUIRED FIXES

### HIGH PRIORITY - BROKEN FLOWS
1. **Create dedicated Online Live page** with programme info, calendar, pricing, registration
2. **Create dedicated Private Groups page** with group-specific form
3. **Fix Organizations page** to show clear pricing and format options

### MEDIUM PRIORITY - IMPROVEMENTS
1. **Create main program page** `/programe/conversatii-care-conteaza` with format sections
2. **Improve Experience Edition page** to show all 3 editions clearly
3. **Add proper navigation** between formats

### LOW PRIORITY - OPTIMIZATION
1. **Add format-specific URLs** for better SEO
2. **Improve form flows** for better conversion
3. **Add format comparison** features

---

## FORMS INVENTORY

### ✅ EXISTING FORMS
- `ExperienceEditionForm` - Experience Edition registration
- `OrganizationRequestForm` - Organizations request
- Generic registration form at `/inscriere`

### ❌ MISSING FORMS
- Online Live specific registration form
- Private Groups request form
- Format comparison/contact form

---

## NEXT STEPS

1. **STOP all new design work** until flows are fixed
2. **Create missing pages** for Online Live and Private Groups
3. **Fix existing pages** to show correct information
4. **Test all user journeys** end-to-end
5. **Document complete flow** with screenshots

---

## STATUS: CRITICAL - MULTIPLE BROKEN USER JOURNEYS

**Website is NOT ready for production** with current broken flows.
Users cannot complete registrations for Online Live or Private Groups.
Organizations flow lacks pricing clarity.
