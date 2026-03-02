/**
 * FORGE — Federated Output Rendering & Generation Engine
 *
 * Canonical registry of ALL media generation capabilities in Koydo.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  AGENTS: Read this file FIRST before writing any generation code.  │
 * │  If the capability exists, import from the listed module.          │
 * │  If adding a new one, register it here with the same schema.       │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * This file is purely declarative — no runtime cost. It serves as a
 * machine-readable and human-readable manifest of what FORGE can do.
 */

// ── Capability Schema ──────────────────────────────────────────────────────

export interface ForgeCapability {
  /** Unique dot-path identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** What this capability produces */
  outputType: "audio" | "text" | "image" | "video" | "translation";
  /** Where the implementation lives (relative to src/lib/) */
  module: string;
  /** Key exported functions from that module */
  exports: string[];
  /** Provider fallback chain in priority order */
  providers: Array<{
    name: string;
    type: "cloud-paid" | "cloud-free" | "local" | "browser" | "pre-seeded";
    /** Is this provider currently integrated and working? */
    active: boolean;
    /** Approximate cost per 1M characters or per 1K images */
    costPer1M?: string;
  }>;
  /** Is output cached in Supabase Storage after first generation? */
  cached: boolean;
  /** Cache key pattern in Supabase Storage */
  cachePattern?: string;
  /** Is this available to free-tier users? */
  freeTierAllowed: boolean;
  /** What free-tier users get instead */
  freeTierFallback?: string;
  /** Related seed scripts (paths relative to project root) */
  seedScripts?: string[];
  /** API routes that expose this capability */
  apiRoutes?: string[];
  /** Current operational status */
  status: "production" | "ready" | "partial" | "planned";
}

// ── Registry ───────────────────────────────────────────────────────────────

export const FORGE_CAPABILITIES: ForgeCapability[] = [
  /* ── TTS (Text-to-Speech) ─────────────────────────────────────────────── */

  {
    id: "tts.general",
    name: "General TTS (lessons, UI read-aloud)",
    outputType: "audio",
    module: "forge/tts/tts-service.ts",
    exports: ["generateTTS", "OPENAI_VOICES", "OpenAIVoice", "TTSProvider"],
    providers: [
      { name: "OpenAI tts-1", type: "cloud-paid", active: true, costPer1M: "$15" },
      { name: "ElevenLabs", type: "cloud-paid", active: true, costPer1M: "$18-30" },
      { name: "Browser SpeechSynthesis", type: "browser", active: true },
    ],
    cached: true,
    cachePattern: "{voiceId}/{sha256-hash}.mp3",
    freeTierAllowed: false,
    freeTierFallback: "Browser SpeechSynthesis (window.speechSynthesis)",
    apiRoutes: ["POST /api/tts/generate"],
    status: "production",
  },

  {
    id: "tts.lesson-narration",
    name: "Lesson narration audio (pre-generated)",
    outputType: "audio",
    module: "forge/tts/voice-engine.ts",
    exports: ["getVoiceUrl", "requestDynamicVoice"],
    providers: [
      { name: "Pre-generated (Supabase)", type: "pre-seeded", active: true },
    ],
    cached: true,
    cachePattern: "media_generation_jobs table → Supabase Storage URL",
    freeTierAllowed: true,
    seedScripts: ["scripts/process-audio-jobs.mjs", "scripts/queue-audio-jobs.mjs"],
    status: "production",
  },

  /* ── Audiobook Pipeline ───────────────────────────────────────────────── */

  {
    id: "audiobook.text",
    name: "Audiobook chapter text (pre-seeded from Gutenberg)",
    outputType: "text",
    module: "forge/audiobooks/chapter-text-service.ts",
    exports: [
      "getChapterText", "getCachedChapterText", "setCachedChapterText",
      "isChapterTextCached", "getAvailableChapters", "getAvailableLanguages",
      "fetchGutenbergText", "extractAllChapters", "extractChapterFromText",
      "stripGutenbergBoilerplate",
    ],
    providers: [
      { name: "Supabase Storage (pre-seeded)", type: "pre-seeded", active: true },
      { name: "Project Gutenberg (seed-only)", type: "cloud-free", active: true },
    ],
    cached: true,
    cachePattern: "audiobooks-text/{bookSlug}/{lang}/ch{NNN}.json",
    freeTierAllowed: true,
    seedScripts: ["scripts/seed-audiobook-texts.ts"],
    apiRoutes: ["GET /api/audiobooks/chapter-text"],
    status: "production",
  },

  {
    id: "audiobook.tts",
    name: "Audiobook chapter audio (TTS)",
    outputType: "audio",
    module: "forge/audiobooks/audiobook-tts-service.ts",
    exports: ["generateAudiobookChapterTTS", "isChapterAudioCached"],
    providers: [
      { name: "Supabase Storage (cached)", type: "pre-seeded", active: true },
      { name: "OpenAI tts-1 (on-demand)", type: "cloud-paid", active: true, costPer1M: "$15" },
      { name: "ElevenLabs (fallback)", type: "cloud-paid", active: true, costPer1M: "$18-30" },
      { name: "Kokoro-82M (local, planned)", type: "local", active: false },
      { name: "XTTS-v2 (local, planned)", type: "local", active: false },
    ],
    cached: true,
    cachePattern: "audiobooks/{bookSlug}/{lang}/{voiceId}/ch{NNN}.mp3",
    freeTierAllowed: true,
    freeTierFallback: "Pre-generated cached audio only. No on-demand generation.",
    seedScripts: ["scripts/seed-audiobook-chapter1.ts", "scripts/queue-public-domain-audiobooks.mjs"],
    apiRoutes: ["POST /api/audiobooks/tts"],
    status: "production",
  },

  {
    id: "audiobook.translation",
    name: "Audiobook chapter translation",
    outputType: "translation",
    module: "forge/audiobooks/audiobook-translation-service.ts",
    exports: ["translateChapter", "translateBookChapters"],
    providers: [
      { name: "DeepL", type: "cloud-paid", active: true, costPer1M: "€5.49" },
      { name: "Google Translate", type: "cloud-paid", active: true, costPer1M: "$20" },
      { name: "Helsinki-NLP OPUS (local, planned)", type: "local", active: false },
    ],
    cached: true,
    cachePattern: "audiobooks-text/{bookSlug}/{lang}/ch{NNN}.json",
    freeTierAllowed: true,
    freeTierFallback: "Pre-seeded translations only. No on-demand translation.",
    seedScripts: ["scripts/seed-audiobook-translations.ts"],
    status: "ready",
  },

  {
    id: "audiobook.catalog",
    name: "Audiobook catalog loader",
    outputType: "text",
    module: "forge/audiobooks/catalog-loader.ts",
    exports: ["getAudiobookCatalogEntries", "getAudiobookBySlug", "getAudiobookCatalogFacets"],
    providers: [
      { name: "Local JSON catalogs", type: "pre-seeded", active: true },
    ],
    cached: false,
    freeTierAllowed: true,
    apiRoutes: ["GET /api/audiobooks/catalog"],
    status: "production",
  },

  {
    id: "audiobook.voice-mapping",
    name: "Voice ID mapping (OpenAI ↔ Kokoro/XTTS)",
    outputType: "text",
    module: "forge/audiobooks/voice-mapping.ts",
    exports: ["resolveLocalVoice", "estimatePregen", "OPENAI_TO_KOKORO", "KOKORO_VOICES"],
    providers: [
      { name: "Static mapping", type: "pre-seeded", active: true },
    ],
    cached: false,
    freeTierAllowed: true,
    status: "ready",
  },

  /* ── General Translation ──────────────────────────────────────────────── */

  {
    id: "translation.general",
    name: "General text translation (for language learning)",
    outputType: "translation",
    module: "language-learning/providers.ts",
    exports: ["translateText"],
    providers: [
      { name: "DeepL", type: "cloud-paid", active: true, costPer1M: "€5.49" },
      { name: "Google Translate", type: "cloud-paid", active: true, costPer1M: "$20" },
      { name: "Mock (dev fallback)", type: "browser", active: true },
    ],
    cached: false,
    freeTierAllowed: false,
    freeTierFallback: "No live translation. UI strings are pre-translated via i18n.",
    apiRoutes: ["POST /api/language/translate"],
    status: "production",
  },

  /* ── Image Generation ─────────────────────────────────────────────────── */

  {
    id: "image.comfyui",
    name: "Image generation (ComfyUI / Flux Schnell)",
    outputType: "image",
    module: "forge/image/generators.ts",
    exports: ["ComfyUIGenerator", "neuralCinema"],
    providers: [
      { name: "ComfyUI + Flux Schnell (local GPU)", type: "local", active: true, costPer1M: "$0" },
    ],
    cached: true,
    cachePattern: "Supabase Storage via media_generation_jobs",
    freeTierAllowed: true,
    freeTierFallback: "Pre-generated images from Grok manifest or asset registry",
    seedScripts: [
      "scripts/autonomous-media-agent.mjs",
      "scripts/compile-media-prompts.mjs",
      "scripts/process-media-jobs.mjs",
    ],
    status: "production",
  },

  {
    id: "image.grok-manifest",
    name: "Pre-generated image catalog (Grok)",
    outputType: "image",
    module: "forge/image/grok-manifest-catalog.ts",
    exports: ["loadGrokManifest", "queryGrokManifest"],
    providers: [
      { name: "Local JSON manifest", type: "pre-seeded", active: true },
    ],
    cached: false,
    freeTierAllowed: true,
    status: "production",
  },

  {
    id: "image.fallbacks",
    name: "Pre-generated media resolver (lessons/modules)",
    outputType: "image",
    module: "forge/image/media-fallbacks.ts",
    exports: ["resolveGeneratedLessonMedia", "resolveGeneratedModuleMedia"],
    providers: [
      { name: "Pre-generated asset registry", type: "pre-seeded", active: true },
    ],
    cached: false,
    freeTierAllowed: true,
    status: "production",
  },

  {
    id: "image.grok-aurora",
    name: "Grok Aurora cloud image generation",
    outputType: "image",
    module: "media/grok-manifest-catalog.ts",
    exports: ["generateGrokImage"],
    providers: [
      { name: "Grok Aurora (xAI cloud)", type: "cloud-paid", active: true, costPer1M: "varies" },
    ],
    cached: true,
    cachePattern: "Supabase Storage via media_generation_jobs",
    freeTierAllowed: false,
    freeTierFallback: "Pre-generated images from asset registry",
    apiRoutes: [],
    status: "production",
  },

  /* ── Video Generation ─────────────────────────────────────────────────── */

  {
    id: "video.wan-i2v",
    name: "Video generation (Wan 2.1 I2V — local GPU) [DEPRECATED]",
    outputType: "video",
    module: "media/generators.ts",
    exports: ["ComfyUIGenerator", "neuralCinema"],
    providers: [
      { name: "ComfyUI + Wan2.1-I2V-14B-480P (local GPU, fp8)", type: "local", active: false, costPer1M: "$0" },
    ],
    cached: true,
    cachePattern: "Supabase Storage via media_generation_jobs (H.264 MP4, 24fps)",
    freeTierAllowed: true,
    freeTierFallback: "Replaced by video.heygen + video.google-veo",
    seedScripts: [],
    status: "planned",
  },

  {
    id: "video.seedance",
    name: "Video / animation generation (Seedance 2.0) [DEPRECATED]",
    outputType: "video",
    module: "forge/video/seedance-prompts.ts",
    exports: ["buildSeedanceVideoPrompt", "buildSeedanceAnimationPrompt"],
    providers: [
      { name: "Seedance 2.0 (not yet integrated)", type: "cloud-paid", active: false },
    ],
    cached: false,
    freeTierAllowed: false,
    status: "planned",
  },

  /* ── Cloud Video & Image (V2 Pipeline) ────────────────────────────────── */

  {
    id: "video.heygen",
    name: "Avatar instructor video (HeyGen API v2)",
    outputType: "video",
    module: "forge/media/heygen-client.ts",
    exports: [
      "generateAvatarVideo", "getVideoStatus", "waitForVideo",
      "translateVideo", "getTranslationStatus",
      "listAvatars", "listVoices", "getQuota",
      "buildAvatarScript", "estimateBatchCost",
    ],
    providers: [
      { name: "HeyGen Avatar III (cloud)", type: "cloud-paid", active: true, costPer1M: "$1.00/min video" },
    ],
    cached: true,
    cachePattern: "Supabase Storage: heygen/{moduleId}/{lessonId}.mp4",
    freeTierAllowed: true,
    freeTierFallback: "Pre-generated cached avatar videos only",
    apiRoutes: [],
    seedScripts: ["scripts/generate-media-batch.ts"],
    status: "ready",
  },

  {
    id: "image.google-imagen",
    name: "Lesson image generation (Google Imagen 4)",
    outputType: "image",
    module: "forge/media/google-ai-client.ts",
    exports: [
      "generateImage", "buildLessonImagePrompt",
      "estimateImagenCost",
    ],
    providers: [
      { name: "Google Imagen 4 (standard)", type: "cloud-paid", active: true, costPer1M: "$40K (1M images)" },
      { name: "Google Imagen 4 Fast", type: "cloud-paid", active: true, costPer1M: "$20K (1M images)" },
    ],
    cached: true,
    cachePattern: "Supabase Storage: google-imagen/{moduleId}/{lessonId}/{index}.png",
    freeTierAllowed: true,
    freeTierFallback: "Pre-generated cached images only",
    seedScripts: ["scripts/generate-media-batch.ts"],
    status: "ready",
  },

  {
    id: "video.google-veo",
    name: "Concept video clips (Google Veo 3.1)",
    outputType: "video",
    module: "forge/media/google-ai-client.ts",
    exports: [
      "generateVideo", "pollVideoOperation",
      "buildConceptVideoPrompt", "estimateVeoCost",
    ],
    providers: [
      { name: "Google Veo 3.1 Fast", type: "cloud-paid", active: true, costPer1M: "$0.10/sec" },
      { name: "Google Veo 3.1 (standard)", type: "cloud-paid", active: true, costPer1M: "$0.20/sec" },
    ],
    cached: true,
    cachePattern: "Supabase Storage: google-veo/{moduleId}/{lessonId}.mp4",
    freeTierAllowed: true,
    freeTierFallback: "Pre-generated cached concept clips only",
    seedScripts: ["scripts/generate-media-batch.ts"],
    status: "ready",
  },

  /* ── GPU / Infrastructure ─────────────────────────────────────────────── */

  {
    id: "gpu.scheduler",
    name: "GPU VRAM scheduler (time-based budget)",
    outputType: "text" as const,
    module: "forge/gpu-scheduler.ts",
    exports: [
      "getGpuBudget", "isOvernightWindow", "selectModelForTask",
      "getAvailableModels", "canRunModel", "getComfyUILaunchArgs",
      "getGpuEnvVars", "logGpuStatus",
    ],
    providers: [
      { name: "RTX 4090 24GB (local)", type: "local", active: true, costPer1M: "$0" },
    ],
    cached: false,
    freeTierAllowed: true,
    status: "production",
  },

  {
    id: "llm.ollama",
    name: "Local LLM inference (Ollama in WSL)",
    outputType: "text" as const,
    module: "forge/ollama-manager.ts",
    exports: ["OllamaManager", "ollama"],
    providers: [
      { name: "Ollama (WSL Ubuntu, local GPU)", type: "local", active: true, costPer1M: "$0" },
    ],
    cached: false,
    freeTierAllowed: false,
    freeTierFallback: "Not user-facing. Internal engine only.",
    status: "ready",
  },
];

// ── Lookup helpers ─────────────────────────────────────────────────────────

/** Find a capability by ID, e.g. "audiobook.tts" */
export function getCapability(id: string): ForgeCapability | undefined {
  return FORGE_CAPABILITIES.find((c) => c.id === id);
}

/** Get all capabilities that produce a given output type */
export function getCapabilitiesByType(
  outputType: ForgeCapability["outputType"],
): ForgeCapability[] {
  return FORGE_CAPABILITIES.filter((c) => c.outputType === outputType);
}

/** Get all capabilities available to free-tier users */
export function getFreeTierCapabilities(): ForgeCapability[] {
  return FORGE_CAPABILITIES.filter((c) => c.freeTierAllowed);
}

/** Get all seed scripts across all capabilities */
export function getAllSeedScripts(): string[] {
  const scripts = new Set<string>();
  for (const cap of FORGE_CAPABILITIES) {
    for (const s of cap.seedScripts ?? []) scripts.add(s);
  }
  return [...scripts].sort();
}
