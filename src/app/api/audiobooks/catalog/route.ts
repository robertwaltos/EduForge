import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AUDIOBOOK_LANGUAGES } from "@/lib/audiobooks/types";
import { getAudiobookCatalogEntries, getAudiobookCatalogFacets } from "@/lib/audiobooks/catalog-loader";
import { enforceIpRateLimit } from "@/lib/security/ip-rate-limit";
import { toSafeErrorRecord } from "@/lib/logging/safe-error";

const AGE_GROUPS = ["all", "children", "teen", "adult", "all-ages"] as const;
const SORT_OPTIONS = ["title", "year_asc", "year_desc"] as const;

const QuerySchema = z.object({
  q: z.string().trim().max(120).optional(),
  ageGroup: z.enum(AGE_GROUPS).optional().default("all"),
  genre: z.string().trim().max(80).optional().default("all"),
  language: z
    .enum(["all", ...AUDIOBOOK_LANGUAGES] as const)
    .optional()
    .default("all"),
  includeIllustrated: z.boolean().optional().default(true),
  sort: z.enum(SORT_OPTIONS).optional().default("title"),
  page: z.coerce.number().int().min(1).max(5000).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(120).optional().default(24),
  includeFacets: z.boolean().optional().default(true),
});

function parseBooleanParam(value: string | null) {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "1" || normalized === "true" || normalized === "yes") return true;
  if (normalized === "0" || normalized === "false" || normalized === "no") return false;
  return undefined;
}

export async function GET(request: NextRequest) {
  try {
    const rateLimit = await enforceIpRateLimit(request, "api:audiobooks:catalog:get", {
      max: 120,
      windowMs: 60_000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many audiobook catalog requests. Please retry shortly." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
      );
    }

    const query = QuerySchema.safeParse({
      q: request.nextUrl.searchParams.get("q") ?? undefined,
      ageGroup: request.nextUrl.searchParams.get("ageGroup") ?? undefined,
      genre: request.nextUrl.searchParams.get("genre") ?? undefined,
      language: request.nextUrl.searchParams.get("language") ?? undefined,
      includeIllustrated: parseBooleanParam(request.nextUrl.searchParams.get("includeIllustrated")),
      sort: request.nextUrl.searchParams.get("sort") ?? undefined,
      page: request.nextUrl.searchParams.get("page") ?? undefined,
      pageSize: request.nextUrl.searchParams.get("pageSize") ?? undefined,
      includeFacets: parseBooleanParam(request.nextUrl.searchParams.get("includeFacets")),
    });

    if (!query.success) {
      return NextResponse.json(
        { error: "Invalid catalog query parameters.", details: query.error.flatten() },
        { status: 400 },
      );
    }

    const { q, ageGroup, genre, language, includeIllustrated, sort, page, pageSize, includeFacets } =
      query.data;

    const filtered = getAudiobookCatalogEntries({
      search: q,
      ageGroup,
      genre,
      language,
      includeIllustrated,
      sortBy: sort,
    });

    const total = filtered.length;
    const totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;
    const pageClamped = Math.min(page, totalPages);
    const start = (pageClamped - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      query: {
        q: q ?? "",
        ageGroup,
        genre,
        language,
        includeIllustrated,
        sort,
        page: pageClamped,
        pageSize,
      },
      pagination: {
        total,
        totalPages,
        page: pageClamped,
        pageSize,
        hasPrevious: pageClamped > 1,
        hasNext: pageClamped < totalPages,
      },
      items,
      facets: includeFacets ? getAudiobookCatalogFacets(filtered) : null,
    });
  } catch (error) {
    console.error("[api/audiobooks/catalog]", toSafeErrorRecord(error));
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
