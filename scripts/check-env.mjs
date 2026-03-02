import fs from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env");

const VALID_BILLING_MODES = ["stripe_external", "app_store_iap"];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);
  const values = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex < 0) continue;
    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();
    values[key] = value;
  }

  return values;
}

function normalizeValue(value) {
  if (typeof value !== "string") return "";
  let normalized = value.trim();

  if (
    (normalized.startsWith('"') && normalized.endsWith('"'))
    || (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1).trim();
  }

  normalized = normalized.replace(/\\r\\n/g, "").replace(/\\n/g, "").trim();

  const inlineCommentIndex = normalized.indexOf(" #");
  if (inlineCommentIndex >= 0) {
    normalized = normalized.slice(0, inlineCommentIndex).trim();
  }

  return normalized;
}

function readValue(env, key, fallbackKey) {
  const fromProcess = normalizeValue(process.env[key] ?? "");
  if (fromProcess) return fromProcess;
  if (fallbackKey) {
    const fromProcessFallback = normalizeValue(process.env[fallbackKey] ?? "");
    if (fromProcessFallback) return fromProcessFallback;
  }

  const fromFile = normalizeValue(env[key] ?? "");
  if (fromFile) return fromFile;
  if (fallbackKey) {
    const fromFileFallback = normalizeValue(env[fallbackKey] ?? "");
    if (fromFileFallback) return fromFileFallback;
  }

  return "";
}

function checkUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isLocalHostname(hostname) {
  return (
    hostname === "localhost"
    || hostname === "127.0.0.1"
    || hostname === "::1"
    || hostname.endsWith(".local")
  );
}

function summarize(checks) {
  const fail = checks.filter((c) => c.status === "fail").length;
  const warn = checks.filter((c) => c.status === "warn").length;
  const pass = checks.filter((c) => c.status === "pass").length;
  return { pass, warn, fail, total: checks.length };
}

function printCheck(check) {
  const prefix = check.status === "pass" ? "[PASS]" : check.status === "warn" ? "[WARN]" : "[FAIL]";
  console.log(`${prefix} ${check.label} - ${check.detail}`);
}

function parseArgs(argv) {
  const args = {
    json: false,
    runtime: "",
    envFile: "",
    failOnWarn: false,
  };

  const parseOptionValue = (arg, index) => {
    const equalsIndex = arg.indexOf("=");
    if (equalsIndex >= 0) {
      return { value: arg.slice(equalsIndex + 1).trim(), consumedNext: false };
    }
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      return { value: "", consumedNext: false };
    }
    return { value: next.trim(), consumedNext: true };
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") continue;

    if (arg === "--json" || arg === "json") {
      args.json = true;
      continue;
    }

    if (arg === "--production" || arg === "production") {
      args.runtime = "production";
      continue;
    }

    if (arg === "--fail-on-warn" || arg === "fail-on-warn" || arg === "--strict" || arg === "strict") {
      args.failOnWarn = true;
      continue;
    }

    if (arg === "--runtime" || arg.startsWith("--runtime=")) {
      const parsed = parseOptionValue(arg, i);
      if (parsed.value) {
        args.runtime = normalizeValue(parsed.value).toLowerCase();
      }
      if (parsed.consumedNext) {
        i += 1;
      }
      continue;
    }

    if (
      arg === "--source-file"
      || arg.startsWith("--source-file=")
      || arg === "--env-file"
      || arg.startsWith("--env-file=")
    ) {
      const parsed = parseOptionValue(arg, i);
      if (parsed.value) {
        args.envFile = normalizeValue(parsed.value);
      }
      if (parsed.consumedNext) {
        i += 1;
      }
      continue;
    }
  }

  return args;
}

function resolveRuntimeEnvironment(env, runtimeOverride) {
  const runtime =
    normalizeValue(runtimeOverride)
    || readValue(env, "APP_ENV")
    || readValue(env, "VERCEL_ENV")
    || readValue(env, "NODE_ENV")
    || "development";

  return {
    runtime: runtime.toLowerCase(),
    isProduction: runtime.toLowerCase() === "production",
    overrideApplied: Boolean(runtimeOverride),
  };
}

function buildStripeReadinessCheck({ billingModeRaw, stripeSecret, stripeWebhook, isProduction }) {
  const billingMode = VALID_BILLING_MODES.includes(billingModeRaw)
    ? billingModeRaw
    : "stripe_external";
  const hasStripeConfig = Boolean(stripeSecret && stripeWebhook);

  if (billingMode !== "stripe_external") {
    return {
      label: "Stripe Secret + Webhook",
      status: "pass",
      detail: hasStripeConfig
        ? "Both present (not required in app_store_iap mode)"
        : "Not required (BILLING_PROVIDER_MODE=app_store_iap)",
    };
  }

  if (hasStripeConfig) {
    if (isProduction && stripeSecret.startsWith("sk_test_")) {
      return {
        label: "Stripe Secret + Webhook",
        status: "fail",
        detail: "Detected STRIPE_SECRET_KEY test key in production runtime.",
      };
    }

    return {
      label: "Stripe Secret + Webhook",
      status: "pass",
      detail: "Both present",
    };
  }

  if (isProduction) {
    return {
      label: "Stripe Secret + Webhook",
      status: "fail",
      detail:
        "Billing blocked in production: missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET while BILLING_PROVIDER_MODE=stripe_external.",
    };
  }

  return {
    label: "Stripe Secret + Webhook",
    status: stripeSecret || stripeWebhook ? "warn" : "warn",
    detail: "Missing one or both keys (billing routes limited until configured)",
  };
}

function buildStripePublishableCheck({ billingModeRaw, stripePublishable, isProduction }) {
  const billingMode = VALID_BILLING_MODES.includes(billingModeRaw)
    ? billingModeRaw
    : "stripe_external";

  if (billingMode !== "stripe_external") {
    return {
      label: "Stripe Publishable Key",
      status: "pass",
      detail: stripePublishable
        ? "Present (not required in app_store_iap mode)"
        : "Not required (BILLING_PROVIDER_MODE=app_store_iap)",
    };
  }

  if (stripePublishable) {
    if (isProduction && stripePublishable.startsWith("pk_test_")) {
      return {
        label: "Stripe Publishable Key",
        status: "fail",
        detail: "Detected NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY test key in production runtime.",
      };
    }

    return {
      label: "Stripe Publishable Key",
      status: "pass",
      detail: "Present",
    };
  }

  return {
    label: "Stripe Publishable Key",
    status: isProduction ? "warn" : "warn",
    detail: "Missing (optional for hosted Checkout redirects, required for Stripe Elements/Card UI flows)",
  };
}

function buildBillingModeConsistencyCheck({ billingMode, publicBillingMode }) {
  const hasServerMode = Boolean(billingMode);
  const hasPublicMode = Boolean(publicBillingMode);

  if (!hasServerMode && !hasPublicMode) {
    return {
      label: "Billing Mode Consistency",
      status: "warn",
      detail: "Missing BILLING_PROVIDER_MODE and NEXT_PUBLIC_BILLING_PROVIDER_MODE (defaults apply).",
    };
  }

  if (!hasServerMode || !hasPublicMode) {
    return {
      label: "Billing Mode Consistency",
      status: "warn",
      detail: "Only one of BILLING_PROVIDER_MODE / NEXT_PUBLIC_BILLING_PROVIDER_MODE is set.",
    };
  }

  if (billingMode !== publicBillingMode) {
    return {
      label: "Billing Mode Consistency",
      status: "fail",
      detail: `Mismatch: BILLING_PROVIDER_MODE=${billingMode}, NEXT_PUBLIC_BILLING_PROVIDER_MODE=${publicBillingMode}.`,
    };
  }

  return {
    label: "Billing Mode Consistency",
    status: "pass",
    detail: `Both set to ${billingMode}.`,
  };
}

function buildPublicAppUrlCheck({ appUrl, isProduction }) {
  if (!appUrl) {
    return {
      label: "Public App URL",
      status: isProduction ? "fail" : "warn",
      detail: "Missing NEXT_PUBLIC_APP_URL.",
    };
  }

  if (!checkUrl(appUrl)) {
    return {
      label: "Public App URL",
      status: "fail",
      detail: `Invalid NEXT_PUBLIC_APP_URL: ${appUrl}`,
    };
  }

  const parsed = new URL(appUrl);
  const isLocalhost = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (isProduction && isLocalhost) {
    return {
      label: "Public App URL",
      status: "fail",
      detail: `Production runtime cannot use localhost app URL: ${appUrl}`,
    };
  }

  if (isProduction && parsed.hostname === "vercel.com") {
    return {
      label: "Public App URL",
      status: "fail",
      detail: "NEXT_PUBLIC_APP_URL points to Vercel dashboard URL; set it to the live app origin.",
    };
  }

  return {
    label: "Public App URL",
    status: "pass",
    detail: appUrl,
  };
}

function buildSupabaseUrlCheck({ supabaseUrl, isProduction }) {
  if (!supabaseUrl) {
    return {
      label: "Supabase URL",
      status: "fail",
      detail: "Missing NEXT_PUBLIC_SUPABASE_URL/EXPO_PUBLIC_SUPABASE_URL",
    };
  }

  if (!checkUrl(supabaseUrl)) {
    return {
      label: "Supabase URL",
      status: "fail",
      detail: `Invalid Supabase URL: ${supabaseUrl}`,
    };
  }

  const parsed = new URL(supabaseUrl);
  if (isProduction && isLocalHostname(parsed.hostname)) {
    return {
      label: "Supabase URL",
      status: "fail",
      detail: `Production runtime cannot use local Supabase URL: ${supabaseUrl}`,
    };
  }

  return {
    label: "Supabase URL",
    status: "pass",
    detail: supabaseUrl,
  };
}

function buildUpstashRedisRateLimitCheck({ redisUrl, redisToken, isProduction }) {
  const hasUrl = Boolean(redisUrl);
  const hasToken = Boolean(redisToken);

  if (!hasUrl && !hasToken) {
    return {
      label: "Upstash Redis Rate Limit Backend",
      status: isProduction ? "fail" : "warn",
      detail: isProduction
        ? "Missing UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in production runtime."
        : "Not configured (local in-memory fallback will be used).",
    };
  }

  if (!hasUrl || !hasToken) {
    return {
      label: "Upstash Redis Rate Limit Backend",
      status: isProduction ? "fail" : "warn",
      detail: "Both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required together.",
    };
  }

  if (!checkUrl(redisUrl)) {
    return {
      label: "Upstash Redis Rate Limit Backend",
      status: "fail",
      detail: `Invalid UPSTASH_REDIS_REST_URL: ${redisUrl}`,
    };
  }

  const parsed = new URL(redisUrl);
  if (isProduction && isLocalHostname(parsed.hostname)) {
    return {
      label: "Upstash Redis Rate Limit Backend",
      status: "fail",
      detail: `Production runtime cannot use local Upstash Redis URL: ${redisUrl}`,
    };
  }

  return {
    label: "Upstash Redis Rate Limit Backend",
    status: "pass",
    detail: "Configured",
  };
}

function isPlaceholderValue(value) {
  if (!value) return false;
  const normalized = normalizeValue(value).toLowerCase();
  return (
    normalized === "changeme"
    || normalized === "change-me"
    || normalized === "replace-me"
    || normalized === "replace_me"
    || normalized.startsWith("replace-")
    || normalized.startsWith("replace_")
    || normalized === "todo"
    || normalized === "tbd"
    || normalized.startsWith("your_")
    || normalized.startsWith("your-")
    || normalized.startsWith("<your")
    || normalized.startsWith("[your")
  );
}

function buildPlaceholderSecretAudit({ env, isProduction }) {
  const keysToAudit = [
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "OPENAI_API_KEY",
    "OPENAI_IMAGE_MODEL",
    "NEXT_PUBLIC_REVENUECAT_APPLE_KEY",
    "NEXT_PUBLIC_REVENUECAT_GOOGLE_KEY",
    "NEXT_PUBLIC_REVENUECAT_API_KEY",
    "EXPO_PUBLIC_REVENUECAT_API_KEY",
    "REVENUECAT_WEBHOOK_SECRET",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RESEND_API_KEY",
    "PARENT_CONSENT_FROM_EMAIL",
    "PARENT_CONSENT_TOKEN_SECRET",
  ];

  const placeholderKeys = keysToAudit.filter((key) => isPlaceholderValue(readValue(env, key)));
  if (placeholderKeys.length === 0) {
    return {
      label: "Placeholder Secrets Audit",
      status: "pass",
      detail: "No placeholder-style values detected in critical env keys.",
    };
  }

  return {
    label: "Placeholder Secrets Audit",
    status: isProduction ? "fail" : "warn",
    detail: `Detected placeholder-style values in: ${placeholderKeys.slice(0, 8).join(", ")}${placeholderKeys.length > 8 ? ", ..." : ""}`,
  };
}

function isTestRevenueCatKey(value) {
  const normalized = normalizeValue(value).toLowerCase();
  return normalized.startsWith("test_");
}

function buildRevenueCatClientKeysCheck({
  appleKey,
  googleKey,
  genericKey,
  billingModeRaw,
  isProduction,
}) {
  const requiresRevenueCat = billingModeRaw === "app_store_iap";
  const hasAppleKey = Boolean(appleKey);
  const hasGoogleKey = Boolean(googleKey);
  const hasGenericKey = Boolean(genericKey);

  if (hasAppleKey && hasGoogleKey) {
    if (isProduction && (isTestRevenueCatKey(appleKey) || isTestRevenueCatKey(googleKey))) {
      return {
        label: "RevenueCat Client Keys",
        status: "fail",
        detail: "Detected test RevenueCat key prefix (test_) in production runtime.",
      };
    }

    const applePrefixOk = appleKey.startsWith("appl_");
    const googlePrefixOk = googleKey.startsWith("goog_");
    if (!applePrefixOk || !googlePrefixOk) {
      return {
        label: "RevenueCat Client Keys",
        status: requiresRevenueCat && isProduction ? "fail" : "warn",
        detail: "RevenueCat keys present but one or both prefixes are unexpected (expected appl_/goog_).",
      };
    }
    return {
      label: "RevenueCat Client Keys",
      status: "pass",
      detail: "iOS and Android keys are present.",
    };
  }

  if (hasGenericKey) {
    if (isProduction && isTestRevenueCatKey(genericKey)) {
      return {
        label: "RevenueCat Client Keys",
        status: "fail",
        detail: "Detected test RevenueCat key prefix (test_) in production runtime.",
      };
    }

    return {
      label: "RevenueCat Client Keys",
      status: "pass",
      detail:
        "Generic RevenueCat public key is present (NEXT_PUBLIC_REVENUECAT_API_KEY). Platform-specific keys are recommended for production.",
    };
  }

  return {
    label: "RevenueCat Client Keys",
    status: requiresRevenueCat && isProduction ? "fail" : "pass",
    detail: requiresRevenueCat
      ? "Missing RevenueCat client keys while BILLING_PROVIDER_MODE=app_store_iap."
      : "Not required (BILLING_PROVIDER_MODE=stripe_external).",
  };
}

function buildRevenueCatWebhookCheck({
  webhookSecret,
  billingModeRaw,
  isProduction,
}) {
  const requiresRevenueCat = billingModeRaw === "app_store_iap";
  if (webhookSecret) {
    return {
      label: "RevenueCat Webhook Secret",
      status: "pass",
      detail: "Present",
    };
  }

  return {
    label: "RevenueCat Webhook Secret",
    status: requiresRevenueCat && isProduction ? "fail" : "pass",
    detail: requiresRevenueCat
      ? "Missing REVENUECAT_WEBHOOK_SECRET while BILLING_PROVIDER_MODE=app_store_iap."
      : "Not required (BILLING_PROVIDER_MODE=stripe_external).",
  };
}

function buildDebugFlagCheck({ debugParentDigest, isProduction }) {
  if (isProduction && debugParentDigest === "1") {
    return {
      label: "Debug Flags",
      status: "fail",
      detail: "DEBUG_PARENT_DIGEST=1 in production runtime.",
    };
  }

  return {
    label: "Debug Flags",
    status: "pass",
    detail: debugParentDigest === "1" ? "DEBUG_PARENT_DIGEST=1 (non-production)." : "No production debug flags enabled.",
  };
}

function buildAdminApprovalCheck({ requireAdminApprovals, isProduction }) {
  if (!requireAdminApprovals) {
    return {
      label: "Admin Approval Enforcement",
      status: isProduction ? "warn" : "warn",
      detail: "REQUIRE_ADMIN_APPROVALS missing.",
    };
  }

  if (!["true", "false"].includes(requireAdminApprovals)) {
    return {
      label: "Admin Approval Enforcement",
      status: "fail",
      detail: `Invalid REQUIRE_ADMIN_APPROVALS value: ${requireAdminApprovals}`,
    };
  }

  if (isProduction && requireAdminApprovals !== "true") {
    return {
      label: "Admin Approval Enforcement",
      status: "warn",
      detail: "REQUIRE_ADMIN_APPROVALS=false in production runtime.",
    };
  }

  return {
    label: "Admin Approval Enforcement",
    status: "pass",
    detail: `REQUIRE_ADMIN_APPROVALS=${requireAdminApprovals}`,
  };
}

function buildEscapedLineEndingCheck({ env, isProduction }) {
  const offenders = Object.entries(env)
    .filter(([, value]) => typeof value === "string" && (value.includes("\\r\\n") || value.includes("\\n")))
    .map(([key]) => key);

  if (offenders.length === 0) {
    return {
      label: "Escaped Line Ending Audit",
      status: "pass",
      detail: "No values with literal escaped line endings detected in .env file.",
    };
  }

  return {
    label: "Escaped Line Ending Audit",
    status: isProduction ? "fail" : "warn",
    detail: `Detected literal escaped line endings in: ${offenders.slice(0, 8).join(", ")}${offenders.length > 8 ? ", ..." : ""}`,
  };
}

function buildEnvSourceCheck({ envFilePath, envFileExists, explicitEnvFile }) {
  if (envFileExists) {
    return {
      label: "Env Source File",
      status: "pass",
      detail: `Loaded ${envFilePath}`,
    };
  }

  if (explicitEnvFile) {
    return {
      label: "Env Source File",
      status: "fail",
      detail: `Specified env file not found: ${envFilePath}`,
    };
  }

  return {
    label: "Env Source File",
    status: "warn",
    detail: `Default env file not found: ${envFilePath} (falling back to process.env only).`,
  };
}

function extractEmailAddress(input) {
  const normalized = normalizeValue(input);
  if (!normalized) return "";
  const bracketMatch = normalized.match(/<([^>]+)>/);
  return (bracketMatch?.[1] ?? normalized).trim().toLowerCase();
}

function isLikelyLocalSimulationEmail(input) {
  const email = extractEmailAddress(input);
  if (!email) return false;
  const atIndex = email.lastIndexOf("@");
  if (atIndex < 0) return false;
  const domain = email.slice(atIndex + 1);
  return domain.endsWith(".local");
}

function buildParentConsentEmailCheck({
  resendApiKey,
  consentFromEmail,
  parentConsentEmailMode,
}) {
  const mode = normalizeValue(parentConsentEmailMode).toLowerCase();
  const hasResend = Boolean(resendApiKey);
  const hasSender = Boolean(consentFromEmail);
  const hasLocalSender = isLikelyLocalSimulationEmail(consentFromEmail);

  if (mode === "disabled" || mode === "off" || mode === "false") {
    return {
      label: "Parent Consent Email",
      status: "pass",
      detail: "Disabled by PARENT_CONSENT_EMAIL_MODE.",
    };
  }

  if (hasResend && hasSender) {
    return {
      label: "Parent Consent Email",
      status: "pass",
      detail: "Resend + sender configured",
    };
  }

  if (
    mode === "local"
    || mode === "simulate"
    || mode === "simulation"
    || (!hasResend && hasLocalSender)
  ) {
    return {
      label: "Parent Consent Email",
      status: "pass",
      detail: "Local simulation mode configured (Resend optional).",
    };
  }

  return {
    label: "Parent Consent Email",
    status: "warn",
    detail: "Missing RESEND_API_KEY or PARENT_CONSENT_FROM_EMAIL (falls back to local simulation link)",
  };
}

function buildMixpanelCheck({ mixpanel, analyticsEnabled }) {
  if (mixpanel) {
    return {
      label: "Mixpanel Token",
      status: "pass",
      detail: "Present",
    };
  }

  if (!analyticsEnabled) {
    return {
      label: "Mixpanel Token",
      status: "pass",
      detail: "Analytics disabled (NEXT_PUBLIC_ANALYTICS_ENABLED is not true).",
    };
  }

  return {
    label: "Mixpanel Token",
    status: "warn",
    detail: "Missing while analytics is enabled.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const envFilePath = args.envFile
    ? path.resolve(process.cwd(), args.envFile)
    : envPath;
  const envFileExists = fs.existsSync(envFilePath);
  const env = parseEnvFile(envFilePath);

  const appUrl = readValue(env, "NEXT_PUBLIC_APP_URL");
  const supabaseUrl = readValue(env, "NEXT_PUBLIC_SUPABASE_URL", "EXPO_PUBLIC_SUPABASE_URL");
  const supabaseAnon = readValue(env, "NEXT_PUBLIC_SUPABASE_ANON_KEY", "EXPO_PUBLIC_SUPABASE_KEY");
  const supabaseService = readValue(env, "SUPABASE_SERVICE_ROLE_KEY");
  const upstashRedisUrl = readValue(env, "UPSTASH_REDIS_REST_URL");
  const upstashRedisToken = readValue(env, "UPSTASH_REDIS_REST_TOKEN");
  const billingMode = readValue(env, "BILLING_PROVIDER_MODE");
  const publicBillingMode = readValue(env, "NEXT_PUBLIC_BILLING_PROVIDER_MODE");
  const effectiveBillingMode = billingMode || publicBillingMode || "stripe_external";
  const stripeSecret = readValue(env, "STRIPE_SECRET_KEY");
  const stripeWebhook = readValue(env, "STRIPE_WEBHOOK_SECRET");
  const stripePublishable = readValue(env, "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
  const revenueCatGenericKey = readValue(
    env,
    "NEXT_PUBLIC_REVENUECAT_API_KEY",
    "EXPO_PUBLIC_REVENUECAT_API_KEY",
  );
  const revenueCatAppleKey = readValue(env, "NEXT_PUBLIC_REVENUECAT_APPLE_KEY");
  const revenueCatGoogleKey = readValue(env, "NEXT_PUBLIC_REVENUECAT_GOOGLE_KEY");
  const revenueCatWebhookSecret = readValue(env, "REVENUECAT_WEBHOOK_SECRET");
  const resendApiKey = readValue(env, "RESEND_API_KEY");
  const consentFromEmail = readValue(env, "PARENT_CONSENT_FROM_EMAIL");
  const parentConsentEmailMode = readValue(env, "PARENT_CONSENT_EMAIL_MODE");
  const consentTokenSecret = readValue(env, "PARENT_CONSENT_TOKEN_SECRET");
  const mixpanel = readValue(env, "NEXT_PUBLIC_MIXPANEL_TOKEN");
  const analyticsEnabled = readValue(
    env,
    "NEXT_PUBLIC_ANALYTICS_ENABLED",
    "NEXT_PUBLIC_MIXPANEL_ENABLED",
  ).toLowerCase() === "true";
  const debugParentDigest = readValue(env, "DEBUG_PARENT_DIGEST");
  const requireAdminApprovals = readValue(env, "REQUIRE_ADMIN_APPROVALS");
  const runtime = resolveRuntimeEnvironment(env, args.runtime);

  const checks = [];

  checks.push(
    buildEnvSourceCheck({
      envFilePath,
      envFileExists,
      explicitEnvFile: Boolean(args.envFile),
    }),
  );

  checks.push(
    buildPublicAppUrlCheck({
      appUrl,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildSupabaseUrlCheck({
      supabaseUrl,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push({
    label: "Supabase Anon Key",
    status: supabaseAnon ? "pass" : "fail",
    detail: supabaseAnon ? "Present" : "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY/EXPO_PUBLIC_SUPABASE_KEY",
  });

  checks.push({
    label: "Supabase Service Role Key",
    status: supabaseService ? "pass" : "warn",
    detail: supabaseService ? "Present" : "Missing (admin APIs requiring service role will fail)",
  });

  checks.push(
    buildUpstashRedisRateLimitCheck({
      redisUrl: upstashRedisUrl,
      redisToken: upstashRedisToken,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push({
    label: "Billing Provider Mode",
    status: VALID_BILLING_MODES.includes(effectiveBillingMode) ? "pass" : "warn",
    detail: effectiveBillingMode || "Missing (defaults to stripe_external in code)",
  });

  checks.push(
    buildBillingModeConsistencyCheck({
      billingMode,
      publicBillingMode,
    }),
  );

  checks.push(
    buildStripeReadinessCheck({
      billingModeRaw: effectiveBillingMode,
      stripeSecret,
      stripeWebhook,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildStripePublishableCheck({
      billingModeRaw: effectiveBillingMode,
      stripePublishable,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildRevenueCatClientKeysCheck({
      billingModeRaw: effectiveBillingMode,
      genericKey: revenueCatGenericKey,
      appleKey: revenueCatAppleKey,
      googleKey: revenueCatGoogleKey,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildRevenueCatWebhookCheck({
      billingModeRaw: effectiveBillingMode,
      webhookSecret: revenueCatWebhookSecret,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildAdminApprovalCheck({
      requireAdminApprovals,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildDebugFlagCheck({
      debugParentDigest,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildEscapedLineEndingCheck({
      env,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildPlaceholderSecretAudit({
      env,
      isProduction: runtime.isProduction,
    }),
  );

  checks.push(
    buildParentConsentEmailCheck({
      resendApiKey,
      consentFromEmail,
      parentConsentEmailMode,
    }),
  );

  checks.push({
    label: "Parent Consent Token Secret",
    status: consentTokenSecret.length >= 16 ? "pass" : "warn",
    detail:
      consentTokenSecret.length >= 16
        ? "Configured"
        : "Missing/short (verification link signing may be weaker or disabled)",
  });

  checks.push(
    buildMixpanelCheck({
      mixpanel,
      analyticsEnabled,
    }),
  );

  const totals = summarize(checks);
  const report = {
    generatedAt: new Date().toISOString(),
    source: envFileExists ? envFilePath : `${envFilePath} (process.env fallback)`,
    options: {
      runtimeOverride: args.runtime || null,
      envFile: args.envFile || null,
      failOnWarn: args.failOnWarn,
    },
    runtime,
    totals,
    checks,
  };

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log("Koydo environment check");
    console.log(`Source: ${report.source}`);
    console.log(`Runtime: ${runtime.runtime}${runtime.isProduction ? " (production)" : ""}${runtime.overrideApplied ? " (override)" : ""}`);
    if (args.failOnWarn) {
      console.log("Mode: fail-on-warn enabled");
    }
    console.log("");
    checks.forEach(printCheck);
    console.log("");
    console.log(`Summary: ${totals.pass} pass / ${totals.warn} warn / ${totals.fail} fail (total ${totals.total})`);
    if (args.failOnWarn && totals.warn > 0 && totals.fail === 0) {
      console.log("Failing due to warnings because --fail-on-warn is enabled.");
    }
  }

  if (totals.fail > 0 || (args.failOnWarn && totals.warn > 0)) {
    process.exitCode = 1;
  }
}

main();
