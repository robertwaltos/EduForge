# EduForge Web Starter

EduForge is a web-first educational platform starter built with Next.js App Router and TypeScript.

## Included foundation

- Next.js + TypeScript + Tailwind starter app
- Supabase client/server helpers (`@supabase/ssr`)
- Stripe checkout and webhook route scaffolding
- AI token budget logic with hard-cap fallback support
- Offline progress storage helper (IndexedDB via `idb`)
- Mixpanel event helper for lesson tracking
- Media placeholders in `public/placeholders/`
- AI prompt catalog in `public/AI-MEDIA-PROMPTS.md`
- External AI research prompt pack in `public/AI-RESEARCH-AGENT-PROMPTS.md`

## Quick start

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

```bash
copy .env.example .env.local
```

3. Start development server

```bash
npm run dev
```

4. Open app

`http://localhost:3000`

Optional environment diagnostics:

```bash
npm run env:check
```

Database readiness diagnostics (checks required Supabase tables):

```bash
npm run db:check
```

Optional report output:

```bash
node scripts/check-db-readiness.mjs --write-report --no-fail
```

Run all operational diagnostics in one command:

```bash
npm run ops:doctor
```

## Continuous integration

GitHub Actions workflow: `.github/workflows/ci.yml`
Scheduled ops workflow: `.github/workflows/ops-reports.yml` (daily + manual dispatch)
Scheduled media automation workflow: `.github/workflows/media-automation.yml` (daily + manual dispatch)

Checks on push/PR:

- `npm run modules:check`
- `npm run curriculum:validate`
- `npm run lint`
- `npm run build`

Ops workflow output:

- Uploads an `ops-report-bundle` artifact with curriculum/media/compliance/prompt-pack reports.

Media automation workflow behavior:

- Regenerates lesson media prompt pack artifacts.
- Queues missing media jobs into `media_generation_jobs` using `scripts/queue-media-from-prompts.mjs`.
- Re-queues failed/canceled media jobs using `scripts/retry-media-jobs.mjs`.
- Runs media queue SLA alert checks using `scripts/check-media-sla-alerts.mjs`.
- Processes queued/failed alert notifications using `scripts/process-alert-notifications.mjs`.
- Processes queued media jobs using `scripts/process-media-jobs.mjs`.
- Skips queue writes gracefully if Supabase secrets are not configured.

Required GitHub secrets/vars for media queue apply mode:

- `NEXT_PUBLIC_SUPABASE_URL` (repo variable or secret)
- `SUPABASE_SERVICE_ROLE_KEY` (secret)
- `RESEND_API_KEY` (secret, optional for email delivery)
- `ADMIN_ALERT_FROM_EMAIL` (repo variable or secret, optional; falls back to `PARENT_CONSENT_FROM_EMAIL`)

## API endpoints (starter)

- `GET /api/health`
- `GET /api/auth/me`
- `GET/PATCH /api/user/preferences`
- `GET /api/ai/analyze` (schema info)
- `POST /api/ai/analyze` (budget-aware recommendation mock)
- `GET /api/ai/recommendations`
- `POST /api/images/generate`
- `POST /api/stripe/checkout`
- `POST /api/stripe/webhook`
- `POST /api/compliance/age-gate`
- `POST /api/compliance/parent-consent`
- `POST /api/compliance/parent-consent/verify`
- `GET/POST /api/compliance/policy-acceptance`
- `GET/POST /api/privacy/dsar`
- `GET /api/admin/compliance/dsar`
- `POST /api/admin/compliance/dsar/[requestId]`
- `POST /api/admin/compliance/dsar/bulk`
- `GET/POST/PATCH /api/admin/alerts`
- `POST /api/admin/alerts/run`
- `POST /api/admin/alerts/notifications/run`
- `GET /api/admin/report-exports`
- `GET/POST /api/admin/report-jobs`
- `POST /api/admin/report-jobs/run`
- `GET /api/admin/reports/dsar`
- `GET /api/admin/reports/support`
- `GET /api/admin/reports/audit`
- `GET /api/admin/curriculum/coverage`
- `GET /api/admin/system/db-readiness`
- `GET/POST /api/admin/media/jobs` (GET supports `moduleId`, `lessonId`, `assetType`, `status`, `limit`, `offset` query params)
- `GET /api/admin/media/prompt-pack`
- `POST /api/admin/media/jobs/run`
- `POST /api/admin/media/jobs/queue-from-pack`
- `POST /api/admin/media/jobs/retry`
- `POST /api/admin/media/jobs/[jobId]/status`
- `POST /api/admin/users/update-roles`
- `GET /api/parent/reports`
- `GET/POST /api/admin/approvals`
- `POST /api/admin/approvals/[approvalId]`

## Compliance routes (starter UI)

- `/auth/age-gate`
- `/auth/parent-consent`
- `/auth/parent-consent/verify`

## Immersive learning routes

- `/science-lab` (Apple Vision/WebXR capability foundation)
- `/modules` (dynamic module catalog from central registry)
- `/exam-prep` (global exam-preparation pathways)
- `/support` (user issue reporting and ticket tracking)
- `/admin/operations` (owner/admin operations console)
- `/admin/overview` (admin command center summary)
- `/admin/curriculum` (curriculum coverage and gap planning console)
- `/admin/media` (AI media generation queue operations)
- `/lessons/[lessonId]` includes admin-only prompt copy, queue, and lesson-specific queue processing controls.
- `/admin/compliance` (app store policy readiness checklist)
- `/admin/reports` (CSV exports for DSAR/support/audit)
- `/admin/alerts` (operational anomaly and rate-limit alerts)
  - Includes editable media queue SLA thresholds (stale hours, backlog limit, 24h failure limit)
  - Includes editable dedupe and auto-resolve windows for media queue alerts
  - Includes an admin-triggered notification queue processor for queued/failed alert emails
- Critical actions (`delete user`, `refund`, `set price`) require approved request IDs.
- `/account/settings` (user self-service account deletion)
- `/account/privacy` (DSAR + policy acknowledgment history)
- `/parent/compliance` (parent consent history view)
- `/parent/reports` (parent-facing learner grade/mastery analytics)
- `/admin/audit` (owner/admin action audit trail)
- `/legal/privacy`, `/legal/terms`, `/legal/refunds`

## Learning module architecture

To add a new learning module with minimal changes:

1. Create a module file in `src/lib/modules/catalog/` using `module-template.example.ts`.
2. Export a typed `LearningModule` object with metadata + lessons.
3. Run `npm run modules:sync` to regenerate the validated registry.
4. Optional: run `npm run modules:generate:exams` to add SAT/ACT/AP/GCSE/A-Level/JEE-NEET/Gaokao tracks.
5. Run `npm run curriculum:validate` to enforce content integrity rules (unique IDs, quiz structure, lesson-type coverage).

Fast scaffold option (recommended):

```bash
npm run module:new -- --id algebra-201 --title "Algebra Foundations" --subject "Math" --description "Build algebra fluency with guided practice."
npm run modules:sync
```

To inspect curriculum breadth and identify coverage gaps:

```bash
npm run curriculum:report
```

This generates:

- `public/CURRICULUM-COVERAGE-REPORT.json`
- `public/CURRICULUM-COVERAGE-REPORT.md`

To audit lesson-content quality and placeholder risk across module catalog files:

```bash
npm run curriculum:quality
```

This generates:

- `public/CURRICULUM-QUALITY-REPORT.json`
- `public/CURRICULUM-QUALITY-REPORT.md`

To generate a curriculum expansion plan against the target matrix:

```bash
npm run curriculum:plan
```

This generates:

- `public/CURRICULUM-EXPANSION-PLAN.json`
- `public/CURRICULUM-EXPANSION-PLAN.md`

Media production readiness reporting:

```bash
npm run media:report
```

This generates:

- `public/MEDIA-READINESS-REPORT.json`
- `public/MEDIA-READINESS-REPORT.md`

Generate lesson-by-lesson Seedance and research-agent prompt payloads:

```bash
npm run prompts:lesson-media
```

This generates:

- `public/LESSON-MEDIA-PROMPT-PACK.json`
- `public/LESSON-MEDIA-PROMPT-PACK.md`

Bulk queue media jobs from the generated prompt pack (dry-run by default):

```bash
npm run media:queue:from-prompts
```

Apply inserts to Supabase with explicit flags:

```bash
node scripts/queue-media-from-prompts.mjs --asset all --limit 300 --apply
```

Process queued media jobs into completed outputs:

```bash
npm run media:process -- --limit 100
```

Retry failed/canceled jobs back to queued state:

```bash
npm run media:retry -- --status failed,canceled --limit 100 --apply
```

The retry flow skips jobs when a queued/running/completed asset already exists for the same module + lesson + asset type.

Run media queue SLA checks and auto-create admin alerts:

```bash
npm run alerts:media:sla -- --apply
```

Process queued/failed alert notifications:

```bash
npm run alerts:notifications -- --apply --limit 200 --retry-failed
```

Optional `app_settings` keys for media queue SLA thresholds:

- `media_queue_sla_stale_hours` (default: `6`)
- `media_queue_sla_backlog_limit` (default: `30`)
- `media_queue_sla_failure_24h_limit` (default: `20`)
- `media_queue_alert_dedupe_hours` (default: `24`)
- `media_queue_alert_auto_resolve_hours` (default: `12`)

Optional filters:

- `--module <module-id>`
- `--lesson <lesson-id>`
- `--asset video|animation|image|all`
- `--created-by <admin-user-uuid>`

Lesson-level media operations:

- Every lesson page now renders video, animation, and image production prompts.
- Admins can queue prompt jobs directly from the lesson page.
- Admins can retry failed/canceled lesson jobs directly from the lesson page.
- Lesson page panel auto-refreshes latest queue status and output links.
- Admins can process queued jobs scoped to the current lesson from the same panel.

App store compliance audit report:

```bash
npm run compliance:audit
```

This generates:

- `public/APPSTORE-COMPLIANCE-AUDIT.json`
- `public/APPSTORE-COMPLIANCE-AUDIT.md`

Refresh all governance/ops reports in one run:

```bash
npm run reports:refresh
```

Once registered, the module automatically appears in:

- `GET`/lookup logic via `src/lib/modules/index.ts` (validated with Zod)
- `/modules` catalog UI
- `/dashboard` learning path cards
- lesson lookup routes (`/lessons/[lessonId]`)

## Auth routes

- `/auth/sign-up`
- `/auth/sign-in`
- `/auth/callback` (OAuth + email magic link callback)
- `/dashboard` (protected)
- `/billing/checkout`

## Themes and grading

- Global theme controls with a light-first model:
  - mode: `System` or `Light`
  - packs: `Simple`, `Sunrise`, `Ocean`, `Forest`, `Candy`, `Space`
- User theme preferences sync to `user_profiles` through `GET/PATCH /api/user/preferences`.
- Learner dashboard emphasizes student-friendly progress signals:
  - Achievement level
  - Mastery score %
  - Lessons completed
  - Stars earned + accuracy
- Raw grading still exists for analytics, reporting, and admin/parent workflows.

Session cookie refresh proxy is configured in `src/proxy.ts`.

Current sign-in methods on `/auth/sign-in`:

- Email + password
- Email magic link (OTP)
- Phone OTP (SMS, via Supabase + Twilio)
- OAuth: Google, Facebook, X (Twitter)

Image generation behavior:

- `POST /api/images/generate` checks completed `media_generation_jobs` first.
- If no completed image exists, it queues an image job and returns a placeholder until processing completes.

AI routes hardening:

- `POST /api/ai/analyze` now derives authenticated user + month spend server-side from `user_tokens`.
- `GET /api/ai/recommendations` now uses mastery + progress scoring (weak skills, due review, new lesson bias) instead of simple placeholder selection.

Supabase auth provider setup checklist:

- Add site URL and redirect URL: `http://localhost:3000/auth/callback` (plus your production callback URL).
- Enable providers in Supabase Auth: Google, Facebook, Twitter.
- Enable Email and Phone providers in Supabase Auth.
- Configure Twilio credentials in Supabase Auth for phone OTP delivery.

Owner operations (admin-only) include:

- Create accounts
- Password reset link generation
- Reset learner progress/mastery
- Delete accounts (soft/hard)
- Process refunds (Stripe)
- Issue promo codes and sales events (Stripe coupons/promotion codes)
- Create new Stripe prices and set active default checkout price via `app_settings`
- Resolve support tickets
- Audit operational actions (`admin_action_logs`)
- Process DSAR queue statuses from `/admin/compliance`
- Update role flags explicitly (`is_admin`, `is_parent`)
- Export signed CSV reports with checksum and export history
- Monitor and acknowledge operational alerts
- Monitor monthly AI spend, MoM change, and top spenders via `/admin/costs`
  - Optional budget override in `app_settings` with key `cost_budget_cap_usd`

App store readiness highlights:

- In-app account deletion flow (`/account/settings` + `/api/account/delete`)
- Child safety gates (age gate + parent consent)
- Subscription checkout with promotion code support
- Admin compliance checklist at `/admin/compliance`
- Billing mode switch for store channels: `BILLING_PROVIDER_MODE`
  - `stripe_external`: standard Stripe Checkout
  - `app_store_iap`: blocks external checkout route for compliant app-store builds
- Policy version acknowledgment recording via `policy_acceptances`

Dashboard access includes an onboarding guard:

- Missing age-gate profile state redirects to `/auth/age-gate`
- Under-13 pending consent redirects to `/auth/parent-consent`

Parental verification uses signed link tokens (`PARENT_CONSENT_TOKEN_SECRET`) and the verify API requires a valid token.
If `RESEND_API_KEY` and `PARENT_CONSENT_FROM_EMAIL` are configured, the link is sent via email; otherwise a simulation link is returned for local testing.
Verification links are single-use: token hash is bound to the consent request and consumed on successful verification.

## Supabase setup

Run `supabase/schema.sql` in your Supabase SQL editor.

Tables included:

- `user_profiles`
- `user_tokens`
- `parent_consents`
- `subscriptions`
- `dsar_requests`
- `app_settings`
- `admin_action_logs`
- `support_tickets`
- `sales_events`
- `policy_acceptances`
- `admin_alerts`
- `admin_rate_limit_events`
- `admin_report_exports`
- `admin_approval_requests`
- `admin_alert_notifications`
- `admin_report_jobs`
- `media_generation_jobs`

Includes baseline RLS policies and updated-at triggers.
Also includes operational indexes for common admin/report queries (alerts, support, DSAR, media jobs, token spend).

## Seed data (optional)

1. Set environment variables from `.env.example` in your shell (or `.env.local`).
2. Run:

```bash
npm run seed:supabase
```

This creates (or reuses) a test user and seeds sample records in `user_profiles`, `user_tokens`, and `dsar_requests`.

## Core files

- `src/lib/config/env.ts`
- `src/lib/ai/token-budget.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/offline/progress-db.ts`
- `src/lib/analytics/mixpanel.ts`
- `public/AI-MEDIA-PROMPTS.md`

## Notes

- Stripe, Supabase, translation, and AI routes are scaffolded for integration and need real keys in `.env.local`.
- The token budget utility follows project constraints and can be wired to per-user Supabase tracking tables.
- Stripe webhook lifecycle now persists subscription state into `subscriptions` using `SUPABASE_SERVICE_ROLE_KEY`.
- Checkout and parent-consent APIs now derive `userId` from the authenticated Supabase session.
