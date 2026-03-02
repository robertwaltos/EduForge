/**
 * FORGE — Google Generative AI Client (Imagen 4 + Veo 3.1)
 *
 * Generates lesson images (Imagen 4) and concept video clips (Veo 3.1)
 * using the Google Generative AI SDK via Gemini API.
 *
 * Requires: GOOGLE_API_KEY in .env
 *
 * Pricing:
 *   Imagen 4:      $0.04/image ($0.02 Fast variant)
 *   Imagen 4 Ultra: $0.06/image
 *   Veo 3.1:       $0.20/sec video, $0.40/sec video+audio (720p/1080p)
 *   Veo 3.1 Fast:  $0.10/sec video, $0.15/sec video+audio
 */

// ── Types ──────────────────────────────────────────────────────────────────

export type ImagenModel =
  | "imagen-4.0-generate-001"      // Standard ($0.04/img)
  | "imagen-4.0-fast-generate-001" // Fast ($0.02/img)
  | "imagen-4.0-ultra-generate-001"; // Ultra ($0.06/img)

export type VeoModel =
  | "veo-3.1-generate-preview"     // Standard
  | "veo-3.1-fast-generate-preview"; // Fast (lower cost)

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9" | "3:2";
export type VeoAspectRatio = "16:9" | "9:16";
export type VeoResolution = "720p" | "1080p" | "4k";

export interface ImagenRequest {
  /** The prompt describing the image to generate */
  prompt: string;
  /** Negative prompt — what NOT to include */
  negativePrompt?: string;
  /** Model to use (default: imagen-4.0-generate-001) */
  model?: ImagenModel;
  /** Number of images to generate (1-4, default 1) */
  numberOfImages?: number;
  /** Aspect ratio (default: 3:2 for lesson images) */
  aspectRatio?: AspectRatio;
  /** Allow person generation */
  personGeneration?: "dont_allow" | "allow_adult" | "allow_all";
  /** For tracking: moduleId/lessonId */
  metadata?: { moduleId: string; lessonId: string; promptType: string };
}

export interface ImagenResponse {
  images: Array<{
    /** Base64-encoded image data */
    imageData: string;
    /** MIME type (image/png) */
    mimeType: string;
  }>;
  model: string;
}

export interface VeoRequest {
  /** Text prompt for the video */
  prompt: string;
  /** Negative prompt */
  negativePrompt?: string;
  /** Model to use (default: veo-3.1-fast-generate-preview for cost savings) */
  model?: VeoModel;
  /** Aspect ratio (default: 16:9) */
  aspectRatio?: VeoAspectRatio;
  /** Resolution (default: 720p) */
  resolution?: VeoResolution;
  /** Duration in seconds (4, 6, or 8) */
  durationSeconds?: 4 | 6 | 8;
  /** Allow person generation */
  personGeneration?: "dont_allow" | "allow_adult" | "allow_all";
  /** Initial image to animate (image-to-video) */
  image?: { data: string; mimeType: string };
  /** Metadata for tracking */
  metadata?: { moduleId: string; lessonId: string; promptType: string };
}

export interface VeoResponse {
  /** Operation name for polling */
  operationName: string;
  /** Whether the operation is done */
  done: boolean;
  /** Video data (available when done) */
  video?: {
    videoData: string;
    mimeType: string;
    durationSeconds: number;
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getApiKey(): string {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("GOOGLE_API_KEY not set in environment");
  return key;
}

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

async function googleFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const url = `${GEMINI_BASE}${path}${path.includes("?") ? "&" : "?"}key=${getApiKey()}`;

  const res = await fetch(url, {
    method: options.method ?? "POST",
    headers: { "Content-Type": "application/json" },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google API ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}

// ── Imagen 4 — Image Generation ────────────────────────────────────────────

/**
 * Generate an image using Google Imagen 4.
 *
 * For lesson illustrations: use aspect 3:2, standard model.
 * For thumbnails: use aspect 16:9, fast model.
 *
 * @returns Base64-encoded PNG image(s)
 */
export async function generateImage(
  req: ImagenRequest,
): Promise<ImagenResponse> {
  const model = req.model ?? "imagen-4.0-generate-001";

  const body = {
    instances: [{ prompt: req.prompt }],
    parameters: {
      sampleCount: req.numberOfImages ?? 1,
      aspectRatio: req.aspectRatio ?? "3:2",
      ...(req.negativePrompt ? { negativePrompt: req.negativePrompt } : {}),
      personGeneration: req.personGeneration ?? "allow_all",
      outputOptions: { mimeType: "image/png" },
    },
  };

  const data = await googleFetch<{
    predictions: Array<{
      bytesBase64Encoded: string;
      mimeType: string;
    }>;
  }>(`/models/${model}:predict`, { body });

  return {
    images: (data.predictions ?? []).map((p) => ({
      imageData: p.bytesBase64Encoded,
      mimeType: p.mimeType ?? "image/png",
    })),
    model,
  };
}

// ── Veo 3.1 — Video Generation ─────────────────────────────────────────────

/**
 * Start a video generation job using Google Veo 3.1.
 *
 * Returns an operation name for polling.
 * Videos take 11 sec to 6 min to generate.
 *
 * For cost optimization: use veo-3.1-fast-generate-preview at $0.10/sec
 */
export async function generateVideo(
  req: VeoRequest,
): Promise<VeoResponse> {
  const model = req.model ?? "veo-3.1-fast-generate-preview";
  const url = `${GEMINI_BASE}/models/${model}:predictLongRunning?key=${getApiKey()}`;

  const body: Record<string, unknown> = {
    instances: [
      {
        prompt: req.prompt,
        ...(req.image
          ? {
              image: {
                bytesBase64Encoded: req.image.data,
                mimeType: req.image.mimeType,
              },
            }
          : {}),
      },
    ],
    parameters: {
      aspectRatio: req.aspectRatio ?? "16:9",
      personGeneration: req.personGeneration ?? "allow_all",
      ...(req.negativePrompt ? { negativePrompt: req.negativePrompt } : {}),
      ...(req.durationSeconds ? { durationSeconds: req.durationSeconds } : {}),
      ...(req.resolution ? { resolution: req.resolution } : {}),
      sampleCount: 1,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Veo API ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { name: string; done?: boolean };

  return {
    operationName: data.name,
    done: data.done ?? false,
  };
}

/**
 * Poll a Veo video generation operation until complete.
 */
export async function pollVideoOperation(
  operationName: string,
  options: { pollIntervalMs?: number; timeoutMs?: number } = {},
): Promise<VeoResponse> {
  const { pollIntervalMs = 10_000, timeoutMs = 360_000 } = options;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const url = `${GEMINI_BASE}/${operationName}?key=${getApiKey()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Poll failed: ${res.status}`);

    const data = (await res.json()) as {
      name: string;
      done?: boolean;
      response?: {
        generateVideoResponse?: {
          generatedSamples?: Array<{
            video?: { bytesBase64Encoded: string; mimeType: string };
            videoMetadata?: { videoDuration: string };
          }>;
        };
      };
    };

    if (data.done) {
      const sample =
        data.response?.generateVideoResponse?.generatedSamples?.[0];
      return {
        operationName,
        done: true,
        video: sample?.video
          ? {
              videoData: sample.video.bytesBase64Encoded,
              mimeType: sample.video.mimeType ?? "video/mp4",
              durationSeconds: parseFloat(
                sample.videoMetadata?.videoDuration ?? "8",
              ),
            }
          : undefined,
      };
    }

    await new Promise((r) => setTimeout(r, pollIntervalMs));
  }

  throw new Error(`Veo operation ${operationName} timed out after ${timeoutMs}ms`);
}

// ── Prompt Builders ────────────────────────────────────────────────────────

/**
 * Build an Imagen 4 prompt for a lesson illustration.
 *
 * Optimized for educational content — child-safe, high contrast,
 * clean backgrounds, no text overlays.
 */
export function buildLessonImagePrompt(
  lessonTitle: string,
  concept: string,
  ageRange: string,
  subject: string,
): string {
  const style =
    ageRange === "3-5"
      ? "bright, cheerful, cartoon-style educational illustration with rounded shapes and warm colors"
      : ageRange === "5-8"
        ? "clean, colorful educational illustration with friendly characters"
        : "modern, clear educational diagram or illustration";

  const safety =
    "Child-safe content. No text overlays. No logos. No copyrighted characters. High contrast. Clean uncluttered background.";

  return [
    `Educational illustration for "${lessonTitle}".`,
    `Subject: ${subject}. Target age: ${ageRange}.`,
    `Core concept: ${concept}`,
    `Style: ${style}.`,
    `Composition: one dominant concept visual, two supporting details, neutral background.`,
    safety,
    `Aspect ratio 3:2.`,
  ].join(" ");
}

/**
 * Build a Veo 3.1 prompt for a concept explainer clip.
 *
 * NOT for talking head (that's HeyGen). This is B-roll:
 * animations of concepts, visual demonstrations, etc.
 */
export function buildConceptVideoPrompt(
  lessonTitle: string,
  concept: string,
  ageRange: string,
  subject: string,
): string {
  const style =
    ageRange === "3-5"
      ? "Bright, colorful 3D animated style. Cheerful, rounded shapes. Slow, gentle camera movement."
      : "Clean, educational animation style. Clear visual demonstration.";

  const safety =
    "Child-safe. No violence. No fear imagery. No copyrighted characters. Classroom-appropriate.";

  return [
    `Short educational concept animation for "${lessonTitle}".`,
    `Subject: ${subject}. Age: ${ageRange}.`,
    `Visually demonstrate: ${concept}`,
    style,
    `Camera: smooth, slow pan or gentle zoom. Duration: 6-8 seconds.`,
    safety,
  ].join(" ");
}

// ── Cost Estimators ────────────────────────────────────────────────────────

export function estimateImagenCost(
  imageCount: number,
  model: ImagenModel = "imagen-4.0-generate-001",
): { images: number; costPerImage: number; totalCostUSD: number } {
  const costs: Record<ImagenModel, number> = {
    "imagen-4.0-generate-001": 0.04,
    "imagen-4.0-fast-generate-001": 0.02,
    "imagen-4.0-ultra-generate-001": 0.06,
  };
  const costPerImage = costs[model];
  return {
    images: imageCount,
    costPerImage,
    totalCostUSD: Math.round(imageCount * costPerImage * 100) / 100,
  };
}

export function estimateVeoCost(
  clipCount: number,
  durationSeconds: number = 6,
  model: VeoModel = "veo-3.1-fast-generate-preview",
  withAudio: boolean = false,
): { clips: number; totalSeconds: number; costPerSecond: number; totalCostUSD: number } {
  // Veo 3.1 Fast: $0.10/sec video, $0.15/sec video+audio
  // Veo 3.1:      $0.20/sec video, $0.40/sec video+audio
  const costs: Record<string, number> = {
    "veo-3.1-fast-generate-preview:video": 0.10,
    "veo-3.1-fast-generate-preview:audio": 0.15,
    "veo-3.1-generate-preview:video": 0.20,
    "veo-3.1-generate-preview:audio": 0.40,
  };
  const key = `${model}:${withAudio ? "audio" : "video"}`;
  const costPerSecond = costs[key] ?? 0.10;
  const totalSeconds = clipCount * durationSeconds;

  return {
    clips: clipCount,
    totalSeconds,
    costPerSecond,
    totalCostUSD: Math.round(totalSeconds * costPerSecond * 100) / 100,
  };
}
