/**
 * Audiobook TTS Service — generates and caches chapter-level audio.
 *
 * Extends the existing TTS infrastructure with book-aware cache keys:
 *   audiobooks/{bookSlug}/{lang}/{voiceId}/ch{NNN}.mp3
 *
 * Flow:
 *   1. Check Supabase Storage cache for existing audio
 *   2. Cache miss → call existing TTS provider chain (OpenAI → ElevenLabs)
 *   3. Store result in Supabase Storage with immutable cache headers
 *   4. Return public URL (subsequent requests are $0)
 *
 * For long chapters (>4096 chars), text is split into segments, generated
 * individually, then concatenated before caching.
 */

import { serverEnv } from "@/lib/config/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateTTS } from "@/lib/media/tts-service";

import {
  audiobookCacheKey,
  type AudiobookLanguage,
  type AudiobookTTSRequest,
  type AudiobookTTSResult,
} from "@/lib/audiobooks/types";
import type { OpenAIVoice } from "@/lib/media/tts-service";

/* ── Constants ─────────────────────────────────────────────────────── */

const AUDIOBOOK_BUCKET = "tts-audio"; // reuse existing bucket with audiobooks/ prefix
const MAX_TTS_CHARS = 4096; // OpenAI TTS max input length

/* ── Cache helpers ─────────────────────────────────────────────────── */

async function getCachedAudiobookAudio(key: string): Promise<string | null> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data } = supabase.storage.from(AUDIOBOOK_BUCKET).getPublicUrl(key);
    if (!data?.publicUrl) return null;

    // Verify file actually exists
    const parts = key.split("/");
    const folder = parts.slice(0, -1).join("/");
    const fileName = parts.at(-1) ?? "";

    const { data: files } = await supabase.storage
      .from(AUDIOBOOK_BUCKET)
      .list(folder, { limit: 1, search: fileName });

    if (!files || files.length === 0) return null;
    return data.publicUrl;
  } catch {
    return null;
  }
}

async function setCachedAudiobookAudio(
  key: string,
  audioBuffer: Buffer,
): Promise<string | null> {
  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.storage
      .from(AUDIOBOOK_BUCKET)
      .upload(key, audioBuffer, {
        contentType: "audio/mpeg",
        cacheControl: "public, max-age=31536000, immutable",
        upsert: true,
      });

    if (error) {
      console.warn("[audiobook-tts] cache write failed:", error.message);
      return null;
    }

    const { data } = supabase.storage.from(AUDIOBOOK_BUCKET).getPublicUrl(key);
    return data?.publicUrl ?? null;
  } catch (err) {
    console.warn("[audiobook-tts] cache write error:", err);
    return null;
  }
}

/* ── Text splitting ────────────────────────────────────────────────── */

/**
 * Split long text into TTS-friendly segments at paragraph/sentence boundaries.
 * Each segment stays under MAX_TTS_CHARS.
 */
function splitTextForTTS(text: string): string[] {
  if (text.length <= MAX_TTS_CHARS) return [text];

  const paragraphs = text.split(/\n\n+/);
  const segments: string[] = [];
  let current = "";

  for (const paragraph of paragraphs) {
    // If a single paragraph exceeds the limit, split by sentences
    if (paragraph.length > MAX_TTS_CHARS) {
      if (current.trim()) {
        segments.push(current.trim());
        current = "";
      }
      const sentences = paragraph.match(/[^.!?]+[.!?]+\s*/g) ?? [paragraph];
      for (const sentence of sentences) {
        if ((current + sentence).length > MAX_TTS_CHARS) {
          if (current.trim()) segments.push(current.trim());
          current = sentence;
        } else {
          current += sentence;
        }
      }
      continue;
    }

    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
    if (candidate.length > MAX_TTS_CHARS) {
      if (current.trim()) segments.push(current.trim());
      current = paragraph;
    } else {
      current = candidate;
    }
  }

  if (current.trim()) segments.push(current.trim());
  return segments;
}

/* ── Duration estimation ───────────────────────────────────────────── */

function estimateDurationMs(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.round((words / 150) * 60 * 1000);
}

/* ── Main function ─────────────────────────────────────────────────── */

/**
 * Generate (or retrieve cached) audiobook chapter audio.
 *
 * Uses the existing TTS provider chain for segment generation,
 * then concatenates segments and caches the full chapter.
 */
export async function generateAudiobookChapterTTS(
  request: AudiobookTTSRequest,
): Promise<AudiobookTTSResult> {
  const { bookSlug, chapterNumber, language: _lang, voiceId, chapterText } = request;
  const key = audiobookCacheKey(bookSlug, request.language, voiceId, chapterNumber);

  // 1. Check cache
  const cachedUrl = await getCachedAudiobookAudio(key);
  if (cachedUrl) {
    return {
      audioUrl: cachedUrl,
      cached: true,
      provider: "openai",
      durationEstimateMs: estimateDurationMs(chapterText),
    };
  }

  // 2. Split text into TTS-friendly segments
  const segments = splitTextForTTS(chapterText);

  // 3. Generate audio for each segment using existing TTS service
  const audioBuffers: Buffer[] = [];

  for (const segment of segments) {
    const result = await generateTTS({
      text: segment,
      voice: voiceId,
      // Use a unique cache key per segment so individual segments are also cached
      skipCache: false,
    });

    // Fetch the audio data from the URL to concatenate
    const response = await fetch(result.audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch segment audio: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    audioBuffers.push(Buffer.from(arrayBuffer));
  }

  // 4. Concatenate all MP3 segments
  // MP3 frames are self-contained, so simple concatenation works
  const fullAudio = Buffer.concat(audioBuffers);

  // 5. Cache the complete chapter audio
  const publicUrl = await setCachedAudiobookAudio(key, fullAudio);

  if (publicUrl) {
    return {
      audioUrl: publicUrl,
      cached: false,
      provider: "openai",
      durationEstimateMs: estimateDurationMs(chapterText),
    };
  }

  // 6. Fallback: return base64 data URL
  const base64 = fullAudio.toString("base64");
  return {
    audioUrl: `data:audio/mpeg;base64,${base64}`,
    cached: false,
    provider: "openai",
    durationEstimateMs: estimateDurationMs(chapterText),
  };
}

/* ── Batch seeding helper ──────────────────────────────────────────── */

export interface SeedConfig {
  bookSlug: string;
  chapterText: string;
  chapterNumber: number;
  language: AudiobookLanguage;
  voiceId: OpenAIVoice;
}

/**
 * Check if a chapter audio file already exists in cache.
 * Used by the seed script to skip already-generated files.
 */
export async function isChapterAudioCached(
  bookSlug: string,
  language: AudiobookLanguage,
  voiceId: OpenAIVoice,
  chapterNumber: number,
): Promise<boolean> {
  const key = audiobookCacheKey(bookSlug, language, voiceId, chapterNumber);
  const url = await getCachedAudiobookAudio(key);
  return url !== null;
}
