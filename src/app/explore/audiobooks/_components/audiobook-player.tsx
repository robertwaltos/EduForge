"use client";

/**
 * AudiobookPlayer — Chapter-level audio player for the audiobook reader.
 *
 * Fetches TTS on demand via POST /api/audiobooks/tts, uses voice-aware cache,
 * and provides play/pause/chapter-nav controls.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useVoicePreference } from "@/app/explore/_components/voice-preference";
import type { AudiobookLanguage, AudiobookTTSResult } from "@/lib/audiobooks/types";
import { AUDIOBOOK_LANGUAGE_LABELS, AUDIOBOOK_LANGUAGES } from "@/lib/audiobooks/types";

/* ── Types ─────────────────────────────────────────────────────────── */

interface AudiobookPlayerProps {
  bookSlug: string;
  chapterNumber: number;
  chapterText: string;
  language: AudiobookLanguage;
  totalChapters: number;
  onChapterChange: (chapter: number) => void;
  onLanguageChange: (lang: AudiobookLanguage) => void;
}

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

/* ── Component ─────────────────────────────────────────────────────── */

export function AudiobookPlayer({
  bookSlug,
  chapterNumber,
  chapterText,
  language,
  totalChapters,
  onChapterChange,
  onLanguageChange,
}: AudiobookPlayerProps) {
  const { voice } = useVoicePreference();
  const [state, setState] = useState<PlayerState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // 0-1
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number>(0);

  /* ── Cleanup on unmount or chapter change ─────────────────────── */

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    cancelAnimationFrame(animFrameRef.current);
    setProgress(0);
    setState("idle");
  }, []);

  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio, chapterNumber, language, voice]);

  /* ── Progress tracker ────────────────────────────────────────── */

  const trackProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;
    if (audio.duration > 0) {
      setProgress(audio.currentTime / audio.duration);
    }
    animFrameRef.current = requestAnimationFrame(trackProgress);
  }, []);

  /* ── Play / pause ────────────────────────────────────────────── */

  const handlePlayPause = useCallback(async () => {
    // Resume if paused
    if (state === "paused" && audioRef.current) {
      audioRef.current.play();
      setState("playing");
      animFrameRef.current = requestAnimationFrame(trackProgress);
      return;
    }

    // Pause if playing
    if (state === "playing" && audioRef.current) {
      audioRef.current.pause();
      cancelAnimationFrame(animFrameRef.current);
      setState("paused");
      return;
    }

    // Generate / fetch audio
    setState("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/audiobooks/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookSlug,
          chapterNumber,
          language,
          voiceId: voice,
          chapterText,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      const result: AudiobookTTSResult = await res.json();

      const audio = new Audio(result.audioUrl);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        cancelAnimationFrame(animFrameRef.current);
        setProgress(1);
        setState("idle");
      });

      audio.addEventListener("error", () => {
        setState("error");
        setErrorMsg("Audio playback failed.");
      });

      await audio.play();
      setState("playing");
      animFrameRef.current = requestAnimationFrame(trackProgress);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "TTS generation failed.");
    }
  }, [state, bookSlug, chapterNumber, language, voice, chapterText, trackProgress]);

  /* ── Chapter navigation ──────────────────────────────────────── */

  const canGoPrev = chapterNumber > 1;
  const canGoNext = chapterNumber < totalChapters;

  const goToPrev = () => {
    if (canGoPrev) {
      stopAudio();
      onChapterChange(chapterNumber - 1);
    }
  };
  const goToNext = () => {
    if (canGoNext) {
      stopAudio();
      onChapterChange(chapterNumber + 1);
    }
  };

  /* ── Render ──────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col gap-4">
      {/* ── Progress bar ────────────────────────────────────── */}
      <div
        className="h-1.5 w-full rounded-full bg-sky-100 dark:bg-sky-950 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Audio playback progress"
      >
        <div
          className="h-full rounded-full bg-sky-500 transition-[width] duration-200"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ── Controls row ────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        {/* Prev chapter */}
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={goToPrev}
          className="rounded-full p-2.5 ui-soft-button ui-focus-ring disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-transform"
          aria-label="Previous chapter"
        >
          <ChevronLeftIcon />
        </button>

        {/* Play / Pause / Loading */}
        <button
          type="button"
          onClick={handlePlayPause}
          disabled={state === "loading" || !chapterText}
          className="flex items-center justify-center gap-2 min-w-[160px] rounded-full px-6 py-3 font-semibold text-sm
            bg-sky-500 text-white hover:bg-sky-600 active:scale-95 transition-all
            dark:bg-sky-600 dark:hover:bg-sky-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ui-focus-ring"
          aria-label={
            state === "loading"
              ? "Loading audio"
              : state === "playing"
                ? "Pause"
                : state === "paused"
                  ? "Resume"
                  : "Play chapter"
          }
        >
          {state === "loading" && <Spinner />}
          {state === "playing" && <PauseIcon />}
          {(state === "idle" || state === "paused" || state === "error") && <PlayIcon />}
          <span>
            {state === "loading"
              ? "Loading…"
              : state === "playing"
                ? "Pause"
                : state === "paused"
                  ? "Resume"
                  : "Play"}
          </span>
        </button>

        {/* Next chapter */}
        <button
          type="button"
          disabled={!canGoNext}
          onClick={goToNext}
          className="rounded-full p-2.5 ui-soft-button ui-focus-ring disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-transform"
          aria-label="Next chapter"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* ── Chapter & language selectors ──────────────────── */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <span className="text-neutral-500 dark:text-neutral-400">
          Chapter {chapterNumber} / {totalChapters}
        </span>

        <select
          value={language}
          onChange={(e) => {
            stopAudio();
            onLanguageChange(e.target.value as AudiobookLanguage);
          }}
          className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900
            px-3 py-1.5 text-sm ui-focus-ring"
          aria-label="Audio language"
        >
          {AUDIOBOOK_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {AUDIOBOOK_LANGUAGE_LABELS[lang]}
            </option>
          ))}
        </select>
      </div>

      {/* ── Error message ────────────────────────────────── */}
      {state === "error" && errorMsg && (
        <p className="text-center text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

/* ── Inline icons (no external dependency) ─────────────────────────── */

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <path d="M12 2a10 10 0 019.74 7.74" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
