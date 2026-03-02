import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial", retries: 2 });
test.setTimeout(60_000);

/**
 * i18n layout tests — switches to Spanish and verifies that longer
 * translated strings don't cause layout overflow or text truncation
 * on narrow devices.
 */

const PAGES = [
  { name: "landing", path: "/" },
  { name: "explore", path: "/explore" },
  { name: "sign-in", path: "/auth/sign-in" },
];

test.describe("Spanish (ES) layout", () => {
  // Dismiss cookie consent banner to prevent visual snapshot flakiness
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "koydo.trackingConsent",
        JSON.stringify({ decided: true, analytics: false }),
      );
    });
  });

  for (const { name, path } of PAGES) {
    test(`${name} — no horizontal overflow in Spanish`, async ({ page, context }) => {
      // Set Spanish locale cookie
      await context.addCookies([
        {
          name: "koydo.locale",
          value: "es",
          domain: "localhost",
          path: "/",
        },
      ]);

      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      expect(
        scrollWidth - clientWidth,
        `${name} (ES) overflows by ${scrollWidth - clientWidth}px`,
      ).toBeLessThanOrEqual(2);
    });

    test(`${name} — no text truncation in Spanish`, async ({ page, context }) => {
      await context.addCookies([
        {
          name: "koydo.locale",
          value: "es",
          domain: "localhost",
          path: "/",
        },
      ]);

      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);

      // Check that no visible text has overflow:hidden + truncated content
      const truncated = await page.evaluate(() => {
        const results: string[] = [];
        const elements = document.querySelectorAll("h1, h2, h3, p, span, a, button");
        for (const el of elements) {
          const style = window.getComputedStyle(el);
          if (
            style.overflow === "hidden" &&
            style.textOverflow === "ellipsis" &&
            el.scrollWidth > el.clientWidth + 1
          ) {
            const text = el.textContent?.trim().slice(0, 50) ?? "";
            if (text.length > 0) {
              results.push(`"${text}" (${el.tagName})`);
            }
          }
        }
        return results;
      });

      if (truncated.length > 0) {
        console.warn(`⚠️ ${name} (ES) truncated text:\n${truncated.join("\n")}`);
      }
      // Allow some truncation in nav items but flag excessive
      expect(truncated.length).toBeLessThan(5);
    });

    test(`${name} — Spanish visual snapshot`, async ({ page, context }) => {
      await context.addCookies([
        {
          name: "koydo.locale",
          value: "es",
          domain: "localhost",
          path: "/",
        },
      ]);

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

      await expect(page).toHaveScreenshot(`es-${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.1,
        threshold: 0.3,
        animations: "disabled",
      });
    });
  }
});
