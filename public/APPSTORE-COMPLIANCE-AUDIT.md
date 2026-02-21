# App Store Compliance Audit

Generated: 2026-02-20T23:59:00.620Z

Checks: 12 | Pass: 11 | Warn: 1 | Fail: 0

| Category | ID | Status | Detail |
|---|---|---|---|
| required-file | file:src/app/account/settings/page.tsx | PASS | Exists |
| required-file | file:src/app/api/account/delete/route.ts | PASS | Exists |
| required-file | file:src/app/legal/privacy/page.tsx | PASS | Exists |
| required-file | file:src/app/legal/terms/page.tsx | PASS | Exists |
| required-file | file:src/app/legal/refunds/page.tsx | PASS | Exists |
| required-file | file:src/app/auth/age-gate/page.tsx | PASS | Exists |
| required-file | file:src/app/auth/parent-consent/page.tsx | PASS | Exists |
| required-file | file:src/app/api/compliance/age-gate/route.ts | PASS | Exists |
| required-file | file:src/app/api/compliance/parent-consent/route.ts | PASS | Exists |
| required-file | file:src/app/api/compliance/policy-acceptance/route.ts | PASS | Exists |
| billing-mode | env:BILLING_PROVIDER_MODE | PASS | Configured as stripe_external |
| auth | auth:oauth-parity | WARN | Missing or inconsistent: google, facebook, apple, twitter |

## Notes

- This audit checks structural and configuration basics only.
- Final app store compliance still requires policy/legal and UX review before submission.
