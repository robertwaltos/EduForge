/**
 * POST /api/tts/generate
 *
 * Generates or retrieves cached TTS audio for the given text.
 * Falls back through provider chain: OpenAI → ElevenLabs.
 * If all fail, returns { fallback: "browser" } so the client
 * uses the browser SpeechSynthesis API.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateTTS, OPENAI_VOICES, type OpenAIVoice } from "@/lib/media/tts-service";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { requirePaidTier } from "@/lib/forge/tier-gate";

const requestSchema = z.object({
  text: z
    .string()
    .min(1, "text is required")
    .max(4096, "text too long (max 4096 chars)"),
  voice: z
    .enum(OPENAI_VOICES.map((v) => v.id) as [string, ...string[]])
    .optional()
    .default("nova"),
  lessonId: z.string().optional(),
  skipCache: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await enforceIpRateLimit(req, "api:tts:generate:post", {
      max: 20,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { fallback: "browser", error: "Too many TTS requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    /* ── FORGE tier gate: free users use browser SpeechSynthesis ── */
    const gate = await requirePaidTier(req);
    if (gate) {
      return NextResponse.json(
        { fallback: "browser", error: "Premium subscription required for cloud TTS." },
        { status: 403 },
      );
    }

    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = await generateTTS({
      text: parsed.data.text,
      voice: parsed.data.voice as OpenAIVoice,
      lessonId: parsed.data.lessonId ?? undefined,
      skipCache: parsed.data.skipCache,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/tts/generate]", toSafeErrorRecord(err));

    // Signal client to fall back to browser TTS
    return NextResponse.json(
      { fallback: "browser", error: "TTS temporarily unavailable." },
      { status: 503 }
    );
  }
}
