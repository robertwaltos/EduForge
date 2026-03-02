/**
 * seed-audiobook-texts.ts
 *
 * Batch fetches ALL chapter text from Project Gutenberg for every book
 * in our catalog, extracts chapters, and stores them in Supabase Storage.
 *
 * This is the ONLY place that Gutenberg fetching happens. The app itself
 * NEVER fetches from Gutenberg — it only reads pre-seeded text from
 * Supabase Storage.
 *
 * Run via:
 *   npx tsx scripts/seed-audiobook-texts.ts
 *
 * Options (via env vars):
 *   SEED_LIMIT=10           Only process first N books (for testing)
 *   SEED_SKIP_CACHED=true   Skip books that already have chapter 1 cached (default: true)
 *   SEED_CATALOG=all        Which catalog to seed: children | adult | illustrated | all (default: all)
 *   SEED_DELAY_MS=1500      Delay between Gutenberg fetches in ms (default: 1500)
 *
 * What it does:
 *   1. Loads the book catalog (1,529 books across 3 catalogs)
 *   2. For each book, fetches the full text from Gutenberg
 *   3. Extracts all chapters using the chapter-text-service parser
 *   4. Stores each chapter as JSON in Supabase Storage:
 *      audiobooks-text/{bookSlug}/en/ch{NNN}.json
 *   5. Logs progress and produces a summary report
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/* ── Load .env.local BEFORE any app module imports ─────────────────── */

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
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
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

interface SeedResult {
  slug: string;
  title: string;
  gutenbergId: number;
  status: "seeded" | "skipped" | "failed" | "no-text" | "no-chapters";
  chaptersStored: number;
  fetchAttempts: number;
  error?: string;
}

async function main() {
  // Dynamic imports — env vars are already set by this point
  const { getAudiobookCatalogEntries } = await import("../src/lib/audiobooks/catalog-loader");
  const {
    fetchGutenbergText,
    extractAllChapters,
    setCachedChapterText,
    isChapterTextCached,
    stripGutenbergBoilerplate,
  } = await import("../src/lib/audiobooks/chapter-text-service");
  const { createSupabaseAdminClient } = await import("../src/lib/supabase/admin");

  type AudiobookEntry = Awaited<ReturnType<typeof getAudiobookCatalogEntries>>[number];

  // Ensure the storage bucket exists
  const admin = createSupabaseAdminClient();
  const { data: buckets } = await admin.storage.listBuckets();
  const bucketExists = buckets?.some((b: { name: string }) => b.name === "tts-audio");
  if (!bucketExists) {
    console.log("🪣 Creating storage bucket 'tts-audio'...");
    const { error } = await admin.storage.createBucket("tts-audio", {
      public: true,
      fileSizeLimit: 10_000_000, // 10 MB
    });
    if (error) {
      console.error("❌ Failed to create bucket:", error.message);
      process.exit(1);
    }
    console.log("✅ Bucket 'tts-audio' created.\n");
  }

  const LIMIT = Number(process.env.SEED_LIMIT) || Infinity;
  const OFFSET = Math.max(0, Number(process.env.SEED_OFFSET) || 0);
  const SKIP_CACHED = (process.env.SEED_SKIP_CACHED ?? "true") !== "false";
  const CATALOG_FILTER = (process.env.SEED_CATALOG ?? "all") as
    | "children"
    | "adult"
    | "illustrated"
    | "all";
  const DELAY_MS = Number(process.env.SEED_DELAY_MS) || 1500;
  const FETCH_RETRIES = Math.max(0, Number(process.env.SEED_FETCH_RETRIES) || 2);
  const REPORT_FILE = (process.env.SEED_REPORT_FILE ?? "public/AUDIOBOOK-TEXT-SEED-REPORT.json").trim();

  async function seedBook(book: AudiobookEntry): Promise<SeedResult> {
    const base = {
      slug: book.slug,
      title: book.title,
      gutenbergId: book.gutenbergId,
    };

    // Check if already seeded (chapter 1 exists)
    if (SKIP_CACHED) {
      const cached = await isChapterTextCached(book.slug, "en", 1);
      if (cached) {
        return { ...base, status: "skipped", chaptersStored: 0, fetchAttempts: 0 };
      }
    }

    // Fetch full text from Gutenberg
    console.log(`  📥 Fetching text from Gutenberg (ID: ${book.gutenbergId})...`);
    let rawText: string | null = null;
    let fetchAttempts = 0;
    for (let attempt = 1; attempt <= FETCH_RETRIES + 1; attempt++) {
      fetchAttempts = attempt;
      rawText = await fetchGutenbergText(book.gutenbergId);
      if (rawText) {
        break;
      }
      if (attempt <= FETCH_RETRIES) {
        await sleep(Math.min(5_000, 750 * attempt));
      }
    }

    if (!rawText) {
      return {
        ...base,
        status: "no-text",
        chaptersStored: 0,
        fetchAttempts,
        error: "Failed to fetch from Gutenberg",
      };
    }

    // Extract all chapters
    const chapters = extractAllChapters(rawText, book.slug);
    if (chapters.length === 0) {
      // For books without standard chapter markers, store the whole text as chapter 1
      console.log(`  ⚠️  No chapter markers found. Storing full text as chapter 1.`);
      const cleanText = stripGutenbergBoilerplate(rawText).trim();

      if (cleanText.length < 100) {
        return {
          ...base,
          status: "no-chapters",
          chaptersStored: 0,
          fetchAttempts,
          error: "Text too short after cleanup",
        };
      }

      const paragraphs = cleanText
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .split("\n\n")
        .map((p: string) => p.replace(/[ \t]+/g, " ").trim())
        .filter((p: string) => p.length > 0);

      let totalLength = 0;
      const truncatedParagraphs: string[] = [];
      for (const p of paragraphs) {
        if (totalLength + p.length > 50_000) break;
        truncatedParagraphs.push(p);
        totalLength += p.length;
      }

      const stored = await setCachedChapterText({
        bookSlug: book.slug,
        chapterNumber: 1,
        chapterTitle: book.title,
        language: "en",
        paragraphs: truncatedParagraphs,
      });

      return {
        ...base,
        status: stored ? "seeded" : "failed",
        chaptersStored: stored ? 1 : 0,
        fetchAttempts,
        error: stored ? undefined : "Failed to write to Supabase",
      };
    }

    // Store each chapter
    let stored = 0;
    for (const chapter of chapters) {
      try {
        const success = await setCachedChapterText(chapter);
        if (success) stored++;
      } catch (err) {
        console.warn(`  ⚠️  Failed to store ch${chapter.chapterNumber}: ${err}`);
      }
    }

    console.log(`  ✅ Stored ${stored}/${chapters.length} chapters`);

    return {
      ...base,
      status: stored > 0 ? "seeded" : "failed",
      chaptersStored: stored,
      fetchAttempts,
      error: stored < chapters.length ? `${chapters.length - stored} chapters failed to store` : undefined,
    };
  }

  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║       Audiobook Text Seeder — Gutenberg → Supabase ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log();

  // Load catalog
  const allBooks = getAudiobookCatalogEntries();

  let books: AudiobookEntry[];
  if (CATALOG_FILTER === "all") {
    books = allBooks;
  } else {
    books = allBooks.filter((b) => b.ageGroup === CATALOG_FILTER);
  }

  if (OFFSET > 0) {
    books = books.slice(OFFSET);
  }

  if (LIMIT < books.length) {
    books = books.slice(0, LIMIT);
  }

  console.log(`📚 Processing ${books.length} books (catalog: ${CATALOG_FILTER}, offset: ${OFFSET}, limit: ${LIMIT === Infinity ? "none" : LIMIT})`);
  console.log(`⏱️  Delay between fetches: ${DELAY_MS}ms`);
  console.log(`🔁 Fetch retries per book: ${FETCH_RETRIES}`);
  console.log(`${SKIP_CACHED ? "⏭️  Skipping books with cached chapter 1" : "🔄 Force re-seeding all books"}`);
  console.log();

  const startTime = Date.now();
  const results: SeedResult[] = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    console.log(`[${i + 1}/${books.length}] 📖 ${book.title} (${book.slug})`);

    try {
      const result = await seedBook(book);
      results.push(result);

      if (result.status === "skipped") {
        console.log(`  ⏭️  Already cached, skipping`);
      } else if (result.status === "failed" || result.status === "no-text") {
        console.log(`  ❌ ${result.error}`);
      }
    } catch (err) {
      console.error(`  ❌ Unexpected error: ${err}`);
      results.push({
        slug: book.slug,
        title: book.title,
        gutenbergId: book.gutenbergId,
        status: "failed",
        chaptersStored: 0,
        fetchAttempts: 0,
        error: err instanceof Error ? err.message : String(err),
      });
    }

    if (i < books.length - 1 && DELAY_MS > 0) {
      await sleep(DELAY_MS);
    }
  }

  // Print summary
  const elapsed = Date.now() - startTime;
  const seeded = results.filter((r) => r.status === "seeded");
  const skipped = results.filter((r) => r.status === "skipped");
  const failed = results.filter((r) => r.status === "failed" || r.status === "no-text" || r.status === "no-chapters");
  const totalChapters = results.reduce((sum, r) => sum + r.chaptersStored, 0);

  console.log();
  console.log("═══════════════════════════════════════════════════════");
  console.log("                    SEEDING SUMMARY                    ");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`  Total books processed: ${results.length}`);
  console.log(`  ✅ Seeded:   ${seeded.length} (${totalChapters} chapters total)`);
  console.log(`  ⏭️  Skipped:  ${skipped.length} (already cached)`);
  console.log(`  ❌ Failed:   ${failed.length}`);
  console.log(`  ⏱️  Duration: ${formatDuration(elapsed)}`);

  if (failed.length > 0) {
    console.log();
    console.log("  Failed books:");
    for (const f of failed) {
      console.log(`    - ${f.slug}: ${f.error ?? "unknown error"}`);
    }
  }

  console.log();
  console.log("Done!");

  try {
    const reportPath = resolve(__dirname, "..", REPORT_FILE);
    mkdirSync(dirname(reportPath), { recursive: true });
    const report = {
      generatedAt: new Date().toISOString(),
      config: {
        catalog: CATALOG_FILTER,
        offset: OFFSET,
        limit: LIMIT === Infinity ? null : LIMIT,
        delayMs: DELAY_MS,
        skipCached: SKIP_CACHED,
        fetchRetries: FETCH_RETRIES,
      },
      summary: {
        totalBooksProcessed: results.length,
        seededBooks: seeded.length,
        skippedBooks: skipped.length,
        failedBooks: failed.length,
        totalChaptersStored: totalChapters,
        durationMs: elapsed,
      },
      results,
    };
    writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
    console.log(`📄 Wrote report: ${reportPath}`);
  } catch (error) {
    console.warn("⚠️  Failed to write seed report file:", error);
  }

  if (failed.length > 0 && seeded.length === 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
