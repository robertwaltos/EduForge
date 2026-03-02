"use client";

/**
 * BookCard — Compact card for the audiobook library browse grid.
 */

import Link from "next/link";
import type { AudiobookEntry } from "@/lib/audiobooks/types";

interface BookCardProps {
  book: AudiobookEntry;
}

const AGE_BADGES: Record<string, { label: string; color: string }> = {
  children: { label: "Kids", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
  teen: { label: "Teen", color: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300" },
  adult: { label: "Classic", color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
  "all-ages": { label: "All Ages", color: "bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300" },
};

export function BookCard({ book }: BookCardProps) {
  const badge = AGE_BADGES[book.ageGroup] ?? AGE_BADGES["all-ages"];

  return (
    <Link
      href={`/explore/audiobooks/${book.slug}`}
      className="group flex flex-col rounded-2xl border border-neutral-200 dark:border-border
        bg-white dark:bg-surface p-5 gap-3
        hover:border-sky-300 dark:hover:border-sky-700
        hover:shadow-lg hover:shadow-sky-100/50 dark:hover:shadow-sky-900/30
        active:scale-[0.98] transition-all duration-200
        ui-focus-ring"
    >
      {/* Badge + year */}
      <div className="flex items-center justify-between">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}>
          {badge.label}
        </span>
        {book.yearPublished && (
          <span className="text-xs text-neutral-400 dark:text-foreground/50">
            {book.yearPublished}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-base leading-snug text-neutral-900 dark:text-foreground/90 group-hover:text-sky-700 dark:group-hover:text-accent transition-colors line-clamp-2">
        {book.title}
      </h3>

      {/* Author */}
      <p className="text-sm text-neutral-500 dark:text-foreground/60 truncate">
        {book.author}
      </p>

      {/* Meta */}
      <div className="mt-auto flex items-center gap-3 text-xs text-neutral-400 dark:text-foreground/50">
        <span>{book.chapterCount} chapters</span>
        <span className="w-px h-3 bg-neutral-200 dark:bg-surface-muted" />
        <span>{Math.round(book.wordCount / 1000)}k words</span>
      </div>

      {/* Genres */}
      {book.genres.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {book.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="rounded-md bg-neutral-100 dark:bg-surface-muted px-2 py-0.5 text-[11px] text-neutral-500 dark:text-foreground/60"
            >
              {genre}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
