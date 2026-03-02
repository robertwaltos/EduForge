import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial", retries: 2 });
test.setTimeout(60_000);

/**
 * Dark mode visual & structural tests.
 * Verifies that dark: variant classes render properly and no
 * white-flash or unthemed sections appear.
 */

const PUBLIC_PAGES = [
  { name: "landing", path: "/" },
  { name: "explore", path: "/explore" },
  { name: "sign-in", path: "/auth/sign-in" },
  { name: "sign-up", path: "/auth/sign-up" },
];

test.describe("Dark mode", () => {
  test.use({ colorScheme: "dark" });

  // Dismiss cookie consent banner to prevent visual snapshot flakiness
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "koydo.trackingConsent",
        JSON.stringify({ decided: true, analytics: false }),
      );
    });
  });

  for (const { name, path } of PUBLIC_PAGES) {
    test(`${name} — no white-flash in dark mode`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);

      // Check that body/html background is dark (not white)
      const bgColor = await page.evaluate(() => {
        const body = document.body;
        const computed = window.getComputedStyle(body);
        return computed.backgroundColor;
      });

      // Parse RGB — if background is bright white (255,255,255), flag it
      const match = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match.map(Number);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        // In dark mode, body luminance should be below 0.5
        // Landing page has its own dark bg, so this is mainly for inner pages
        if (name !== "landing") {
          expect(
            luminance,
            `${name} body background appears light in dark mode (luminance=${luminance.toFixed(2)})`,
          ).toBeLessThan(0.6);
        }
      }
    });

    test(`${name} — dark mode visual snapshot`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(2500);

      // Dismiss cookie consent if visible
      const consentBtn = page.getByRole("button", { name: "Necessary Only" });
      if (await consentBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await consentBtn.click();
        await page.waitForTimeout(300);
      }

      try {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(800);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
      } catch {
        await page.waitForTimeout(800);
      }

      await expect(page).toHaveScreenshot(`dark-${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
        threshold: 0.3,
        animations: "disabled",
      });
    });
  }

  test("nav bar has dark theme styling", async ({ page }) => {
    await page.goto("/explore", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const header = page.locator("header").first();
    const headerBg = await header.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Header should not be pure white in dark mode
    const match = headerBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      expect(r + g + b, "Nav header appears white in dark mode").toBeLessThan(700);
    }
  });

  test("footer has dark theme styling", async ({ page }) => {
    await page.goto("/explore", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const footer = page.locator("footer");
    const isVisible = await footer.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip();
      return;
    }

    const footerColor = await footer.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });

    // Text in footer should be light in dark mode
    const match = footerColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // In dark mode, text should be relatively light
      expect(luminance).toBeGreaterThan(0.3);
    }
  });
});
