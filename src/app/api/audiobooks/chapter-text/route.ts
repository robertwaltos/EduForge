import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AUDIOBOOK_LANGUAGES } from "@/lib/audiobooks/types";
import { getAudiobookBySlug } from "@/lib/audiobooks/catalog-loader";
import { getChapterText } from "@/lib/audiobooks/chapter-text-service";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

const QuerySchema = z.object({
  bookSlug: z.string().trim().min(1).max(160),
  chapterNumber: z.coerce.number().int().min(1).max(999).default(1),
  language: z.enum(AUDIOBOOK_LANGUAGES).optional().default("en"),
});

export async function GET(request: NextRequest) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:audiobooks:chapter-text:get", {
      max: 60,
      windowMs: 60_000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many chapter-text requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const parsedQuery = QuerySchema.safeParse({
      bookSlug: request.nextUrl.searchParams.get("bookSlug") ?? undefined,
      chapterNumber: request.nextUrl.searchParams.get("chapterNumber") ?? undefined,
      language: request.nextUrl.searchParams.get("language") ?? undefined,
    });

    if (!parsedQuery.success) {
      return NextResponse.json(
        { error: "Invalid chapter-text query parameters.", details: parsedQuery.error.flatten() },
        { status: 400 },
      );
    }

    const { bookSlug, chapterNumber, language } = parsedQuery.data;
    const book = getAudiobookBySlug(bookSlug);
    if (!book) {
      return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }

    const chapter = await getChapterText(book.slug, language, chapterNumber);
    if (!chapter) {
      return NextResponse.json(
        {
          error:
            "Chapter text not available yet. Run the chapter text seeding pipeline for this book/language.",
        },
        { status: 404 },
      );
    }

    const joinedText = chapter.paragraphs.join("\n\n");

    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        book: {
          slug: book.slug,
          title: book.title,
          author: book.author,
          gutenbergId: book.gutenbergId,
        },
        chapterNumber: chapter.chapterNumber,
        languageRequested: language,
        languageServed: chapter.language,
        chapterTitle: chapter.chapterTitle,
        chapterText: joinedText,
        paragraphs: chapter.paragraphs,
        paragraphCount: chapter.paragraphs.length,
        chapterTextLength: joinedText.length,
        cached: true,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      },
    );
  } catch (error) {
    console.error("[api/audiobooks/chapter-text]", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
