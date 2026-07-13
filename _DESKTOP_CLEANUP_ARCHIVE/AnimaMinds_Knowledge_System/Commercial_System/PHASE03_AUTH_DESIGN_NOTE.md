# PHASE03_AUTH_DESIGN_NOTE.md

**Phase:** 03 — Authentication & Authorization  
**Project:** AnimaMinds Website & Programme Management Platform  
**Date:** 2026-07-12  
**Status:** Approved and implemented

---

## 1. Objective

Implement real authentication and role-based authorization for the CMS admin panel before any public-facing or commercial features are added. Ensure that only authenticated users with an authorized role can access `/admin` routes and perform CMS operations.

---

## 2. Requirements

- Implement NextAuth.
- Implement role-based access control (RBAC).
- Roles:
  - **Super Admin** — full access
  - **Content Manager** — content operations, no pricing or user management
  - **Commercial Manager** — content and pricing operations, no user management
- Protect all `/admin` routes.
- Anonymous users must not access admin pages.
- Create login and logout flow.
- Respect the existing CMS structure from Phase 02.
- No Phase 2 features, no CRM, no invoicing, no certificates.

---

## 3. Technology Choices

### 3.1 NextAuth / Auth.js

- **Package:** `next-auth@beta` (Auth.js v5)
- **Strategy:** JWT session strategy with credentials provider
- **Reason:** Simplest fit for an internal CMS with a known user base. No external OAuth dependencies required.

### 3.2 Credentials Provider

- Users sign in with email and password.
- Passwords are hashed with **bcrypt** and stored in the `User` table.
- The `authorize` callback verifies the email/password against the database and returns the user's id, email, name, and role.

### 3.3 Session & JWT

- Session strategy: `jwt` with 8-hour max age.
- Role and user id are embedded in the JWT and exposed to the session via callbacks.
- This avoids database session lookups on every request and keeps the middleware edge-compatible.

### 3.4 Middleware Protection

- `middleware.ts` uses `NextAuth(authConfig).auth` to protect `/admin/:path*` and `/login`.
- The `authorized` callback checks:
  - Admin routes require an authenticated user with one of the three admin roles.
  - Logged-in users visiting `/login` are redirected to `/admin`.
- Anonymous users hitting `/admin` are redirected to `/login?callbackUrl=<admin-url>`.

### 3.5 Role Helpers

`lib/auth.ts` exports:

- `canManageContent(user)` — Super Admin, Content Manager, Commercial Manager
- `canEditPrices(user)` — Super Admin, Commercial Manager
- `canViewGovernance(user)` — Super Admin
- `isAdminRole(role)` — checks if role is one of the three admin roles

---

## 4. Database Changes

### 4.1 User model

Added a `password` field to the existing `User` model:

```prisma
model User {
  id       String  @id @default(cuid())
  email    String  @unique
  name     String?
  password String?
  role     Role    @default(VIEWER)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  ownedProgrammes    Programme[] @relation("ProgrammeOwner")
  reviewedProgrammes Programme[] @relation("ProgrammeReviewer")
}
```

### 4.2 Migration

- Migration name: `20260712081720_add_password`
- Adds `password` column to the `User` table.

---

## 5. File Structure

| Path | Purpose |
|---|---|
| `auth.config.ts` | Edge-safe NextAuth configuration (pages, session, callbacks, providers array) |
| `lib/auth.ts` | Full NextAuth setup with Credentials provider, bcrypt, role helpers, session helpers |
| `types/auth.d.ts` | Type augmentation for `next-auth` session and JWT |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth API route handlers |
| `app/login/page.tsx` | Server component wrapping login form in Suspense |
| `app/login/login-form.tsx` | Client login form using `signIn` from `next-auth/react` |
| `app/admin/components/logout-button.tsx` | Client sign-out button |
| `middleware.ts` | Route protection and role authorization |
| `app/admin/layout.tsx` | Async layout, redirects to login if not authenticated, shows role and logout |
| `app/admin/actions/cms.ts` | All server actions now use `requireAdminUser()` and role checks |
| `app/admin/prices/page.tsx` | Hides create/edit/delete UI for non-authorized roles |
| `app/admin/users/page.tsx` | Password field added to user creation form |
| `prisma/seed.ts` | Seeds three test users with bcrypt-hashed passwords |

---

## 6. Login Flow

1. User visits `/admin`.
2. Middleware detects no session and redirects to `/login?callbackUrl=http://localhost:3000/admin`.
3. User submits email/password.
4. `signIn('credentials', ...)` calls `/api/auth/callback/credentials`.
5. NextAuth `authorize` callback verifies the password.
6. On success, JWT is set and client navigates to `/admin`.
7. On failure, the login form shows "Invalid email or password".

---

## 7. Logout Flow

1. User clicks "Sign out" in the admin sidebar.
2. `signOut({ callbackUrl: '/login' })` clears the session and redirects to `/login`.

---

## 8. Security Considerations

- Passwords are hashed with bcrypt (cost factor 10).
- The `NEXTAUTH_SECRET` environment variable is used to sign JWTs and must be changed in production.
- Middleware blocks all `/admin` requests before they reach the application code.
- Server actions re-check authentication and role, so direct API calls are also protected.
- CSRF protection is handled by NextAuth automatically.
- The `VIEWER` and `FACILITATOR` roles cannot access admin routes.

---

## 9. Test Accounts

Seeded for validation:

| Email | Role | Password |
|---|---|---|
| `admin@animaminds.ro` | `SUPER_ADMIN` | `Animaminds2026!` |
| `content@animaminds.ro` | `CONTENT_MANAGER` | `Animaminds2026!` |
| `commercial@animaminds.ro` | `COMMERCIAL_MANAGER` | `Animaminds2026!` |

---

## 10. Out of Scope

- Password reset / forgot password flow (future Phase)
- Email provider or OAuth (future Phase)
- CRM, invoicing, certificates (explicitly excluded)

---

## 11. Validation Plan

- Access tests: anonymous redirect, authenticated access, post-logout access denial
- Permission tests: Content Manager cannot edit prices, Commercial Manager can
- Role tests: all three roles can log in and access admin
- Route protection tests: all `/admin/*` routes require authentication
- Build validation: `npm run build` passes

---

**Document version:** 1.0  
**Last updated:** 2026-07-12
