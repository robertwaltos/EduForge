/**
 * FORGE Ollama Manager — Local LLM inference via Ollama in WSL.
 *
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │  Manages Ollama running in WSL Ubuntu for non-critical AI tasks:      │
 * │    • Text summarization / rewriting                                   │
 * │    • Content classification                                          │
 * │    • Prompt engineering / enhancement                                │
 * │    • Metadata extraction                                             │
 * │    • Translation drafts (non-user-facing)                            │
 * │                                                                       │
 * │  Respects GPU scheduler VRAM limits:                                  │
 * │    Daytime: ≤15 GB — use smaller quantized models (7B, Q4/Q8)        │
 * │    Overnight: full VRAM — can load larger models (13B+, fp16)         │
 * │                                                                       │
 * │  Quality > Speed: always pick the highest-quality model that fits.    │
 * └────────────────────────────────────────────────────────────────────────┘
 */

import { getGpuBudget, type GpuWindow } from "./gpu-scheduler";

// ── Constants ──────────────────────────────────────────────────────────────

/** Ollama API endpoint (WSL host-accessible) */
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";

/** Request timeout for generation (ms) */
const GENERATION_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

/** Health check timeout (ms) */
const HEALTH_TIMEOUT_MS = 5_000;

// ── Types ──────────────────────────────────────────────────────────────────

export interface OllamaModel {
  /** Model tag (e.g. "llama3.1:8b-q8_0") */
  tag: string;
  /** Estimated VRAM usage in MB when loaded */
  vramRequiredMB: number;
  /** Quality tier — higher is better */
  qualityTier: 1 | 2 | 3 | 4 | 5;
  /** Task categories this model excels at */
  tasks: OllamaTask[];
  /** Which GPU window it can run in */
  minWindow: GpuWindow;
}

export type OllamaTask =
  | "summarize"
  | "classify"
  | "rewrite"
  | "prompt-enhance"
  | "translate-draft"
  | "metadata"
  | "general";

export interface OllamaGenerateOptions {
  /** Which task to optimize model selection for */
  task?: OllamaTask;
  /** Override model selection — use this specific model */
  model?: string;
  /** System prompt */
  system?: string;
  /** Temperature (0.0 - 2.0) */
  temperature?: number;
  /** Max output tokens */
  maxTokens?: number;
  /** Override time for GPU budget check */
  now?: Date;
}

export interface OllamaResponse {
  /** Generated text */
  text: string;
  /** Model used */
  model: string;
  /** Duration in ms */
  durationMs: number;
  /** Tokens generated */
  tokensGenerated: number;
  /** Tokens per second */
  tokensPerSecond: number;
}

export interface OllamaStatus {
  /** Whether Ollama API is reachable */
  online: boolean;
  /** Currently loaded models */
  loadedModels: string[];
  /** Available (pulled) models */
  availableModels: string[];
  /** Current GPU window */
  gpuWindow: GpuWindow;
  /** VRAM budget */
  vramLimitMB: number;
}

// ── Model Catalog ──────────────────────────────────────────────────────────

/**
 * Recommended Ollama models, sorted by quality tier.
 * The manager will pull the best one that fits the current VRAM budget.
 *
 * Agent instruction: you may add/remove models here freely.
 * Always prefer quality (higher qualityTier) over speed.
 *
 * Currently pulled on this machine (RTX 4090):
 *   llama3.1:8b, qwen2.5:14b-instruct, qwen3:30b-a3b, qwen3-coder:30b,
 *   qwen2.5vl:7b, nomic-embed-text, glm-4.7-flash, org/qwen2.5-1m:14b
 */
const MODEL_CATALOG: OllamaModel[] = [
  // ── Small / Daytime models (fit under 15 GB) ──────────────────────────
  {
    tag: "llama3.1:8b",
    vramRequiredMB: 5_000,
    qualityTier: 3,
    tasks: ["summarize", "rewrite", "prompt-enhance", "classify", "general"],
    minWindow: "daytime",
  },
  {
    tag: "qwen2.5vl:7b",
    vramRequiredMB: 6_000,
    qualityTier: 3,
    tasks: ["classify", "metadata", "general"],
    minWindow: "daytime",
  },
  {
    tag: "qwen2.5:14b-instruct",
    vramRequiredMB: 9_000,
    qualityTier: 4,
    tasks: ["summarize", "rewrite", "prompt-enhance", "translate-draft", "classify", "metadata", "general"],
    minWindow: "daytime",
  },
  {
    tag: "org/qwen2.5-1m:14b",
    vramRequiredMB: 9_000,
    qualityTier: 4,
    tasks: ["summarize", "rewrite", "general"],
    minWindow: "daytime",
  },

  // ── Large / Overnight models (need >15 GB) ────────────────────────────
  {
    tag: "qwen3:30b-a3b",
    vramRequiredMB: 18_000,
    qualityTier: 5,
    tasks: ["summarize", "rewrite", "prompt-enhance", "translate-draft", "classify", "metadata", "general"],
    minWindow: "overnight",
  },
  {
    tag: "qwen3-coder:30b",
    vramRequiredMB: 18_000,
    qualityTier: 5,
    tasks: ["prompt-enhance", "metadata", "general"],
    minWindow: "overnight",
  },
  {
    tag: "glm-4.7-flash:latest",
    vramRequiredMB: 19_000,
    qualityTier: 5,
    tasks: ["summarize", "rewrite", "translate-draft", "general"],
    minWindow: "overnight",
  },
];

// ── Core Class ─────────────────────────────────────────────────────────────

export class OllamaManager {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? OLLAMA_BASE_URL;
  }

  // ── Health ──────────────────────────────────────────────────────────────

  /**
   * Check if Ollama is running and reachable.
   */
  async isHealthy(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
      const res = await fetch(this.baseUrl, { signal: controller.signal });
      clearTimeout(timeout);
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get full Ollama status including loaded/available models and GPU budget.
   */
  async getStatus(now?: Date): Promise<OllamaStatus> {
    const budget = getGpuBudget(now);
    const online = await this.isHealthy();

    let loadedModels: string[] = [];
    let availableModels: string[] = [];

    if (online) {
      try {
        const psRes = await fetch(`${this.baseUrl}/api/ps`);
        if (psRes.ok) {
          const data = await psRes.json();
          loadedModels = (data.models ?? []).map((m: { name: string }) => m.name);
        }
      } catch { /* ignore */ }

      try {
        const tagsRes = await fetch(`${this.baseUrl}/api/tags`);
        if (tagsRes.ok) {
          const data = await tagsRes.json();
          availableModels = (data.models ?? []).map((m: { name: string }) => m.name);
        }
      } catch { /* ignore */ }
    }

    return {
      online,
      loadedModels,
      availableModels,
      gpuWindow: budget.window,
      vramLimitMB: budget.vramLimitMB,
    };
  }

  // ── Model Management ────────────────────────────────────────────────────

  /**
   * Pull a model from Ollama registry. Streams progress.
   */
  async pullModel(tag: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/api/pull`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: tag, stream: false }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Unload a model from VRAM (keep on disk).
   */
  async unloadModel(tag: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: tag, keep_alive: 0 }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * List all models currently pulled (on disk).
   */
  async listModels(): Promise<string[]> {
    try {
      const res = await fetch(`${this.baseUrl}/api/tags`);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.models ?? []).map((m: { name: string }) => m.name);
    } catch {
      return [];
    }
  }

  /**
   * Select the best model for a task that fits the current VRAM budget.
   * Quality is always prioritized over speed.
   */
  selectModel(task: OllamaTask = "general", now?: Date): OllamaModel | null {
    const budget = getGpuBudget(now);

    // Filter models that: (1) handle this task, (2) fit in VRAM budget
    const candidates = MODEL_CATALOG
      .filter((m) => m.tasks.includes(task) && m.vramRequiredMB <= budget.vramLimitMB)
      .sort((a, b) => b.qualityTier - a.qualityTier); // highest quality first

    return candidates[0] ?? null;
  }

  /**
   * Ensure the best model for a task is pulled and ready.
   * Pulls it if not already available.
   */
  async ensureModel(task: OllamaTask = "general", now?: Date): Promise<string | null> {
    const selected = this.selectModel(task, now);
    if (!selected) return null;

    const available = await this.listModels();
    if (!available.some((m) => m.includes(selected.tag.split(":")[0]))) {
      console.info(`📦 Pulling Ollama model: ${selected.tag}...`);
      const ok = await this.pullModel(selected.tag);
      if (!ok) {
        console.error(`❌ Failed to pull ${selected.tag}`);
        return null;
      }
      console.info(`✅ Pulled ${selected.tag}`);
    }

    return selected.tag;
  }

  // ── Generation ──────────────────────────────────────────────────────────

  /**
   * Generate text using the best available model for the task.
   * Automatically selects model based on GPU budget and quality preference.
   */
  async generate(prompt: string, options: OllamaGenerateOptions = {}): Promise<OllamaResponse | null> {
    const { task = "general", system, temperature = 0.7, maxTokens = 2048, now } = options;

    // Select or use explicit model
    let modelTag = options.model;
    if (!modelTag) {
      const selected = this.selectModel(task, now);
      if (!selected) {
        console.error(`❌ No Ollama model fits current VRAM budget for task: ${task}`);
        return null;
      }
      modelTag = selected.tag;
    }

    // Ensure model is pulled
    const available = await this.listModels();
    if (!available.some((m) => m.includes(modelTag!.split(":")[0]))) {
      const ok = await this.pullModel(modelTag);
      if (!ok) return null;
    }

    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

      const body: Record<string, unknown> = {
        model: modelTag,
        prompt,
        stream: false,
        options: {
          temperature,
          num_predict: maxTokens,
        },
      };
      if (system) {
        body.system = system;
      }

      const res = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        console.error(`❌ Ollama generate failed: ${res.status} ${res.statusText}`);
        return null;
      }

      const data = await res.json();
      const durationMs = Date.now() - startTime;

      return {
        text: data.response ?? "",
        model: modelTag,
        durationMs,
        tokensGenerated: data.eval_count ?? 0,
        tokensPerSecond: data.eval_count
          ? data.eval_count / ((data.eval_duration ?? durationMs * 1e6) / 1e9)
          : 0,
      };
    } catch (err) {
      console.error(`❌ Ollama generate error:`, err);
      return null;
    }
  }

  /**
   * Chat completion using the best available model.
   */
  async chat(
    messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
    options: Omit<OllamaGenerateOptions, "system"> = {},
  ): Promise<OllamaResponse | null> {
    const { task = "general", temperature = 0.7, maxTokens = 2048, now } = options;

    let modelTag = options.model;
    if (!modelTag) {
      const selected = this.selectModel(task, now);
      if (!selected) return null;
      modelTag = selected.tag;
    }

    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), GENERATION_TIMEOUT_MS);

      const res = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelTag,
          messages,
          stream: false,
          options: { temperature, num_predict: maxTokens },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      if (!res.ok) return null;

      const data = await res.json();
      const durationMs = Date.now() - startTime;

      return {
        text: data.message?.content ?? "",
        model: modelTag,
        durationMs,
        tokensGenerated: data.eval_count ?? 0,
        tokensPerSecond: data.eval_count
          ? data.eval_count / ((data.eval_duration ?? durationMs * 1e6) / 1e9)
          : 0,
      };
    } catch (err) {
      console.error(`❌ Ollama chat error:`, err);
      return null;
    }
  }
}

// ── Singleton ──────────────────────────────────────────────────────────────

/** Default Ollama manager instance */
export const ollama = new OllamaManager();
