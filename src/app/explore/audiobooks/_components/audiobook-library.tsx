"use client";

/**
 * AudiobookLibrary — Client-side wrapper that adds age-group filtering
 * and search to the book card grid.
 */

import { useMemo, useState } from "react";
import {
  AUDIOBOOK_LANGUAGE_LABELS,
  type AudiobookEntry,
  type AgeGroup,
  type AudiobookLanguage,
} from "@/lib/audiobooks/types";
import { BookCard } from "./book-card";

interface AudiobookLibraryProps {
  books: AudiobookEntry[];
}

const AGE_FILTERS: { value: AgeGroup | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "children", label: "Kids" },
  { value: "all-ages", label: "All Ages" },
  { value: "teen", label: "Teen" },
  { value: "adult", label: "Classic" },
];

export function AudiobookLibrary({ books }: AudiobookLibraryProps) {
  const [ageFilter, setAgeFilter] = useState<AgeGroup | "all">("all");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<AudiobookLanguage | "all">("all");
  const [search, setSearch] = useState("");

  const genreOptions = useMemo(() => {
    return [...new Set(books.flatMap((book) => book.genres.map((genre) => genre.trim())).filter(Boolean))].sort(
      (left, right) => left.localeCompare(right),
    );
  }, [books]);

  const languageOptions = useMemo(() => {
    return [...new Set(books.map((book) => book.originalLanguage))].sort((left, right) => left.localeCompare(right));
  }, [books]);

  const filtered = useMemo(() => {
    let list = books;

    if (ageFilter !== "all") {
      list = list.filter((b) => b.ageGroup === ageFilter);
    }

    if (genreFilter !== "all") {
      list = list.filter((b) => b.genres.some((genre) => genre.toLowerCase() === genreFilter));
    }

    if (languageFilter !== "all") {
      list = list.filter((b) => b.originalLanguage === languageFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genres.some((g) => g.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [books, ageFilter, genreFilter, languageFilter, search]);

  return (
    <>
      {/* ── Filter bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {/* Age tabs */}
        <div className="flex gap-1.5 rounded-xl bg-neutral-100 dark:bg-surface-muted p-1" role="tablist" aria-label="Filter by age group">
          {AGE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={ageFilter === f.value}
              onClick={() => setAgeFilter(f.value)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all
                ${
                  ageFilter === f.value
                    ? "bg-white dark:bg-surface-muted text-neutral-900 dark:text-foreground/90 shadow-sm"
                    : "text-neutral-500 dark:text-foreground/60 hover:text-neutral-700 dark:hover:text-foreground/80"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          value={genreFilter}
          onChange={(event) => setGenreFilter(event.target.value)}
          className="rounded-xl border border-neutral-200 dark:border-border bg-white dark:bg-surface px-3 py-2 text-sm ui-focus-ring"
          aria-label="Filter audiobooks by genre"
        >
          <option value="all">All genres</option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre.toLowerCase()}>
              {genre}
            </option>
          ))}
        </select>

        <select
          value={languageFilter}
          onChange={(event) => setLanguageFilter(event.target.value as AudiobookLanguage | "all")}
          className="rounded-xl border border-neutral-200 dark:border-border bg-white dark:bg-surface px-3 py-2 text-sm ui-focus-ring"
          aria-label="Filter audiobooks by language"
        >
          <option value="all">All languages</option>
          {languageOptions.map((language) => (
            <option key={language} value={language}>
              {AUDIOBOOK_LANGUAGE_LABELS[language] ?? language.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="search"
          placeholder="Search by title, author, or genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-neutral-200 dark:border-border bg-white dark:bg-surface
            px-4 py-2 text-sm placeholder:text-neutral-400
            ui-focus-ring"
          aria-label="Search audiobooks"
        />
      </div>

      {/* ── Grid ───────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-neutral-400 dark:text-foreground/50 py-16">
          No books match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
