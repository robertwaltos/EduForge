/**
 * /explore/audiobooks/[slug] — Audiobook reader page.
 *
 * Shows the chapter text with an integrated audio player.
 * Audio is generated on-demand and cached per voice + language.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAudiobookBySlug, getFeaturedAudiobookEntries } from "@/lib/audiobooks/catalog-loader";
import { AudiobookReader } from "../_components/audiobook-reader";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PRE_RENDERED_AUDIOBOOK_SLUGS = getFeaturedAudiobookEntries(120).map((book) => ({
  slug: book.slug,
}));

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getAudiobookBySlug(slug);
  if (!book) return { title: "Book Not Found | Koydo" };

  return {
    title: `${book.title} — Audiobook | Koydo`,
    description: `Listen to "${book.title}" by ${book.author} narrated with AI voice options.`,
  };
}

export function generateStaticParams() {
  return PRE_RENDERED_AUDIOBOOK_SLUGS;
}

export default async function AudiobookReaderPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getAudiobookBySlug(slug);
  if (!book) notFound();

  return (
    <main className="min-h-[calc(100vh-52px)] bg-gradient-to-b from-sky-50/50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <AudiobookReader book={book} />
    </main>
  );
}
