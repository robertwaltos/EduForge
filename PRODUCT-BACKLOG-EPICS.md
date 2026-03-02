# Koydo Product Backlog (Epics + Acceptance Criteria)

Last Updated: 2026-03-02

## Priority Bands

- `P0`: active 12-week plan
- `P1`: next-wave after P0
- `P2`: long-term platform initiatives

## Epic Backlog

### E-01 (`P0`) Mastery Graph + Adaptive Pathing

- Scope: skill graph, prerequisites, dynamic next-step recommendations.
- Acceptance criteria:
  - Skill graph exists for >= 90% of active modules.
  - Every lesson maps to at least one skill node.
  - Learner home shows personalized next-3 recommendations.

### E-02 (`P0`) Placement Diagnostic

- Scope: onboarding diagnostic, confidence-aware placement.
- Status update (2026-03-01): `IN_PROGRESS` — backend placement API added at
  `GET/POST /api/ai/placement-diagnostic` with stage-scoped question generation,
  scored submissions, confidence calculation, mastery writes to `user_skill_mastery`,
  profile persistence (`initial_assessment_data`, `ai_skill_level_map`), and manual stage override mode.
- Status update (2026-03-01): placement summary surface and scoring contract hardening added via
  `GET /api/ai/placement-diagnostic/summary`, shared scoring helpers in
  `src/lib/ai/placement-diagnostic-scoring.ts`, and `scripts/test-placement-diagnostic-scoring.mjs`.
- Status update (2026-03-01): placement audit history backend added with
  `GET /api/ai/placement-diagnostic/history` and persistent event logging
  (`diagnostic_submitted`, `manual_override`) through migration
  `202603010003_placement_diagnostic_events.sql`.
- Status update (2026-03-02): onboarding submission flow now routes through
  `POST /api/ai/placement-diagnostic` (with stage-scoped question generation via
  `GET /api/ai/placement-diagnostic`), removing direct profile writes from
  `student/onboarding`. Placement summary now reflects manual overrides first,
  history API now supports strict role-scoped access (`self`, `parent`, `teacher`),
  and placement integration contract coverage + retention tooling were added via
  `scripts/test-placement-diagnostic-flow-contract.mjs` and
  `scripts/cleanup-placement-diagnostic-events.mjs`.
- Acceptance criteria:
  - New learner receives recommended path within 12 minutes.
  - Placement confidence is stored and displayed.
  - Manual override is available for parent/teacher.

### E-03 (`P0`) Spaced Repetition + Interleaving

- Scope: forgetting model, daily queue, mixed-domain review.
- Status update (2026-03-01): `IN_PROGRESS` — backend foundation added with
  `GET /api/ai/review-queue` and prerequisite-aware decay scoring in
  `src/lib/mastery/review-queue.ts`.
- Acceptance criteria:
  - Daily review queue generated per learner.
  - Queue respects prerequisite order.
  - Missed reviews re-enter queue with decayed confidence score.

### E-04 (`P0`) Error Log -> Auto Remediation

- Scope: transform wrong answers into targeted practice loops.
- Status update (2026-03-01): `IN_PROGRESS` — backend tasking layer added with
  `GET/POST /api/exam/remediation-tasks` plus `src/lib/exam/remediation-tasking.ts`,
  including source lesson/question/chunk references and mastery-credit updates when tasks are completed.
- Acceptance criteria:
  - Wrong answer events create remediation tasks automatically.
  - Remediation tasks link to source lesson/chunk.
  - Completion of remediation updates mastery score.

### E-05 (`P0`) Grounded AI Tutor

- Scope: citations, "show me why", confidence-aware non-bluff behavior.
- Acceptance criteria:
  - Tutor responses include source citation/snippet or explicit uncertainty.
  - Low-confidence responses ask clarifying questions.
  - Contradiction checker blocks conflicts with curriculum source.

### E-06 (`P0`) Audiobook Learning Workflow

- Scope: chapter playback, checkpoints, comprehension quizzes.
- Status update (2026-03-02): `IN_PROGRESS` — audiobook ingestion/translation seeding
  operational hardening added. `scripts/seed-audiobook-texts.ts` now supports
  resume offset (`SEED_OFFSET`), bounded Gutenberg retries (`SEED_FETCH_RETRIES`),
  and JSON run reports; `scripts/seed-audiobook-translations.ts` now supports
  per-chapter retry controls (`SEED_CHAPTER_RETRIES`, `SEED_CHAPTER_RETRY_DELAY_MS`),
  offset resumes, and JSON run reports. `src/lib/audiobooks/audiobook-translation-service.ts`
  now performs retry-aware chapter translation with attempt-count error metadata.
- Acceptance criteria:
  - Chapter progress saved and resumable.
  - Checkpoint quiz appears at configured intervals.
  - Quiz results feed mastery/remediation pipelines.

### E-07 (`P0`) Parent/Teacher Dashboards

- Scope: mastery heatmaps, risk alerts, intervention suggestions.
- Status update (2026-03-02): `IN_PROGRESS` — backend ownership assigned to Codex
  for parent/teacher portal APIs and role-scoped learner access enforcement.
  Placement history now enforces strict `self|parent|teacher` scope checks with
  child/class authorization constraints in `GET /api/ai/placement-diagnostic/history`.
- Status update (2026-03-02): parent child-data access hardening consolidated via
  `src/lib/compliance/parent-access.ts` (explicit purpose + parent role + verified consent checks),
  now applied to `POST /api/parent/digest`, `GET /api/parent/reports`,
  `GET /api/parent/ai-interventions`, and parent-scoped placement history.
- Status update (2026-03-02): release-gate stabilization patch landed after detecting a
  cross-agent UI import regression (`@/app/components/ui/physical-button` not found).
  Updated `src/components/games/number-crunch.tsx` and `src/components/games/shape-safari.tsx`
  to use shared `@/components/experience/PhysicalButton`, and posted a coordination
  confirmation request in `../V1-LAUNCH-COORDINATION.md` for recent game/UI owners.
- Status update (2026-03-02): parent language reports API hardening completed at
  `GET /api/parent/reports/language` by replacing direct parent-owned profile assumptions
  with verified consent-scoped child authorization (`parent_language_reports`) and adding
  explicit route rate limiting plus coverage enforcement in
  `scripts/check-api-rate-limit-coverage.mjs`.
- Status update (2026-03-02): teacher placement-history authorization hardened with shared
  compliance guard `src/lib/compliance/teacher-access.ts`, now enforcing class ownership,
  learner enrollment, and `parent_consent` before serving teacher-scoped
  `GET /api/ai/placement-diagnostic/history` access.
- Status update (2026-03-02): teacher classroom API hardening completed by unifying
  class ownership checks behind `resolveVerifiedTeacherClassAccess` across
  `GET /api/testing/classes/[classId]/analytics`,
  `GET/POST /api/testing/classes/[classId]/enrollments`, and
  `GET/POST /api/testing/classes/[classId]/assignments`, with route-level
  rate limiting and coverage enforcement in `scripts/check-api-rate-limit-coverage.mjs`.
- Status update (2026-03-02): teacher authorization contract harness added via
  `npm run teacher:access:contract:test` (`scripts/test-teacher-access-contract.mjs`)
  to lock class ownership + enrollment + parent-consent enforcement behavior.
- Acceptance criteria:
  - Dashboard shows per-skill mastery and trend.
  - Alerting identifies at-risk learners.
  - Teacher/parent can drill down to recommended interventions.

### E-08 (`P0`) Assignment Builder

- Scope: create assignments from graph skills and weak domains.
- Acceptance criteria:
  - Teacher can generate assignments by skill/domain/date.
  - Assignment preview includes estimated completion time.
  - Submission data flows to dashboard analytics.

### E-09 (`P1`) Offline Packs + Sync

- Scope: download bundles, offline progress, merge strategy.
- Acceptance criteria:
  - Lessons and quizzes run offline.
  - Sync conflicts are resolved deterministically.
  - Data-loss rate for offline sessions is effectively zero.

### E-10 (`P1`) Social Cohorts + Challenges

- Scope: study circles, leagues, accountability nudges.
- Acceptance criteria:
  - Cohort challenge lifecycle works end-to-end.
  - Leaderboards update from validated events only.
  - Safety/moderation controls are in place.

### E-11 (`P1`) Creator Pipeline

- Scope: creator submissions, rubric review, publish controls.
- Acceptance criteria:
  - Draft -> review -> publish workflow available.
  - Quality rubric score required to publish.
  - Provenance and rights metadata captured per submission.

### E-12 (`P1`) Content Rights + Compliance Pipeline

- Scope: rights evidence tracking, provenance states, audit trail.
- Status update (2026-03-02): `IN_PROGRESS` — legal hardening track formalized with
  executive lawsuit-risk summary, contract control requirements, and reusable app/code
  audit prompt in `EDTECH-LITIGATION-CONTRACT-HARDENING.md`. Next tranche will wire
  backend guard checks for consent, retention, and licensing evidence gates.
- Status update (2026-03-02): consent hardening implementation started with shared
  backend parent-access guard enforcing purpose-of-use + verified consent relationships
  before serving child learning data from parent surfaces.
- Status update (2026-03-02): testing content legal guardrails hardened in
  `POST /api/testing/exams/[examId]/start` and
  `POST /api/testing/attempts/[attemptId]/submit` to fail closed in production
  when governance columns are missing and to enforce approved/commercially-allowed
  question scope during governed-mode attempt submission. Added automated marker
  coverage check via `npm run security:testing-content-legal-guard:check`.
- Acceptance criteria:
  - Every ingest entry has provenance status.
  - Pending rights content is excluded from production serving.
  - Audit report export available for legal/compliance review.

### E-13 (`P1`) Knowledge Graph Search

- Scope: cross-subject graph retrieval over lessons/books/questions.
- Acceptance criteria:
  - Search supports concept-level and prerequisite-level lookup.
  - Result ranking favors mastery relevance and recency.
  - Graph search APIs documented and monitored.

### E-14 (`P2`) RevenueCat-compatible Billing Platform (`Project Atlas Billing`)

- Scope: in-house subscription platform, initially embedded, later standalone-ready.
- Status update (2026-03-02): `IN_PROGRESS` — Codex ownership assigned for difficult
  billing backend lane: RevenueCat completion hardening, webhook idempotency/contract tests,
  and parent/teacher/developer billing portal backend surfaces.
- Status update (2026-03-02): webhook claim locking hardened for both Stripe and RevenueCat
  (`POST /api/stripe/webhook`, `POST /api/revenuecat/webhook`) to reduce concurrent duplicate
  processing by honoring active `processing` locks and optimistic status-guarded claims.
  Added shared lock helper `src/lib/billing/webhook-processing-lock.ts` and contract test
  `scripts/test-billing-webhook-processing-lock.mjs`.
- Acceptance criteria:
  - Compatibility suite passes current app billing flows.
  - Dashboard parity for offerings/packages/entitlements/customers.
  - Apple/Google webhook ingestion with replay-safe idempotency.
  - Export/import for phased migration from RevenueCat.
  - Deploy mode supports both embedded module and standalone service.

### E-15 (`P1`) Curriculum Universe Expansion (Post 100-400)

- Scope: new track families, post-401 specialization layer, and interdisciplinary capstones.
- Status update (2026-03-02): `IN_PROGRESS` - proposal baseline authored in
  `CURRICULUM-EXPANSION-PROPOSALS-2026.md` with three-wave rollout and
  explicit acceptance criteria.
- Status update (2026-03-02): Wave 1 shipped with full 101/201/301/401 ladders for
  `ai-safety-alignment`, `data-engineering`, `climate-science`, `neuroscience`,
  and `media-literacy` (20 modules total). Validation and quality gates remain green.
- Status update (2026-03-02): Wave 2 shipped with full 101/201/301/401 ladders for
  `distributed-systems`, `public-health`, `negotiation-conflict-resolution`,
  `sustainability-policy`, and `ethics-of-technology` (20 modules total).
  Catalog-wide completion remains fully closed with green validation and quality reports.
- Status update (2026-03-02): Wave 3 shipped with full 101/201/301/401 ladders for
  `quantum-computing`, `space-missions-engineering`, `oceanography`,
  `international-relations`, and `sports-science` (20 modules total). Catalog now
  reports 83/83 tracks complete at 101/201/301/401 with validation and quality gates green.
- Status update (2026-03-02): post-401 specialization phase shipped with 501/601
  ladders for `ai-machine-learning`, `ai-workflows`, `cloud-computing`,
  `cybersecurity`, `data-science`, `biotechnology`, `ux-design`, and
  `entrepreneurship` (16 modules total). Acceptance criteria for specialization depth
  are exceeded while validation and quality gates remain green.
- Status update (2026-03-02): interdisciplinary capstone phase shipped with
  `capstone-smart-city-systems-501/601` and `capstone-human-health-ai-501/601`
  (4 modules total). Capstone acceptance criteria now includes delivered multi-domain
  defense modules with simulation + debate-style evaluation.
- Acceptance criteria:
  - At least 5 new tracks launched with complete 101/201/301/401 ladders.
  - At least 3 established tracks gain 501/601 specialization modules.
  - At least 2 interdisciplinary capstones ship with rubric-backed assessment.
  - Curriculum validation and quality gates remain green after each rollout wave.

## KPI Tracking (Backlog-wide)

- Mastery lift per learner
- 7/30-day retention
- Practice-to-paid conversion
- Tutor grounded-answer rate
- Content rights compliance rate
- Assignment completion rate
