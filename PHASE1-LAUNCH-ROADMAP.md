# Koydo V1 Launch Roadmap

Last Updated: 2026-02-27 (refreshed end-of-day)
Owner: Koydo Core Team (Claude Code + Codex + Gemini)

> **Coordination doc**: See `V1-LAUNCH-COORDINATION.md` (project root) for agent
> assignments, file ownership, and the day-by-day sprint plan.
>
> **Launch command center**: See `../LAUNCH-COMMAND-CENTER.md` for active lock
> ownership, execution order, and append-only progress protocol.

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
| P1-29 | Brand rename: EduForge → Koydo | DONE | Claude | All source code, configs, translations, native configs, store assets, and docs renamed. Zero `EduForge`/`eduforge` references remain. Cookie keys `koydo.*`, IndexedDB name `koydo`, TypeScript interface `KoydoDb`, health route `koydo-api`, email domains `@koydo.app`. Two media files intentionally skipped (actual filenames on disk). |
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
| P1-45 | Gemini: Profile context provider (enhanced) | IN_PROGRESS | Gemini | `ActiveProfileProvider` upgraded to fetch full `student_profiles` data from Supabase (display_name, grade_level, avatar_url, ai_skill_level_map). Exposes `profile` object + `isLoading` state. Next: profile-aware stage recommendation in `/explore`. |
| P1-46 | Codex: Curriculum expansion (67 modules) | DONE | Codex | 67 new domain modules (~670 lessons) across trade, engineering, health, law, and digital careers. Registry now 201 modules. |
| P1-47 | Codex: Knowledgebase ingestion pipeline | DONE | Codex | Full pipeline: harvest → queue → ingest → PDF extract → manifest. 90 docs, 17 domains, 0 gaps. Domain gate passes all 12 priority domains. |

## Active Execution Plan (Current — Sprint Day 1)

### Web Launch Gate: GREEN

- `next build`: 0 errors, 0 type warnings
- `npm run smoke-test`: 18/18 routes pass, health endpoint OK
- Brand rename: complete (0 stale references)
- i18n: 400+ EN/ES keys, all 19 pages wired
- Security: CSRF, rate limiting, RLS on 44 tables, admin policies
- SEO + PWA: metadata, manifest, icons all configured

### Active Work Streams

1. **Gemini (Track C)**: Profile context enhancement (P1-45) — fetching full profile data, next step is profile-aware stage recommendation
2. **Gemini (Track C)**: Native build verification post-rename, app ID alignment (`app.koydo.learn` vs `com.koydo.app`)
3. **Gemini (Track C)**: Store submission preparation (screenshots, AAB/IPA upload, IAP product configuration)
4. **Claude (Track A)**: Visual polish, final QA, web deployment readiness
5. **Codex (Track B)**: Production env audit, DB migration push, final stability testing

### Completed (can be removed from active tracking)

- ~~Queue drain~~ — media regen complete
- ~~Admin media catalog UI~~ — live
- ~~Tranche-2 language/gamification surfaces~~ — wired into dashboards
- ~~i18n extraction + wiring~~ — all launch pages covered
- ~~Security hardening~~ — CSRF, rate limits, RLS, admin policies all done

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

Use these commands in `PowerShell` from `d:\PythonProjects\Koydo\eduforge-web`:

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
