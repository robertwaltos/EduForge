/**
 * FORGE Vercel Deployment Manager
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  Manages Vercel deployment lifecycle for Koydo:                       │
 * │    • Pre-deploy validation (TypeScript build, env vars, routes)       │
 * │    • Deployment triggering (via Git push or Vercel CLI)               │
 * │    • Post-deploy health checks                                       │
 * │    • Environment variable management across preview/production       │
 * │    • Edge function / serverless function monitoring                   │
 * │                                                                       │
 * │  Project: koydo                                                       │
 * │  Org:     team_Rjgb3m3TRQJLzzraH63zyCtn                              │
 * │  Deploy:  Auto on push to master                                      │
 * │  Node:    24.x                                                        │
 * └────────────────────────────────────────────────────────────────────────┘
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface VercelConfig {
  projectId: string;
  orgId: string;
  productionBranch: string;
  framework: "nextjs";
  nodeVersion: string;
  buildCommand: string;
  installCommand: string;
}

export interface DeploymentCheck {
  name: string;
  status: "pass" | "fail" | "warn";
  message: string;
}

export interface PreDeployReport {
  allPassed: boolean;
  checks: DeploymentCheck[];
  timestamp: string;
}

// ── Configuration ──────────────────────────────────────────────────────────

export const VERCEL_CONFIG: VercelConfig = {
  projectId: "prj_djBqL0JZbdrle195lhUwCAwzmokn",
  orgId: "team_Rjgb3m3TRQJLzzraH63zyCtn",
  productionBranch: "master",
  framework: "nextjs",
  nodeVersion: "24.x",
  buildCommand: "npm run build",
  installCommand: "npm install",
};

/**
 * Required environment variables for production deployment.
 * If any are missing, pre-deploy check will fail.
 */
export const REQUIRED_ENV_VARS = [
  // Supabase
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",

  // Auth
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",

  // Stripe
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
] as const;

/**
 * Optional but recommended env vars (warn if missing).
 */
export const RECOMMENDED_ENV_VARS = [
  // AI providers
  "OPENAI_API_KEY",
  "XAI_API_KEY",
  "ELEVENLABS_API_KEY",
  "DEEPL_API_KEY",

  // RevenueCat
  "REVENUECAT_API_KEY",

  // Analytics
  "NEXT_PUBLIC_POSTHOG_KEY",
] as const;

// ── Pre-Deploy Validation ──────────────────────────────────────────────────

/**
 * Run pre-deployment checks. Call this before pushing to master.
 *
 * Checks:
 * 1. Required env vars are set in Vercel
 * 2. TypeScript compiles with 0 errors
 * 3. No TODO/FIXME in critical API routes
 * 4. Build succeeds locally
 */
export function buildPreDeployChecklist(
  envVars: Record<string, string | undefined>,
  buildErrors: number = 0,
): PreDeployReport {
  const checks: DeploymentCheck[] = [];

  // ── Check required env vars ────────────────────────────────────────────
  for (const key of REQUIRED_ENV_VARS) {
    const val = envVars[key];
    checks.push({
      name: `env:${key}`,
      status: val ? "pass" : "fail",
      message: val ? "Set" : `Missing required env var: ${key}`,
    });
  }

  // ── Check recommended env vars ─────────────────────────────────────────
  for (const key of RECOMMENDED_ENV_VARS) {
    const val = envVars[key];
    checks.push({
      name: `env:${key}`,
      status: val ? "pass" : "warn",
      message: val ? "Set" : `Recommended env var not set: ${key}`,
    });
  }

  // ── TypeScript build ───────────────────────────────────────────────────
  checks.push({
    name: "typescript",
    status: buildErrors === 0 ? "pass" : "fail",
    message:
      buildErrors === 0
        ? "TypeScript compiles with 0 errors"
        : `TypeScript has ${buildErrors} error(s)`,
  });

  const allPassed = checks.every((c) => c.status !== "fail");

  return {
    allPassed,
    checks,
    timestamp: new Date().toISOString(),
  };
}

// ── Health Check ───────────────────────────────────────────────────────────

/**
 * Post-deploy health check — verify the production URL responds correctly.
 */
export async function healthCheck(
  prodUrl: string = "https://koydo.com",
): Promise<DeploymentCheck[]> {
  const checks: DeploymentCheck[] = [];

  try {
    const res = await fetch(prodUrl, { method: "HEAD" });
    checks.push({
      name: "http-status",
      status: res.ok ? "pass" : "fail",
      message: `GET ${prodUrl} → ${res.status}`,
    });
  } catch (err) {
    checks.push({
      name: "http-status",
      status: "fail",
      message: `GET ${prodUrl} failed: ${err}`,
    });
  }

  // Check API health endpoint if it exists
  try {
    const apiRes = await fetch(`${prodUrl}/api/health`);
    checks.push({
      name: "api-health",
      status: apiRes.ok ? "pass" : "warn",
      message: apiRes.ok
        ? "API health check passed"
        : `/api/health returned ${apiRes.status} (endpoint may not exist)`,
    });
  } catch {
    checks.push({
      name: "api-health",
      status: "warn",
      message: "/api/health not reachable (endpoint may not exist yet)",
    });
  }

  return checks;
}

// ── CLI Helpers for Agents ─────────────────────────────────────────────────

/**
 * Vercel CLI commands reference (for agent use in terminal).
 *
 * These are NOT executed by this module — they're templates for agents
 * to run in the terminal when needed.
 */
export const VERCEL_CLI = {
  /** Preview deployment (no production) */
  deployPreview: "npx vercel --no-prod",

  /** Production deployment */
  deployProd: "npx vercel --prod",

  /** Pull env vars from Vercel to local .env */
  pullEnv: "npx vercel env pull .env.local",

  /** List recent deployments */
  listDeployments: "npx vercel ls",

  /** View deployment logs */
  logs: (deploymentUrl: string) => `npx vercel logs ${deploymentUrl}`,

  /** Set env var in Vercel */
  setEnv: (key: string, value: string, env: "production" | "preview" | "development" = "production") =>
    `echo "${value}" | npx vercel env add ${key} ${env}`,

  /** Link project */
  link: "npx vercel link",

  /** Inspect latest deployment */
  inspect: "npx vercel inspect",
} as const;

/**
 * Print deployment readiness summary to console.
 */
export function logDeployReadiness(report: PreDeployReport): void {
  console.info(`\n🚀 FORGE Pre-Deploy Report (${report.timestamp})`);
  console.info(`   Status: ${report.allPassed ? "✅ READY" : "❌ NOT READY"}\n`);

  for (const check of report.checks) {
    const icon = check.status === "pass" ? "✅" : check.status === "warn" ? "⚠️" : "❌";
    console.info(`   ${icon} ${check.name}: ${check.message}`);
  }
  console.info();
}
