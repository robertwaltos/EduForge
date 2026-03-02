# Koydo EdTech Litigation + Contract Hardening (2026)

Last Updated: 2026-03-02  
Owner: Codex (Backend Platform + Compliance Hardening)  
Scope: K-12 + professional exam prep app backend, licensed content pipelines, billing backends.

> This is an engineering/compliance planning document, not legal advice.

## 1) Executive Summary (2020-2026 Pattern)

Most high-impact edtech legal actions cluster into five repeat failure modes:

1. Student privacy and consent violations.
2. Data security and delayed breach response failures.
3. Copyright/licensing infringement (especially exam prep and scraped question banks).
4. Accessibility non-compliance (WCAG/ADA/Section 508).
5. Misrepresentation gaps between policy/contract promises and actual code behavior.

In practice, lawsuits are usually triggered by a mismatch between:
- what contracts/policies say, and
- what APIs, SDKs, storage, and analytics actually do.

## 2) Core Risk Categories and What They Mean for Backend

## A) Privacy + Consent (COPPA/FERPA/state laws/GDPR)
- Never rely on generic “school consent” for commercial profiling/ads/AI-training uses.
- Parent/teacher scoped access must be explicit, role-checked, and auditable.
- Under-13 flows require verifiable parental consent before non-essential tracking.

Backend controls:
- Enforce role + relationship checks for child data access (`self`, `parent`, `teacher` scopes).
- Block unapproved secondary use flags (`ads`, `profiling`, `ai_training`) at API boundary.
- Keep immutable audit trails for placement/learning decisions and manual overrides.

## B) Security + Breach Readiness
- Primary legal risk is preventable breaches from weak access control and weak monitoring.

Backend controls:
- Encryption at rest/in transit, least privilege, secret rotation, and service-role isolation.
- Short retention windows where possible + bounded cleanup jobs.
- Structured incident logs and breach-timeline evidence (who accessed what, when).

## C) Licensed Content + IP
- Every third-party asset must have explicit commercial/mobile/app rights.
- Exam-body content restrictions must be modeled as hard ingest gates.

Backend controls:
- Provenance state on ingest (`pending`, `approved`, `blocked`) with serving guardrails.
- Contract metadata for each content pack (scope, term, territory, derivative rights, sublicensing).
- Block serving when rights evidence is missing or expired.

## D) Accessibility
- Accessibility defects are now active litigation vectors, not polish.

Backend controls:
- Accessibility test evidence capture per release.
- “No launch” gates for severe WCAG failures on core flows.

## E) Billing + Consumer Protection
- Subscription and refund workflows must be deterministic and auditable.

Backend controls:
- Replay-safe webhook ingestion and idempotency keys.
- Full entitlement event history and customer-facing transparency endpoints.

## 3) Contract Requirements (Must-Have Clauses)

All school/vendor and creator licensing contracts should include:

1. Data ownership: school/learner retains ownership; vendor is processor/custodian only.
2. Strict purpose limitation: educational service only.
3. Explicit ban on targeted ads, profiling, sale, and unauthorized data mining.
4. Explicit ban on AI model training with student data unless separately consented and contracted.
5. Subprocessor disclosure + flow-down obligations.
6. Security controls (encryption, MFA, access controls, logging, audits).
7. Breach notification timeline (target 24-72h) + cooperation requirements.
8. Retention/deletion schedule + deletion certification on termination.
9. Parent/eligible student rights: access, correction, deletion channels.
10. IP warranties + indemnification for creator-provided content.
11. Scope clarity: mobile/app/commercial rights, territory, term, derivatives, sublicensing.
12. Audit rights and remedy rights for policy/contract non-compliance.

## 4) Clauses/Practices to Avoid

- “Reasonable security” with no control specifics.
- Broad “product improvement” language without purpose boundaries.
- Perpetual retention defaults.
- Hidden tracker/subprocessor use.
- Contract language that tries to transfer parental rights/consent via school-only authorization.
- Marketing promises not enforceable by internal technical controls.

## 5) Koydo Engineering Release Gates (Legal Hardening)

For each release touching student data, licensing, or billing:

1. Privacy gate: consent model, role scopes, and retention bounds verified.
2. Security gate: route-level authz + rate limits + incident logging coverage.
3. Rights gate: content provenance status present and valid for all served assets.
4. Billing gate: webhook replay safety + entitlement parity checks pass.
5. Accessibility gate: high-severity WCAG issues closed on launch-critical surfaces.

## 6) Ownership Split (Multi-Agent)

Codex owns the difficult backend track going forward:

- Parent/teacher/developer portal backend APIs and authorization boundaries.
- Billing backend hardening and RevenueCat completion tasks.
- Legal/compliance hardening controls across content, privacy, and retention pipelines.
- Compliance guard docs/prompts and release-gate integration.

Other agents should avoid overlapping in these files/workstreams unless coordinated in roadmap/handoff updates.

## 7) Reusable Agent Prompt: App + Knowledgebase Compliance Audit

Use this prompt when auditing code, policies, contracts, and content ingest data:

```text
You are an expert edtech legal/compliance auditor for K-12 and professional exam-prep apps.
Audit the provided codebase, API routes, SDK usage, privacy policy, consent flows, contracts,
content licenses, and data-retention behavior against 2020-2026 edtech lawsuit patterns.

Output exactly:
1. EXECUTIVE RISK SCORE (overall + per category)
2. DETAILED FINDINGS (with file/line evidence)
3. EVIDENCE OF COMPLIANCE OR VIOLATION (yes/no + proof)
4. REMEDIATION STEPS (prioritized, with timeline)
5. RECOMMENDED ADDITIONAL AUDITS

Categories to check:
- Privacy/consent (COPPA/FERPA/state law/GDPR)
- Security and breach readiness
- Content licensing/IP and exam-body restrictions
- Accessibility (WCAG/ADA/Section 508)
- Billing integrity and deceptive-practice risk
- Third-party SDK/tracker controls
- Policy/contract vs code behavior mismatch

Flag severity as Critical/High/Medium/Low and conclude with:
Launch-ready / Needs fixes before launch / Do not launch.
```

## 8) Next Implementation Tasks (Backend)

1. Add consent + purpose-of-use guard middleware for child-data APIs.
2. Add provenance enforcement middleware for licensed content serving.
3. Add billing webhook contract tests for replay/idempotency and entitlement parity.
4. Add legal-compliance CI checks (policy/contract metadata presence + retention job coverage).

## 9) Implementation Progress (2026-03-02)

- Completed: shared parent-access guard (`src/lib/compliance/parent-access.ts`) that enforces:
  - explicit access purpose declaration,
  - parent role verification,
  - verified `parent_consents` relationship checks before child-data reads.
- Integrated on:
  - `POST /api/parent/digest`
  - `GET /api/parent/reports`
  - `GET /api/parent/ai-interventions`
  - `GET /api/ai/placement-diagnostic/history` (parent scope)
- Completed: webhook idempotency hardening (`src/lib/billing/webhook-processing-lock.ts`) for:
  - `POST /api/revenuecat/webhook`
  - `POST /api/stripe/webhook`
  - Added contract test `scripts/test-billing-webhook-processing-lock.mjs`
