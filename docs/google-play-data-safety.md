# Google Play Data Safety Declaration

**App ID:** `com.koydo.app`
**Last Updated:** 2026-03-02

This document describes the data collected and shared by Koydo, for use when completing the Google Play Console Data Safety form.

---

## Data Collection Summary

### 1. Personal Information

| Data Type | Collected | Shared | Purpose | Optional |
|-----------|-----------|--------|---------|----------|
| Email address | Yes | No | Account authentication, support tickets | No |
| Name / Display name | Yes | No | User profile, learner profiles | No |
| Phone number | Yes (optional) | No | Phone OTP authentication | Yes |

### 2. Financial Information

| Data Type | Collected | Shared | Purpose | Optional |
|-----------|-----------|--------|---------|----------|
| Purchase history | Yes | Yes (Stripe, RevenueCat) | Subscription management, billing | No (for paid users) |
| Payment info | No (handled by Stripe/RevenueCat) | N/A | N/A | N/A |

### 3. App Activity

| Data Type | Collected | Shared | Purpose | Optional |
|-----------|-----------|--------|---------|----------|
| Page views / interactions | Yes (with consent) | Yes (Mixpanel, with consent) | Analytics, product improvement | Yes |
| In-app search history | No | No | N/A | N/A |
| Learning progress | Yes | No | Educational progress tracking | No |

### 4. App Info and Performance

| Data Type | Collected | Shared | Purpose | Optional |
|-----------|-----------|--------|---------|----------|
| Crash logs | Yes | No | Debugging, stability | No |
| Diagnostics | Yes | No | Performance monitoring | No |

### 5. Device or Other IDs

| Data Type | Collected | Shared | Purpose | Optional |
|-----------|-----------|--------|---------|----------|
| Device identifiers | Yes (with ATT consent on iOS) | Yes (Mixpanel, with consent) | Analytics | Yes |
| Advertising ID | No | No | N/A | N/A |

---

## Data Handling Practices

### Encryption
- All data is encrypted in transit (HTTPS/TLS 1.3)
- Data at rest is encrypted by Supabase (AES-256)

### Data Deletion
- Users can request account deletion from Settings → Danger Zone
- Account deletion includes a 30-day grace period before permanent erasure
- Users can also submit DSAR erasure requests via the Privacy Center
- Deletion removes: auth credentials, student profiles, learning progress, support tickets, subscription metadata

### Data Retention
- Active account data is retained while the account exists
- Deleted accounts enter a 30-day soft-delete period, then are permanently erased
- Analytics data (Mixpanel) follows Mixpanel's retention policy (controlled via consent)

### Children's Privacy (COPPA / GDPR-K)
- Age-gate enforced during onboarding (threshold: 13 years)
- Users under 13 require verified parental consent before accessing the platform
- Parent consent flow uses HMAC-signed email verification tokens
- Parents can request data access, correction, or deletion via support

---

## Third-Party SDKs / Services

| Service | Purpose | Data Accessed | Privacy Policy |
|---------|---------|---------------|----------------|
| Supabase | Auth, database, storage | Email, profile, progress | https://supabase.com/privacy |
| Stripe | Web billing | Purchase history | https://stripe.com/privacy |
| RevenueCat | Native IAP | Purchase history, device ID | https://www.revenuecat.com/privacy |
| Mixpanel | Analytics (consent-gated) | Page views, events, device ID | https://mixpanel.com/legal/privacy-policy |
| OpenAI | Lesson audio generation | Lesson text only (no PII) | https://openai.com/privacy |
| ElevenLabs | TTS audio generation | Lesson text only (no PII) | https://elevenlabs.io/privacy |

---

## Play Console Form Answers

Use these answers when filling in the Google Play Console Data Safety form:

1. **Does your app collect or share any of the required user data types?** → Yes
2. **Is all of the user data collected by your app encrypted in transit?** → Yes
3. **Do you provide a way for users to request that their data is deleted?** → Yes
4. **Does your app collect any data types not listed?** → No
5. **Is your app a game?** → No
6. **Does your app target children or has it been reviewed for child safety?** → Yes (COPPA-compliant, age-gated)
