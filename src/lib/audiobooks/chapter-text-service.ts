/**
 * Chapter Text Service — stores and retrieves pre-seeded chapter text.
 *
 * All chapter text lives in Supabase Storage as JSON files:
 *   audiobooks-text/{bookSlug}/{lang}/ch{NNN}.json
 *
 * IMPORTANT: This service NEVER fetches from Gutenberg at request time.
 * All text must be pre-seeded via `scripts/seed-audiobook-texts.ts`.
 * This ensures zero external dependencies at runtime.
 *
 * For translations, the audiobook-translation-service handles converting
 * English text into other languages and storing the result.
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  chapterTextCacheKey,
  type AudiobookLanguage,
  type ChapterText,
} from "@/lib/audiobooks/types";

/* ── Constants ─────────────────────────────────────────────────────── */

const TEXT_BUCKET = "tts-audio"; // reuse existing bucket with audiobooks-text/ prefix

/* ── Gutenberg text processing (used by seed scripts only) ─────────── */

const START_MARKERS = [
  "*** START OF THE PROJECT GUTENBERG",
  "*** START OF THIS PROJECT GUTENBERG",
  "*END*THE SMALL PRINT",
];

const END_MARKERS = [
  "*** END OF THE PROJECT GUTENBERG",
  "*** END OF THIS PROJECT GUTENBERG",
  "End of the Project Gutenberg",
  "End of Project Gutenberg",
];

const ROMAN_NUMERALS = [
  "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
  "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX",
  "XXXI", "XXXII", "XXXIII", "XXXIV", "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX", "XL",
  "XLI", "XLII", "XLIII", "XLIV", "XLV", "XLVI", "XLVII", "XLVIII", "XLIX", "L",
  "LI", "LII", "LIII", "LIV", "LV", "LVI", "LVII", "LVIII", "LIX", "LX",
  "LXI", "LXII",
];

const NUMBER_WORDS = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
  "Eighteen", "Nineteen", "Twenty",
];

function buildChapterRegex(chapterNum: number) {
  const roman = ROMAN_NUMERALS[chapterNum] ?? String(chapterNum);
  const word = NUMBER_WORDS[chapterNum] ?? "";
  const alternatives = [roman, String(chapterNum)];
  if (word) alternatives.push(word);
  const numPattern = alternatives.join("|");
  return new RegExp(
    `\\n\\s*(?:CHAPTER|Chapter|STAVE|Stave|PART|Part|BOOK|Book)\\s+(?:${numPattern})\\b[.:\\s\\n]`,
    "i",
  );
}

function normalizeWhitespace(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

/**
 * Strip Gutenberg header/footer boilerplate from raw text.
 * Exported for use by seed scripts.
 */
export function stripGutenbergBoilerplate(fullText: string) {
  let text = fullText;

  for (const marker of START_MARKERS) {
    const index = text.indexOf(marker);
    if (index === -1) continue;
    const lineEnd = text.indexOf("\n", index);
    text = lineEnd > -1 ? text.slice(lineEnd + 1) : text.slice(index + marker.length);
    break;
  }

  for (const marker of END_MARKERS) {
    const index = text.indexOf(marker);
    if (index === -1) continue;
    text = text.slice(0, index);
    break;
  }

  return text;
}

/**
 * Extract a single chapter from stripped Gutenberg text.
 * Returns a ChapterText object with paragraphs, or null if not found.
 * Exported for use by seed scripts.
 */
export function extractChapterFromText(
  fullText: string,
  bookSlug: string,
  chapterNumber: number,
  language: AudiobookLanguage = "en",
): ChapterText | null {
  const chapterNum = Math.max(1, Math.min(999, Math.trunc(chapterNumber)));
  const text = stripGutenbergBoilerplate(fullText);

  const chapterStartRegex = buildChapterRegex(chapterNum);
  const chapterEndRegex = buildChapterRegex(chapterNum + 1);

  const startMatch = chapterStartRegex.exec(text);
  if (!startMatch || typeof startMatch.index !== "number") {
    return null;
  }

  const start = startMatch.index;
  const endMatch = chapterEndRegex.exec(text.slice(start + 50));
  const end = endMatch ? start + 50 + endMatch.index : text.length;

  let raw = text.slice(start, end).trim();

  // Extract chapter title from the first line
  const firstLineEnd = raw.indexOf("\n");
  const chapterTitle = firstLineEnd > 0
    ? raw.slice(0, firstLineEnd).trim()
    : `Chapter ${chapterNum}`;

  // Keep text reasonably sized for read view + downstream TTS requests.
  if (raw.length > 50_000) {
    const cutPoint = raw.lastIndexOf(".", 50_000);
    raw = cutPoint > 5_000 ? raw.slice(0, cutPoint + 1) : raw.slice(0, 50_000);
  }

  raw = normalizeWhitespace(raw);

  const paragraphs = raw
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (paragraphs.length === 0) return null;

  return {
    bookSlug,
    chapterNumber: chapterNum,
    chapterTitle,
    language,
    paragraphs,
  };
}

/**
 * Extract ALL chapters from Gutenberg text for batch seeding.
 * Exported for use by seed scripts.
 */
export function extractAllChapters(
  fullText: string,
  bookSlug: string,
  maxChapters: number = 62,
  language: AudiobookLanguage = "en",
): ChapterText[] {
  const chapters: ChapterText[] = [];

  for (let i = 1; i <= maxChapters; i++) {
    const chapter = extractChapterFromText(fullText, bookSlug, i, language);
    if (!chapter) {
      if (chapters.length > 0) break;
      continue;
    }
    chapters.push(chapter);
  }

  return chapters;
}

/**
 * Fetch raw text from Project Gutenberg.
 * Exported for use by seed scripts ONLY — never called at request time.
 */
export async function fetchGutenbergText(gutenbergId: number): Promise<string | null> {
  const urls = [
    `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`,
    `https://www.gutenberg.org/files/${gutenbergId}/${gutenbergId}-0.txt`,
    `https://www.gutenberg.org/files/${gutenbergId}/${gutenbergId}.txt`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "Koydo-Audiobook-Seeder/1.0 (educational-platform)" },
      });
      if (response.ok) {
        const text = await response.text();
        if (text.trim().length > 0) return text;
      }
    } catch {
      continue;
    }
  }

  return null;
}

/* ── Supabase Storage cache read/write ─────────────────────────────── */

/**
 * Read cached chapter text from Supabase Storage.
 */
export async function getCachedChapterText(
  bookSlug: string,
  language: AudiobookLanguage,
  chapterNumber: number,
): Promise<ChapterText | null> {
  try {
    const supabase = createSupabaseAdminClient();
    const key = chapterTextCacheKey(bookSlug, language, chapterNumber);

    const { data, error } = await supabase.storage
      .from(TEXT_BUCKET)
      .download(key);

    if (error || !data) return null;

    const content = await data.text();
    const parsed = JSON.parse(content) as Partial<ChapterText>;

    // Validate required fields
    if (
      typeof parsed.bookSlug !== "string" ||
      typeof parsed.chapterNumber !== "number" ||
      !Array.isArray(parsed.paragraphs) ||
      parsed.paragraphs.length === 0
    ) {
      return null;
    }

    return parsed as ChapterText;
  } catch {
    return null;
  }
}

/**
 * Write chapter text JSON to Supabase Storage.
 * Used by seed scripts and translation service.
 */
export async function setCachedChapterText(chapter: ChapterText): Promise<boolean> {
  try {
    const supabase = createSupabaseAdminClient();
    const key = chapterTextCacheKey(
      chapter.bookSlug,
      chapter.language,
      chapter.chapterNumber,
    );

    const body = Buffer.from(JSON.stringify(chapter), "utf8");
    const { error } = await supabase.storage
      .from(TEXT_BUCKET)
      .upload(key, body, {
        contentType: "application/json; charset=utf-8",
        cacheControl: "public, max-age=31536000, immutable",
        upsert: true,
      });

    if (error) {
      console.warn("[chapter-text] cache write failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[chapter-text] cache write error:", err);
    return false;
  }
}

/**
 * Check if chapter text exists in cache without downloading content.
 */
export async function isChapterTextCached(
  bookSlug: string,
  language: AudiobookLanguage,
  chapterNumber: number,
): Promise<boolean> {
  try {
    const supabase = createSupabaseAdminClient();
    const key = chapterTextCacheKey(bookSlug, language, chapterNumber);

    const parts = key.split("/");
    const folder = parts.slice(0, -1).join("/");
    const fileName = parts.at(-1) ?? "";

    const { data: files } = await supabase.storage
      .from(TEXT_BUCKET)
      .list(folder, { limit: 1, search: fileName });

    return Boolean(files && files.length > 0);
  } catch {
    return false;
  }
}

/* ── Main retrieval function (request-time) ────────────────────────── */

/**
 * Get chapter text for a book. Reads from Supabase Storage ONLY.
 *
 * If the text isn't pre-seeded, returns null. The API route returns
 * a clear error telling the user this chapter isn't available yet.
 *
 * This function NEVER fetches from Gutenberg or any external source.
 * All text must be pre-seeded via `scripts/seed-audiobook-texts.ts`.
 */
export async function getChapterText(
  bookSlug: string,
  language: AudiobookLanguage,
  chapterNumber: number,
): Promise<ChapterText | null> {
  // Try the requested language first
  const chapter = await getCachedChapterText(bookSlug, language, chapterNumber);
  if (chapter) return chapter;

  // If non-English was requested and not found, fall back to English
  if (language !== "en") {
    const english = await getCachedChapterText(bookSlug, "en", chapterNumber);
    if (english) {
      // Return the English text but mark it as the requested language wasn't available
      return {
        ...english,
        language: "en", // signal that we served English as fallback
      };
    }
  }

  return null;
}

/**
 * Get all available chapter numbers for a book + language.
 */
export async function getAvailableChapters(
  bookSlug: string,
  language: AudiobookLanguage,
): Promise<number[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const folder = `audiobooks-text/${bookSlug}/${language}`;

    const { data: files } = await supabase.storage
      .from(TEXT_BUCKET)
      .list(folder, { limit: 200, sortBy: { column: "name", order: "asc" } });

    if (!files || files.length === 0) return [];

    return files
      .map((f) => {
        const match = f.name.match(/^ch(\d+)\.json$/);
        return match ? Number(match[1]) : 0;
      })
      .filter((n) => n > 0)
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

/**
 * Get all available languages for a book (checks which language folders exist).
 */
export async function getAvailableLanguages(
  bookSlug: string,
): Promise<AudiobookLanguage[]> {
  try {
    const supabase = createSupabaseAdminClient();
    const folder = `audiobooks-text/${bookSlug}`;

    const { data: folders } = await supabase.storage
      .from(TEXT_BUCKET)
      .list(folder, { limit: 20 });

    if (!folders || folders.length === 0) return [];

    return folders
      .map((f) => f.name as AudiobookLanguage)
      .filter((lang) => lang.length === 2);
  } catch {
    return [];
  }
}
