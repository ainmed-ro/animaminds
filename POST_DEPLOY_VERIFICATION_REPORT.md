# POST_DEPLOY_VERIFICATION_REPORT.md

**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-13  
**Report Type:** Post-Deploy Verification  
**Deployed URL:** https://animaminds.vercel.app  
**GitHub Repository:** https://github.com/ainmed-ro/animaminds  
**Status:** ⚠️ Deployment is outdated — latest code is not live

---

## 1. Executive Summary

This report documents the verification of the current Vercel deployment against the implemented codebase. The deployed site (`animaminds.vercel.app`) is running an older version of the code and does **not** include the latest milestone features (CMS, calendar, public registration, new `/admin`).

The local codebase passes build and all Playwright tests. Supabase contains valid registration data from local testing. However, the live deployment must be refreshed by committing and pushing the current working tree to GitHub so Vercel can rebuild.

---

## 2. GitHub Repository Status

### 2.1 Repository Exists

**Evidence:**

```
$ git remote -v
origin  https://github.com/ainmed-ro/animaminds.git (fetch)
origin  https://github.com/ainmed-ro/animaminds.git (push)
```

**GitHub page verified:** https://github.com/ainmed-ro/animaminds  
GitHub page shows **About → animaminds.vercel.app**, confirming the Vercel project link.

### 2.2 Working Tree is Not Committed

**Evidence:**

```
$ git status --short
 M .gitignore
 M app/admin/registrations/page.tsx
 M app/api/contact/route.ts
 ... (34 tracked changes)
?? AnimaMinds_Knowledge_System/
?? DEPLOYMENT_READINESS_REPORT.md
?? app/admin/actions/
?? app/admin/components/
?? app/admin/editions/
?? app/admin/programmes/
?? app/calendar/
?? app/inscriere/
?? lib/notifications.ts
?? lib/google-sheets.ts
?? scripts/...
?? tests/...
```

**Conclusion:** The latest implemented code is **not in GitHub**, therefore Vercel cannot deploy it.

### 2.3 Diff Summary

```
$ git diff --stat
 34 files changed, 1639 insertions(+), 2462 deletions(-)
```

Note: this only counts tracked file changes. The large number of new untracked files (admin modules, calendar, registration, notifications, sheets sync, tests, scripts, documentation) are not included in `git diff --stat`.

---

## 3. Vercel Deployment Verification

### 3.1 Deployed URL

**URL:** https://animaminds.vercel.app  
Confirmed from GitHub repository "About" section.

### 3.2 Root Page Loads

**Evidence:**

```
GET https://animaminds.vercel.app
Title: AnimaMinds — Locul unde oamenii și ideile cresc împreună
Status: 200 OK
```

### 3.3 New Pages Are Missing on Deployed Site

| Page | Local Path | Deployed URL | Result |
|------|------------|--------------|--------|
| Public Calendar | `/app/calendar/page.tsx` | `/calendar` | **404 Not Found** |
| Public Registration | `/app/inscriere/page.tsx` | `/inscriere` | **404 Not Found** |
| Admin CMS | `/app/admin/*` | `/admin` | **404 Not Found** |

**Evidence:**

```
GET https://animaminds.vercel.app/calendar  → 404 Not Found
GET https://animaminds.vercel.app/inscriere → 404 Not Found
GET https://animaminds.vercel.app/admin     → 404 Not Found
```

### 3.4 Conclusion

The Vercel deployment is **not current**. It predates the implementation of:

- CMS authentication and RBAC
- Programme management
- Edition management
- Registration management
- Public calendar
- Public registration form
- Notifications and Google Sheets sync

**Action required:** Commit and push the full working tree to GitHub, then trigger a Vercel redeploy.

---

## 4. Local Verification

Because the deployed site is outdated, all functional verification was performed against the local build.

### 4.1 Build

```bash
npm run build
```

**Result:** `Exit code: 0` — TypeScript compilation passed, 42 routes generated.

### 4.2 Public Calendar (Local)

**Test:** Playwright `tests/public-registration.spec.ts`

```
[1/1] public-registration.spec.ts › calendar shows editions and registration form submits
  1 passed
```

**Verified locally:** `/calendar` renders open editions with dates, format, available seats, deadline, price, and registration status.

### 4.3 Public Registration Form (Local)

**Test:** Playwright `tests/public-registration.spec.ts`

Verified:
- Calendar links to `/inscriere?editionId=...`
- Registration form submits successfully
- Redirects to `/calendar?success=1`
- Capacity is decremented in the database

### 4.4 Email Notifications

**Code path verified:**
- `lib/notifications.ts` exists and is imported in `app/admin/actions/cms.ts` and `app/api/contact/route.ts`.
- `submitPublicRegistration` calls `sendAdminNewRegistrationEmail`.
- `/api/contact` calls `sendAdminNewContactEmail`.
- Cron routes `/api/cron/daily` and `/api/cron/weekly` call summary emails.

**Configuration status:**

```
.env.local contains:
  RESEND_API_KEY=re_00000000000000000000000000000000  (placeholder)

Missing from .env.local:
  ADMIN_EMAIL
  FROM_EMAIL
  GOOGLE_SHEETS_URL
  CRON_SECRET
```

**Conclusion:** The notification code is wired but the production Resend key and sender/recipient emails are not configured locally. On Vercel these must be set as environment variables for emails to actually send.

### 4.5 Google Sheets Sync

**Code path verified:**
- `lib/google-sheets.ts` exists.
- `submitPublicRegistration` calls `syncRegistrationToGoogleSheets`.
- `/api/contact` calls `syncContactToGoogleSheets`.
- Helpers gracefully skip if `GOOGLE_SHEETS_URL` is missing.

**Configuration status:** `GOOGLE_SHEETS_URL` not set in `.env.local`.

**Conclusion:** Sync code is implemented but the production Google Apps Script endpoint is not configured locally. It must be added to Vercel environment variables.

### 4.6 Supabase Registrations

**Evidence:**

```bash
npx tsx --env-file=.env.local scripts/check-registrations.ts
```

**Output:**

```json
[
  {
    "id": "cmrhn7fqj0017tc4gfdyx0ox8",
    "editionId": "cmrhm2inq000ftc4g3t9djxs9",
    "contactName": "Test Participant 1783851635580",
    "contactEmail": "test+1783851635580@example.com",
    "contactPhone": "0712345678",
    "entityType": "INDIVIDUAL",
    "entityName": "Test Organization",
    "paymentStatus": "PENDING",
    "createdAt": "2026-07-12T10:20:36.201Z",
    "edition": { "editionTitle": "Phase 05 Online Edition 1783849718417" }
  },
  {
    "id": "cmrhn5qd4000rtc4gn93silu8",
    "editionId": "cmrhm2inq000ftc4g3t9djxs9",
    "contactName": "Test Participant 1783851556080",
    "contactEmail": "test+1783851556080@example.com",
    "contactPhone": "0712345678",
    "entityType": "INDIVIDUAL",
    "entityName": "Test Organization",
    "paymentStatus": "PENDING",
    "createdAt": "2026-07-12T10:19:16.674Z",
    "edition": { "editionTitle": "Phase 05 Online Edition 1783849718417" }
  }
]
Total registrations: 2
```

**Conclusion:** Supabase/Prisma is receiving and storing registrations correctly.

### 4.7 CMS Registrations

**Evidence:** Playwright `tests/registration-management.spec.ts`

```
[1/1] registration-management.spec.ts › lists registrations in admin
  1 passed
```

**Verified locally:** `/admin/registrations` renders the registration list with programme, edition, contact, email, participants, and payment status.

---

## 5. Full Test Suite Results

```bash
npx playwright test tests/auth.spec.ts tests/programme-management.spec.ts tests/edition-management.spec.ts tests/registration-management.spec.ts tests/public-registration.spec.ts --reporter=line
```

**Result:** `15 passed (1.1m)`

| Suite | Tests | Result |
|-------|-------|--------|
| Authentication & RBAC | 11 | ✅ passed |
| Phase 04 Programme Management | 1 | ✅ passed |
| Phase 05 Edition Management | 1 | ✅ passed |
| Registration Management | 1 | ✅ passed |
| Public Registration Flow | 1 | ✅ passed |

---

## 6. Blockers for Live Deployment Verification

| Blocker | Why | Resolution |
|---------|-----|------------|
| Code not committed | Working tree has many uncommitted/untracked changes | `git add . && git commit && git push` |
| Code not pushed | Vercel deploys from GitHub | Push to `main` |
| Vercel rebuild needed | Deployment predates new features | Trigger redeploy after push |
| Env vars missing locally | `ADMIN_EMAIL`, `FROM_EMAIL`, `GOOGLE_SHEETS_URL`, `CRON_SECRET` not in `.env.local` | Add to Vercel project settings |
| Vercel CLI not authenticated | Cannot inspect deployment status or force redeploy | Provide Vercel token or use dashboard |

---

## 7. Recommended Next Steps

### 7.1 Commit and Push

```bash
git add .
git commit -m "feat: deploy edition management, registrations, calendar, notifications, sheets sync"
git push origin main
```

### 7.2 Configure Vercel Environment Variables

In the Vercel project dashboard, add:

```
DATABASE_URL=<supabase-pooled-connection-string>
DIRECT_URL=<supabase-direct-connection-string>
NEXTAUTH_URL=https://animaminds.vercel.app
NEXTAUTH_SECRET=<openssl-rand-base64-32>
RESEND_API_KEY=<real-resend-key>
FROM_EMAIL=AnimaMinds <noreply@animaminds.ro>
ADMIN_EMAIL=contact@animaminds.ro
GOOGLE_SHEETS_URL=<google-apps-script-web-app-url>
CRON_SECRET=<random-secret>
```

### 7.3 Run Production Database Migrations

```bash
npx prisma migrate deploy
```

### 7.4 Seed if Starting Fresh

```bash
npx prisma db seed
```

### 7.5 Redeploy and Verify

1. Vercel will auto-deploy after the push.
2. Wait for build to complete.
3. Verify:
   - https://animaminds.vercel.app/ (root)
   - https://animaminds.vercel.app/calendar
   - https://animaminds.vercel.app/inscriere
   - https://animaminds.vercel.app/admin
   - Submit a test registration.
   - Submit a test contact form.

---

## 8. Summary

| Check | Local Status | Deployed Status | Evidence |
|-------|--------------|-----------------|----------|
| GitHub repository | ✅ exists, uncommitted changes | N/A | `git remote -v`, GitHub page |
| Vercel deployment | ⚠️ URL known but outdated | ❌ missing new routes | 404 on `/calendar`, `/inscriere`, `/admin` |
| Public calendar | ✅ working | ❌ not deployed | Playwright pass + local build |
| Public registration | ✅ working | ❌ not deployed | Playwright pass + Supabase records |
| Email notifications | ✅ code wired | ❌ not configured live | `lib/notifications.ts`, placeholder `RESEND_API_KEY` |
| Google Sheets sync | ✅ code wired | ❌ not configured live | `lib/google-sheets.ts`, missing `GOOGLE_SHEETS_URL` |
| Supabase registrations | ✅ 2 records stored | ⚠️ not reachable via live site | `scripts/check-registrations.ts` output |
| CMS registrations | ✅ working locally | ❌ not deployed | Playwright pass + local admin page |

**Final verdict:** The implementation is complete and verified locally. The live Vercel deployment must be updated by committing/pushing the current codebase and configuring the missing environment variables. Once redeployed, the checks in this report should be rerun against the live URL.

---

## 9. Evidence Appendix

### A. Local Build Output

```
✓ Compiled successfully in 4.5s
Finished TypeScript in 5.4s
✓ Generating static pages using 11 workers (40/40)
Route (app)
├ ƒ /admin
├ ƒ /admin/registrations
├ ○ /calendar
├ ƒ /inscriere
...
Exit code: 0
```

### B. Playwright Output

```
Running 15 tests using 1 worker
...
15 passed (1.1m)
```

### C. Deployed 404 Evidence

```
GET https://animaminds.vercel.app/calendar  → 404 Not Found
GET https://animaminds.vercel.app/inscriere → 404 Not Found
GET https://animaminds.vercel.app/admin     → 404 Not Found
```

### D. Supabase Registration Query

```json
Total registrations: 2
```

---

**Report completed.** No new phase should be started until the codebase is pushed to GitHub, Vercel is redeployed, and the live URLs are re-verified with passing results.
