/**
 * seed-audiobook-translations.ts
 *
 * Pre-translates seeded English chapter text into target languages
 * and stores translations in Supabase Storage.
 *
 * Run via:
 *   npx tsx scripts/seed-audiobook-translations.ts
 *
 * Options (via env vars):
 *   SEED_LIMIT=10          Only process first N books (for testing)
 *   SEED_LANGUAGES=es,fr   Comma-separated target languages (default: es,fr,de,pt,zh,ja,ko,pl)
 *   SEED_CHAPTERS=1,2,3    Comma-separated chapter numbers (default: 1 — seed chapter 1 for all books)
 *   SEED_ALL_CHAPTERS=true Translate ALL available chapters (overrides SEED_CHAPTERS)
 *   SEED_DELAY_MS=1000     Delay between translation calls in ms (default: 1000)
 *   SEED_SKIP_CACHED=true  Skip translations already in cache (default: true)
 *
 * Prerequisites:
 *   - English chapter text must already be seeded via seed-audiobook-texts.ts
 *   - DEEPL_API_KEY or Google Translate credentials must be configured
 *
 * Cost estimate (DeepL free tier = 500k chars/month):
 *   50 books × 1 chapter × ~5,000 chars × 8 languages = ~2M chars
 *   → DeepL Pro at €5.49/M = ~€11 for first pass
 *   → Or split across months with free tier
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Load .env.local so Supabase/translation credentials are available
function loadEnvFile(filename: string) {
  try {
    const envPath = resolve(__dirname, "..", filename);
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex < 1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // File not found — skip
  }
}
loadEnvFile(".env.local");
loadEnvFile(".env");

/* ── Helpers (no app imports needed) ───────────────────────────────── */

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function formatDuration(ms: number) {
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  return `${mins}m ${secs % 60}s`;
}

/* ── Main (dynamic imports so env is loaded first) ─────────────────── */

async function main() {
  // Dynamic imports — env vars are already set by this point
  const { getAudiobookCatalogEntries } = await import("../src/lib/audiobooks/catalog-loader");
  const { getAvailableChapters } = await import("../src/lib/audiobooks/chapter-text-service");
  const { translateBookChapters } = await import("../src/lib/audiobooks/audiobook-translation-service");
  const { AUDIOBOOK_LANGUAGES } = await import("../src/lib/audiobooks/types");
  type AudiobookLanguage = (typeof AUDIOBOOK_LANGUAGES)[number];
  type BatchTranslateResult = Awaited<ReturnType<typeof translateBookChapters>>;

  const LIMIT = Number(process.env.SEED_LIMIT) || Infinity;
  const OFFSET = Math.max(0, Number(process.env.SEED_OFFSET) || 0);
  const SKIP_CACHED = (process.env.SEED_SKIP_CACHED ?? "true") !== "false";
  const DELAY_MS = Number(process.env.SEED_DELAY_MS) || 1000;
  const TRANSLATE_ALL_CHAPTERS = process.env.SEED_ALL_CHAPTERS === "true";
  const RETRY_COUNT = Math.max(0, Number(process.env.SEED_CHAPTER_RETRIES) || 1);
  const RETRY_DELAY_MS = Math.max(0, Number(process.env.SEED_CHAPTER_RETRY_DELAY_MS) || 1500);
  const REPORT_FILE = (process.env.SEED_REPORT_FILE ?? "public/AUDIOBOOK-TRANSLATION-SEED-REPORT.json").trim();

  const DEFAULT_LANGUAGES: AudiobookLanguage[] = ["es", "fr", "de", "pt", "zh", "ja", "ko", "pl"];
  const TARGET_LANGUAGES: AudiobookLanguage[] = process.env.SEED_LANGUAGES
    ? (process.env.SEED_LANGUAGES.split(",").map((l) => l.trim()) as AudiobookLanguage[]).filter(
        (l) => AUDIOBOOK_LANGUAGES.includes(l) && l !== "en",
      )
    : DEFAULT_LANGUAGES;

  const EXPLICIT_CHAPTERS: number[] | null = process.env.SEED_CHAPTERS
    ? process.env.SEED_CHAPTERS.split(",").map((c) => Number(c.trim())).filter((n) => n > 0)
    : null;

  interface BookTranslationSummary {
    slug: string;
    title: string;
    language: AudiobookLanguage;
    result: BatchTranslateResult | null;
    attempts: number;
    error?: string;
  }
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║    Audiobook Translation Seeder — Translate & Store ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log();

  // Load catalog
  let books = getAudiobookCatalogEntries();

  if (OFFSET > 0) {
    books = books.slice(OFFSET);
  }

  if (LIMIT < books.length) {
    books = books.slice(0, LIMIT);
  }

  console.log(`📚 Books: ${books.length} (offset: ${OFFSET}, limit: ${LIMIT === Infinity ? "none" : LIMIT})`);
  console.log(`🌐 Languages: ${TARGET_LANGUAGES.join(", ")}`);
  console.log(
    `📖 Chapters: ${TRANSLATE_ALL_CHAPTERS ? "ALL available" : EXPLICIT_CHAPTERS ? EXPLICIT_CHAPTERS.join(", ") : "1 (default)"}`,
  );
  console.log(`⏱️  Delay: ${DELAY_MS}ms`);
  console.log(`🔁 Chapter retries: ${RETRY_COUNT} (delay: ${RETRY_DELAY_MS}ms)`);
  console.log(`${SKIP_CACHED ? "⏭️  Skipping cached translations" : "🔄 Force re-translating"}`);
  console.log();

  const startTime = Date.now();
  const summaries: BookTranslationSummary[] = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(`[${i + 1}/${books.length}] 📖 ${book.title}`);

    // Determine which chapters to translate
    let chapters: number[];
    if (TRANSLATE_ALL_CHAPTERS) {
      chapters = await getAvailableChapters(book.slug, "en");
      if (chapters.length === 0) {
        console.log(`  ⚠️  No English chapters found — skipping`);
        continue;
      }
      console.log(`  📑 Found ${chapters.length} English chapters`);
    } else if (EXPLICIT_CHAPTERS) {
      chapters = EXPLICIT_CHAPTERS;
    } else {
      chapters = [1];
    }

    // Translate into each target language
    for (const lang of TARGET_LANGUAGES) {
      console.log(`  🌐 Translating to ${lang}...`);

      try {
        const result = await translateBookChapters({
          bookSlug: book.slug,
          chapters,
          targetLanguage: lang,
          delayMs: DELAY_MS,
          retryCount: RETRY_COUNT,
          retryDelayMs: RETRY_DELAY_MS,
          skipIfCached: SKIP_CACHED,
          onProgress: (chResult) => {
            if (chResult.skipped) {
              // Silent skip
            } else {
              console.log(
                `    ✅ ch${chResult.chapterNumber}: ${chResult.paragraphCount} paragraphs (${chResult.providerId})`,
              );
            }
          },
        });

        summaries.push({
          slug: book.slug,
          title: book.title,
          language: lang,
          result,
          attempts: result.total + result.errors.reduce((sum, row) => sum + Math.max(0, row.attempts - 1), 0),
        });

        if (result.skipped === result.total) {
          console.log(`    ⏭️  All ${result.total} chapters already cached`);
        } else {
          console.log(
            `    📊 ${result.translated} translated, ${result.skipped} skipped, ${result.failed} failed`,
          );
        }

        if (result.errors.length > 0) {
          for (const e of result.errors) {
            console.log(`    ❌ ch${e.chapter}: ${e.error} (attempts: ${e.attempts})`);
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.log(`    ❌ Error: ${msg}`);
        summaries.push({
          slug: book.slug,
          title: book.title,
          language: lang,
          result: null,
          attempts: 1,
          error: msg,
        });
      }
    }

    // Small delay between books
    if (i < books.length - 1) {
      await sleep(500);
    }
  }

  // Print summary
  const elapsed = Date.now() - startTime;
  const totalTranslated = summaries.reduce((n, s) => n + (s.result?.translated ?? 0), 0);
  const totalSkipped = summaries.reduce((n, s) => n + (s.result?.skipped ?? 0), 0);
  const totalFailed = summaries.reduce((n, s) => n + (s.result?.failed ?? 0) + (s.error ? 1 : 0), 0);
  const totalAttempts = summaries.reduce((n, s) => n + s.attempts, 0);

  console.log();
  console.log("═══════════════════════════════════════════════════════");
  console.log("              TRANSLATION SEEDING SUMMARY              ");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`  Books processed:     ${books.length}`);
  console.log(`  Languages:           ${TARGET_LANGUAGES.join(", ")}`);
  console.log(`  ✅ Chapters translated: ${totalTranslated}`);
  console.log(`  ⏭️  Chapters skipped:   ${totalSkipped}`);
  console.log(`  ❌ Chapters failed:    ${totalFailed}`);
  console.log(`  🔁 Attempts executed:  ${totalAttempts}`);
  console.log(`  ⏱️  Duration:           ${formatDuration(elapsed)}`);
  console.log();
  console.log("Done!");

  try {
    const reportPath = resolve(__dirname, "..", REPORT_FILE);
    mkdirSync(dirname(reportPath), { recursive: true });
    const report = {
      generatedAt: new Date().toISOString(),
      config: {
        offset: OFFSET,
        limit: LIMIT === Infinity ? null : LIMIT,
        languages: TARGET_LANGUAGES,
        chaptersMode: TRANSLATE_ALL_CHAPTERS ? "all" : "explicit",
        explicitChapters: EXPLICIT_CHAPTERS ?? [1],
        delayMs: DELAY_MS,
        skipCached: SKIP_CACHED,
        retryCount: RETRY_COUNT,
        retryDelayMs: RETRY_DELAY_MS,
      },
      summary: {
        booksProcessed: books.length,
        translated: totalTranslated,
        skipped: totalSkipped,
        failed: totalFailed,
        attempts: totalAttempts,
        durationMs: elapsed,
      },
      results: summaries,
    };
    writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
    console.log(`📄 Wrote report: ${reportPath}`);
  } catch (error) {
    console.warn("⚠️  Failed to write translation report file:", error);
  }

  if (totalFailed > 0 && totalTranslated === 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
