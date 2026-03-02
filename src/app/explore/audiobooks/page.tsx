/**
 * /explore/audiobooks — Audiobook library browse page.
 *
 * Displays the featured public-domain audiobook catalog loaded from
 * the merged children/adult/illustrated JSON catalogs.
 */

import { Metadata } from "next";
import { getAudiobookCatalogFacets, getFeaturedAudiobookEntries } from "@/lib/audiobooks/catalog-loader";
import { AudiobookLibrary } from "./_components/audiobook-library";

export const metadata: Metadata = {
  title: "Audiobook Library | Koydo",
  description: "Explore public-domain audiobooks with age, genre, and language filtering.",
};

export default function AudiobooksPage() {
  const featuredBooks = getFeaturedAudiobookEntries(180);
  const facets = getAudiobookCatalogFacets(featuredBooks);

  return (
    <main className="min-h-[calc(100vh-52px)] bg-gradient-to-b from-sky-50/50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
        {/* ── Header ───────────────────────────────────────── */}
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
            Audiobook Library
          </h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            {featuredBooks.length} featured classics across {facets.genreCount} genres, ready for voice playback in{" "}
            {facets.languageCount} languages.
          </p>
        </header>

        {/* ── Library grid (client component for filtering) ── */}
        <AudiobookLibrary books={featuredBooks} />
      </div>
    </main>
  );
}
