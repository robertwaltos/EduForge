# Koydo API Routes and Rate Limits

This project currently exposes 117 API route handlers under `src/app/api`.

## Enforcement Model

IP-based rate limiting is enforced centrally in [`src/proxy.ts`](/d:/PythonProjects/Koydo/eduforge-web/src/proxy.ts) for all mutating API methods (`POST`, `PUT`, `PATCH`, `DELETE`) using `enforceIpRateLimit`.

## Active Rate Limit Policies

| Route scope | Limit | Window | Notes |
| --- | --- | --- | --- |
| `/api/stripe/webhook`, `/api/revenuecat/webhook` | 300 | 60s | Billing webhooks; high burst allowance |
| `/api/stripe/*`, `/api/receipt/verify/*`, `/api/language/exam-unlocks/*` (mutations) | 60 | 60s | Billing and payment mutations |
| `/api/auth/*` (mutations) | 60 | 60s | Auth-related mutation traffic |
| `/api/ai/tutor`, `/api/media/generate`, `/api/images/generate` (mutations) | 40 | 60s | Expensive AI/media calls |
| Any other `/api/*` mutation | 120 | 60s | Baseline mutation protection |

All rate-limited responses return HTTP `429` and include `Retry-After`.

## Exemptions

- Read-only routes (`GET`, `HEAD`, `OPTIONS`) are not rate-limited by this middleware layer.
- `/api/health` remains unthrottled for availability probes.
