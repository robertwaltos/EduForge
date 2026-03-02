/**
 * seed-audiobook-chapter1.ts
 *
 * Batch pre-generates Chapter 1 audio for the top 50 books
 * across 5 languages with the default voice (nova).
 *
 * This is a ONE-TIME seeding script, not part of the app runtime.
 * Run via:
 *   npx tsx scripts/seed-audiobook-chapter1.ts
 *
 * What it does:
 *   1. For each book in the top-50 catalog, downloads Chapter 1 text
 *      from Project Gutenberg (English only — translation handled separately)
 *   2. Calls the audiobook TTS service to generate + cache the audio
 *   3. Skips any files that are already cached
 *
 * Cost estimate (OpenAI tts-1):
 *   50 books × 5 languages × 1 voice × ~5,000 chars avg chapter = ~1.25M chars
 *   At $15/1M chars = ~$19 per language × 5 = ~$95 total (one-time)
 *
 * Note: For the MVP, this seeds English only. Add translated text
 * before seeding other languages.
 */

import { TOP_50_AUDIOBOOKS } from "../src/lib/audiobooks/top-50-catalog";
import {
  generateAudiobookChapterTTS,
  isChapterAudioCached,
} from "../src/lib/audiobooks/audiobook-tts-service";
import type { AudiobookLanguage } from "../src/lib/audiobooks/types";

/* ── Config ────────────────────────────────────────────────────────── */

const DEFAULT_VOICE = "nova" as const;
const SEED_LANGUAGES: AudiobookLanguage[] = ["en"]; // Start with English only

// Rate limiting: pause between API calls to avoid hitting limits
const DELAY_BETWEEN_BOOKS_MS = 2_000;

/* ── Gutenberg text fetcher ────────────────────────────────────────── */

/**
 * Fetch the full text of a book from Project Gutenberg.
 * Returns the raw text content.
 */
async function fetchGutenbergText(gutenbergId: number): Promise<string | null> {
  // Gutenberg mirrors: try plain text first
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
        return await response.text();
      }
    } catch {
      continue;
    }
  }

  return null;
}

/**
 * Extract Chapter 1 text from a Gutenberg plaintext file.
 *
 * Gutenberg texts typically have:
 *   - A header block ending with "*** START OF ..."
 *   - Chapter markers like "CHAPTER I", "Chapter 1", "I.", etc.
 *   - A footer starting with "*** END OF ..."
 *
 * This extractor is intentionally simple — it grabs 3000-8000 chars
 * starting from the first chapter marker, which is enough for a
 * TTS preview of Chapter 1.
 */
function extractChapter1(fullText: string): string | null {
  // Remove Gutenberg header
  const startMarkers = [
    "*** START OF THE PROJECT GUTENBERG",
    "*** START OF THIS PROJECT GUTENBERG",
    "*END*THE SMALL PRINT",
  ];

  let text = fullText;
  for (const marker of startMarkers) {
    const idx = text.indexOf(marker);
    if (idx !== -1) {
      const lineEnd = text.indexOf("\n", idx);
      text = text.slice(lineEnd + 1);
      break;
    }
  }

  // Remove Gutenberg footer
  const endMarkers = [
    "*** END OF THE PROJECT GUTENBERG",
    "*** END OF THIS PROJECT GUTENBERG",
    "End of the Project Gutenberg",
    "End of Project Gutenberg",
  ];
  for (const marker of endMarkers) {
    const idx = text.indexOf(marker);
    if (idx !== -1) {
      text = text.slice(0, idx);
      break;
    }
  }

  // Find Chapter 1 marker
  const chapterPatterns = [
    /\n\s*(CHAPTER\s+(?:I|1|ONE))\b[.\s\n]/i,
    /\n\s*(Chapter\s+(?:I|1|One))\b[.\s\n]/i,
    /\n\s*(PART\s+(?:I|1|ONE|FIRST))\b[.\s\n]/i,
    /\n\s*(I\.)\s*\n/,
    /\n\s*(Stave\s+(?:I|1|One))\b/i, // for A Christmas Carol
  ];

  let chapterStart = -1;
  for (const pattern of chapterPatterns) {
    const match = pattern.exec(text);
    if (match && match.index !== undefined) {
      chapterStart = match.index;
      break;
    }
  }

  // If no chapter marker found, just take the first chunk after the header
  if (chapterStart === -1) {
    // Skip any title/author block at the start (usually first ~500 chars)
    const startOffset = Math.min(500, text.length);
    chapterStart = startOffset;
  }

  // Find Chapter 2 marker to know where Chapter 1 ends
  const chapter2Patterns = [
    /\n\s*CHAPTER\s+(?:II|2|TWO)\b/i,
    /\n\s*Chapter\s+(?:II|2|Two)\b/i,
    /\n\s*PART\s+(?:II|2|TWO|SECOND)\b/i,
    /\n\s*II\.\s*\n/,
    /\n\s*Stave\s+(?:II|2|Two)\b/i,
  ];

  let chapterEnd = text.length;
  for (const pattern of chapter2Patterns) {
    const match = pattern.exec(text.slice(chapterStart + 50));
    if (match && match.index !== undefined) {
      chapterEnd = chapterStart + 50 + match.index;
      break;
    }
  }

  // Extract and clean
  let chapter = text.slice(chapterStart, chapterEnd).trim();

  // Limit to reasonable length for TTS (max ~8000 chars ≈ 3-4 min audio)
  if (chapter.length > 8000) {
    // Cut at the last complete sentence before 8000 chars
    const cutPoint = chapter.lastIndexOf(".", 8000);
    if (cutPoint > 3000) {
      chapter = chapter.slice(0, cutPoint + 1);
    } else {
      chapter = chapter.slice(0, 8000);
    }
  }

  // Clean up excessive whitespace
  chapter = chapter
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();

  return chapter.length > 100 ? chapter : null;
}

/* ── Main ──────────────────────────────────────────────────────────── */

async function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  Koydo Audiobook Chapter 1 Seeder                      ║");
  console.log("║  Top 50 books × default voice (nova)                   ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log();

  let seeded = 0;
  let skipped = 0;
  let failed = 0;

  for (const book of TOP_50_AUDIOBOOKS) {
    for (const lang of SEED_LANGUAGES) {
      const label = `${book.title} [${lang}/${DEFAULT_VOICE}]`;

      // Check if already cached
      const cached = await isChapterAudioCached(book.slug, lang, DEFAULT_VOICE, 1);
      if (cached) {
        console.log(`  ⏭  ${label} — already cached`);
        skipped++;
        continue;
      }

      // Fetch text from Gutenberg
      console.log(`  📥 Fetching ${book.title} from Gutenberg (#${book.gutenbergId})...`);
      const fullText = await fetchGutenbergText(book.gutenbergId);
      if (!fullText) {
        console.log(`  ❌ ${label} — failed to fetch from Gutenberg`);
        failed++;
        continue;
      }

      // Extract Chapter 1
      const chapter1 = extractChapter1(fullText);
      if (!chapter1) {
        console.log(`  ❌ ${label} — could not extract Chapter 1`);
        failed++;
        continue;
      }

      console.log(`  🔊 Generating ${label} (${chapter1.length} chars)...`);

      try {
        const result = await generateAudiobookChapterTTS({
          bookSlug: book.slug,
          chapterNumber: 1,
          language: lang,
          voiceId: DEFAULT_VOICE,
          chapterText: chapter1,
        });

        console.log(
          `  ✅ ${label} — ${result.cached ? "cached" : "generated"} (${Math.round((result.durationEstimateMs ?? 0) / 1000)}s est.)`,
        );
        seeded++;
      } catch (err) {
        console.log(`  ❌ ${label} — TTS failed: ${err instanceof Error ? err.message : err}`);
        failed++;
      }

      // Rate limiting delay
      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BOOKS_MS));
    }
  }

  console.log();
  console.log("════════════════════════════════════════════════════════════");
  console.log(`  Done! Seeded: ${seeded} | Skipped: ${skipped} | Failed: ${failed}`);
  console.log("════════════════════════════════════════════════════════════");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
