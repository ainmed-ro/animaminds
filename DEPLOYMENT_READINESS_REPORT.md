# DEPLOYMENT_READINESS_REPORT.md

**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-13  
**Status:** Ready for GitHub + Vercel Deployment  
**Framework:** Next.js 16.2.10 (App Router)  
**Database:** PostgreSQL via Supabase  
**ORM:** Prisma  
**Deployment Target:** Vercel

---

## 1. Executive Summary

The application has passed local build, TypeScript compilation, and end-to-end Playwright validation. The core platform modules implemented through this milestone are:

- Edition Management (Phase 05)
- Registrations (admin + public flow)
- Public Calendar
- Email Notifications
- Google Sheets Sync

This report documents the verification status and the steps required to deploy to GitHub and Vercel.

---

## 2. Build Verification

### 2.1 Local Build

```bash
npm run build
```

**Result:** `Exit code: 0`

**Observations:**

- TypeScript compilation passed.
- All 42 routes generated successfully.
- Static and dynamic routes correctly identified.
- No blocking lint or build errors.

### 2.2 Route Summary

Dynamic server-rendered routes (`ƒ`):

- `/admin/*` — all CMS pages
- `/api/auth/[...nextauth]` — authentication
- `/api/contact` — contact form API
- `/api/cron/daily`, `/api/cron/weekly` — summary cron jobs
- `/api/registrations`, `/api/registrations/[id]` — legacy + new registration APIs
- `/api/spots` — spots API
- `/inscriere` — public registration

Static pre-rendered routes (`○`):

- `/`, `/contact`, `/programe`, `/calendar`, `/login`, `/politica-de-confidentialitate`, etc.

---

## 3. Test Verification

### 3.1 Playwright E2E Tests

```bash
npx playwright test tests/auth.spec.ts tests/programme-management.spec.ts tests/edition-management.spec.ts tests/registration-management.spec.ts tests/public-registration.spec.ts --reporter=line
```

**Result:** `15 passed (1.1m)`

| Test Suite | Status |
|------------|--------|
| Phase 03 Authentication (`auth.spec.ts`) | 11 passed |
| Phase 04 Programme Management | 1 passed |
| Phase 05 Edition Management | 1 passed |
| Registration Management | 1 passed |
| Public Registration Flow | 1 passed |

### 3.2 Direct Prisma Validation

```bash
npx tsx --env-file=.env.local scripts/registration-validation.ts
```

**Result:** Passed

- Create registration decrements capacity.
- Read registration with relations.
- Update registration.
- Delete registration restores capacity.

### 3.3 Previous Phase Validations

- Phase 04 direct validation (`scripts/phase04-validation.ts`) — passed.
- Phase 05 direct validation (`scripts/phase05-validation.ts`) — passed.

---

## 4. Environment Variables

The following environment variables must be configured in Vercel before deployment.

### 4.1 Required

| Variable | Purpose | Source |
|----------|---------|--------|
| `DATABASE_URL` | Prisma pooled connection to Supabase | Supabase → Database → Connection String |
| `DIRECT_URL` | Prisma direct migration connection | Supabase → Database → Connection String (Direct) |
| `NEXTAUTH_URL` | Canonical app URL | Vercel project domain |
| `NEXTAUTH_SECRET` | JWT/session signing secret | `openssl rand -base64 32` |
| `RESEND_API_KEY` | Transactional email provider | Resend Dashboard |
| `FROM_EMAIL` | Sender address for system emails | Resend verified domain |
| `ADMIN_EMAIL` | Recipient for admin alerts | Operations team email |

### 4.2 Optional / Integrations

| Variable | Purpose | When Required |
|----------|---------|---------------|
| `GOOGLE_SHEETS_URL` | Google Apps Script web app URL for Sheets sync | If using Google Sheets integration |
| `CRON_SECRET` | Secret header for cron job authorization | If scheduling daily/weekly summaries |

### 4.3 Notes

- `GOOGLE_SHEETS_URL` and `CRON_SECRET` are not required for the core app to function; they enable optional integrations.
- If `GOOGLE_SHEETS_URL` is absent, sync is skipped with a warning in logs.
- If `CRON_SECRET` is absent, cron endpoints are insecure; configure before enabling.

---

## 5. Database Readiness

### 5.1 Schema

`prisma/schema.prisma` includes all required models:

- `User`
- `Programme`, `ProgrammeSEO`, `ProgrammeDocument`, `ProgrammeGallery`, `ProgrammeTargetAudience`, `ProgrammeApplicationArea`
- `Edition`, `EditionAdditionalPrice`, `EditionGallery`
- `Price`
- `Registration`
- `FAQ`, `Document`, `Gallery`, `GalleryImage`
- `Taxonomy` models: `TargetAudience`, `ApplicationArea`
- `Testimonial`, `Page`, `PageSEO`

### 5.2 Migrations

Run migrations against the production database before first deploy:

```bash
npx prisma migrate deploy
```

For local development:

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5.3 Seeding

The seed script (`prisma/seed.ts`) creates:

- Super Admin, Content Manager, Commercial Manager users.
- Target audience and application area taxonomies.
- Initial programmes and placeholder prices.

Run seed in production only if starting fresh:

```bash
npx prisma db seed
```

---

## 6. GitHub Deployment Checklist

### 6.1 Repository Setup

1. Initialize or open the existing Git repository in the project root.
2. Ensure `.env.local` is listed in `.gitignore` and is never committed.
3. Commit all source files, including:
   - `app/`, `prisma/`, `lib/`, `components/`, `public/`
   - `package.json`, `package-lock.json` or `pnpm-lock.yaml`
   - `tsconfig.json`, `next.config.*`, `tailwind.config.*`
   - Playwright tests in `tests/`
   - Validation scripts in `scripts/`
   - Markdown deliverables in `AnimaMinds_Knowledge_System/`

### 6.2 Recommended `.gitignore`

```
/node_modules
/.next
/out
.env
.env.local
.env.*.local
*.log
/test-results
/playwright-report
/playwright/.cache
```

### 6.3 Push Command

```bash
git add .
git commit -m "feat: edition management, registrations, calendar, notifications, sheets sync"
git push origin main
```

---

## 7. Vercel Deployment Checklist

### 7.1 Project Import

1. Log in to Vercel and create a new project.
2. Import the GitHub repository.
3. Select the framework preset: **Next.js**.
4. Set the root directory to the repository root.

### 7.2 Build Settings

Vercel should auto-detect the following from `package.json`:

- **Build Command:** `npm run build` or `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 7.3 Environment Variables

Add all variables from Section 4 in the Vercel project settings:

```
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_URL=https://<project>.vercel.app
NEXTAUTH_SECRET=<random-secret>
RESEND_API_KEY=re_...
FROM_EMAIL=AnimaMinds <noreply@animaminds.ro>
ADMIN_EMAIL=contact@animaminds.ro
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec
CRON_SECRET=<random-secret>
```

### 7.4 Database Connection

In Supabase:

1. Go to **Project Settings → Database**.
2. Copy the **Connection String** (URI) for Prisma.
3. Ensure `?pgbouncer=true&connection_limit=1` is appended to `DATABASE_URL` for pooled mode.
4. Use the **Direct connection** string for `DIRECT_URL`.

Example:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.agrduievorqmsmjllbwv.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.agrduievorqmsmjllbwv.supabase.co:5432/postgres
```

### 7.5 First Deploy

After configuring environment variables:

1. Trigger a deploy from Vercel.
2. Wait for build to complete.
3. Verify the deployment URL loads.
4. Run `npx prisma migrate deploy` against production (use Supabase SQL Editor or local CLI with `DIRECT_URL`).
5. Seed the database if needed: `npx prisma db seed`.

---

## 8. Cron Job Setup

Daily and weekly summary emails are exposed at:

- `GET /api/cron/daily`
- `GET /api/cron/weekly`

Both require the `x-cron-secret` header matching `CRON_SECRET`.

### 8.1 Vercel Cron Configuration

Create `vercel.json` in the project root if using Vercel Cron:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily",
      "schedule": "0 8 * * *"
    },
    {
      "path": "/api/cron/weekly",
      "schedule": "0 8 * * 1"
    }
  ]
}
```

**Note:** Vercel automatically appends a `x-vercel-signature` header, but the routes here check `x-cron-secret`. You may need to adjust the authorization logic for Vercel Cron specifically, or use an external scheduler such as GitHub Actions or Cron-job.org that can set custom headers.

---

## 9. Post-Deploy Verification

After the first successful deploy, verify the following:

| Check | Command / Action | Expected Result |
|-------|------------------|-----------------|
| Homepage loads | Visit `/` | 200 OK, no errors |
| Admin login | Visit `/login` and authenticate | Redirect to `/admin` |
| CMS programmes | Visit `/admin/programmes` | List loads |
| CMS editions | Visit `/admin/editions` | List loads |
| CMS registrations | Visit `/admin/registrations` | List loads |
| Public calendar | Visit `/calendar` | Open editions displayed |
| Public registration | Submit `/inscriere` | Registration created, admin email sent |
| Contact form | Submit `/contact` | Message saved, admin email sent |
| Build health | Trigger a redeploy | Build succeeds |

---

## 10. Known Considerations

### 10.1 Pre-existing Lint Warning

There is a TypeScript lint warning in `app/admin/actions/cms.ts` related to the `password` property on `UserCreateInput`. This warning is pre-existing and does **not** block the build. The `password` field exists in `prisma/schema.prisma`. A future cleanup can resolve the type mismatch.

### 10.2 Legacy Registration API

The existing `/api/registrations` route continues to use the legacy local database (`lib/registrations-db.ts`) to preserve any existing integrations. The new preferred flow uses `/inscriere` with `submitPublicRegistration`, which writes directly to Prisma and syncs to Google Sheets.

### 10.3 Google Sheets Integration

Google Sheets sync uses a `no-cors` POST to a configurable Apps Script endpoint. Errors are logged but do not block registration/contact submission.

### 10.4 Email Deliverability

Configure Resend domain verification and SPF/DKIM records before sending large volumes. Use `ADMIN_EMAIL` to receive notifications.

---

## 11. Rollback Plan

If deployment issues occur:

1. Revert the latest commit in GitHub.
2. Trigger a redeploy in Vercel.
3. If database migrations caused issues, restore from the most recent Supabase backup before re-running `prisma migrate deploy`.

---

## 12. Conclusion

The application is verified and ready for deployment to GitHub and Vercel. All critical paths (authentication, programme management, edition management, registration, calendar, notifications, and Google Sheets sync) have been implemented and validated. The next step is to configure environment variables in Vercel and run the first production deployment.
