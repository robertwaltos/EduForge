# Koydo V1 Launch Roadmap

Last Updated: 2026-03-02 (billing webhook retention cleanup tooling + teacher class role hardening)
Owner: Koydo Core Team (Claude Code + Codex + Gemini)

> **Coordination doc**: See `V1-LAUNCH-COORDINATION.md` (project root) for agent
> assignments, file ownership, and the day-by-day sprint plan.
>
> **Launch command center**: See `../LAUNCH-COMMAND-CENTER.md` for active lock
> ownership, execution order, and append-only progress protocol.
>
> **Long-term roadmap + backlog**: See `PRODUCT-ROADMAP-12-WEEK.md` and
> `PRODUCT-BACKLOG-EPICS.md` for post-launch epics, milestones, and KPIs.

## Status Legend
- `DONE`: implemented and validated
- `IN_PROGRESS`: active execution now
- `PENDING`: queued for upcoming tranche

## V1 Launch Strategy

**Target date**: 2026-03-13 (14-day sprint from 2026-02-27)

### Launch focus reset (effective now)

- Scope lock on launch-critical work only.
- Release order is now: **Web -> Google Play -> iOS (parallel)**.
- All agents must follow lock ownership in `LAUNCH-COMMAND-CENTER.md`.
- EN/ES + stability + security are hard launch gates (not optional polish).

### Three launch surfaces (priority order)

1. **Web** (immediate) — production-grade public site, top-notch landing page
2. **Google Play** (fast follow) — Android via Capacitor/TWA wrapper
3. **iOS App Store** (parallel) — iPad/iPhone via Capacitor + Xcode

### Business model

- **Freemium** — free tier with curated content per education stage
- **Paid** — subscription unlocks full catalog + premium features
- **Billing**: Apple IAP (iOS), Google Play Billing (Android), Stripe (web)

### Languages: English + Spanish (mandatory at launch)

### Education stages (replaces 6 Pre-K worlds on lobby)

| Stage | Ages | Grades | Badge |
|---|---|---|---|
| Little Explorers | 3–5 | Pre-K | 🧒 |
| First Adventures | 5–8 | K–2 | 🌈 |
| Discovery Lab | 8–11 | 3–5 | 🔬 |
| Challenge Zone | 11–14 | 6–8 | ⚡ |
| Launchpad | 14–18 | 9–12 | 🚀 |
| Mastery Studio | 18+ | College+ | 🎓 |

## Phase 1 Launch Objective (original — still valid)

Ship the highest-value content experience first: stable media pipeline, reviewed launch assets, and reliable app wiring for generated visuals.

## Workstream Tracker

| ID | Workstream | Status | Owner | Notes / Deliverables |
|---|---|---|---|---|
| P1-01 | Grok manifest audit + 200-sample review workflow | DONE | Codex | `media:manifest:audit` defaulted to 200; normalized/test/audit artifacts generated. |
| P1-02 | Manifest normalization fixes (`a ocean`, `/public` path handling) | DONE | Codex | Added normalization in `scripts/media-manifest-audit.mjs`; warnings remain in source manifest but normalized outputs are safe. |
| P1-03 | App wiring: admin manifest consumer API | DONE | Codex | Added `GET /api/admin/media/catalog` backed by `GROK-IMAGE-MANIFEST-NORMALIZED.json`. |
| P1-04 | App wiring: media resolve fallback continuity | DONE | Codex | `GET /api/media/resolve` + `/batch` now return generated fallback assets when DB job output is missing. |
| P1-05 | Controlled video queue draining (batch operations) | DONE | Claude/Codex | Overnight runner completed. 1,831 image+video jobs regenerated with enriched prompts. Old `output_url` archived in `metadata.old_output_url` as fallback; resolve API serves old media during regen so app stays functional. |
| P1-05b | Prompt enrichment + full media regen | DONE | Claude | `generate-lesson-media-prompts.mjs` rewritten — prompts now include module description, all learning objectives, visual aid briefs, age range, difficulty. All 6,720 generated prompts bulk-approved (`approve-prompts.mjs`). `regen-media.mjs` reset 1,655 images + 176 videos to re-queue. Resolve API updated with `regen_in_progress_fallback` source for old media continuity. |
| P1-06 | Manifest consumers rollout in admin UI | DONE | Claude | Added "Reviewed Media Catalog" section to `media-ops-client.tsx`; calls `GET /api/admin/media/catalog`; supports group/usagePath/search filters + pagination; shows asset cards with prompt preview and public_url link. |
| P1-07 | Curate Phase-1 launch content set from reviewed 200 | PENDING | Team | Approve exact asset subset for production queueing and content placement. |
| P1-08 | Queue by approved reviewed-set only (safety gate) | DONE | Claude/Codex | Added `--reviewed-only` flag to `queue-media-from-prompts.mjs`, `queue-immersive-media.mjs`, and `process-media-jobs.mjs`. Gate filters by `promptQaStatus === "reviewed"` at queue time and `metadata->prompt_qa_status = 'reviewed'` in DB at process time. New npm scripts: `media:queue:from-prompts:reviewed`, `media:queue:immersive:reviewed`. |
| P1-09 | Language feature architecture baseline (pluggable providers) | DONE | Existing | `LANGUAGE_LEARNING_ARCHITECTURE.md` + provider contracts already present in codebase. |
| P1-10 | High-confidence pronunciation grading at scale | PENDING | Later Phase | Decision locked: licensed pronunciation provider in parallel with AI fallback behind pluggable layer. |
| P1-11 | Full provider interface expansion (STT/translation/TTS/scoring) | PENDING | Later Phase | Explicitly deferred until after Phase 1 launch content goals are complete. |
| P1-12 | Media processor reliability hardening (safe claims + help guard) | DONE | Codex | `process-media-jobs.mjs` now claims jobs one-by-one (`queued -> running`) and supports `--help` to avoid accidental long-running starts. |
| P1-13 | Dark theme contrast and tonal calibration | PENDING | Codex/Design | Reduce visual contrast shock and abrupt color jumps; establish stable semantic tokens before launch. |
| P1-14 | Language policy constants (weights, confidence gate, gamification + budget caps) | DONE | Codex | Added `src/lib/language-learning/policy.ts` with locked defaults and rollout waves. |
| P1-15 | Pronunciation API confidence safety mode (`practice_only`) | DONE | Codex | `POST /api/language/pronunciation/grade` now returns `gradingMode` + `gradeRecorded` using confidence threshold policy. |
| P1-16 | Language + gamification DB foundation (RLS-ready) | DONE | Codex | Added migration `202602280004_language_pronunciation_gamification_foundation.sql` for attempts/states/events tables. |
| P1-17 | Education stage lobby (6-stage redesign) | DONE | Claude | Replaced 6 Pre-K world cards with 6 education stages (Pre-K → College). New `EducationStage` type in `scenes.ts`, `StageLinkCard` component, updated explore lobby + home page. |
| P1-18 | Free-tier content curation (7-10 modules per stage) | DONE | Claude | Created `src/lib/content-gating/` with stage→module curation map. 48 modules across 6 stages in free tier (depth-passed + external imports prioritized). `getModulesForStage()`, `isModuleFree()` API. |
| P1-19 | Content gating UI (free vs premium) | DONE | Claude | `StageModuleGrid` component shows curated modules with FREE/PREMIUM badges, lock overlay on premium cards, module counts in stage header. Stage detail view at `/explore?stage={id}`. |
| P1-20 | Loading/error/empty states for explore + root | DONE | Claude | Added `loading.tsx`, `error.tsx`, `not-found.tsx` for root app and explore route. Skeleton loaders match page structure. Error pages have retry + navigation. |
| P1-21 | Launch command center + lock protocol | DONE | Codex | Added `../LAUNCH-COMMAND-CENTER.md` with strict read/append + file lock rules. |
| P1-22 | Store sequence reset (Web, then Google Play, iOS parallel) | DONE | Team | Roadmap/targets aligned to web-first. Google Play + iOS parallel track. Store assets + submission guides complete. |
| P1-23 | Security + stability hard gate for launch | DONE | Codex | CSRF in proxy.ts, IP rate limiting on 10 endpoints, admin-only media generate, auth scoping fixed on parent digest, RLS on 44 tables + 11 admin policy gaps closed, atomic progress RPC, 0 console.log / 0 TODO/FIXME in src/. |
| P1-24 | EN/ES launch-critical coverage gate | DONE | Codex/Claude | 400+ EN/ES translation keys. All 19 launch-critical pages wired with `t()`. Cookie-first locale with server/client sync. Language switcher in TopNav + dashboard shell. |
| P1-25 | Education stage cadence alignment (~3 years per card) | DONE | Codex/Claude | Stage cards cover ~3-year progression from Pre-K through College. "Stage X of 6" indicator added. |
| P1-26 | Accessibility audit (WCAG AA) — explore surfaces | DONE | Claude | Fixed chip contrast failures (2–3.5:1 → text-zinc-900+border tint, all stages pass ≥4.5:1); aria-labels on all stage + module card Links; locked-card aria-disabled + aria-hidden overlay; back link min-h-11 touch target; prefers-reduced-motion guard on 3D tilt; removed static willChange:transform GPU layer waste |
| P1-27 | Performance: next.config.ts hardening | DONE | Claude | Security response headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy); compiler.removeConsole in production; optimizePackageImports for supabase/date-fns; images.remotePatterns for Supabase CDN + avif/webp + 7-day TTL; reactStrictMode:true |
| P1-28 | Performance: lesson flow lazy loading | DONE | Claude | Phases 2–5 of ExploreLessonFlow (VisualFlashcards, VisualActivity, VisualQuiz, LessonCelebration) converted to next/dynamic. Initial lesson-page JS bundle reduced by ~4 heavy client components. |
| P1-29 | Brand rename: Koydo | DONE | Claude | All source code, configs, translations, native configs, store assets, and docs renamed to Koydo branding. Cookie keys `koydo.*`, IndexedDB name `koydo`, TypeScript interface `KoydoDb`, health route `koydo-api`, email domains `@koydo.app`. Note: local folder path `eduforge-web` remains for backward-compatible filesystem layout. |
| P1-30 | Build fix + type check (launch gate) | DONE | Claude | Removed deprecated `bundledWebRuntime` from capacitor.config.ts. Cleared stale `.next` cache. `next build` 0 errors, `npx tsc --noEmit` 0 type errors. |
| P1-31 | Learning-paths.ts stage alignment | DONE | Claude | Added `inferEducationStageId()` (age/grade → 6-stage ID) and `learnerStageToEducationStageId()` (old 4-tier → new 6-tier bridge). Backward compatible with 3 existing consumers. |
| P1-32 | Visual QA pass (19 launch pages) | DONE | Claude | 15/19 CLEAN. 4 i18n gaps on secondary pages (sign-in, modules, billing/checkout) subsequently fixed by Codex (P1-24). Zero TODO/FIXME in any page or layout file. |
| P1-33 | Premium upgrade UX | DONE | Claude | Locked premium module cards now link to `/billing/checkout`. Added "Tap to unlock" micro-copy + "Unlock All Modules →" CTA button (amber-to-orange gradient). 3 new i18n keys (EN + ES). |
| P1-34 | SEO + social sharing metadata | DONE | Claude | Root layout: title template (`%s \| Koydo`), OG + Twitter card tags, `metadataBase`, keywords, robots. Page-specific metadata on: home, explore, modules, privacy, terms. |
| P1-35 | PWA web manifest | DONE | Claude | `public/manifest.json` with app name, icons, standalone display, education category. Linked from root layout. Icon metadata: favicon, 192px/512px PNG, apple-touch-icon 180px. `appleWebApp` metadata for iOS home screen. |
| P1-36 | Codex: i18n wiring for remaining 3 pages | DONE | Codex | sign-in, modules catalog, billing/checkout pages wired with `t()`. All EN/ES keys added. Build passes. |
| P1-37 | Codex: RLS audit + remediation | DONE | Codex | 44 tables audited, RLS on all. 11 admin policy gaps closed via `202602280009_rls_policy_coverage_hardening.sql`. Atomic progress RPC via `202602280010_atomic_user_learning_progress.sql`. |
| P1-38 | Codex: Error recovery hardening | DONE | Codex | Server actions handle auth null/error with redirect. Stripe webhook skips unknown events gracefully. Checkout/portal flows hardened for timeout + Stripe failure mapping. Lesson progress uses atomic RPC first, safe upsert fallback. |
| P1-39 | Codex: Console/dead code sweep | DONE | Codex | 14 `console.log` calls removed. 0 remaining in `src/`. 0 TODO/FIXME/HACK markers. |
| P1-40 | Codex: Smoke test suite | DONE | Codex | `scripts/smoke-test.mjs` validates 18 routes + `/api/health` JSON contract. `npm run smoke-test`. |
| P1-41 | Gemini: Capacitor + native projects | DONE | Gemini | Capacitor 6 init, Android project (signed release keystore, APK + AAB < 6MB), iOS project (entitlements, iOS 15.0 target, Info.plist configured). JDK 21 resolved. |
| P1-42 | Gemini: RevenueCat + IAP integration | DONE | Gemini | RevenueCat integration with platform-aware API key loading. Billing pages adapted for IAP (Stripe disabled on native). Subscription status API, webhook (HMAC-verified), entitlement check, restore purchases, platform feature flags. |
| P1-43 | Gemini: Platform services | DONE | Gemini | App lifecycle manager (session refresh, sub-check on resume), network monitor (`useNetworkStatus()` hook), deep linking handler (`/explore`, `/lessons`, `/auth/callback`), push notifications (streak + reminder channels), splash screen. |
| P1-44 | Gemini: Store metadata + compliance | DONE | Gemini | EN + ES metadata for Google Play + App Store. Screenshot spec, content rating, data safety declarations, store compliance checklist (100%). Submission guides, release checklist, billing test plan, version management, native dev guide. |
| P1-45 | Gemini: Profile context provider (enhanced) | DONE | Opus 4.6 | `ActiveProfileProvider` fully functional — fetches `student_profiles` from Supabase (display_name, grade_level, avatar_url, ai_skill_level_map). Profile-aware stage recommendation via `getRecommendedStageId()` in `/explore`. Verified complete. |
| P1-46 | Codex: Curriculum expansion (67 modules) | DONE | Codex | 67 new domain modules (~670 lessons) across trade, engineering, health, law, and digital careers. Registry now 201 modules. |
| P1-47 | Codex: Knowledgebase ingestion pipeline | DONE | Codex | Full pipeline: harvest → queue → ingest → PDF extract → manifest. 90 docs, 17 domains, 0 gaps. Domain gate passes all 12 priority domains. |
| P1-48 | Opus: 7 module content rewrites (v2.0.0) | DONE | Opus 4.6 | language-arts-201, us-civics-201, accounting-finance-101, project-management-101, cybersecurity-101, ai-machine-learning-101, math-101. All gold-standard quality. |
| P1-49 | Opus: Comprehensive codebase review | DONE | Opus 4.6 | 13 issues found (3 critical, 4 high, 6 medium, 4 low). Report: `CODEBASE-REVIEW-REPORT.md`. |
| P1-50 | Opus: Critical bug fixes (C-1, C-3, H-2, M-4) | DONE | Opus 4.6 | Zod `activities` field preserved, env vars required, lazy Supabase client, `.bak*` gitignored. Build GREEN. |
| P1-51 | Opus: 5-agent work assignments | DONE | Opus 4.6 | Comprehensive assignments for Opus, Codex, Gemini, Sonnet, Grok in `V1-LAUNCH-COORDINATION.md`. |
| P1-52 | Opus: 8 game components (all game types) | DONE | Opus 4.6 | All 8 game types implemented: letter-catcher, word-builder, number-crunch, pattern-train, story-sequencer, memory-match, color-mixer, shape-safari. Full haptics, scoring, accessibility. Barrel-exported from `src/components/games/index.ts`. |
| P1-53 | Opus: Draft flag + auto-gating for template modules (H-4) | DONE | Opus 4.6 | Added `status?: "published" \| "draft"` to `LearningModule` type + schema. Registry init auto-marks v1.0.0 modules as draft. `getAllLearningModules()` filters drafts — ~166 template modules hidden from users. |
| P1-54 | Opus: Runtime Zod removal (M-5) | DONE | Opus 4.6 | Removed `safeParse()` from `index.ts` — 338 modules no longer parsed by Zod on every import. TypeScript compile-time checks provide equivalent safety. |
| P1-55 | Opus: Template localeSupport correction (M-3) | DONE | Opus 4.6 | Registry init now corrects `localeSupport` to `["en"]` for all v1.0.0 draft modules (previously claimed 10 languages). |
| P1-56 | Opus: QuizBlueprint bloomProfile typing | DONE | Opus 4.6 | Added `bloomProfile?: Record<string, number>` to `QuizBlueprint` type + schema. Legitimate Bloom's taxonomy distribution used by 20+ modules. |
| P1-57 | Opus: Serverless rate limiting (C-2) | DONE | Opus 4.6 | Replaced in-memory `Map` with `@upstash/ratelimit` + `@upstash/redis` dual-mode limiter. Redis sliding-window in production, in-memory fallback for dev. 43 call sites updated to async. |
| P1-58 | Opus: Rate limiting on 5 unprotected routes (H-1) | DONE | Opus 4.6 | Added `enforceIpRateLimit` to `api/progress` (30/min), `api/answers` (60/min), `api/ai/tutor` (10/min — most expensive), `api/telemetry/events` (30/min), `api/health` (60/min). |
| P1-59 | Opus: Env validation bypass fix (H-2) | DONE | Opus 4.6 | RevenueCat webhook now uses `serverEnv` instead of `process.env` direct access. `REVENUECAT_WEBHOOK_SECRET` added to env schema. `subscription/status` uses `serverEnv.NEXT_PUBLIC_APP_URL`. |
| P1-60 | Opus: Nonce-based CSP (H-3) | DONE | Opus 4.6 | CSP moved from static `next.config.ts` to dynamic per-request nonce in `proxy.ts`. Production: `'nonce-<random>' 'strict-dynamic'` — no `unsafe-eval`, no `unsafe-inline` for scripts. Dev: relaxed for HMR. |
| P1-61 | Opus: activities→interactiveActivities migration (D-1/M-1) | DONE | Opus 4.6 | Bulk-renamed `activities:` → `interactiveActivities:` across 25 catalog files. Removed `activities` from `Lesson` type, schema, and renderer fallback. Single canonical field. |
| P1-62 | Opus: moduleVersion removal (D-4/L-2) | DONE | Opus 4.6 | Removed `moduleVersion` from type + schema. Bulk-removed `moduleVersion:` from 337 catalog files. Runtime consumer `topics.ts` updated to use `version` only. |
| P1-63 | Opus: Index signature removal (D-2/M-2) | DONE | Opus 4.6 | Removed 3 `[key: string]: unknown` from InteractiveActivity, QuizBlueprint, Lesson. Added 5 explicit typed optional fields. Union types for items/pairs. music-history-101 quiz format fixed. 0 TS errors. |
| P1-64 | Opus: Exam prep modules promoted (E-3) | DONE | Opus 4.6 | IELTS, GCSE, IB prep modules bumped to v2.0.0 (were hidden as drafts despite ~1,940 lines of real content). Locale fixed to ["en"]. Now published. |
| P1-65 | Opus: 10 module content upgrades batch 2 (E-1) | DONE | Opus 4.6 | medicine-101, nursing-101, law-studies-101, electrical-engineering-101, hvac-101, plumbing-101, meteorology-101, micro-circuits-101, microelectronics-101, cpu-gpu-memory-design-101. All upgraded from ~242-line templates to ~725-line gold-standard modules with real educational content, 10 lessons each (3 video + 3 interactive + 4 quiz), chunks, flashcards, interactive activities, quiz explanations. v2.0.0, published. |
| P1-66 | Codex: Daily review queue foundation (E-03 start) | DONE | Codex | Added prerequisite-aware spaced review queue engine (`src/lib/mastery/review-queue.ts`) and `GET /api/ai/review-queue` with rate-limit + Zod query validation. Queue now computes overdue decay scoring and prerequisite blocking metadata for daily learner review ordering. |
| P1-67 | Codex: Error-log remediation tasking + completion credit (E-04 start) | DONE | Codex | Added `GET/POST /api/exam/remediation-tasks` backed by `src/lib/exam/remediation-tasking.ts` to expose auto-generated remediation tasks from wrong-answer logs with source lesson/question/chunk references. Completing tasks now resolves linked logs and applies mastery credit updates to `user_skill_mastery`. Hardened exam error-log routes with rate limiting + stricter validation and registered them in API guard coverage checks. |
| P1-68 | Codex: Placement diagnostic backend foundation (E-02 start) | DONE | Codex | Added `GET/POST /api/ai/placement-diagnostic` with stage-scoped question generation, scored submission flow, confidence scoring, profile persistence (`initial_assessment_data`, `ai_skill_level_map`), mastery updates to `user_skill_mastery`, and manual stage override mode for parent/teacher control. |
| P1-69 | Codex: Placement summary API + scoring contract hardening | DONE | Codex | Added `GET /api/ai/placement-diagnostic/summary` for profile-level placement status/override retrieval, extracted scoring helpers to `src/lib/ai/placement-diagnostic-scoring.ts`, added contract harness `scripts/test-placement-diagnostic-scoring.mjs`, and enforced guard coverage for the placement summary route. |
| P1-70 | Codex: Placement event history + audit trail persistence | DONE | Codex | Added placement event persistence in `POST /api/ai/placement-diagnostic` (submit + manual override) and `GET /api/ai/placement-diagnostic/history` for filtered event retrieval. Added migration `202603010003_placement_diagnostic_events.sql` with RLS/indexing and guard coverage enforcement for the new history endpoint. |
| P1-71 | Codex: Placement onboarding API migration + scope/test/retention hardening | DONE | Codex | Student onboarding now uses `GET/POST /api/ai/placement-diagnostic` end-to-end (no direct profile upsert path), placement summary now prioritizes manual overrides, and history route now supports strict `self/parent/teacher` scoped access checks. Added shared placement contract helpers (`src/lib/ai/placement-diagnostic-contract.ts`), flow contract harness (`scripts/test-placement-diagnostic-flow-contract.mjs`), and bounded retention cleanup script (`scripts/cleanup-placement-diagnostic-events.mjs`). |
| P1-72 | Codex: Audiobook ingestion/translation seeding resilience hardening | DONE | Codex | Hardened `scripts/seed-audiobook-texts.ts` with `SEED_OFFSET`, fetch retries, and JSON report output; hardened `scripts/seed-audiobook-translations.ts` with offset, per-chapter retries/delay, and machine-readable report output; added retry-aware chapter translation execution in `src/lib/audiobooks/audiobook-translation-service.ts` with per-error attempt tracking. |
| P1-73 | Codex: Backend ownership split + legal hardening charter | IN_PROGRESS | Codex | Codex now owns difficult backend tracks: parent/teacher/developer portal APIs, billing backend + RevenueCat completion, and legal/compliance hardening guardrails. Added executive legal risk + contract controls + app-audit prompt in `EDTECH-LITIGATION-CONTRACT-HARDENING.md` for multi-agent use. |
| P1-74 | Codex: Parent child-data purpose/consent guard consolidation | DONE | Codex | Added shared parent access guard `src/lib/compliance/parent-access.ts` to enforce explicit access purpose + parent role + verified `parent_consents` relationships before child-data reads. Wired into `GET /api/ai/placement-diagnostic/history` (parent scope) and parent surfaces `POST /api/parent/digest`, `GET /api/parent/reports`, and `GET /api/parent/ai-interventions` to remove inconsistent parent-email-only lookups. |
| P1-75 | Codex: Billing webhook in-flight claim-lock hardening + contract test | DONE | Codex | Hardened idempotent webhook claim paths in both `POST /api/revenuecat/webhook` and `POST /api/stripe/webhook` by honoring active `processing` locks and using optimistic status-guarded claim updates to reduce concurrent double-processing. Added shared helper `src/lib/billing/webhook-processing-lock.ts` and contract harness `scripts/test-billing-webhook-processing-lock.mjs` (`npm run billing:webhook:processing-lock:test`). |
| P1-76 | Codex: Build-gate regression patch + cross-agent coordination escalation | DONE | Codex | Fixed failing build caused by non-existent UI import path in `src/components/games/number-crunch.tsx` and `src/components/games/shape-safari.tsx` by routing both to shared `@/components/experience/PhysicalButton`. Added cross-agent coordination notice in `../V1-LAUNCH-COORDINATION.md` requesting owners of recent game/UI edits to confirm whether they introduced the invalid alias. |
| P1-77 | Codex: Parent language-report access hardening (consent scope + API abuse guard) | DONE | Codex | Hardened `GET /api/parent/reports/language` to use shared verified parent-consent guard (`resolveVerifiedParentAccess` purpose `parent_language_reports`) and scope student-profile access strictly to consent-linked child accounts. Added explicit 403 for out-of-scope `studentProfileId` requests, added route-level rate limiting (`api:parent:reports:language:get`), and extended `scripts/check-api-rate-limit-coverage.mjs` to enforce this guard contract. |
| P1-78 | Codex: Teacher class-scope guard extraction + consent-gated placement history access | DONE | Codex | Added shared teacher compliance guard `src/lib/compliance/teacher-access.ts` and wired `GET /api/ai/placement-diagnostic/history` teacher scope to it. Guard now enforces teacher classroom ownership, learner enrollment, and `parent_consent` before allowing teacher access to learner placement history; returns clear `403`/`503` outcomes for unauthorized or unmigrated classroom tables. |
| P1-79 | Codex: Teacher class endpoint hardening (shared auth guard + abuse controls) | DONE | Codex | Replaced duplicated teacher ownership checks in `GET /api/testing/classes/[classId]/analytics`, `GET/POST /api/testing/classes/[classId]/enrollments`, and `GET/POST /api/testing/classes/[classId]/assignments` with shared `resolveVerifiedTeacherClassAccess` purpose-scoped enforcement. Added route-level rate limits for all five teacher class endpoints and expanded `scripts/check-api-rate-limit-coverage.mjs` guard contract checks to include them. |
| P1-80 | Codex: Testing content licensing fail-closed guardrails (legal hardening) | DONE | Codex | Hardened `POST /api/testing/exams/[examId]/start` and `POST /api/testing/attempts/[attemptId]/submit` to enforce governed question-bank serving (`review_status=approved` + `commercial_use_allowed=true`) and fail closed in production when governance columns are missing. Added controlled dev override via `LEGAL_ALLOW_LEGACY_TESTING_QUESTION_BANK=1`; submit path now blocks attempts that reference restricted/unapproved question content in governed mode. Added guard coverage script `scripts/check-testing-content-legal-guard-coverage.mjs` (`npm run security:testing-content-legal-guard:check`). |
| P1-81 | Codex: Teacher access contract-test harness | DONE | Codex | Added `scripts/test-teacher-access-contract.mjs` with mocked Supabase query chains to validate `resolveVerifiedTeacherClassAccess` behavior across invalid purpose, missing table, class ownership, enrollment, and parent-consent gating scenarios. Added npm script `teacher:access:contract:test` to keep teacher authorization policy changes regression-safe. |
| P1-82 | Codex: Billing webhook auth/replay hardening + guard-contract automation | DONE | Codex | Hardened `POST /api/stripe/webhook` with explicit signature tolerance (`STRIPE_WEBHOOK_SIGNATURE_TOLERANCE_SECONDS`), empty-payload rejection, and production test-mode (`livemode=false`) event blocking. Hardened `POST /api/revenuecat/webhook` with non-mutating alias-event handling (`SUBSCRIBER_ALIAS` no-op), strict purchase-event `product_id` requirements, app/product identifier length checks, and timestamp-range validation before subscription upsert. Extended release gates with new marker checks (`scripts/check-billing-webhook-hardening-coverage.mjs`, `npm run security:billing-webhook-hardening:check`), preflight integration, and added billing webhook routes to API rate-limit guard coverage (`Checked: 39`). |
| P1-83 | Codex: Billing checkout/portal/status abuse-guard contract expansion | DONE | Codex | Added route-level rate limiting to `GET /api/subscription/status` (`api:subscription:status:get`) and expanded `scripts/check-api-rate-limit-coverage.mjs` to enforce abuse-guard markers across billing checkout surfaces: `POST /api/stripe/checkout`, `POST /api/stripe/checkout/gift`, `POST /api/stripe/checkout/organization`, `POST /api/stripe/portal`, plus subscription-status reads. Guard coverage check now validates 44 protected high-cost/sensitive routes. |
| P1-84 | Codex: Teacher class index/create role hardening + route guard contract | DONE | Codex | Hardened `GET/POST /api/testing/classes` with explicit teacher-role verification via shared `resolveVerifiedTeacherRole` (`src/lib/compliance/teacher-access.ts`) and route-level IP throttling (`api:testing:classes:get`, `api:testing:classes:post`). Expanded teacher compliance contract test coverage (`scripts/test-teacher-access-contract.mjs`) for role-purpose validation + non-teacher rejection paths, and extended API abuse coverage checks to include class index/create route markers (`Checked: 45`). |
| P1-85 | Codex: Billing webhook event retention/cleanup strategy (safe-bounds tooling) | DONE | Codex | Added operational cleanup utility `scripts/cleanup-billing-webhook-events.mjs` with default dry-run mode, bounded age/deletion windows, per-table summaries, and optional failed-event inclusion. Script targets both `stripe_webhook_events` and `revenuecat_webhook_events` with safe defaults (`--max-age-days 120`, `--max-delete-per-table 1000`) and graceful missing-table handling. Added npm command `billing:webhook:events:cleanup` for scheduled/ops execution. |

## Tranche 3: Audiobook & Voice Infrastructure

| ID | Workstream | Status | Owner | Notes / Deliverables |
|---|---|---|---|---|
| T3-01 | Hybrid TTS system (OpenAI → ElevenLabs → browser) | DONE | Opus 4.6 | `src/lib/media/tts-service.ts` — 6 OpenAI voices (alloy/echo/fable/onyx/nova/shimmer), ElevenLabs fallback, browser SpeechSynthesis last resort. Supabase Storage caching in `tts-audio` bucket. Cache key: `{voice}/{sha256_16}.mp3`. |
| T3-02 | Voice preference system | DONE | Opus 4.6 | `VoicePreferenceProvider` context, voice picker UI, localStorage persistence (`koydo.explore.voice_preference`). |
| T3-03 | Audiobook type system | DONE | Opus 4.6 | `src/lib/audiobooks/types.ts` — `AudiobookEntry`, `ChapterText`, `AudiobookTTSRequest/Result`, cache key helpers. 9 launch languages (en/es/zh/ja/ko/pt/fr/de/pl). Illustrated book types: `IllustratedAudiobookEntry`, `IllustrationPage`, `IllustrationManifest`. |
| T3-04 | Audiobook TTS service | DONE | Opus 4.6 | `src/lib/audiobooks/audiobook-tts-service.ts` — chapter-level TTS with Supabase caching, smart text splitting (4096-char segments at paragraph/sentence boundaries), MP3 concatenation. |
| T3-05 | Audiobook API route | DONE | Opus 4.6 | `POST /api/audiobooks/tts` — Zod-validated, rate-limited (10/min), returns audio URL + metadata. |
| T3-06 | Audiobook reader UI | DONE | Opus 4.6 | `audiobook-player.tsx`, `book-card.tsx`, `audiobook-library.tsx`, `audiobook-reader.tsx` — full reading/listening experience with chapter navigation. |
| T3-07 | Initial 50-book curated catalog | DONE | Opus 4.6 | `src/lib/audiobooks/top-50-catalog.ts` — 25 children + 25 teen/adult with Gutenberg IDs. SSG via `generateStaticParams`. |
| T3-08 | Chapter 1 seed script | DONE | Opus 4.6 | `scripts/seed-audiobook-chapter1.ts` — batch pre-generates Ch.1 for top 50 books. |
| T3-09 | Catalog expansion to 1,509 books | DONE | Opus 4.6 | `children-catalog.json` (1,007 entries), `adult-catalog.json` (502 entries), `illustrated-catalog.json` (20 entries). All public domain Project Gutenberg works. Genres: fairy tales, adventure, nature, mythology, science, biography, folk tales from 30+ cultures, classic fiction, poetry, drama, philosophy. |
| T3-10 | Voice matching research (Kokoro-82M) | DONE | Opus 4.6 | **Key finding**: Kokoro-82M has voices literally named after 5/6 OpenAI voices (af_alloy, af_nova, am_echo, am_onyx, bm_fable). Trained on synthetic data from "large providers". Apache 2.0 license, 82M params, runs locally for free. Supports 9 languages (en/es/fr/pt/ja/zh/hi/it + British English). |
| T3-11 | Voice mapping configuration | DONE | Opus 4.6 | `src/lib/audiobooks/voice-mapping.ts` — Maps all 6 OpenAI voices to Kokoro equivalents (shimmer→af_heart). XTTS v2 fallback for German/Korean/Polish. Pre-generation priority order, cost estimates (Phase 1: ~3GB, ~375 hrs local compute, $0 API cost). Full Kokoro voice inventory (15 voices). |
| T3-12 | Illustrated books strategy | DONE | Opus 4.6 | 20 illustrated picture books (Beatrix Potter, Alice, Oz, Pinocchio, Aesop, etc.) with `readingLevel` (pre-reader/early-reader/independent). Serving strategy: scrape Gutenberg HTML → extract illustration manifest → proxy images → render page-by-page with synced audio. Three UI modes by reading level. |

### T3 Remaining Work

| ID | Workstream | Status | Priority | Notes |
|---|---|---|---|---|
| T3-13 | Local TTS pipeline (Kokoro integration) | PENDING | HIGH | Python script to batch pre-generate audio with Kokoro-82M. Estimated ~375 hrs of local compute for Phase 1 (English, 3 voices, Ch.1 per 1,509 books). |
| T3-14 | XTTS v2 integration (de/ko/pl) | PENDING | MEDIUM | Voice cloning from OpenAI reference clips for the 3 languages Kokoro doesn't support. Requires 3-sec reference audio per voice. |
| T3-15 | Gutenberg illustration scraper | PENDING | MEDIUM | Script to extract illustration URLs, captions, and page positions from Gutenberg HTML. Output: `IllustrationManifest` JSON per book. |
| T3-16 | Gutenberg image proxy API | PENDING | MEDIUM | `/api/media/gutenberg-image` route to proxy images with CDN caching headers, AVIF/WebP conversion. |
| T3-17 | Illustrated reader component | PENDING | MEDIUM | Page-by-page reader with full-bleed illustrations, text overlay/adjacent panel, audio sync. Three modes: auto-advance (pre-reader), tap-to-read (early-reader), standard + inline illustrations (independent). |
| T3-18 | Gutenberg text ingestion pipeline | IN_PROGRESS | HIGH | Added server path `GET /api/audiobooks/chapter-text` with cache-backed ingestion (`src/lib/audiobooks/chapter-text-service.ts`) writing to `audiobooks-text/{slug}/{lang}/ch{NNN}.json` in Storage. Bulk/offline scripts now support resume offsets, bounded retries, and JSON run reports. Remaining: execute full seeding runs + monitor throughput/errors in staging/prod. |
| T3-19 | Local translation pipeline (OPUS models) | PENDING | LOW | Helsinki-NLP OPUS models for EN→ES/FR/DE/PT translation. $0 compute cost. Batch translate chapter text for audiobook catalog. |
| T3-20 | Catalog loader refactor | DONE | MEDIUM | Added unified loader (`src/lib/audiobooks/catalog-loader.ts`) for children/adult/illustrated JSON catalogs with filtering by age group, genre, language, and search. `/explore/audiobooks` + `[slug]` now read from the merged loader instead of static top-50 data; server API pagination now exposed at `GET /api/audiobooks/catalog`. |

## Active Execution Plan (Current — Post-Review Sprint)

### Web Launch Gate: GREEN

- `next build`: 0 errors, 0 type warnings
- `npm run smoke-test`: 18/18 routes pass, health endpoint OK
- Brand rename: complete (0 stale references)
- i18n: 400+ EN/ES keys, all 19 pages wired
- Security: CSRF, rate limiting, RLS on 44 tables, admin policies
- Critical bugs fixed: Zod activities field, env validation, lazy clients
- SEO + PWA: metadata, manifest, icons all configured

### Remaining Critical Work

1. **Codex (Track B)**: Backend + developer portal (active)
2. **Opus (Track A)**: Template module upgrades (10 priority modules), visual QA
3. **Grok (Track E)**: Content research for module upgrades, exam prep questions

### Security Hardening — COMPLETE

All 4 previously-open security issues (C-2, H-1, H-2, H-3) are now RESOLVED:
- C-2: Redis-backed rate limiting (Upstash) replaces in-memory Map
- H-1: All API routes now rate-limited (AI tutor: 10/min, health: 60/min, etc.)
- H-2: All routes use validated `serverEnv` — zero `process.env!` bypasses
- H-3: Nonce-based CSP in production — no `unsafe-eval`, no `unsafe-inline` for scripts

### Completed (can be removed from active tracking)

- ~~Queue drain~~ — media regen complete
- ~~Admin media catalog UI~~ — live
- ~~Tranche-2 language/gamification surfaces~~ — wired into dashboards
- ~~i18n extraction + wiring~~ — all launch pages covered
- ~~Security hardening~~ — CSRF, rate limits, RLS, admin policies all done
- ~~Codebase review~~ — complete, report filed, critical fixes applied
- ~~7 module content rewrites~~ — all v2.0.0+, build GREEN

## Phase 2 Feature Proposals (Post-Launch)

> Features proposed based on codebase review findings and product maturity assessment.
> Prioritized by user impact and technical complexity.

### P2-01: Adaptive Learning Engine
**Priority**: HIGH | **Effort**: 2-3 weeks
- Track per-question accuracy to identify weak topics
- Generate personalized review sessions from missed questions
- Spaced repetition for flashcard scheduling (SM-2 algorithm)
- Pre-requisite chaining: if student fails Algebra Quiz, suggest "Fractions Review" module

### P2-02: Real-Time Multiplayer Quiz Battles
**Priority**: HIGH | **Effort**: 2-3 weeks
- WebSocket-based real-time quiz competitions (2-4 players)
- Matchmaking by age group + difficulty level
- Points awarded for speed + accuracy
- Weekly leaderboards per education stage
- Requires: Supabase Realtime or dedicated WebSocket server

### P2-03: AI Tutor v2 — Contextual Help
**Priority**: HIGH | **Effort**: 1-2 weeks
- "Ask AI" button on every lesson chunk and quiz question
- Provides hints without giving answers
- Explains wrong answers with step-by-step breakdown
- Budget-capped per learner (existing policy: ≤$0.05/month per active learner)
- Integrate with lesson content for context-aware responses

### P2-04: Parent Analytics Dashboard v2
**Priority**: MEDIUM | **Effort**: 1-2 weeks
- Weekly progress email digest (via Resend API — already configured)
- Per-subject strength/weakness radar chart
- Time-spent-learning trends (daily/weekly/monthly)
- Comparison view across siblings (multi-profile)
- Exportable progress report (PDF)

### P2-05: Content Creation Studio (Admin)
**Priority**: MEDIUM | **Effort**: 3-4 weeks
- Visual module builder (drag-and-drop lessons, quizzes, activities)
- AI-assisted content generation from topic prompts
- Preview mode matching student experience exactly
- Version control for modules (diff viewer)
- Bulk import from JSON/CSV
- Eliminates need for TypeScript knowledge to author content

### P2-06: Offline Mode (Full PWA)
**Priority**: MEDIUM | **Effort**: 2-3 weeks
- Service worker caching for lesson content (already have `OfflineBanner`)
- Download modules for offline use (IndexedDB storage)
- Sync progress when back online
- Configurable: "Download over Wi-Fi only" setting
- Storage management UI showing cached module sizes

### P2-07: Achievement & Social Features
**Priority**: LOW | **Effort**: 2-3 weeks
- Shareable achievement cards (image generation for social media)
- Class/group feature: teacher creates a group, students join via code
- Group leaderboards and collaborative challenges
- "Study Buddy" matching within same education stage
- Certificate generation for module completion (printable PDF)

### P2-08: Additional Language Support (Phase 2 i18n)
**Priority**: HIGH (upgraded) | **Effort**: 1-2 weeks per language
- 9 launch languages now defined: EN, ES, zh-CN, ja, ko, pt, fr, de, pl
- EN + ES: fully wired with 400+ keys. Remaining 7 need UI translation.
- Audiobook TTS: Kokoro covers 6/9 (en/es/fr/pt/ja/zh), XTTS v2 covers de/ko/pl.
- Translation scope: UI strings first, module content second, audiobook text third.
- Geofence-based default language selection + user override in settings.
- Marketing pages: "More languages coming soon" messaging for non-EN/ES.
- Arabic (RTL support): explicitly deferred to Phase 3.

## Overnight GPU Runner Runbook

### Standard start (new/first run)

```bash
# Step 1: Regenerate prompt pack + approve all generated prompts
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/generate-lesson-media-prompts.mjs"
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/approve-prompts.mjs"

# Step 2: Queue all remaining unqueued lessons
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/queue-immersive-media.mjs --reviewed-only --limit 0"

# Step 3: Launch runner detached (survives VS Code close)
python3 /mnt/d/PythonProjects/Koydo/launch_overnight.py

# Step 4: Monitor
wsl bash -c "tail -f /tmp/overnight.log"

# Step 5: Check stats
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/_stats.mjs"
```

### Regenerate previously completed media with enriched prompts

```bash
# Step 1: Regen + approve prompts (if not already done)
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && npm run prompts:regen-and-approve"

# Step 2: Reset completed jobs to queued (archives old output_url in metadata)
# Dry-run first:
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/regen-media.mjs"
# Apply:
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/regen-media.mjs --apply"

# Step 3: (optional) Reset stuck jobs from any previous run
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/reset-stuck-jobs.mjs"

# Step 4: Launch runner (or restart if already running)
python3 /mnt/d/PythonProjects/Koydo/launch_overnight.py
```

### Restart after VS Code / WSL session close

```bash
# 1. Reset any stuck jobs
wsl bash -c "cd /mnt/d/PythonProjects/Koydo/eduforge-web && node scripts/reset-stuck-jobs.mjs"

# 2. Re-launch detached runner
python3 /mnt/d/PythonProjects/Koydo/launch_overnight.py
```

### Prompt enrichment workflow (for future re-runs)

When module catalog `.ts` files are updated with new lessons or improved content:
```bash
npm run prompts:regen-and-approve   # regenerate pack + bulk-approve generated prompts
npm run media:regen:apply           # archive old media + reset to queued for fresh generation
python3 /mnt/d/PythonProjects/Koydo/launch_overnight.py  # start runner
```

## Controlled Queue Draining Runbook

Use these commands in `PowerShell` from `d:\PythonProjects\Koydo\eduforge-web` (legacy repo folder name):

```powershell
# 1) Inspect existing candidate pressure without inserting new jobs
npm run media:queue:immersive:test:dry

# 2) Drain queued video jobs in a controlled batch
node scripts/process-media-jobs.mjs --mode video --strict-provider --limit 25

# 3) Retry failed video jobs in bounded batches when needed
node scripts/retry-media-jobs.mjs --status failed --asset video --limit 25 --apply

# 4) Requeue stale running video jobs when needed
node scripts/requeue-stale-media-jobs.mjs --asset video --max-age-minutes 90 --limit 25 --apply

# 5) If a processing run is interrupted, reclaim stranded running jobs quickly
node scripts/requeue-stale-media-jobs.mjs --asset video --max-age-minutes 10 --limit 25 --apply
```

## Decisions Locked

1. Phase 1 focus is launch-critical content and media stability, not broad language-feature buildout.
2. Pronunciation scoring strategy is hybrid by design:
  - licensed assessment provider for high-confidence production grading
  - AI/rule-based fallback through pluggable provider layer.
3. Provider interface scaffolding expansion remains deferred to the post-launch phase.
4. Locked defaults for language-learning tranche-2 foundation:
  - Pronunciation rubric target weights: `accuracy 45% / fluency 35% / prosody 20%`
  - Confidence gate: `asrConfidence < 0.70` => `practice_only`
  - Gamification limits: `3 badges/module`, `20 levels`, `2 daily + 1 weekly quests`
  - AI budget caps: `<= $0.05` total AI per active learner/month, `<= $0.008` LLM per active learner/month

## Tranche 2 Kickoff (Language + Gamification Foundation)

| ID | Workstream | Status | Owner | Notes / Deliverables |
|---|---|---|---|---|
| T2-01 | Lock policy defaults in code | DONE | Codex | `src/lib/language-learning/policy.ts` created and exported through language-learning index. |
| T2-02 | Confidence-based grading safety mode | DONE | Codex | `POST /api/language/pronunciation/grade` returns `gradingMode` and `gradeRecorded` for downstream persistence logic. |
| T2-03 | Persistence schema foundation | DONE | Codex | Supabase migration added for `pronunciation_attempts`, `gamification_states`, `gamification_events` + RLS policies + indexes. |
| T2-04 | Attempt persistence wiring from API route | DONE | Codex | `POST /api/language/pronunciation/grade` now writes to `pronunciation_attempts` with policy metadata + graceful fallback when table is not yet migrated. |
| T2-05 | Gamification state service actions | DONE | Codex | `GET/POST /api/language/gamification/state` live with policy limits; dashboard consumers now wired. |
| T2-06 | Parent + learner progress surfaces | DONE | Codex | Added language progress panels to learner dashboard and parent dashboard with missing-table safe fallback messaging. |
| T2-07 | AI-heavy language pricing and packaging strategy | DONE | Codex/Grok | Added conservative/growth plan matrix, usage entitlement service, `GET /api/language/usage`, migration `202602280005_language_usage_tracking.sql`, pronunciation usage-gate enforcement, plan-aware Stripe checkout scaffolding (`languagePlanId` + `stripe_language_price_ids`), admin API for price-map config (`GET/POST /api/admin/billing/language-prices`), and paywall wiring (`/billing/language`, plan selector in checkout, learner/parent upgrade CTAs). |
| T2-08 | Desktop operating systems module pack (Windows/macOS/Linux) | DONE | Codex | Added `windows-101`, `macos-101`, `linux-101` catalog modules and synced generated registry. |
| T2-09 | Language pricing telemetry + analytics reporting | DONE | Codex | Added billing telemetry instrumentation (`lesson_viewed` + `activity_interacted`) for language pricing/checkout/success flows, admin funnel report endpoint `GET /api/admin/reports/language-pricing`, and inline pricing analytics snapshot in Owner Operations Console. |
| T2-10 | Speaking Lab UX + wiring to language APIs | DONE | Codex | Added `/language/speaking-lab` client flow with learner context, entitlement refresh (`/api/language/usage`), translation calls (`/api/language/translate`), pronunciation grading (`/api/language/pronunciation/grade`), browser recording metadata capture, and dashboard/nav entry points. |

## Next Review Gate

Before declaring web launch-ready:

- [ ] Production deployment live with SSL on custom domain (`koydo.app`)
- [ ] Environment variables audited for production (Stripe keys, Supabase prod, RevenueCat)
- [ ] Happy path tested end-to-end: sign-up → onboarding → explore → lesson → complete
- [ ] All 6 education stage routes verified with correct free/premium module counts
- [ ] No placeholder or TODO text visible to end users
- [ ] Screenshots captured for store listings (per `SCREENSHOT-SPEC.md`)

Before store submission:

- [ ] App ID aligned across `capacitor.config.ts`, native JSON configs, AndroidManifest, and `assetlinks.json`
- [ ] Native builds verified post-rename (Android AAB + iOS archive)
- [ ] IAP products configured in RevenueCat + store consoles
- [ ] Privacy policy URL + support URL set in store listings
- [ ] Billing test plan executed (12 test cases in `BILLING-TEST-PLAN.md`)

## Agent Ownership Update (2026-03-02)
- Owner: Codex agent (this thread)
- Scope claimed:
  - Full 100-400 completion ownership for established and expansion tracks, including all delivered wave closures.
  - Post-401 specialization ownership (501/601 delivered across baseline and newly added track families).
  - Full interdisciplinary capstone ownership (all proposed capstone families delivered).
  - Ongoing ownership of module-flow hardening, quiz depth, and capstone defense alignment across these tracks.
- Primary files in active scope (latest specialization tranche):
  - `eduforge-web/src/lib/modules/catalog/*-501.ts` and `eduforge-web/src/lib/modules/catalog/*-601.ts` (catalog-wide specialization closure across all tracks).
  - `eduforge-web/src/lib/modules/catalog/capstone-*-501.ts` and `eduforge-web/src/lib/modules/catalog/capstone-*-601.ts`.
  - `eduforge-web/CURRICULUM-EXPANSION-PROPOSALS-2026.md`
  - `eduforge-web/PRODUCT-BACKLOG-EPICS.md`
- Current status:
  - Curriculum sync and validation are green after catalog-wide specialization closure: `npm run modules:sync` -> 715 modules; `npm run curriculum:validate` -> 585 modules, 0 errors, 0 warnings.
  - Module-level 101-401 coverage remains fully closed and expanded: 88/88 tracks complete.
  - Post-401 specialization closure is now complete: 88/88 tracks include both 501 and 601 modules.
  - Advanced assessment-depth hardening is complete: every 501/601 checkpoint quiz now contains 8 questions (2,944 total advanced checkpoint questions across 368 quizzes).
  - Automated depth-regression guard is in place: `npm run curriculum:advanced-quiz-depth:check` validates minimum 8-question coverage for all 501/601 quizzes.
  - Curriculum quality report remains strong (average score 100, 0 medium-priority modules, 0 no-interactive flags).
- Coordination request to other agents:
  - Do not modify files listed in this ownership scope without explicit coordination in handoff docs.
  - Route overlap proposals through this handoff update section first.
- Ownership window: active until explicitly released in a follow-up handoff update.
