import adultCatalogJson from "@/lib/audiobooks/data/adult-catalog.json";
import childrenCatalogJson from "@/lib/audiobooks/data/children-catalog.json";
import illustratedCatalogJson from "@/lib/audiobooks/data/illustrated-catalog.json";
import {
  AUDIOBOOK_LANGUAGES,
  type AgeGroup,
  type AudiobookEntry,
  type AudiobookLanguage,
  type IllustratedAudiobookEntry,
  type ReadingLevel,
} from "@/lib/audiobooks/types";

export type AudiobookCatalogEntry = AudiobookEntry | IllustratedAudiobookEntry;

export type AudiobookCatalogQuery = {
  ageGroup?: AgeGroup | "all";
  genre?: string | "all";
  language?: AudiobookLanguage | "all";
  search?: string;
  includeIllustrated?: boolean;
  limit?: number;
  sortBy?: "title" | "year_asc" | "year_desc";
};

type CatalogSource = "children" | "adult" | "illustrated";
type RawCatalogEntry = Record<string, unknown>;

const AGE_GROUPS = new Set<AgeGroup>(["children", "teen", "adult", "all-ages"]);
const AUDIOBOOK_LANGUAGE_SET = new Set<AudiobookLanguage>(AUDIOBOOK_LANGUAGES);
const READING_LEVELS = new Set<ReadingLevel>(["pre-reader", "early-reader", "independent"]);

let cachedCatalog: AudiobookCatalogEntry[] | null = null;
let cachedCatalogBySlug: Map<string, AudiobookCatalogEntry> | null = null;

function toNonEmptyString(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function toPositiveInt(value: unknown) {
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric <= 0) {
    return null;
  }
  return numeric;
}

function toYear(value: unknown) {
  if (value === null || value === undefined || value === "") return undefined;
  const numeric = Number(value);
  if (!Number.isInteger(numeric)) return undefined;
  return numeric;
}

function toGenres(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((genre) => toNonEmptyString(genre))
    .filter((genre): genre is string => Boolean(genre));
}

function normalizeAudiobookEntry(
  source: CatalogSource,
  value: unknown,
): AudiobookCatalogEntry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const entry = value as RawCatalogEntry;

  const slug = toNonEmptyString(entry.slug);
  const title = toNonEmptyString(entry.title);
  const author = toNonEmptyString(entry.author);
  const ageGroupValue = toNonEmptyString(entry.ageGroup);
  const originalLanguageValue = toNonEmptyString(entry.originalLanguage);
  const gutenbergId = toPositiveInt(entry.gutenbergId);
  const chapterCount = toPositiveInt(entry.chapterCount);
  const wordCount = toPositiveInt(entry.wordCount);
  const genres = toGenres(entry.genres);

  if (!slug || !title || !author || !ageGroupValue || !originalLanguageValue) {
    return null;
  }
  if (!gutenbergId || !chapterCount || !wordCount) {
    return null;
  }
  if (!AGE_GROUPS.has(ageGroupValue as AgeGroup)) {
    return null;
  }
  if (!AUDIOBOOK_LANGUAGE_SET.has(originalLanguageValue as AudiobookLanguage)) {
    return null;
  }

  const normalizedBase: AudiobookEntry = {
    slug,
    title,
    author,
    gutenbergId,
    ageGroup: ageGroupValue as AgeGroup,
    chapterCount,
    wordCount,
    originalLanguage: originalLanguageValue as AudiobookLanguage,
    genres,
    yearPublished: toYear(entry.yearPublished),
  };

  if (source !== "illustrated") {
    return normalizedBase;
  }

  const pageCount = toPositiveInt(entry.pageCount);
  const readingLevel = toNonEmptyString(entry.readingLevel);
  const illustrationSource = toNonEmptyString(entry.illustrationSource);
  const hasIllustrations = entry.hasIllustrations === true;

  if (
    !hasIllustrations ||
    !pageCount ||
    !readingLevel ||
    !illustrationSource ||
    !READING_LEVELS.has(readingLevel as ReadingLevel) ||
    (illustrationSource !== "gutenberg" && illustrationSource !== "custom")
  ) {
    return normalizedBase;
  }

  return {
    ...normalizedBase,
    hasIllustrations: true,
    pageCount,
    illustrationSource,
    readingLevel: readingLevel as ReadingLevel,
  };
}

function parseCatalogSource(source: CatalogSource, rawCatalog: unknown) {
  if (!Array.isArray(rawCatalog)) {
    return [] as AudiobookCatalogEntry[];
  }
  return rawCatalog
    .map((entry) => normalizeAudiobookEntry(source, entry))
    .filter((entry): entry is AudiobookCatalogEntry => Boolean(entry));
}

function dedupeBySlug(entries: AudiobookCatalogEntry[]) {
  const seen = new Set<string>();
  const deduped: AudiobookCatalogEntry[] = [];
  for (const entry of entries) {
    const key = entry.slug.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(entry);
  }
  return deduped;
}

function applySort(entries: AudiobookCatalogEntry[], sortBy: NonNullable<AudiobookCatalogQuery["sortBy"]>) {
  const copy = [...entries];
  switch (sortBy) {
    case "year_asc":
      return copy.sort((a, b) => {
        const aYear = a.yearPublished ?? Number.POSITIVE_INFINITY;
        const bYear = b.yearPublished ?? Number.POSITIVE_INFINITY;
        if (aYear !== bYear) return aYear - bYear;
        return a.title.localeCompare(b.title);
      });
    case "year_desc":
      return copy.sort((a, b) => {
        const aYear = a.yearPublished ?? Number.NEGATIVE_INFINITY;
        const bYear = b.yearPublished ?? Number.NEGATIVE_INFINITY;
        if (aYear !== bYear) return bYear - aYear;
        return a.title.localeCompare(b.title);
      });
    case "title":
    default:
      return copy.sort((a, b) => a.title.localeCompare(b.title));
  }
}

function clampLimit(limit: number | undefined) {
  if (!Number.isFinite(Number(limit))) return undefined;
  return Math.max(1, Math.min(5000, Math.trunc(Number(limit))));
}

function isIllustratedEntry(entry: AudiobookCatalogEntry): entry is IllustratedAudiobookEntry {
  return "hasIllustrations" in entry && entry.hasIllustrations === true;
}

function loadCatalog() {
  if (cachedCatalog && cachedCatalogBySlug) {
    return { entries: cachedCatalog, bySlug: cachedCatalogBySlug };
  }

  const merged = dedupeBySlug([
    ...parseCatalogSource("children", childrenCatalogJson),
    ...parseCatalogSource("adult", adultCatalogJson),
    ...parseCatalogSource("illustrated", illustratedCatalogJson),
  ]);

  const entries = applySort(merged, "title");
  const bySlug = new Map(entries.map((entry) => [entry.slug.toLowerCase(), entry] as const));

  cachedCatalog = entries;
  cachedCatalogBySlug = bySlug;
  return { entries, bySlug };
}

export function getAudiobookCatalogEntries(options: AudiobookCatalogQuery = {}) {
  const { entries } = loadCatalog();

  const includeIllustrated = options.includeIllustrated ?? true;
  const requestedAgeGroup = options.ageGroup ?? "all";
  const requestedGenre = (options.genre ?? "all").trim().toLowerCase();
  const requestedLanguage = options.language ?? "all";
  const requestedSearch = (options.search ?? "").trim().toLowerCase();
  const requestedLimit = clampLimit(options.limit);
  const sortBy = options.sortBy ?? "title";

  let filtered = entries.filter((entry) => {
    if (!includeIllustrated && isIllustratedEntry(entry)) {
      return false;
    }
    if (requestedAgeGroup !== "all" && entry.ageGroup !== requestedAgeGroup) {
      return false;
    }
    if (requestedLanguage !== "all" && entry.originalLanguage !== requestedLanguage) {
      return false;
    }
    if (requestedGenre !== "all") {
      const hasGenre = entry.genres.some((genre) => genre.toLowerCase() === requestedGenre);
      if (!hasGenre) return false;
    }
    if (requestedSearch.length > 0) {
      const haystack = `${entry.title} ${entry.author} ${entry.slug} ${entry.genres.join(" ")}`.toLowerCase();
      if (!haystack.includes(requestedSearch)) return false;
    }
    return true;
  });

  filtered = applySort(filtered, sortBy);
  if (typeof requestedLimit === "number") {
    filtered = filtered.slice(0, requestedLimit);
  }
  return filtered;
}

export function getFeaturedAudiobookEntries(limit = 120) {
  const target = Math.max(1, Math.min(500, Math.trunc(limit)));
  const sortedCatalog = getAudiobookCatalogEntries({ sortBy: "title" });

  const illustrated = sortedCatalog.filter(isIllustratedEntry);
  const children = sortedCatalog.filter(
    (entry) => !isIllustratedEntry(entry) && (entry.ageGroup === "children" || entry.ageGroup === "all-ages"),
  );
  const older = sortedCatalog.filter(
    (entry) => !isIllustratedEntry(entry) && (entry.ageGroup === "teen" || entry.ageGroup === "adult"),
  );

  const featured: AudiobookCatalogEntry[] = [];
  const seen = new Set<string>();
  const maxIllustrated = Math.min(20, Math.floor(target * 0.2));

  for (const entry of illustrated.slice(0, maxIllustrated)) {
    const key = entry.slug.toLowerCase();
    if (seen.has(key)) continue;
    featured.push(entry);
    seen.add(key);
  }

  let childIndex = 0;
  let olderIndex = 0;
  while (featured.length < target && (childIndex < children.length || olderIndex < older.length)) {
    if (childIndex < children.length) {
      const child = children[childIndex];
      childIndex += 1;
      const key = child.slug.toLowerCase();
      if (!seen.has(key)) {
        featured.push(child);
        seen.add(key);
      }
      if (featured.length >= target) break;
    }
    if (olderIndex < older.length) {
      const olderEntry = older[olderIndex];
      olderIndex += 1;
      const key = olderEntry.slug.toLowerCase();
      if (!seen.has(key)) {
        featured.push(olderEntry);
        seen.add(key);
      }
    }
  }

  return featured.slice(0, target);
}

export function getAudiobookBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;
  const { bySlug } = loadCatalog();
  return bySlug.get(normalizedSlug) ?? null;
}

export function getAudiobookCatalogFacets(entries = getAudiobookCatalogEntries()) {
  const genres = [...new Set(entries.flatMap((entry) => entry.genres.map((genre) => genre.trim())).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const languages = [...new Set(entries.map((entry) => entry.originalLanguage))].sort((a, b) =>
    a.localeCompare(b),
  );
  const ageGroups = [...new Set(entries.map((entry) => entry.ageGroup))].sort((a, b) => a.localeCompare(b));

  return {
    genres,
    languages,
    ageGroups,
    genreCount: genres.length,
    languageCount: languages.length,
    ageGroupCount: ageGroups.length,
    totalBooks: entries.length,
  };
}
