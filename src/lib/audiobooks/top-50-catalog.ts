import { getFeaturedAudiobookEntries } from "@/lib/audiobooks/catalog-loader";
import type { AudiobookEntry } from "@/lib/audiobooks/types";

/**
 * Backward-compatible export for scripts and pages that still import
 * TOP_50_AUDIOBOOKS while the full catalog loader powers selection logic.
 */
export const TOP_50_AUDIOBOOKS: AudiobookEntry[] = getFeaturedAudiobookEntries(50);
