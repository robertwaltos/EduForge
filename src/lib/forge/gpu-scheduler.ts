/**
 * FORGE GPU Scheduler — Time-based VRAM budget management.
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  SCHEDULE:                                                            │
 * │    08:00 – 01:00 (daytime)  → 15 GB VRAM limit (user is working)     │
 * │    01:00 – 08:00 (overnight) → Full VRAM (24 GB on RTX 4090)         │
 * │                                                                       │
 * │  Quality > Speed, always. Use the best model that fits the budget.    │
 * └────────────────────────────────────────────────────────────────────────┘
 *
 * Usage:
 *   import { getGpuBudget, isOvernightWindow, selectModelForTask } from "@/lib/forge/gpu-scheduler";
 *
 *   const budget = getGpuBudget();
 *   // → { vramLimitMB: 15360, window: "daytime", canRunHeavyModels: false }
 *
 *   const model = selectModelForTask("image-gen");
 *   // → { model: "flux1-schnell-fp8", vramRequired: 8500, quantization: "fp8" }
 */

// ── Constants ──────────────────────────────────────────────────────────────

/** Total GPU VRAM in MB (RTX 4090) */
const TOTAL_VRAM_MB = 24_576;

/** Daytime VRAM ceiling — leaves headroom for desktop, browser, IDE */
const DAYTIME_VRAM_LIMIT_MB = 15_360; // 15 GB

/** Overnight: use full VRAM */
const OVERNIGHT_VRAM_LIMIT_MB = TOTAL_VRAM_MB;

/** Daytime window boundaries (local time) */
const DAYTIME_START_HOUR = 8;  // 08:00
const DAYTIME_END_HOUR = 1;    // 01:00 (next day)

// ── Types ──────────────────────────────────────────────────────────────────

export type GpuWindow = "daytime" | "overnight";

export interface GpuBudget {
  /** Maximum VRAM available for FORGE operations (MB) */
  vramLimitMB: number;
  /** Current scheduling window */
  window: GpuWindow;
  /** Whether heavy models (>15GB VRAM) can be loaded */
  canRunHeavyModels: boolean;
  /** Current local hour (0-23) */
  currentHour: number;
  /** Hours until next window change */
  hoursUntilSwitch: number;
}

export interface GpuModelProfile {
  /** Model identifier */
  model: string;
  /** Estimated VRAM usage in MB */
  vramRequiredMB: number;
  /** Quantization level */
  quantization: "fp32" | "fp16" | "bf16" | "fp8" | "int8" | "int4";
  /** Quality tier (higher = better) */
  qualityTier: 1 | 2 | 3 | 4 | 5;
  /** What this model does */
  task: string;
}

// ── Model Registry ─────────────────────────────────────────────────────────

/**
 * All GPU models available to FORGE, sorted by quality tier (highest first).
 * The scheduler picks the highest-quality model that fits the current VRAM budget.
 */
const MODEL_PROFILES: GpuModelProfile[] = [
  // ── Image Generation ───────────────────────────────────────────────────
  {
    model: "flux1-schnell-fp8",
    vramRequiredMB: 8_500,
    quantization: "fp8",
    qualityTier: 4,
    task: "image-gen",
  },
  {
    model: "flux1-schnell-fp16",
    vramRequiredMB: 16_000,
    quantization: "fp16",
    qualityTier: 5,
    task: "image-gen",
  },

  // ── Video Generation (Wan I2V) ─────────────────────────────────────────
  {
    model: "Wan2_1-I2V-14B-480P_fp8",
    vramRequiredMB: 14_000,
    quantization: "fp8",
    qualityTier: 4,
    task: "video-gen",
  },
  {
    model: "Wan2_1-I2V-14B-480P_fp16",
    vramRequiredMB: 22_000,
    quantization: "fp16",
    qualityTier: 5,
    task: "video-gen",
  },

  // ── TTS (Local) ────────────────────────────────────────────────────────
  {
    model: "kokoro-82m",
    vramRequiredMB: 500,
    quantization: "fp32",
    qualityTier: 3,
    task: "tts-local",
  },
  {
    model: "xtts-v2",
    vramRequiredMB: 2_000,
    quantization: "fp16",
    qualityTier: 4,
    task: "tts-local",
  },

  // ── Translation (Local) ────────────────────────────────────────────────
  {
    model: "helsinki-nlp-opus-mt",
    vramRequiredMB: 1_200,
    quantization: "fp32",
    qualityTier: 3,
    task: "translation-local",
  },
];

// ── Core Functions ─────────────────────────────────────────────────────────

/**
 * Determine if the current local time falls in the overnight window.
 * Overnight = 01:00 – 08:00 (where heavy/full-VRAM jobs can run).
 */
export function isOvernightWindow(now: Date = new Date()): boolean {
  const hour = now.getHours();
  // Overnight: 1:00 AM to 7:59 AM
  return hour >= DAYTIME_END_HOUR && hour < DAYTIME_START_HOUR;
}

/**
 * Get the current GPU budget based on local time.
 */
export function getGpuBudget(now: Date = new Date()): GpuBudget {
  const hour = now.getHours();
  const overnight = isOvernightWindow(now);
  const vramLimitMB = overnight ? OVERNIGHT_VRAM_LIMIT_MB : DAYTIME_VRAM_LIMIT_MB;

  let hoursUntilSwitch: number;
  if (overnight) {
    // In overnight window → switch to daytime at 08:00
    hoursUntilSwitch = (DAYTIME_START_HOUR - hour + 24) % 24;
  } else {
    // In daytime window → switch to overnight at 01:00
    hoursUntilSwitch = (DAYTIME_END_HOUR - hour + 24) % 24;
  }

  return {
    vramLimitMB,
    window: overnight ? "overnight" : "daytime",
    canRunHeavyModels: overnight,
    currentHour: hour,
    hoursUntilSwitch,
  };
}

/**
 * Select the highest-quality model for a given task that fits the current VRAM budget.
 * Quality is always prioritized over speed.
 *
 * @param task - One of: "image-gen", "video-gen", "tts-local", "translation-local"
 * @param now  - Override current time for testing
 * @returns Best model profile, or null if no model fits
 */
export function selectModelForTask(
  task: string,
  now: Date = new Date(),
): GpuModelProfile | null {
  const budget = getGpuBudget(now);

  const candidates = MODEL_PROFILES
    .filter((m) => m.task === task && m.vramRequiredMB <= budget.vramLimitMB)
    .sort((a, b) => b.qualityTier - a.qualityTier); // highest quality first

  return candidates[0] ?? null;
}

/**
 * Get all models that can run in the current VRAM budget.
 */
export function getAvailableModels(now: Date = new Date()): GpuModelProfile[] {
  const budget = getGpuBudget(now);
  return MODEL_PROFILES.filter((m) => m.vramRequiredMB <= budget.vramLimitMB);
}

/**
 * Check if a specific model can run right now.
 */
export function canRunModel(modelName: string, now: Date = new Date()): boolean {
  const budget = getGpuBudget(now);
  const profile = MODEL_PROFILES.find((m) => m.model === modelName);
  if (!profile) return false;
  return profile.vramRequiredMB <= budget.vramLimitMB;
}

/**
 * ComfyUI launch arguments based on current VRAM budget.
 * Use this when starting or restarting ComfyUI.
 */
export function getComfyUILaunchArgs(now: Date = new Date()): string[] {
  const budget = getGpuBudget(now);
  const args: string[] = ["--listen", "0.0.0.0", "--port", "8188"];

  if (budget.window === "overnight") {
    args.push("--highvram"); // keep models in VRAM for speed
  } else {
    args.push("--lowvram"); // aggressively offload to stay under 15GB
  }

  return args;
}

/**
 * Environment variables to pass to ComfyUI / local inference processes.
 */
export function getGpuEnvVars(now: Date = new Date()): Record<string, string> {
  const budget = getGpuBudget(now);

  return {
    FORGE_VRAM_LIMIT_MB: String(budget.vramLimitMB),
    FORGE_GPU_WINDOW: budget.window,
    FORGE_CAN_HEAVY: budget.canRunHeavyModels ? "1" : "0",
    // PyTorch memory fraction (0.0 - 1.0)
    PYTORCH_CUDA_ALLOC_CONF: `max_split_size_mb:${Math.floor(budget.vramLimitMB * 0.8)}`,
    // Limit CUDA visible memory allocation
    CUDA_VISIBLE_DEVICES: "0",
  };
}

// ── Logging / Status ───────────────────────────────────────────────────────

/**
 * Print current GPU budget status (for scripts and logs).
 */
export function logGpuStatus(now: Date = new Date()): void {
  const budget = getGpuBudget(now);
  const available = getAvailableModels(now);

  console.info(`\n🖥️  FORGE GPU Scheduler Status`);
  console.info(`   Window:     ${budget.window} (hour ${budget.currentHour})`);
  console.info(`   VRAM limit: ${(budget.vramLimitMB / 1024).toFixed(1)} GB / ${(TOTAL_VRAM_MB / 1024).toFixed(1)} GB total`);
  console.info(`   Heavy OK:   ${budget.canRunHeavyModels ? "YES" : "NO"}`);
  console.info(`   Switch in:  ${budget.hoursUntilSwitch}h`);
  console.info(`   Models:     ${available.map((m) => m.model).join(", ")}`);
  console.info();
}
