/**
 * Voice Mapping — Maps OpenAI voices to local TTS equivalents.
 *
 * Primary local engine: **Kokoro-82M** (Apache 2.0, 82M params)
 *   - Has voices literally named after 5 of 6 OpenAI voices
 *   - Trained on synthetic data from large providers
 *   - Supports: en, es, fr, pt, ja, zh, hi, it
 *
 * Fallback engine: **Coqui XTTS v2** (voice cloning, 16 languages)
 *   - Fills gaps for German, Korean, Polish (Kokoro doesn't support)
 *   - 3-second reference clip for voice cloning
 *   - Streaming inference <200ms latency
 *
 * Mapping strategy:
 *   1. For languages Kokoro supports → use Kokoro with named-match voice
 *   2. For languages only XTTS supports → clone from Kokoro reference audio
 *   3. For live/on-demand TTS → still use OpenAI API (existing flow)
 */

import type { OpenAIVoice } from "@/lib/media/tts-service";

/* ── Provider types ────────────────────────────────────────────────── */

export type LocalTTSProvider = "kokoro" | "xtts-v2";

/**
 * All languages supported across our local TTS stack.
 * Kokoro: en, es, fr, pt, ja, zh, hi, it
 * XTTS v2: en, es, fr, de, pt, pl, ja, zh, ko, it, tr, ru, nl, cs, ar, hu
 */
export const LOCAL_TTS_LANGUAGES = [
  "en", "es", "fr", "de", "pt", "pl", "ja", "zh", "ko", "hi", "it",
] as const;
export type LocalTTSLanguage = (typeof LOCAL_TTS_LANGUAGES)[number];

/* ── Kokoro voice IDs ──────────────────────────────────────────────── */

/**
 * Kokoro-82M voice identifiers.
 * Naming convention: {accent}{gender}_{name}
 *   a = American, b = British
 *   f = female, m = male
 *
 * Notable: 5 of 6 OpenAI voices have exact name matches in Kokoro,
 * because Kokoro was trained on synthetic data from "large providers".
 */
export const KOKORO_VOICES = {
  // Direct OpenAI matches (5/6)
  af_alloy: { gender: "female", accent: "american", matchesOpenAI: "alloy" as const },
  af_nova: { gender: "female", accent: "american", matchesOpenAI: "nova" as const },
  am_echo: { gender: "male", accent: "american", matchesOpenAI: "echo" as const },
  am_onyx: { gender: "male", accent: "american", matchesOpenAI: "onyx" as const },
  bm_fable: { gender: "male", accent: "british", matchesOpenAI: "fable" as const },

  // Best match for "shimmer" — af_heart is Kokoro's highest quality female voice (❤️)
  af_heart: { gender: "female", accent: "american", matchesOpenAI: "shimmer" as const },

  // Additional high-quality voices (available for future expansion)
  af_sky: { gender: "female", accent: "american", matchesOpenAI: null },
  af_bella: { gender: "female", accent: "american", matchesOpenAI: null },
  af_sarah: { gender: "female", accent: "american", matchesOpenAI: null },
  am_adam: { gender: "male", accent: "american", matchesOpenAI: null },
  am_michael: { gender: "male", accent: "american", matchesOpenAI: null },
  bf_emma: { gender: "female", accent: "british", matchesOpenAI: null },
  bf_isabella: { gender: "female", accent: "british", matchesOpenAI: null },
  bm_george: { gender: "male", accent: "british", matchesOpenAI: null },
  bm_lewis: { gender: "male", accent: "british", matchesOpenAI: null },
} as const;

export type KokoroVoiceId = keyof typeof KOKORO_VOICES;

/* ── OpenAI → Kokoro mapping ──────────────────────────────────────── */

/**
 * Maps each OpenAI voice to its Kokoro equivalent.
 * 5 have literal name matches; shimmer → af_heart (highest quality female voice).
 */
export const OPENAI_TO_KOKORO: Record<OpenAIVoice, KokoroVoiceId> = {
  alloy: "af_alloy",
  nova: "af_nova",
  echo: "am_echo",
  onyx: "am_onyx",
  fable: "bm_fable",
  shimmer: "af_heart",
};

/* ── Language → provider routing ───────────────────────────────────── */

/**
 * Kokoro lang_code mapping. These map our AudiobookLanguage codes
 * to Kokoro's single-character language codes.
 */
export const KOKORO_LANG_CODES: Record<string, string> = {
  en: "a", // American English (use 'b' for British)
  es: "e", // Spanish
  fr: "f", // French
  pt: "p", // Brazilian Portuguese
  ja: "j", // Japanese
  zh: "z", // Mandarin Chinese
  hi: "h", // Hindi
  it: "i", // Italian
};

/**
 * Languages that require XTTS v2 because Kokoro doesn't support them.
 */
export const XTTS_ONLY_LANGUAGES = new Set(["de", "ko", "pl"]);

/**
 * Determine which local TTS provider to use for a given language.
 */
export function getLocalProvider(language: string): LocalTTSProvider {
  if (XTTS_ONLY_LANGUAGES.has(language)) return "xtts-v2";
  if (language in KOKORO_LANG_CODES) return "kokoro";
  // Default to XTTS v2 for any unsupported language (broadest coverage)
  return "xtts-v2";
}

/* ── Pre-generation config ─────────────────────────────────────────── */

/**
 * Configuration for batch pre-generation of audiobook audio.
 * Used by the local TTS pipeline scripts.
 */
export interface LocalTTSConfig {
  /** Which provider handles this language */
  provider: LocalTTSProvider;
  /** Kokoro lang_code (null for XTTS) */
  kokoroLangCode: string | null;
  /** Kokoro voice ID mapped from OpenAI voice */
  kokoroVoiceId: KokoroVoiceId | null;
  /** For XTTS: path to reference audio clip for voice cloning */
  xttsReferenceClip: string | null;
}

/**
 * Build local TTS config for a given OpenAI voice + target language.
 */
export function getLocalTTSConfig(
  openaiVoice: OpenAIVoice,
  language: string,
): LocalTTSConfig {
  const provider = getLocalProvider(language);

  if (provider === "kokoro") {
    return {
      provider: "kokoro",
      kokoroLangCode: KOKORO_LANG_CODES[language] ?? "a",
      kokoroVoiceId: OPENAI_TO_KOKORO[openaiVoice],
      xttsReferenceClip: null,
    };
  }

  // XTTS v2 — needs a reference audio clip for voice cloning
  // Reference clips stored at: data/voice-references/{kokoroVoiceId}.wav
  const kokoroVoice = OPENAI_TO_KOKORO[openaiVoice];
  return {
    provider: "xtts-v2",
    kokoroLangCode: null,
    kokoroVoiceId: null,
    xttsReferenceClip: `data/voice-references/${kokoroVoice}.wav`,
  };
}

/* ── Batch pre-generation plan ─────────────────────────────────────── */

/**
 * Priority languages for audiobook pre-generation, in order of
 * expected demand based on target market analysis.
 */
export const PREGEN_LANGUAGE_PRIORITY = [
  "en", // English — highest demand, original language
  "es", // Spanish — 2nd largest market
  "zh", // Mandarin Chinese — 3rd largest market
  "pt", // Portuguese — Brazil market
  "fr", // French — francophone Africa + Europe
  "ja", // Japanese — Japan market
  "de", // German — DACH market (XTTS v2)
  "ko", // Korean — South Korea market (XTTS v2)
  "pl", // Polish — Poland market (XTTS v2)
] as const;

/**
 * Voices to pre-generate per book. We pre-generate a subset
 * to control storage costs while covering the most popular choices.
 *
 *   - nova: most popular female voice (default)
 *   - onyx: most popular male voice
 *   - fable: British accent option
 */
export const PREGEN_VOICES: OpenAIVoice[] = ["nova", "onyx", "fable"];

/**
 * Estimate pre-generation costs for the full catalog.
 *
 * Kokoro-82M: Free (runs locally on GPU)
 * XTTS v2: Free (runs locally on GPU)
 *
 * Cost breakdown (all local):
 *   - GPU electricity: ~$0.05-0.10/hour (consumer GPU)
 *   - Storage: ~2.5 KB/sec MP3 = ~9 MB/hour of audio
 *   - 1000 children's books × avg 10 chapters × 3 voices × 9 langs ≈ 270K chapters
 *   - At ~5 min/chapter avg = 22,500 hrs audio → ~200TB storage
 *   - Realistic subset: Ch.1-3 × 3 voices × 3 priority langs ≈ 27K chapters
 *   -   → ~2,250 hrs audio → ~18GB storage → very manageable
 *
 * Phase 1: English only, 3 voices, Ch.1 per book → ~4,500 chapters → ~375 hrs → ~3GB
 */
export interface PregenEstimate {
  totalChapters: number;
  estimatedHoursOfAudio: number;
  estimatedStorageGB: number;
  estimatedGPUHours: number;
}

export function estimatePregen(
  bookCount: number,
  avgChaptersPerBook: number,
  voiceCount: number,
  languageCount: number,
): PregenEstimate {
  const totalChapters = bookCount * avgChaptersPerBook * voiceCount * languageCount;
  const avgChapterMinutes = 5; // ~5 min per chapter at 150 wpm × 750 words
  const estimatedHoursOfAudio = (totalChapters * avgChapterMinutes) / 60;
  // MP3 at 64kbps ≈ 0.48 MB/min
  const estimatedStorageGB = (estimatedHoursOfAudio * 60 * 0.48) / 1024;
  // Kokoro generates ~10x realtime on consumer GPU
  const estimatedGPUHours = estimatedHoursOfAudio / 10;

  return {
    totalChapters,
    estimatedHoursOfAudio,
    estimatedStorageGB,
    estimatedGPUHours,
  };
}
