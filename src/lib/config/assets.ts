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
  /** Full-width cinematic hero on the home page */
  heroFamily: "/hero-family.jpg",

  /** Dark/cosmic background for the bottom CTA banner section */
  bgBottom: "/bg-bottom.jpg",

  /** Brand logo — used in top-nav and any other branded surfaces */
  logo: "/logo-koydo.jpg",

  /** Day/school-scene background used on the sign-in page */
  bgDay: "/bg-day-v1.jpg",

  /** "Bridge of Books" hero image used on the sign-in page */
  heroSignIn: "/hero-light-07.jpg",

  /** "Bridge of Books v3" hero image used on the sign-up page */
  heroSignUp: "/generated-images/hero-light-07-v3.jpg",
} as const;

export type AssetKey = keyof typeof ASSETS;
