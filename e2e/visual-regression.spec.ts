import { test, expect } from "@playwright/test";

/**
 * Visual regression test — captures a full-page screenshot on every
 * configured device project.  Run `npx playwright test --update-snapshots`
 * to create/refresh the baseline images.
 *
 * Each page scrolls to bottom to trigger lazy content before capturing.
 */

test.describe.configure({ retries: 2 });

// Dismiss cookie consent banner before each test
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "koydo.trackingConsent",
      JSON.stringify({ decided: true, analytics: false }),
    );
  });
});

const PUBLIC_PAGES = [
  { name: "landing", path: "/" },
  { name: "explore", path: "/explore" },
  { name: "sign-in", path: "/auth/sign-in" },
  { name: "sign-up", path: "/auth/sign-up" },
  { name: "privacy", path: "/legal/privacy" },
  { name: "terms", path: "/legal/terms" },
  { name: "support", path: "/support" },
];

for (const { name, path } of PUBLIC_PAGES) {
  test(`${name} — visual snapshot`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    // Dismiss any cookie consent banner that might appear despite localStorage
    const dismissBtn = page.getByRole("button", { name: "Necessary Only" });
    if (await dismissBtn.isVisible({ timeout: 500 }).catch(() => false)) {
      await dismissBtn.click();
      await page.waitForTimeout(300);
    }

    // Scroll to bottom to load any lazy content (may fail if page navigates)
    try {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
    } catch {
      // Page may have navigated (e.g. auth redirect), wait and continue
      await page.waitForTimeout(500);
    }

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.1,
      threshold: 0.3,
      animations: "disabled",
    });
  });
}
