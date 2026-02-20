"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LessonImage({
  prompt,
  moduleId,
  lessonId,
}: {
  prompt: string;
  moduleId: string;
  lessonId: string;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await fetch("/api/images/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, moduleId, lessonId }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate image.");
        }

        const data = await response.json();
        setImageUrl(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
  }, [prompt, moduleId, lessonId]);

  if (isLoading) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    );
  }

  if (error) {
    return (
      <div className="aspect-video w-full flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/50">
        <p className="text-sm text-red-700 dark:text-red-300">
          Could not load image.
        </p>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={prompt}
          width={1280}
          height={720}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return null;
}
