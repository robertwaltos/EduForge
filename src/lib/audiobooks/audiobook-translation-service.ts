/**
 * Audiobook Translation Service
 *
 * Translates pre-seeded English chapter text into other supported languages
 * and stores the translated text back in Supabase Storage.
 *
 * Cache path: audiobooks-text/{bookSlug}/{lang}/ch{NNN}.json
 *
 * Uses the existing translation engine (DeepL → Google → Mock fallback)
 * from `src/lib/language-learning/providers.ts`.
 *
 * This service is used by:
 * - `scripts/seed-audiobook-translations.ts` (batch pre-translation)
 * - Future on-demand translation API (if needed)
 */

import { translateText } from "@/lib/language-learning/providers";
import {
  getCachedChapterText,
  setCachedChapterText,
  isChapterTextCached,
} from "@/lib/audiobooks/chapter-text-service";
import type {
  AudiobookLanguage,
  ChapterText,
} from "@/lib/audiobooks/types";

/* ── Constants ─────────────────────────────────────────────────────── */

/**
 * Maximum characters to translate in a single API call.
 * DeepL free tier: 500k chars/month. Google: per-request limits.
 * Paragraphs exceeding this are split and reassembled.
 */
const MAX_CHARS_PER_BATCH = 4_000;

/**
 * Separator used to batch paragraphs into a single translation call
 * while preserving paragraph boundaries. Uses a marker that won't
 * appear in normal text so we can split afterwards.
 */
const PARAGRAPH_SEPARATOR = "\n\n‖‖‖\n\n";

/* ── Types ─────────────────────────────────────────────────────────── */

export interface TranslateChapterOptions {
  bookSlug: string;
  chapterNumber: number;
  targetLanguage: AudiobookLanguage;
  /** Skip if translation already cached (default: true) */
  skipIfCached?: boolean;
  /** Override source language (default: "en") */
  sourceLanguage?: AudiobookLanguage;
}

export interface TranslateChapterResult {
  bookSlug: string;
  chapterNumber: number;
  targetLanguage: AudiobookLanguage;
  paragraphCount: number;
  cached: boolean;
  providerId: string;
  skipped: boolean;
}

export interface BatchTranslateOptions {
  bookSlug: string;
  chapters: number[];
  targetLanguage: AudiobookLanguage;
  /** Delay between chapters to avoid rate limits (ms, default: 500) */
  delayMs?: number;
  /** Retry failed chapter translations (default: 1 retry) */
  retryCount?: number;
  /** Delay before retrying a failed chapter (ms, default: 1500) */
  retryDelayMs?: number;
  /** Skip if translation already cached (default: true) */
  skipIfCached?: boolean;
  /** Callback after each chapter */
  onProgress?: (result: TranslateChapterResult) => void;
}

export interface BatchTranslateResult {
  bookSlug: string;
  targetLanguage: AudiobookLanguage;
  total: number;
  translated: number;
  skipped: number;
  failed: number;
  errors: Array<{ chapter: number; error: string; attempts: number }>;
}

async function translateChapterWithRetries(input: {
  bookSlug: string;
  chapterNumber: number;
  targetLanguage: AudiobookLanguage;
  skipIfCached: boolean;
  retryCount: number;
  retryDelayMs: number;
}) {
  const { bookSlug, chapterNumber, targetLanguage, skipIfCached, retryCount, retryDelayMs } = input;

  let attempt = 0;
  let lastError: unknown = null;

  while (attempt <= retryCount) {
    attempt += 1;
    try {
      const result = await translateChapter({
        bookSlug,
        chapterNumber,
        targetLanguage,
        skipIfCached,
      });
      return { result, attempts: attempt };
    } catch (error) {
      lastError = error;
      if (attempt > retryCount) {
        break;
      }
      if (retryDelayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
    }
  }

  throw {
    attempts: retryCount + 1,
    error: lastError,
  };
}

/* ── Core translation ──────────────────────────────────────────────── */

/**
 * Translate paragraphs in batches to stay within provider limits.
 * Groups small paragraphs together for efficiency.
 */
async function translateParagraphsBatched(
  paragraphs: string[],
  sourceLanguage: string,
  targetLanguage: string,
): Promise<{ translated: string[]; providerId: string }> {
  const translatedParagraphs: string[] = [];
  let lastProviderId = "unknown";

  // Group paragraphs into batches by character count
  const batches: string[][] = [];
  let currentBatch: string[] = [];
  let currentLength = 0;

  for (const paragraph of paragraphs) {
    const addition = paragraph.length + PARAGRAPH_SEPARATOR.length;
    if (currentLength + addition > MAX_CHARS_PER_BATCH && currentBatch.length > 0) {
      batches.push(currentBatch);
      currentBatch = [];
      currentLength = 0;
    }
    currentBatch.push(paragraph);
    currentLength += addition;
  }
  if (currentBatch.length > 0) {
    batches.push(currentBatch);
  }

  for (const batch of batches) {
    // Join paragraphs with a distinctive separator
    const batchedText = batch.join(PARAGRAPH_SEPARATOR);

    const result = await translateText({
      text: batchedText,
      sourceLanguage,
      targetLanguage,
      preserveFormatting: true,
      domain: "education",
    });

    lastProviderId = result.providerId;

    // Split translated text back into paragraphs
    const translatedBatch = result.translatedText
      .split(PARAGRAPH_SEPARATOR)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    // If split doesn't match, fall back to translating individually
    if (translatedBatch.length !== batch.length) {
      for (const paragraph of batch) {
        const singleResult = await translateText({
          text: paragraph,
          sourceLanguage,
          targetLanguage,
          preserveFormatting: true,
          domain: "education",
        });
        translatedParagraphs.push(singleResult.translatedText.trim());
        lastProviderId = singleResult.providerId;
      }
    } else {
      translatedParagraphs.push(...translatedBatch);
    }
  }

  return { translated: translatedParagraphs, providerId: lastProviderId };
}

/**
 * Translate a single chapter from English into the target language.
 * Reads the English source from Supabase, translates, stores result.
 */
export async function translateChapter(
  options: TranslateChapterOptions,
): Promise<TranslateChapterResult> {
  const {
    bookSlug,
    chapterNumber,
    targetLanguage,
    skipIfCached = true,
    sourceLanguage = "en",
  } = options;

  // Never translate English → English
  if (targetLanguage === sourceLanguage) {
    return {
      bookSlug,
      chapterNumber,
      targetLanguage,
      paragraphCount: 0,
      cached: true,
      providerId: "none",
      skipped: true,
    };
  }

  // Check if we already have this translation
  if (skipIfCached) {
    const exists = await isChapterTextCached(bookSlug, targetLanguage, chapterNumber);
    if (exists) {
      return {
        bookSlug,
        chapterNumber,
        targetLanguage,
        paragraphCount: 0,
        cached: true,
        providerId: "cached",
        skipped: true,
      };
    }
  }

  // Read English source
  const source = await getCachedChapterText(bookSlug, sourceLanguage, chapterNumber);
  if (!source) {
    throw new Error(
      `English source not found for ${bookSlug} chapter ${chapterNumber}. Seed English text first.`,
    );
  }

  // Translate all paragraphs
  const { translated, providerId } = await translateParagraphsBatched(
    source.paragraphs,
    sourceLanguage,
    targetLanguage,
  );

  // Build translated ChapterText
  const translatedChapter: ChapterText = {
    bookSlug,
    chapterNumber,
    chapterTitle: source.chapterTitle, // Keep original chapter heading
    language: targetLanguage,
    paragraphs: translated,
  };

  // Store in Supabase
  const stored = await setCachedChapterText(translatedChapter);
  if (!stored) {
    throw new Error(
      `Failed to store translation for ${bookSlug} ch${chapterNumber} in ${targetLanguage}`,
    );
  }

  return {
    bookSlug,
    chapterNumber,
    targetLanguage,
    paragraphCount: translated.length,
    cached: false,
    providerId,
    skipped: false,
  };
}

/**
 * Translate multiple chapters of a book into a target language.
 */
export async function translateBookChapters(
  options: BatchTranslateOptions,
): Promise<BatchTranslateResult> {
  const {
    bookSlug,
    chapters,
    targetLanguage,
    delayMs = 500,
    retryCount = 1,
    retryDelayMs = 1500,
    skipIfCached = true,
    onProgress,
  } = options;

  const result: BatchTranslateResult = {
    bookSlug,
    targetLanguage,
    total: chapters.length,
    translated: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  for (const chapterNumber of chapters) {
    try {
      const { result: chapterResult } = await translateChapterWithRetries({
        bookSlug,
        chapterNumber,
        targetLanguage,
        skipIfCached,
        retryCount,
        retryDelayMs,
      });

      if (chapterResult.skipped) {
        result.skipped++;
      } else {
        result.translated++;
      }

      onProgress?.(chapterResult);
    } catch (err: unknown) {
      const attempts = typeof err === "object" && err !== null && "attempts" in err
        ? Number((err as { attempts?: unknown }).attempts ?? retryCount + 1)
        : retryCount + 1;
      const errorValue = typeof err === "object" && err !== null && "error" in err
        ? (err as { error?: unknown }).error
        : err;

      result.failed++;
      result.errors.push({
        chapter: chapterNumber,
        error: errorValue instanceof Error ? errorValue.message : String(errorValue),
        attempts: Number.isFinite(attempts) ? attempts : retryCount + 1,
      });
    }

    // Delay between chapters to avoid rate limits
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return result;
}
