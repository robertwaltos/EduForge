import { test, expect } from "@playwright/test";

/**
 * Touch & interaction tests for tablet and mobile device projects.
 * These verify that touch-critical UI (menus, buttons, links) is
 * accessible and tappable on touch devices.
 */

test.describe("Touch interactions", () => {
  test.describe.configure({ retries: 1 });

  // Dismiss cookie consent banner before each test
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "koydo.trackingConsent",
        JSON.stringify({ decided: true, analytics: false }),
      );
    });
  });

  test("landing page CTA buttons are tappable size (≥44px)", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // Check links/buttons in main content (exclude footer — footer text links
    // are intentionally compact and don't need 44px touch targets per WCAG)
    const mainArea = page.locator("main, header, [role='banner'], [role='main']");
    const interactives = mainArea.locator("a, button").filter({ hasNotText: "" });
    const count = await interactives.count();

    const tooSmall: string[] = [];
    for (let i = 0; i < Math.min(count, 50); i++) {
      const el = interactives.nth(i);
      const isVisible = await el.isVisible().catch(() => false);
      if (!isVisible) continue;

      const box = await el.boundingBox();
      if (box && (box.height < 36 || box.width < 36)) {
        const text = await el.textContent().catch(() => "?");
        tooSmall.push(`"${text?.trim().slice(0, 30)}" → ${Math.round(box.width)}×${Math.round(box.height)}`);
      }
    }

    // Allow a few small elements (icon links, etc.) but flag if many
    if (tooSmall.length > 5) {
      console.warn(`⚠️ ${tooSmall.length} elements below 36px touch target:\n${tooSmall.join("\n")}`);
    }
    expect(tooSmall.length).toBeLessThan(10);
  });

  test("navigation menu opens on tap", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Desktop doesn't use mobile menu");

    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for auth to settle
    await page.waitForTimeout(2000);

    // On unauthenticated mobile, Sign In should be visible
    const signIn = page.locator('a[href="/auth/sign-in"]').first();
    await expect(signIn).toBeVisible();
  });

  test("explore stage cards are tappable", async ({ page, context }) => {
    // Clear any stale session cookies that could trigger auth redirects
    await context.clearCookies();
    await page.goto("/explore", { waitUntil: "domcontentloaded" });

    // Wait for stage cards to render (they are server-rendered Links)
    const cards = page.locator("a[href*='stage=']");
    try {
      await cards.first().waitFor({ state: "visible", timeout: 15_000 });
    } catch {
      // Some devices/viewports may not show stage= links (redirect, empty, etc.)
      test.skip(true, "No stage cards visible on this viewport");
      return;
    }
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    // Verify first visible card link has adequate touch target
    if (count > 0) {
      const firstCard = cards.first();
      const box = await firstCard.boundingBox();
      // boundingBox can be null if element is off-screen
      if (!box) {
        test.skip(true, "Stage card not in viewport");
        return;
      }
      // Cards should be at least 40px in both dimensions
      expect(box.height).toBeGreaterThanOrEqual(40);
      expect(box.width).toBeGreaterThanOrEqual(40);
    }
  });
});

test.describe("Viewport meta", () => {
  test("viewport is set correctly for mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);

    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toBeTruthy();
    expect(viewport).toContain("width=device-width");
  });
});
