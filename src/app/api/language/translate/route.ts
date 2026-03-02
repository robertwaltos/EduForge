import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getLanguageProviderStatuses, translateText } from "@/lib/language-learning";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { canUseCloudAI } from "@/lib/forge/tier-gate";

const requestSchema = z.object({
  text: z.string().min(1).max(5_000),
  targetLanguage: z.string().min(2).max(16),
  sourceLanguage: z.string().min(2).max(16).optional(),
  preserveFormatting: z.boolean().optional(),
  domain: z.string().min(1).max(64).optional(),
  preferredProviderId: z.enum(["auto", "mock", "deepl", "google"]).optional(),
});

export async function POST(request: NextRequest) {
  const rateLimit = await enforceIpRateLimit(request, "api:language:translate:post", {
    max: 30,
    windowMs: 60_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many translation requests. Please retry shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request payload",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  /* ── FORGE tier gate: free users cannot use live translation ── */
  const allowed = await canUseCloudAI(user.id);
  if (!allowed) {
    return NextResponse.json(
      {
        error: "Premium subscription required",
        code: "TIER_GATE_FREE",
        message: "Live translation requires a paid subscription. Pre-translated content is available for free users.",
        upgradeUrl: "/pricing",
      },
      { status: 403 },
    );
  }

  try {
    const translation = await translateText(parsed.data);
    return NextResponse.json({ translation });
  } catch (error) {
    console.error("Translation request failed.", toSafeErrorRecord(error));
    return NextResponse.json(
      {
        error: "Translation request failed",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    route: "/api/language/translate",
    method: "POST",
    auth: "required",
    providers: getLanguageProviderStatuses().translation,
    bodyExample: {
      text: "Hello world",
      sourceLanguage: "en",
      targetLanguage: "es",
      preferredProviderId: "auto",
    },
  });
}
