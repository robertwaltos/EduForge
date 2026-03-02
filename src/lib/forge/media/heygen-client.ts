/**
 * FORGE — HeyGen Avatar Video Client
 *
 * Generates talking-head instructor videos via HeyGen API v2.
 * Each module uses a consistent avatar (see avatar-course-map.ts).
 *
 * API Docs: https://docs.heygen.com/reference/create-an-avatar-video-v2
 *
 * Pricing (Avatar III): $0.0167/sec ≈ $1.00/min
 * Pricing (Avatar IV):  $0.10/sec  ≈ $6.00/min
 * Video Translate:      $0.05/sec  (speed mode)
 *
 * Budget: $300 initial batch → ~300 min of Avatar III video
 */

import { getAvatarForModule, type AvatarPersona } from "./avatar-course-map";

// ── Types ──────────────────────────────────────────────────────────────────

export interface HeyGenVideoRequest {
  moduleId: string;
  lessonId: string;
  /** Script text the avatar speaks (max 5000 chars) */
  script: string;
  /** Optional title for the video */
  title?: string;
  /** Override avatar persona (defaults to module's assigned avatar) */
  avatarOverride?: Partial<AvatarPersona>;
  /** Use Avatar IV engine (6x more expensive) */
  useAvatarIV?: boolean;
  /** Enable captions */
  captions?: boolean;
  /** Video dimensions */
  dimension?: { width: number; height: number };
  /** Callback URL for webhook notifications */
  callbackUrl?: string;
  /** Custom tracking ID */
  callbackId?: string;
}

export interface HeyGenVideoResponse {
  videoId: string;
  status: "pending" | "waiting" | "processing" | "completed" | "failed";
}

export interface HeyGenVideoStatus {
  videoId: string;
  status: "pending" | "waiting" | "processing" | "completed" | "failed";
  videoUrl?: string;
  duration?: number;
  thumbnailUrl?: string;
  error?: string;
}

export interface HeyGenAvatar {
  avatarId: string;
  avatarName: string;
  gender: string;
  previewImageUrl: string;
  previewVideoUrl: string;
}

export interface HeyGenVoice {
  voiceId: string;
  language: string;
  gender: string;
  name: string;
  previewAudio: string;
  supportPause: boolean;
  emotionSupport: boolean;
}

export interface HeyGenTranslateRequest {
  videoUrl: string;
  targetLanguage: string;
  /** "speed" ($0.05/sec) or "precision" ($0.10/sec) */
  mode?: "speed" | "precision";
  title?: string;
}

export interface HeyGenQuota {
  remainingQuota: number;
  apiCreditBalance: number;
}

// ── Client ─────────────────────────────────────────────────────────────────

const HEYGEN_BASE = "https://api.heygen.com";

function getApiKey(): string {
  const key = process.env.HEYGEN_API_KEY;
  if (!key) throw new Error("HEYGEN_API_KEY not set in environment");
  return key;
}

async function heygenFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`${HEYGEN_BASE}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Api-Key": getApiKey(),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HeyGen API ${res.status}: ${text}`);
  }

  const json = (await res.json()) as { data: T; error?: string };
  if (json.error) throw new Error(`HeyGen error: ${json.error}`);
  return json.data;
}

// ── Core Operations ────────────────────────────────────────────────────────

/**
 * Generate an avatar video for a lesson.
 *
 * Uses the module's assigned avatar persona from avatar-course-map.ts.
 * Script text comes from the lesson's chunks[].content concatenated.
 */
export async function generateAvatarVideo(
  req: HeyGenVideoRequest,
): Promise<HeyGenVideoResponse> {
  const persona = req.avatarOverride
    ? { ...getAvatarForModule(req.moduleId), ...req.avatarOverride }
    : getAvatarForModule(req.moduleId);

  if (!persona?.avatarId) {
    throw new Error(
      `No avatar configured for module ${req.moduleId}. ` +
        "Add it to avatar-course-map.ts or provide avatarOverride.",
    );
  }

  if (req.script.length > 5000) {
    throw new Error(
      `Script too long (${req.script.length} chars, max 5000). ` +
        "Split into multiple scenes or trim the content.",
    );
  }

  const body = {
    caption: req.captions ?? true,
    title: req.title ?? `${req.moduleId}/${req.lessonId}`,
    callback_id: req.callbackId ?? req.lessonId,
    callback_url: req.callbackUrl,
    dimension: req.dimension ?? { width: 1280, height: 720 },
    video_inputs: [
      {
        character: {
          type: "avatar",
          avatar_id: persona.avatarId,
          avatar_style: "normal",
        },
        voice: {
          type: "text",
          voice_id: persona.voiceId,
          input_text: req.script,
          speed: persona.voiceSpeed,
        },
        background: {
          type: "color",
          value: persona.background,
        },
      },
    ],
    ...(req.useAvatarIV ? { test: false } : {}),
  };

  const data = await heygenFetch<{ video_id: string }>("/v2/video/generate", {
    method: "POST",
    body,
  });

  return {
    videoId: data.video_id,
    status: "pending",
  };
}

/**
 * Check video generation status and get download URL when complete.
 */
export async function getVideoStatus(
  videoId: string,
): Promise<HeyGenVideoStatus> {
  const data = await heygenFetch<{
    status: string;
    video_url?: string;
    duration?: number;
    thumbnail_url?: string;
    error?: string;
  }>(`/v1/video_status.get?video_id=${videoId}`);

  return {
    videoId,
    status: data.status as HeyGenVideoStatus["status"],
    videoUrl: data.video_url,
    duration: data.duration,
    thumbnailUrl: data.thumbnail_url,
    error: data.error,
  };
}

/**
 * Poll until video is complete or failed.
 * Returns the final status.
 */
export async function waitForVideo(
  videoId: string,
  options: { pollIntervalMs?: number; timeoutMs?: number } = {},
): Promise<HeyGenVideoStatus> {
  const { pollIntervalMs = 15_000, timeoutMs = 600_000 } = options;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const status = await getVideoStatus(videoId);
    if (status.status === "completed" || status.status === "failed") {
      return status;
    }
    await new Promise((r) => setTimeout(r, pollIntervalMs));
  }

  throw new Error(`Video ${videoId} timed out after ${timeoutMs}ms`);
}

/**
 * Translate an existing video to another language.
 * Preserves avatar lip-sync.
 */
export async function translateVideo(
  req: HeyGenTranslateRequest,
): Promise<{ videoTranslateId: string }> {
  const data = await heygenFetch<{ video_translate_id: string }>(
    "/v2/video_translate",
    {
      method: "POST",
      body: {
        video_url: req.videoUrl,
        output_language: req.targetLanguage,
        translate_audio_only: false,
        title: req.title,
      },
    },
  );

  return { videoTranslateId: data.video_translate_id };
}

/**
 * Check translation status.
 */
export async function getTranslationStatus(
  videoTranslateId: string,
): Promise<{ status: string; url?: string }> {
  return heygenFetch(
    `/v2/video_translate/${videoTranslateId}`,
  );
}

// ── Discovery ──────────────────────────────────────────────────────────────

/** List all available public avatars */
export async function listAvatars(): Promise<HeyGenAvatar[]> {
  const data = await heygenFetch<{ avatars: HeyGenAvatar[] }>("/v2/avatars");
  return data.avatars ?? [];
}

/** List all available voices, optionally filtered by locale */
export async function listVoices(
  locale?: string,
): Promise<HeyGenVoice[]> {
  const path = locale
    ? `/v2/voices?language=${encodeURIComponent(locale)}`
    : "/v2/voices";
  const data = await heygenFetch<{ voices: HeyGenVoice[] }>(path);
  return data.voices ?? [];
}

/** Get remaining API quota/balance */
export async function getQuota(): Promise<HeyGenQuota> {
  return heygenFetch<HeyGenQuota>("/v2/user/remaining_quota");
}

// ── Script Builder ─────────────────────────────────────────────────────────

/**
 * Build a HeyGen-ready script from lesson chunks.
 *
 * For Pre-K (ages 3-5): speaks slowly, uses simple words,
 * adds natural pauses between sections.
 *
 * @param chunks - Array of { title, content } from the lesson
 * @param ageRange - "3-5" | "5-8" | "8-12" | "12+"
 * @returns Script text ready for HeyGen voice input (max 5000 chars)
 */
export function buildAvatarScript(
  chunks: Array<{ title: string; content: string }>,
  ageRange: string = "3-5",
): string {
  // For young children, add breathing pauses and slow transitions
  const pauseTag = ageRange === "3-5" ? "\n\n" : "\n";

  const sections = chunks.map((chunk, i) => {
    let text = chunk.content.trim();

    // Clean up any markdown-style formatting
    text = text.replace(/\*\*/g, "").replace(/\*/g, "");
    // Remove any HTML tags
    text = text.replace(/<[^>]+>/g, "");

    // For Pre-K: add friendly transitions
    if (ageRange === "3-5" && i > 0) {
      text = `Now, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
    }

    return text;
  });

  let script = sections.join(pauseTag);

  // Enforce 5000 char limit
  if (script.length > 5000) {
    script = script.slice(0, 4950) + "... And that's our lesson for today!";
  }

  return script;
}

/**
 * Estimate cost for a batch of videos.
 *
 * @param scriptLengths - Array of script character counts
 * @param engine - "III" (default) or "IV"
 * @returns Estimated cost in USD
 */
export function estimateBatchCost(
  scriptLengths: number[],
  engine: "III" | "IV" = "III",
): {
  totalScripts: number;
  estimatedTotalSeconds: number;
  estimatedTotalMinutes: number;
  costPerSecond: number;
  estimatedCostUSD: number;
} {
  // Average speaking rate: ~150 words/min, ~5 chars/word = ~750 chars/min
  const charsPerSecond = 12.5;
  const costPerSecond = engine === "IV" ? 0.1 : 0.0167;

  const totalSeconds = scriptLengths.reduce(
    (sum, len) => sum + len / charsPerSecond,
    0,
  );

  return {
    totalScripts: scriptLengths.length,
    estimatedTotalSeconds: Math.round(totalSeconds),
    estimatedTotalMinutes: Math.round(totalSeconds / 60),
    costPerSecond,
    estimatedCostUSD: Math.round(totalSeconds * costPerSecond * 100) / 100,
  };
}
