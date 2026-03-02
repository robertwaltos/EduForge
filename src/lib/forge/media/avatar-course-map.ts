/**
 * FORGE — Avatar ↔ Course Mapping
 *
 * Maps each module to a consistent avatar persona.
 * Within a subject group, every lesson uses the SAME avatar
 * so students get a familiar instructor per course.
 *
 * Avatar IDs are placeholders until HeyGen account is set up.
 * Run `scripts/list-heygen-avatars.ts` to populate with real IDs.
 */

// ── Avatar Persona Definitions ─────────────────────────────────────────────

export interface AvatarPersona {
  /** Internal key — used in mapping below */
  key: string;
  /** Human description of the avatar */
  description: string;
  /** HeyGen avatar_id (populated after account setup) */
  avatarId: string;
  /** HeyGen voice_id (populated after account setup) */
  voiceId: string;
  /** Voice locale (BCP-47) */
  voiceLocale: string;
  /** Speaking speed (0.5–2.0, default 1.0) */
  voiceSpeed: number;
  /** Ideal for age range */
  ageAppropriate: string;
  /** Background color or image URL */
  background: string;
}

export const AVATAR_PERSONAS: Record<string, AvatarPersona> = {
  // ── Pre-K / Early Elementary Avatars ─────────────────────────────────

  "prek-math": {
    key: "prek-math",
    description: "Warm, friendly young teacher for Pre-K math — bright classroom background",
    avatarId: "", // Populated after HeyGen setup
    voiceId: "", // Populated after HeyGen setup
    voiceLocale: "en-US",
    voiceSpeed: 0.9, // Slightly slower for young children
    ageAppropriate: "3-5",
    background: "#FFF8E7", // Soft warm yellow
  },

  "prek-language": {
    key: "prek-language",
    description: "Expressive, encouraging teacher for Pre-K language arts — cozy reading nook background",
    avatarId: "",
    voiceId: "",
    voiceLocale: "en-US",
    voiceSpeed: 0.85, // Even slower for phonics/letter sounds
    ageAppropriate: "3-5",
    background: "#F0F7FF", // Soft blue
  },

  "prek-science": {
    key: "prek-science",
    description: "Curious, enthusiastic teacher for Pre-K science — nature/lab background",
    avatarId: "",
    voiceId: "",
    voiceLocale: "en-US",
    voiceSpeed: 0.9,
    ageAppropriate: "3-5",
    background: "#F0FFF4", // Soft green
  },

  "prek-social": {
    key: "prek-social",
    description: "Kind, nurturing teacher for Pre-K social studies/history — world map background",
    avatarId: "",
    voiceId: "",
    voiceLocale: "en-US",
    voiceSpeed: 0.9,
    ageAppropriate: "3-5",
    background: "#FFF5F0", // Soft peach
  },

  "prek-creative": {
    key: "prek-creative",
    description: "Playful, artistic teacher for Pre-K arts & coding — colorful studio background",
    avatarId: "",
    voiceId: "",
    voiceLocale: "en-US",
    voiceSpeed: 0.9,
    ageAppropriate: "3-5",
    background: "#FFF0F5", // Soft pink
  },

  "prek-life-skills": {
    key: "prek-life-skills",
    description: "Gentle, practical teacher for Pre-K life skills — home kitchen/garden background",
    avatarId: "",
    voiceId: "",
    voiceLocale: "en-US",
    voiceSpeed: 0.9,
    ageAppropriate: "3-5",
    background: "#FFFFF0", // Soft cream
  },

  "k2-general": {
    key: "k2-general",
    description: "Energetic, clear teacher for K-2 content — elementary classroom background",
    avatarId: "",
    voiceId: "",
    voiceLocale: "en-US",
    voiceSpeed: 0.95,
    ageAppropriate: "5-8",
    background: "#F5F5FF", // Soft violet
  },
};

// ── Module → Avatar Mapping ────────────────────────────────────────────────

/**
 * Maps moduleId → avatar persona key.
 * During initial $300 batch: only Pre-K (ages 3-5) and K-2 modules.
 */
export const MODULE_AVATAR_MAP: Record<string, string> = {
  // ── Pre-K Math (ages 3-5) ──────────────────────────────────────────
  "pre-k-basic-math-101": "prek-math",
  "pre-k-advanced-math-101": "prek-math",
  "basic-math-prek-u1-external": "prek-math",

  // ── Pre-K Language Arts (ages 3-5) ─────────────────────────────────
  "pre-k-language-arts-101": "prek-language",
  "lang-arts-prek-u1-external": "prek-language",

  // ── Pre-K Science (ages 3-5) ───────────────────────────────────────
  "pre-k-general-science-101": "prek-science",
  "pre-k-biology-101": "prek-science",
  "pre-k-chemistry-101": "prek-science",
  "pre-k-physics-101": "prek-science",
  "pre-k-astronomy-101": "prek-science",
  "pre-k-general-relativity-101": "prek-science",
  "gen-science-prek-u1-external": "prek-science",

  // ── Pre-K Social Studies / History / Geography (ages 3-5) ──────────
  "pre-k-geography-101": "prek-social",
  "pre-k-social-studies-us-101": "prek-social",
  "pre-k-social-studies-world-101": "prek-social",
  "pre-k-world-history-101": "prek-social",

  // ── Pre-K Creative (arts, coding) (ages 3-5) ──────────────────────
  "pre-k-arts-101": "prek-creative",
  "pre-k-coding-101": "prek-creative",

  // ── Pre-K Life Skills (ages 3-5) ──────────────────────────────────
  "pre-k-farming-101": "prek-life-skills",
  "pre-k-financial-literacy-101": "prek-life-skills",
  "pre-k-household-management-101": "prek-life-skills",

  // ── K-2 (ages 5-8) ────────────────────────────────────────────────
  "math-101": "k2-general",
  "basic-math-k2-u1-external": "k2-general",
  "gen-science-k2-u1-external": "k2-general",
  "lang-arts-k2-u1-external": "k2-general",
};

// ── Helpers ────────────────────────────────────────────────────────────────

/** Get the avatar persona for a module */
export function getAvatarForModule(moduleId: string): AvatarPersona | undefined {
  const key = MODULE_AVATAR_MAP[moduleId];
  if (!key) return undefined;
  return AVATAR_PERSONAS[key];
}

/** Get all modules assigned to a given avatar persona */
export function getModulesForAvatar(personaKey: string): string[] {
  return Object.entries(MODULE_AVATAR_MAP)
    .filter(([, v]) => v === personaKey)
    .map(([k]) => k);
}

/** Check if a module is in the initial batch (has avatar mapping) */
export function isInInitialBatch(moduleId: string): boolean {
  return moduleId in MODULE_AVATAR_MAP;
}

/** Get all initial-batch module IDs */
export function getInitialBatchModuleIds(): string[] {
  return Object.keys(MODULE_AVATAR_MAP);
}

/** Summary stats */
export function getAvatarStats() {
  const moduleCount = Object.keys(MODULE_AVATAR_MAP).length;
  const personaKeys = new Set(Object.values(MODULE_AVATAR_MAP));
  return {
    totalModules: moduleCount,
    uniqueAvatars: personaKeys.size,
    avatarPersonas: [...personaKeys],
  };
}
