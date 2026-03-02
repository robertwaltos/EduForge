# Production Environment Checklist

Generated: 2026-03-02T06:29:11.012Z
Runtime: production
Source file: .env.production.audit
Command: `node scripts/check-env.mjs --json --runtime production --source-file .env.production.audit --fail-on-warn`
Command exit code: 1

## Summary

- Pass: 18
- Warn: 0
- Fail: 1
- Total checks: 19

## Check Results

| Check | Status | Detail |
| --- | --- | --- |
| Env Source File | PASS | Loaded D:\PythonProjects\Koydo\eduforge-web\.env.production.audit |
| Public App URL | PASS | https://koydo.vercel.app |
| Supabase URL | PASS | https://osnxbuusohdzzcrakavn.supabase.co |
| Supabase Anon Key | PASS | Present |
| Supabase Service Role Key | PASS | Present |
| Upstash Redis Rate Limit Backend | FAIL | Missing UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in production runtime. |
| Billing Provider Mode | PASS | stripe_external |
| Billing Mode Consistency | PASS | Both set to stripe_external. |
| Stripe Secret + Webhook | PASS | Both present |
| Stripe Publishable Key | PASS | Present |
| RevenueCat Client Keys | PASS | Not required (BILLING_PROVIDER_MODE=stripe_external). |
| RevenueCat Webhook Secret | PASS | Not required (BILLING_PROVIDER_MODE=stripe_external). |
| Admin Approval Enforcement | PASS | REQUIRE_ADMIN_APPROVALS=true |
| Debug Flags | PASS | No production debug flags enabled. |
| Escaped Line Ending Audit | PASS | No values with literal escaped line endings detected in .env file. |
| Placeholder Secrets Audit | PASS | No placeholder-style values detected in critical env keys. |
| Parent Consent Email | PASS | Local simulation mode configured (Resend optional). |
| Parent Consent Token Secret | PASS | Configured |
| Mixpanel Token | PASS | Analytics disabled (NEXT_PUBLIC_ANALYTICS_ENABLED is not true). |

## Launch Blockers

- Upstash Redis Rate Limit Backend: Missing UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in production runtime.

## Warnings

- None.