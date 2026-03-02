"use client";

/**
 * AudiobookReader — Full reader UI for a single book.
 *
 * Fetches chapter text from server-side cached ingestion
 * (`/api/audiobooks/chapter-text`), shows text for reading-along,
 * and controls the AudiobookPlayer.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { AudiobookEntry, AudiobookLanguage } from "@/lib/audiobooks/types";
import { AudiobookPlayer } from "./audiobook-player";
import VoicePicker from "@/app/explore/_components/voice-picker";

interface AudiobookReaderProps {
  book: AudiobookEntry;
}

export function AudiobookReader({ book }: AudiobookReaderProps) {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [language, setLanguage] = useState<AudiobookLanguage>("en");
  const [chapterText, setChapterText] = useState<string>("");
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [textLoading, setTextLoading] = useState(true);
  const [textError, setTextError] = useState<string | null>(null);

  /* ── Fetch chapter text from Supabase-backed API ─────────────── */

  const fetchChapterText = useCallback(async () => {
    setTextLoading(true);
    setTextError(null);
    setChapterText("");
    setChapterTitle("");
    setParagraphs([]);

    try {
      const query = new URLSearchParams({
        bookSlug: book.slug,
        chapterNumber: String(chapterNumber),
        language,
      });

      const response = await fetch(`/api/audiobooks/chapter-text?${query.toString()}`, {
        method: "GET",
      });

      if (response.status === 404) {
        setTextError(
          `Chapter ${chapterNumber} hasn't been pre-loaded yet. It will be available soon.`,
        );
        return;
      }

      if (!response.ok) {
        setTextError("Could not load chapter text. Try again later.");
        return;
      }

      const payload = (await response.json()) as {
        chapterText?: string;
        chapterTitle?: string;
        paragraphs?: string[];
        languageServed?: string;
      };

      // Use structured paragraphs if available, fall back to splitting chapterText
      const paras = Array.isArray(payload.paragraphs) && payload.paragraphs.length > 0
        ? payload.paragraphs
        : typeof payload.chapterText === "string"
          ? payload.chapterText.trim().split("\n\n").filter(Boolean)
          : [];

      if (paras.length === 0) {
        setTextError(`Chapter ${chapterNumber} text is unavailable.`);
        return;
      }

      setParagraphs(paras);
      setChapterText(paras.join("\n\n"));
      setChapterTitle(payload.chapterTitle ?? `Chapter ${chapterNumber}`);
    } catch {
      setTextError("Failed to load chapter text.");
    } finally {
      setTextLoading(false);
    }
  }, [book.slug, chapterNumber, language]);

  useEffect(() => {
    fetchChapterText();
  }, [fetchChapterText]);

  /* ── Render ──────────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
      {/* ── Back link ───────────────────────────────────────── */}
      <Link
        href="/explore/audiobooks"
        className="inline-flex items-center gap-1.5 text-sm text-sky-600 dark:text-sky-400 hover:underline mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Library
      </Link>

      {/* ── Book header ─────────────────────────────────────── */}
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-foreground/90">
          {book.title}
        </h1>
        <p className="mt-1 text-neutral-500 dark:text-foreground/60">
          by {book.author}
          {book.yearPublished && ` (${book.yearPublished})`}
        </p>
      </header>

      {/* ── Voice picker ────────────────────────────────────── */}
      <div className="mb-6">
        <VoicePicker />
      </div>

      {/* ── Audio player ────────────────────────────────────── */}
      <div className="rounded-2xl border border-neutral-200 dark:border-border bg-white dark:bg-surface p-4 sm:p-6 mb-6">
        <AudiobookPlayer
          bookSlug={book.slug}
          chapterNumber={chapterNumber}
          chapterText={chapterText}
          language={language}
          totalChapters={book.chapterCount}
          onChapterChange={setChapterNumber}
          onLanguageChange={setLanguage}
        />
      </div>

      {/* ── Chapter text ────────────────────────────────────── */}
      <section className="rounded-2xl border border-neutral-200 dark:border-border bg-white dark:bg-surface p-5 sm:p-8">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-foreground/80 mb-4">
          {chapterTitle || `Chapter ${chapterNumber}`}
        </h2>

        {textLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
            <span className="ml-3 text-sm text-neutral-500">Loading chapter text...</span>
          </div>
        )}

        {textError && (
          <div className="text-center py-12">
            <p className="text-sm text-red-600 dark:text-red-400 mb-3">{textError}</p>
            <button
              type="button"
              onClick={fetchChapterText}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-sky-500 text-white hover:bg-sky-600 active:scale-95 transition-all ui-focus-ring"
            >
              Retry
            </button>
          </div>
        )}

        {!textLoading && !textError && paragraphs.length > 0 && (
          <div className="prose prose-neutral dark:prose-invert prose-sm sm:prose-base max-w-none leading-relaxed">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
