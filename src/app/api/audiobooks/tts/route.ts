/**
 * POST /api/audiobooks/tts
 *
 * On-demand audiobook chapter TTS.
 *
 * Accepts a book slug, chapter, language, voice, and chapter text,
 * then generates (or returns cached) audio.  The cache key includes
 * the voice so different voice selections produce separate cached files.
 *
 * Rate-limited to 10 req/min per IP (chapters are longer than lessons).
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { OPENAI_VOICES } from "@/lib/media/tts-service";
import type { OpenAIVoice } from "@/lib/media/tts-service";
import { generateAudiobookChapterTTS } from "@/lib/audiobooks/audiobook-tts-service";
import { isChapterAudioCached } from "@/lib/audiobooks/audiobook-tts-service";
import { AUDIOBOOK_LANGUAGES, type AudiobookLanguage } from "@/lib/audiobooks/types";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { requirePaidTier } from "@/lib/forge/tier-gate";

const requestSchema = z.object({
  bookSlug: z
    .string()
    .min(1, "bookSlug is required")
    .max(128, "bookSlug too long")
    .regex(/^[a-z0-9-]+$/, "bookSlug must be a URL-safe slug"),
  chapterNumber: z
    .number()
    .int()
    .min(1, "chapterNumber must be ≥ 1")
    .max(200, "chapterNumber must be ≤ 200"),
  language: z.enum(AUDIOBOOK_LANGUAGES as unknown as [string, ...string[]]),
  voiceId: z
    .enum(OPENAI_VOICES.map((v) => v.id) as [string, ...string[]])
    .optional()
    .default("nova"),
  chapterText: z
    .string()
    .min(1, "chapterText is required")
    .max(50_000, "chapterText too long (max 50 000 chars)"),
});

export async function POST(req: NextRequest) {
  try {
    /* ── Rate limit (more generous for chapter-level requests) ──── */
    const rateLimit = await enforceIpRateLimit(req, "api:audiobooks:tts:post", {
      max: 10,
      windowMs: 60_000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many audiobook TTS requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    /* ── Validate ──────────────────────────────────────────────── */
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    /* ── FORGE tier gate: free users can only access pre-cached audio ── */
    const cached = await isChapterAudioCached(
      parsed.data.bookSlug,
      parsed.data.language as AudiobookLanguage,
      parsed.data.voiceId as OpenAIVoice,
      parsed.data.chapterNumber,
    );

    if (!cached) {
      // Audio not pre-generated — check if user can trigger cloud generation
      const gate = await requirePaidTier(req);
      if (gate) return gate; // 403 for free tier
    }

    /* ── Generate / return cached audio ────────────────────────── */
    const result = await generateAudiobookChapterTTS({
      bookSlug: parsed.data.bookSlug,
      chapterNumber: parsed.data.chapterNumber,
      language: parsed.data.language as AudiobookLanguage,
      voiceId: parsed.data.voiceId as OpenAIVoice,
      chapterText: parsed.data.chapterText,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("[api/audiobooks/tts]", toSafeErrorRecord(err));

    return NextResponse.json(
      { error: "Audiobook TTS temporarily unavailable." },
      { status: 503 },
    );
  }
}
