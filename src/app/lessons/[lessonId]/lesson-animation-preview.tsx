"use client";

import { useEffect, useState } from "react";

type AnimationResolveResponse = {
  found?: boolean;
  url?: string | null;
  error?: string;
};

const ANIMATION_RESOLVE_POLL_INTERVAL_MS = 15000;
const ANIMATION_RESOLVE_MAX_ATTEMPTS = 12;

export default function LessonAnimationPreview({
  moduleId,
  lessonId,
}: {
  moduleId: string;
  lessonId: string;
}) {
  const [animationUrl, setAnimationUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let timeoutId: number | undefined;

    const resolveAnimation = async () => {
      const resolveAttempt = async (attempt: number) => {
        let foundAnimation = false;

        if (attempt === 0) {
          setLoading(true);
          setError(null);
        }

        try {
          const params = new URLSearchParams({
            moduleId,
            lessonId,
            assetType: "animation",
          });

          const response = await fetch(`/api/media/resolve?${params.toString()}`, {
            method: "GET",
            cache: "no-store",
          });

          const payload = (await response.json().catch(() => ({}))) as AnimationResolveResponse;
          if (!response.ok) {
            throw new Error(payload.error ?? "Unable to resolve animation asset.");
          }

          if (payload.found && payload.url && isActive) {
            foundAnimation = true;
            setAnimationUrl(payload.url);
            setError(null);
            setLoading(false);
          }
        } catch (resolveError) {
          if (isActive) {
            setError(resolveError instanceof Error ? resolveError.message : "Unable to resolve lesson animation.");
          }
        } finally {
          if (isActive && attempt === 0) {
            setLoading(false);
          }
        }

        if (!isActive || foundAnimation || attempt >= ANIMATION_RESOLVE_MAX_ATTEMPTS - 1) {
          return;
        }

        timeoutId = window.setTimeout(() => {
          void resolveAttempt(attempt + 1);
        }, ANIMATION_RESOLVE_POLL_INTERVAL_MS);
      };

      await resolveAttempt(0);
    };

    void resolveAnimation();

    return () => {
      isActive = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [lessonId, moduleId]);

  if (loading) {
    return <div className="h-40 w-full animate-pulse rounded-xl bg-indigo-100" />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
        {error}
      </div>
    );
  }

  if (!animationUrl) {
    return (
      <div className="rounded-xl border border-indigo-200 bg-white p-4 text-xs text-zinc-600">
        No completed lesson animation is available yet. This panel will keep checking automatically.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-indigo-200 bg-white">
      <video className="h-auto w-full" src={animationUrl} autoPlay loop muted controls playsInline />
    </div>
  );
}
