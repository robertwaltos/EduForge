# FORGE — Federated Output Rendering & Generation Engine

> **Canonical home for ALL media creation, voice, translation, image, video generation,
> GPU scheduling, local LLM inference, and deployment services.**

## What is FORGE?

FORGE (**F**ederated **O**utput **R**endering & **G**eneration **E**ngine) is Koydo's unified
media production layer. Every agent, script, and runtime component that **creates, transforms,
or serves** audio, images, video, or translated text operates through FORGE.

### Design Principles

1. **Single source of truth** — All generation capabilities are registered in `index.ts`.
   New agents read this file first. No rebuilding what already exists.
2. **Tier-gated** — Free users NEVER hit paid APIs. They receive only pre-recorded/pre-seeded
   content. Cloud AI (OpenAI TTS, ElevenLabs, DeepL) is reserved for paid tiers.
3. **Cache-first** — Every generation call checks Supabase Storage cache before making an API
   call. Identical requests are served from cache forever.
4. **Quality > Speed** — Always prefer the highest-quality model that fits the current VRAM
   budget. Never trade output quality for faster generation.
5. **GPU-aware** — The GPU scheduler enforces VRAM limits based on time of day:
   - **Daytime (8am–1am)**: 15 GB VRAM cap (user is working)
   - **Overnight (1am–8am)**: Full 24 GB (RTX 4090) for heavy jobs
6. **Provider fallback chains** — Each capability has a ranked provider list:
   - TTS: OpenAI → ElevenLabs → browser `SpeechSynthesis` (free)
   - Translation: DeepL → Google Translate → pre-seeded cache (free)
   - Images: ComfyUI (local GPU, $0) → Grok manifest (pre-generated, $0)
   - Video: Wan 2.1 I2V (local GPU, $0) → pre-generated assets
   - LLM: Ollama (local GPU, $0) → cloud APIs (paid tier only)

## Directory Structure

```
src/lib/forge/
├── README.md              ← You are here
├── index.ts               ← Capability registry (agents read this first)
├── tier-gate.ts           ← Entitlement checks: can this user use cloud AI?
├── gpu-scheduler.ts       ← Time-based VRAM budget (15GB day / 24GB night)
├── ollama-manager.ts      ← Local LLM inference via Ollama (WSL)
├── vercel-deploy.ts       ← Vercel deployment lifecycle management
│
├── tts/                   ← Text-to-Speech engine
│   ├── tts-service.ts     ← Core TTS: OpenAI → ElevenLabs → browser fallback
│   └── voice-engine.ts    ← Lesson narration audio fetcher
│
├── audiobooks/            ← Audiobook pipeline (text, translation, TTS)
│   ├── types.ts
│   ├── catalog-loader.ts
│   ├── chapter-text-service.ts
│   ├── audiobook-tts-service.ts
│   ├── audiobook-translation-service.ts
│   ├── voice-mapping.ts
│   ├── top-50-catalog.ts
│   ├── public-domain-catalog.ts
│   ├── public-domain-catalog.json
│   └── data/              ← JSON book catalogs
│
├── image/                 ← Image generation
│   ├── generators.ts      ← ComfyUI / Flux Schnell
│   ├── prompt-engine.ts   ← Prompt compilation + safety filter
│   ├── grok-manifest-catalog.ts
│   ├── media-fallbacks.ts
│   ├── generated-media-assets.ts
│   └── generated-prompts.ts
│
└── video/                 ← Video / animation
    └── seedance-prompts.ts
```

## GPU Scheduler

The GPU scheduler (`gpu-scheduler.ts`) manages VRAM allocation on the RTX 4090 (24 GB):

| Window    | Hours       | VRAM Budget | Use Case                                |
|-----------|-------------|-------------|-----------------------------------------|
| Daytime   | 08:00–01:00 | 15 GB       | Interactive work, small models, Flux fp8 |
| Overnight | 01:00–08:00 | 24 GB       | Heavy batches, fp16, large models        |

```typescript
import { getGpuBudget, selectModelForTask } from "@/lib/forge/gpu-scheduler";

const budget = getGpuBudget();
// → { vramLimitMB: 15360, window: "daytime", canRunHeavyModels: false }

const model = selectModelForTask("image-gen");
// → { model: "flux1-schnell-fp8", vramRequiredMB: 8500, qualityTier: 4 }
```

## Ollama (Local LLM)

The Ollama manager (`ollama-manager.ts`) provides local LLM inference via WSL:

```typescript
import { ollama } from "@/lib/forge/ollama-manager";

const result = await ollama.generate("Summarize this lesson text...", {
  task: "summarize",  // auto-selects best model for VRAM budget
  temperature: 0.3,
});
// Uses llama3.1:8b-q8_0 during day, llama3.1:70b-q4_K_M overnight
```

## Vercel Deployment

Deployment management (`vercel-deploy.ts`) handles pre-deploy validation and health checks:

```typescript
import { buildPreDeployChecklist, healthCheck, VERCEL_CLI } from "@/lib/forge/vercel-deploy";

const report = buildPreDeployChecklist(process.env, 0);
// → { allPassed: true, checks: [...] }

// After deploy:
const health = await healthCheck("https://koydo.com");
```

## For Agents: How to Use FORGE

### Before writing ANY new generation code:

1. **Read `src/lib/forge/index.ts`** — it lists every capability with its file path,
   provider chain, runtime status, and whether it's pre-seeded or on-demand.
2. **Check if the capability already exists.** If it does, import from the existing module.
3. **If adding a new capability**, register it in `index.ts` with the same schema.
4. **Check GPU budget** — before loading a model, call `getGpuBudget()` or `canRunModel()`.

### Free Tier Rule (MANDATORY)

Free-tier users must NEVER trigger calls to OpenAI, ElevenLabs, DeepL, or any paid API.
Use `tier-gate.ts` → `canUseCloudAI(userId)` to check before any cloud call.
Free users get:
- Browser `SpeechSynthesis` for read-aloud
- Pre-seeded text from Supabase Storage
- Pre-generated audio from Supabase Storage (if available)
- Pre-generated images from the Grok manifest or `generated-media-assets.ts`
- Pre-generated videos from asset registry (171+ WanI2V videos)

### Seed Scripts

All batch-seeding scripts live in `scripts/` and are documented in `index.ts`:

| Script | FORGE Capability | What it does |
|--------|-----------------|--------------|
| `seed-audiobook-texts.ts` | `audiobook.text` | Gutenberg → Supabase chapter text |
| `seed-audiobook-translations.ts` | `audiobook.translation` | English text → 8 languages |
| `seed-audiobook-chapter1.ts` | `audiobook.tts` | Ch.1 English TTS audio |
| `queue-public-domain-audiobooks.mjs` | `audiobook.tts` | Queue TTS jobs |
| `process-audio-jobs.mjs` | `tts` | Process queued TTS jobs |
| `autonomous-media-agent.mjs` | `image` | Automated image generation |
| `compile-media-prompts.mjs` | `image` | Compile image prompts |
| `process-media-jobs.mjs` | `image` + `video` | Process queued media jobs (Flux + WanI2V) |
| `overnight-media-runner.mjs` | `image` + `video` | Batch overnight processor |
