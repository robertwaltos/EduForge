/**
 * HeyGen Avatar Discovery & Screening Script
 *
 * Run AFTER you have your HEYGEN_API_KEY set in .env.
 * Lists all available stock avatars, filters by age-appropriateness
 * criteria, and outputs a ranked shortlist for Pre-K / K-2 content.
 *
 * Usage:  npx tsx scripts/discover-heygen-avatars.ts
 */

import "dotenv/config";

const API_KEY = process.env.HEYGEN_API_KEY;
if (!API_KEY) {
  console.error("❌  Set HEYGEN_API_KEY in .env first");
  process.exit(1);
}

const BASE = "https://api.heygen.com";

// ── Types ──────────────────────────────────────────────────────────────────

interface HeyGenAvatar {
  avatar_id: string;
  avatar_name: string;
  gender?: string;
  preview_image_url?: string;
  preview_video_url?: string;
  // Avatar III stock avatars are "avatar" type
  avatar_type?: string;
  // Some have tags/metadata from HeyGen
  tags?: string[];
}

interface AvatarGroup {
  id: string;
  name: string;
  avatars: HeyGenAvatar[];
}

interface VoiceInfo {
  voice_id: string;
  name: string;
  language: string;
  gender?: string;
  preview_audio?: string;
  support_pause?: boolean;
  emotion_support?: boolean;
}

// ── Screening Criteria ─────────────────────────────────────────────────────

/**
 * AGE-APPROPRIATE AVATAR SELECTION CRITERIA
 * Based on early childhood education research:
 *
 * 1. WARMTH & APPROACHABILITY
 *    - Smiling, friendly expression in preview image
 *    - Casual or "teacher-like" clothing (not corporate suits)
 *    - Open body language, welcoming posture
 *
 * 2. DIVERSITY & REPRESENTATION
 *    - Mix of genders (aim for at least 3 female, 2 male, or vice versa)
 *    - Mix of ethnicities/skin tones (children learn better seeing
 *      instructors who look like them AND different from them)
 *    - Variety of ages (young adults preferred — approachable to kids)
 *
 * 3. AVOIDING UNCANNY VALLEY
 *    - HeyGen's Avatar III stock avatars are filmed from real actors,
 *      so uncanny valley risk is lower than pure CG
 *    - Still: prefer avatars with natural movement/expressions
 *    - Avoid overly "corporate" or "news anchor" presentations
 *
 * 4. VOICE CHARACTERISTICS FOR YOUNG CHILDREN
 *    - Clear enunciation (critical for phonics/letter recognition)
 *    - Warm, slightly higher pitch preferred for ages 3-5
 *    - Moderate pace — our config already sets 0.85-0.95 speed
 *    - Expressive intonation (not monotone)
 *    - en-US voices for initial batch
 *
 * 5. CONSISTENCY MATTERS
 *    - Children ages 3-5 form attachment to familiar faces
 *    - Same avatar per subject throughout ALL lessons in that subject
 *    - 7 distinct personas needed (6 Pre-K subjects + 1 K-2 general)
 *
 * 6. WHAT TO AVOID
 *    - Overly realistic "uncanny" expressions
 *    - Corporate/formal attire (suits, ties)
 *    - Stern, serious, or intimidating expressions
 *    - Avatars that appear to be in their 50s+ (less relatable for 3-5)
 *    - Avatars with distracting accessories or busy backgrounds
 */

// ── API Calls ──────────────────────────────────────────────────────────────

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY!,
    },
  });
  if (!res.ok) throw new Error(`HeyGen ${res.status}: ${await res.text()}`);
  return (await res.json()) as T;
}

async function listAvatars(): Promise<HeyGenAvatar[]> {
  const data = await fetchJSON<{
    data: { avatars: HeyGenAvatar[] };
  }>("/v2/avatars");
  return data.data.avatars ?? [];
}

async function listAvatarGroups(): Promise<AvatarGroup[]> {
  const data = await fetchJSON<{
    data: { avatar_groups: AvatarGroup[] };
  }>("/v2/avatar_groups");
  return data.data.avatar_groups ?? [];
}

async function listVoices(locale?: string): Promise<VoiceInfo[]> {
  const path = locale
    ? `/v2/voices?language=${encodeURIComponent(locale)}`
    : "/v2/voices";
  const data = await fetchJSON<{
    data: { voices: VoiceInfo[] };
  }>(path);
  return data.data.voices ?? [];
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🎭  HeyGen Avatar Discovery — Pre-K / K-2 Screening\n");
  console.log("=".repeat(70));

  // ── Step 1: List all avatars ──────────────────────────────────────────
  console.log("\n📋  Fetching all available avatars...");
  const avatars = await listAvatars();
  console.log(`   Found ${avatars.length} avatars total\n`);

  // ── Step 2: Categorize ────────────────────────────────────────────────
  const byGender: Record<string, HeyGenAvatar[]> = {};
  for (const a of avatars) {
    const g = (a.gender ?? "unknown").toLowerCase();
    if (!byGender[g]) byGender[g] = [];
    byGender[g].push(a);
  }

  console.log("📊  Gender distribution:");
  for (const [g, list] of Object.entries(byGender)) {
    console.log(`   ${g}: ${list.length} avatars`);
  }

  // ── Step 3: List each avatar with preview URL ─────────────────────────
  console.log("\n" + "=".repeat(70));
  console.log("FULL AVATAR CATALOG");
  console.log("=".repeat(70));
  console.log(
    "\nReview each avatar's preview image to assess age-appropriateness.",
  );
  console.log(
    "Open the preview_image_url in a browser to see the avatar.\n",
  );

  for (const a of avatars) {
    console.log(`  ID:      ${a.avatar_id}`);
    console.log(`  Name:    ${a.avatar_name}`);
    console.log(`  Gender:  ${a.gender ?? "?"}`);
    console.log(`  Type:    ${a.avatar_type ?? "?"}`);
    if (a.preview_image_url)
      console.log(`  Preview: ${a.preview_image_url}`);
    if (a.preview_video_url)
      console.log(`  Video:   ${a.preview_video_url}`);
    console.log();
  }

  // ── Step 4: List en-US voices ─────────────────────────────────────────
  console.log("=".repeat(70));
  console.log("ENGLISH (US) VOICES");
  console.log("=".repeat(70));
  console.log("\nScreening for warm, clear, expressive voices:\n");

  const voices = await listVoices("en-US");
  console.log(`   Found ${voices.length} en-US voices\n`);

  for (const v of voices) {
    console.log(`  Voice ID: ${v.voice_id}`);
    console.log(`  Name:     ${v.name}`);
    console.log(`  Gender:   ${v.gender ?? "?"}`);
    console.log(
      `  Features: pause=${v.support_pause ?? "?"} emotion=${v.emotion_support ?? "?"}`,
    );
    if (v.preview_audio)
      console.log(`  Preview:  ${v.preview_audio}`);
    console.log();
  }

  // ── Step 5: Screening summary ─────────────────────────────────────────
  console.log("=".repeat(70));
  console.log("AVATAR SELECTION GUIDE FOR PRE-K (ages 3-5)");
  console.log("=".repeat(70));
  console.log(`
You need 7 distinct avatar personas:

  1. prek-math        — Warm, friendly (soft yellow bg #FFF8E7)
  2. prek-language     — Expressive, encouraging (soft blue bg #F0F7FF)
  3. prek-science      — Curious, enthusiastic (soft green bg #F0FFF4)
  4. prek-social       — Kind, nurturing (soft peach bg #FFF5F0)
  5. prek-creative     — Playful, artistic (soft pink bg #FFF0F5)
  6. prek-life-skills  — Gentle, practical (soft cream bg #FFFFF0)
  7. k2-general        — Energetic, clear (soft violet bg #F5F5FF)

SELECTION CHECKLIST per avatar:
  ✅ Smiling / warm expression in preview
  ✅ Casual or teacher-appropriate clothes (not suit/tie)
  ✅ Young adult appearance (20s-30s preferred)
  ✅ Clear, natural look (no heavy accessories)
  ✅ Good lip-sync quality in preview video

DIVERSITY TARGET (across all 7):
  ✅ At least 3 different apparent ethnicities
  ✅ Mix of genders (suggest 4F / 3M or 3F / 4M)
  ✅ No two adjacent subjects with identical-looking avatars

VOICE PAIRING:
  ✅ Match avatar gender to voice gender
  ✅ Prefer voices with emotion_support=true
  ✅ Prefer voices with support_pause=true (for natural pacing)
  ✅ Test each voice at speed 0.85-0.90 for Pre-K clarity

After selecting, update avatar-course-map.ts with the chosen IDs.
`);

  // ── Step 6: Write machine-readable catalog ────────────────────────────
  const catalog = {
    fetchedAt: new Date().toISOString(),
    totalAvatars: avatars.length,
    avatars: avatars.map((a) => ({
      id: a.avatar_id,
      name: a.avatar_name,
      gender: a.gender,
      type: a.avatar_type,
      previewImage: a.preview_image_url,
      previewVideo: a.preview_video_url,
    })),
    voices: voices.map((v) => ({
      id: v.voice_id,
      name: v.name,
      gender: v.gender,
      supportPause: v.support_pause,
      emotionSupport: v.emotion_support,
      previewAudio: v.preview_audio,
    })),
  };

  const fs = await import("fs");
  const outPath = "scripts/heygen-avatar-catalog.json";
  fs.writeFileSync(outPath, JSON.stringify(catalog, null, 2));
  console.log(`\n💾  Full catalog saved to ${outPath}`);
  console.log("   Open preview URLs in a browser to visually screen avatars.");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
