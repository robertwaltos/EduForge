/**
 * Centralised asset path constants for Koydo brand images.
 *
 * HOW TO SWAP AN IMAGE:
 *   Option A (no code change) — replace the file in /public/ with the same name.
 *   Option B (change path)    — update the constant below; TypeScript will
 *                               surface every usage across the codebase.
 *
 * All files live in /public/ so Next.js <Image> can serve them optimised.
 */
export const ASSETS = {
  /** Full-width daytime hero on the home page */
  heroHome: "/generated-images/bg-day-v1.jpg",

  /** Daytime landscape background for the bottom CTA banner */
  bgBottom: "/generated-images/bg-day-v1.jpg",

  /** Brand logo — used in top-nav and any other branded surfaces */
  logo: "/logo-koydo.jpg",

  /** Scenic background used on sign-in / sign-up pages */
  bgAuth: "/generated-images/hero-light-02.jpg",

  /** Hero image shown on the sign-in page */
  heroSignIn: "/generated-images/hero-light-07-v3.jpg",

  /** Hero image shown on the sign-up page */
  heroSignUp: "/generated-images/hero-light-07-v3.jpg",

  /** @deprecated — old dark space hero. Kept for reference. */
  heroFamily: "/hero-family.jpg",
} as const;

export type AssetKey = keyof typeof ASSETS;
