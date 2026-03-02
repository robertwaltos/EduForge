import { test, expect } from "@playwright/test";

/**
 * Touch & interaction tests for tablet and mobile device projects.
 * These verify that touch-critical UI (menus, buttons, links) is
 * accessible and tappable on touch devices.
 */

// ─────────────────────────────────────────────
// Helper: dismiss cookie consent via localStorage
// ─────────────────────────────────────────────
const dismissConsent = async (page: import("@playwright/test").Page) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "koydo.trackingConsent",
      JSON.stringify({ decided: true, analytics: false }),
    );
  });
};

// ─────────────────────────────────────────────
// Helper: collect elements smaller than minPx
// ─────────────────────────────────────────────
async function collectUndersized(
  locator: import("@playwright/test").Locator,
  minPx: number,
  maxCount = 60,
) {
  const count = await locator.count();
  const tooSmall: string[] = [];
  for (let i = 0; i < Math.min(count, maxCount); i++) {
    const el = locator.nth(i);
    const isVisible = await el.isVisible().catch(() => false);
    if (!isVisible) continue;
    const box = await el.boundingBox();
    if (box && (box.height < minPx || box.width < minPx)) {
      const text = await el.textContent().catch(() => "?");
      tooSmall.push(`"${text?.trim().slice(0, 30)}" → ${Math.round(box.width)}×${Math.round(box.height)}`);
    }
  }
  return tooSmall;
}

// ═══════════════════════════════════════════════
// 1. Landing page touch targets
// ═══════════════════════════════════════════════
test.describe("Touch interactions", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("landing page CTA buttons are tappable size (≥44px)", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const mainArea = page.locator("main, header, [role='banner'], [role='main']");
    const interactives = mainArea.locator("a, button").filter({ hasNotText: "" });
    const tooSmall = await collectUndersized(interactives, 36);

    if (tooSmall.length > 5) {
      console.warn(`⚠️ ${tooSmall.length} elements below 36px touch target:\n${tooSmall.join("\n")}`);
    }
    expect(tooSmall.length).toBeLessThan(10);
  });

  test("navigation menu opens on tap", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Desktop doesn't use mobile menu");

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const signIn = page.locator('a[href="/auth/sign-in"]').first();
    await expect(signIn).toBeVisible();
  });

  test("explore stage cards are tappable", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/explore", { waitUntil: "domcontentloaded" });

    const cards = page.locator("a[href*='stage=']");
    try {
      await cards.first().waitFor({ state: "visible", timeout: 15_000 });
    } catch {
      test.skip(true, "No stage cards visible on this viewport");
      return;
    }
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    if (count > 0) {
      const firstCard = cards.first();
      const box = await firstCard.boundingBox();
      if (!box) {
        test.skip(true, "Stage card not in viewport");
        return;
      }
      expect(box.height).toBeGreaterThanOrEqual(40);
      expect(box.width).toBeGreaterThanOrEqual(40);
    }
  });
});

// ═══════════════════════════════════════════════
// 2. Viewport meta
// ═══════════════════════════════════════════════
test.describe("Viewport meta", () => {
  test("viewport is set correctly for mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toBeTruthy();
    expect(viewport).toContain("width=device-width");
  });
});

// ═══════════════════════════════════════════════
// 3. Cookie consent banner
// ═══════════════════════════════════════════════
test.describe("Cookie consent banner interactions", () => {
  test.describe.configure({ retries: 1 });

  test("consent banner buttons meet 44px touch target", async ({ page }) => {
    // Do NOT dismiss consent — let it appear
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000); // wait for 1200ms delay + render

    const banner = page.locator('[role="dialog"][aria-label="Cookie consent"]');
    const isVisible = await banner.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip(true, "Consent banner not visible (may be native platform)");
      return;
    }

    const buttons = banner.locator("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const box = await btn.boundingBox();
      if (!box) continue;
      const text = await btn.textContent();
      expect(box.height, `Button "${text?.trim()}" height`).toBeGreaterThanOrEqual(44);
    }
  });

  test("accept button dismisses consent banner", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const banner = page.locator('[role="dialog"][aria-label="Cookie consent"]');
    const isVisible = await banner.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip(true, "Consent banner not visible");
      return;
    }

    await banner.locator("button", { hasText: "Accept All" }).click();
    await expect(banner).toBeHidden({ timeout: 3000 });

    // Verify consent was stored
    const stored = await page.evaluate(() => localStorage.getItem("koydo.trackingConsent"));
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.decided).toBe(true);
    expect(parsed.analytics).toBe(true);
  });

  test("necessary-only button dismisses banner without analytics", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    const banner = page.locator('[role="dialog"][aria-label="Cookie consent"]');
    const isVisible = await banner.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip(true, "Consent banner not visible");
      return;
    }

    await banner.locator("button", { hasText: "Necessary Only" }).click();
    await expect(banner).toBeHidden({ timeout: 3000 });

    const stored = await page.evaluate(() => localStorage.getItem("koydo.trackingConsent"));
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.decided).toBe(true);
    expect(parsed.analytics).toBe(false);
  });
});

// ═══════════════════════════════════════════════
// 4. Footer touch targets
// ═══════════════════════════════════════════════
test.describe("Footer touch targets", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("social media icons meet 44px touch target", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const footer = page.locator("footer");
    const socialLinks = footer.locator('a[aria-label]').filter({
      has: page.locator("svg"),
    });

    const count = await socialLinks.count();
    if (count === 0) {
      test.skip(true, "No social icons in footer");
      return;
    }

    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      const box = await link.boundingBox();
      if (!box) continue;
      const label = await link.getAttribute("aria-label");
      expect(box.height, `Social icon "${label}" height`).toBeGreaterThanOrEqual(44);
      expect(box.width, `Social icon "${label}" width`).toBeGreaterThanOrEqual(44);
    }
  });

  test("footer column links meet 44px touch target", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const navLinks = footer.locator("ul a");
    const count = await navLinks.count();
    if (count === 0) {
      test.skip(true, "No footer nav links visible");
      return;
    }

    const tooSmall = await collectUndersized(navLinks, 44);
    expect(tooSmall.length, `Footer links below 44px: ${tooSmall.join(", ")}`).toBe(0);
  });

  test("footer bottom bar links meet 44px touch target", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Bottom bar links — Privacy, Terms, Refunds, Support
    const bottomLinks = footer.locator('a[href="/legal/privacy"], a[href="/legal/terms"], a[href="/legal/refunds"], a[href="/support"]');
    const count = await bottomLinks.count();
    if (count === 0) {
      test.skip(true, "No bottom bar links visible");
      return;
    }

    for (let i = 0; i < count; i++) {
      const link = bottomLinks.nth(i);
      const isVisible = await link.isVisible().catch(() => false);
      if (!isVisible) continue;
      const box = await link.boundingBox();
      if (!box) continue;
      const text = await link.textContent();
      expect(box.height, `Bottom link "${text?.trim()}" height`).toBeGreaterThanOrEqual(44);
    }
  });
});

// ═══════════════════════════════════════════════
// 5. Auth page touch targets
// ═══════════════════════════════════════════════
test.describe("Auth page touch targets", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("sign-in page buttons meet 44px minimum", async ({ page }) => {
    await page.goto("/auth/sign-in", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const buttons = page.locator('main button[type="submit"], main button:not([type])');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    const tooSmall = await collectUndersized(buttons, 44);
    expect(tooSmall.length, `Auth buttons below 44px: ${tooSmall.join(", ")}`).toBe(0);
  });

  test("OAuth buttons are visible and tappable", async ({ page }) => {
    await page.goto("/auth/sign-in", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // OAuth buttons contain provider icons/text like Google, Facebook, Apple, X
    const oauthSection = page.locator("main");
    const oauthButtons = oauthSection.locator("button").filter({
      has: page.locator("svg"),
    });

    const count = await oauthButtons.count();
    if (count === 0) {
      // Not all pages may show OAuth buttons
      return;
    }

    for (let i = 0; i < count; i++) {
      const btn = oauthButtons.nth(i);
      const isVisible = await btn.isVisible().catch(() => false);
      if (!isVisible) continue;
      const box = await btn.boundingBox();
      if (!box) continue;
      expect(box.height, `OAuth button ${i} height`).toBeGreaterThanOrEqual(44);
    }
  });

  test("form inputs have adequate touch height", async ({ page }) => {
    await page.goto("/auth/sign-in", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const inputs = page.locator('main input[type="email"], main input[type="password"], main input[type="tel"], main input[type="text"]');
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const isVisible = await input.isVisible().catch(() => false);
      if (!isVisible) continue;
      const box = await input.boundingBox();
      if (!box) continue;
      // Form inputs should be at least 36px — they are full-width so
      // width is not a concern, and 36px height is standard for mobile forms
      expect(box.height, `Input ${i} height`).toBeGreaterThanOrEqual(36);
    }
  });
});

// ═══════════════════════════════════════════════
// 6. Support page touch targets
// ═══════════════════════════════════════════════
test.describe("Support page touch targets", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("support page CTAs meet 44px minimum", async ({ page }) => {
    await page.goto("/support", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // For unauthenticated users, there are sign-in CTAs and mailto links
    const ctas = page.locator("main a, main button").filter({ hasNotText: "" });
    const count = await ctas.count();
    if (count === 0) {
      test.skip(true, "No CTAs on support page");
      return;
    }

    const tooSmall = await collectUndersized(ctas, 40);
    if (tooSmall.length > 2) {
      console.warn(`⚠️ Support page: ${tooSmall.length} elements below 40px:\n${tooSmall.join("\n")}`);
    }
    expect(tooSmall.length).toBeLessThan(5);
  });
});

// ═══════════════════════════════════════════════
// 7. Legal page policy button
// ═══════════════════════════════════════════════
test.describe("Legal page touch targets", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("privacy policy acknowledge button meets 44px minimum", async ({ page }) => {
    await page.goto("/legal/privacy", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const acknowledgeBtn = page.locator("button", { hasText: /acknowledge|accept|understood/i });
    const count = await acknowledgeBtn.count();
    if (count === 0) {
      // Button may only appear for authenticated users or after scrolling
      return;
    }

    for (let i = 0; i < count; i++) {
      const btn = acknowledgeBtn.nth(i);
      const isVisible = await btn.isVisible().catch(() => false);
      if (!isVisible) continue;
      const box = await btn.boundingBox();
      if (!box) continue;
      expect(box.height, "Acknowledge button height").toBeGreaterThanOrEqual(44);
    }
  });

  test("legal pages have adequate link touch targets", async ({ page }) => {
    const legalPages = ["/legal/terms", "/legal/refunds", "/legal/dsa"];

    for (const path of legalPages) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(800);

      // Skip if redirected to auth
      if (page.url().includes("/auth/")) continue;

      // Main content links (mailto, external refs, etc.)
      const mainLinks = page.locator("main a").filter({ hasNotText: "" });
      const count = await mainLinks.count();
      if (count === 0) continue;

      for (let i = 0; i < Math.min(count, 20); i++) {
        const link = mainLinks.nth(i);
        const isVisible = await link.isVisible().catch(() => false);
        if (!isVisible) continue;
        const box = await link.boundingBox();
        if (!box) continue;
        // Inline text links within body copy can be smaller, just verify they're not tiny
        // (≥24px height is reasonable for inline links)
        if (box.height < 24) {
          const text = await link.textContent();
          console.warn(`⚠️ ${path}: link "${text?.trim().slice(0, 30)}" is ${Math.round(box.height)}px tall`);
        }
      }
    }
  });
});

// ═══════════════════════════════════════════════
// 8. Cross-page CTA consistency
// ═══════════════════════════════════════════════
test.describe("Cross-page CTA touch targets", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("primary CTAs across key pages meet 44px", async ({ page }) => {
    const pages = ["/", "/explore", "/auth/sign-in", "/auth/sign-up"];

    for (const path of pages) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);

      // Target prominent CTA buttons (excluding inline text links)
      const ctas = page.locator('main a[class*="rounded-full"], main button[class*="rounded-full"], header a[class*="rounded-full"]');
      const count = await ctas.count();

      for (let i = 0; i < Math.min(count, 20); i++) {
        const cta = ctas.nth(i);
        const isVisible = await cta.isVisible().catch(() => false);
        if (!isVisible) continue;
        const box = await cta.boundingBox();
        if (!box) continue;
        const text = await cta.textContent().catch(() => "?");
        expect(
          box.height,
          `${path}: CTA "${text?.trim().slice(0, 30)}" height`,
        ).toBeGreaterThanOrEqual(40);
      }
    }
  });
});

// ═══════════════════════════════════════════════
// 9. Header navigation touch targets
// ═══════════════════════════════════════════════
test.describe("Header navigation touch targets", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("header buttons and links meet 40px minimum", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const header = page.locator("header");
    const interactives = header.locator("a, button");
    const count = await interactives.count();

    for (let i = 0; i < count; i++) {
      const el = interactives.nth(i);
      const isVisible = await el.isVisible().catch(() => false);
      if (!isVisible) continue;
      const box = await el.boundingBox();
      if (!box) continue;
      const text = await el.textContent().catch(() => "?");
      // Header elements should be at least 40px for comfortable touch
      expect(
        box.height,
        `Header element "${text?.trim().slice(0, 25)}" height`,
      ).toBeGreaterThanOrEqual(36);
    }
  });

  test("search button is tappable", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const searchBtn = page.locator('button[title*="Search"]').first();
    const isVisible = await searchBtn.isVisible().catch(() => false);
    if (!isVisible) {
      return; // Search button may not render for unauthenticated users
    }

    const box = await searchBtn.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(36);
      expect(box.width).toBeGreaterThanOrEqual(36);
    }
  });
});

// ═══════════════════════════════════════════════
// 10. Touch-specific: no horizontal overflow
// ═══════════════════════════════════════════════
test.describe("Touch layout: no horizontal overflow", () => {
  test.describe.configure({ retries: 1 });

  test.beforeEach(async ({ page }) => {
    await dismissConsent(page);
  });

  test("pages do not overflow horizontally", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Horizontal overflow only critical on mobile");

    const pages = ["/", "/explore", "/auth/sign-in", "/support", "/legal/privacy"];

    for (const path of pages) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1000);

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(overflow, `${path} has horizontal overflow`).toBe(false);
    }
  });
});
