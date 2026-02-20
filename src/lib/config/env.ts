import { z } from "zod";

const serverEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),
  DEEPL_API_KEY: z.string().optional(),
  GOOGLE_TRANSLATE_API_KEY: z.string().optional(),
  GROK_API_KEY: z.string().optional(),
  GROK_MODEL: z.string().default("grok-4-fast"),
  AI_MONTHLY_BUDGET_USD: z.coerce.number().positive().default(1),
  PARENT_CONSENT_TOKEN_SECRET: z.string().min(16).optional(),
  RESEND_API_KEY: z.string().optional(),
  PARENT_CONSENT_FROM_EMAIL: z.string().email().optional(),
  ADMIN_ALERT_FROM_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
  BILLING_PROVIDER_MODE: z
    .enum(["stripe_external", "app_store_iap"])
    .catch("stripe_external"),
  ADMIN_ALERT_EMAILS: z.string().optional(),
  REQUIRE_ADMIN_APPROVALS: z
    .enum(["true", "false"])
    .default("true")
    .transform((value) => value === "true"),
});

const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional(),
  NEXT_PUBLIC_BILLING_PROVIDER_MODE: z.enum(["stripe_external", "app_store_iap"]).catch("stripe_external"),
});

const normalizedEnv = {
  ...process.env,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_KEY,
};

export const serverEnv = serverEnvSchema.parse(normalizedEnv);
export const publicEnv = publicEnvSchema.parse(normalizedEnv);
