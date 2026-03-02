/**
 * Audiobook types — shared across the audiobook reading system.
 *
 * Cache key format:
 *   audiobooks/{bookSlug}/{lang}/{voiceId}/ch{NNN}.mp3
 *
 * This ensures each unique combination of book + chapter + language + voice
 * is generated exactly once, then served from Supabase Storage forever.
 */

import type { OpenAIVoice } from "@/lib/media/tts-service";

/* ── Language codes supported for audiobook translation & TTS ──────── */

export const AUDIOBOOK_LANGUAGES = [
  "en",
  "es",
  "zh",
  "ja",
  "ko",
  "pt",
  "fr",
  "de",
  "pl",
] as const;
export type AudiobookLanguage = (typeof AUDIOBOOK_LANGUAGES)[number];

export const AUDIOBOOK_LANGUAGE_LABELS: Record<AudiobookLanguage, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  pl: "Polski",
};

/* ── Catalog entry for a single book ───────────────────────────────── */

export type AgeGroup = "children" | "teen" | "adult" | "all-ages";

export interface AudiobookEntry {
  /** URL-safe slug, e.g. "alice-in-wonderland" */
  slug: string;
  title: string;
  author: string;
  /** Project Gutenberg eBook ID (for sourcing text) */
  gutenbergId: number;
  ageGroup: AgeGroup;
  /** Total chapters in the source text */
  chapterCount: number;
  /** Approximate word count of the entire book */
  wordCount: number;
  /** ISO language code of the original source text */
  originalLanguage: AudiobookLanguage;
  /** Genre tags for filtering / display */
  genres: string[];
  /** Year of first publication */
  yearPublished?: number;
}

/* ── Chapter text (stored after download + optional translation) ──── */

export interface ChapterText {
  bookSlug: string;
  chapterNumber: number;
  chapterTitle: string;
  language: AudiobookLanguage;
  /** The full chapter text, paragraph-separated */
  paragraphs: string[];
}

/* ── Cache key helpers ─────────────────────────────────────────────── */

/**
 * Storage path for a cached audiobook chapter audio file.
 *
 * Format: `audiobooks/{bookSlug}/{lang}/{voiceId}/ch{NNN}.mp3`
 *
 * Example: `audiobooks/alice-in-wonderland/es/nova/ch001.mp3`
 */
export function audiobookCacheKey(
  bookSlug: string,
  language: AudiobookLanguage,
  voiceId: OpenAIVoice,
  chapterNumber: number,
): string {
  const ch = String(chapterNumber).padStart(3, "0");
  return `audiobooks/${bookSlug}/${language}/${voiceId}/ch${ch}.mp3`;
}

/**
 * Storage path for chapter text JSON (translation cache).
 *
 * Format: `audiobooks-text/{bookSlug}/{lang}/ch{NNN}.json`
 */
export function chapterTextCacheKey(
  bookSlug: string,
  language: AudiobookLanguage,
  chapterNumber: number,
): string {
  const ch = String(chapterNumber).padStart(3, "0");
  return `audiobooks-text/${bookSlug}/${language}/ch${ch}.json`;
}

/* ── TTS request/result for audiobooks ─────────────────────────────── */

export interface AudiobookTTSRequest {
  bookSlug: string;
  chapterNumber: number;
  language: AudiobookLanguage;
  voiceId: OpenAIVoice;
  /** Chapter text — passed by the caller (fetched from text cache or catalog) */
  chapterText: string;
}

export interface AudiobookTTSResult {
  audioUrl: string;
  cached: boolean;
  provider: "openai" | "elevenlabs" | "local" | "browser";
  durationEstimateMs: number;
}

/* ── Illustrated book types ────────────────────────────────────────── */

export type ReadingLevel = "pre-reader" | "early-reader" | "independent";

/**
 * Extended entry for books with illustrations (picture books).
 *
 * Illustrations are served from Project Gutenberg's image CDN:
 *   https://www.gutenberg.org/files/{gutenbergId}/images/{filename}
 *
 * Serving strategy:
 * 1. At build time, a script scrapes the Gutenberg HTML for the book,
 *    extracting illustration URLs + captions + page positions.
 * 2. The manifest is stored as JSON in Supabase Storage:
 *    `audiobooks-illustrations/{bookSlug}/manifest.json`
 * 3. Images are proxied through our `/api/media/gutenberg-image` route
 *    to avoid CORS issues and add CDN caching headers.
 * 4. The illustrated reader renders pages with:
 *    - Full-bleed illustration (lazy loaded, AVIF → WebP → JPEG fallback)
 *    - Text overlay or adjacent panel (depending on readingLevel)
 *    - Audio playback synced to the current page (TTS of the page text)
 * 5. Pre-reader mode: auto-advance pages with audio, highlight words.
 *    Early-reader mode: tap-to-read words, audio on demand.
 *    Independent mode: standard audiobook + inline illustrations.
 */
export interface IllustratedAudiobookEntry extends AudiobookEntry {
  hasIllustrations: true;
  /** Number of pages (≈ illustrations) */
  pageCount: number;
  /** Where the illustrations come from */
  illustrationSource: "gutenberg" | "custom";
  /** Reading level determines UI mode */
  readingLevel: ReadingLevel;
}

/** A single illustration page in the manifest */
export interface IllustrationPage {
  /** 1-indexed page number */
  pageNumber: number;
  /** URL path relative to gutenberg files dir */
  imageFilename: string;
  /** Alt text / caption */
  caption: string;
  /** The text on this page (short — typically 1-3 sentences) */
  pageText: string;
  /** Width × height of the original image */
  dimensions?: { width: number; height: number };
}

/** Manifest stored per illustrated book in Supabase Storage */
export interface IllustrationManifest {
  bookSlug: string;
  gutenbergId: number;
  pages: IllustrationPage[];
  /** Base URL for images, e.g. /api/media/gutenberg-image?id=14838&file= */
  imageBaseUrl: string;
}

/**
 * Gutenberg image proxy cache key.
 *
 * Format: `audiobooks-illustrations/{bookSlug}/{filename}`
 */
export function illustrationCacheKey(
  bookSlug: string,
  filename: string,
): string {
  return `audiobooks-illustrations/${bookSlug}/${filename}`;
}
