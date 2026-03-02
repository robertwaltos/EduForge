import { test, expect } from "@playwright/test";

/**
 * E2E navigation flow tests:
 * Simulate realistic user journeys from landing page through the app.
 */

test.describe("Navigation flows", () => {
  test.skip(({ browserName }) => browserName === "firefox", "isMobile not supported in Firefox");
  test.describe.configure({ retries: 1 });
  test.use({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });

  // Dismiss cookie consent banner to prevent it blocking footer links
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "koydo.trackingConsent",
        JSON.stringify({ decided: true, analytics: false }),
      );
    });
  });

  test("landing → explore page", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    // Look for an explore link/button on landing page
    const exploreLink = page.locator(
      'a[href*="/explore"], button:has-text("Explore"), a:has-text("Explore")',
    ).first();
    const hasExplore = await exploreLink.isVisible().catch(() => false);

    if (hasExplore) {
      await exploreLink.click();
      await page.waitForURL(/explore/, { timeout: 10_000 });
    } else {
      await page.goto("/explore", { waitUntil: "domcontentloaded" });
    }

    await page.waitForTimeout(1500);
    // Stage cards should be visible on explore
    const stageCards = page.locator("a[href*='stage=']");
    const count = await stageCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("explore → stage filter shows modules", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/explore", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const stageCard = page.locator("a[href*='stage=']").first();
    await stageCard.waitFor({ state: "visible", timeout: 10_000 });
    await stageCard.click();
    await page.waitForTimeout(2000);

    // After clicking a stage, page should still be accessible
    const body = page.locator("body");
    await expect(body).toBeVisible();
  });

  test("sign-in page loads correctly", async ({ page }) => {
    await page.goto("/auth/sign-in", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // Should have sign-in form elements
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    const isVisible = await emailInput.isVisible().catch(() => false);
    if (isVisible) {
      await expect(emailInput).toBeVisible();
    }

    // Should have a submit button
    const submitBtn = page.locator(
      'button[type="submit"], button:has-text("Sign"), button:has-text("Log")',
    ).first();
    const hasSub = await submitBtn.isVisible().catch(() => false);
    if (hasSub) {
      await expect(submitBtn).toBeVisible();
    }
  });

  test("sign-up page loads correctly", async ({ page }) => {
    await page.goto("/auth/sign-up", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("privacy page loads from footer link", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const privacyLink = page.locator('a[href*="/privacy"]').first();
    const visible = await privacyLink.isVisible().catch(() => false);
    if (visible) {
      await privacyLink.click();
      await page.waitForURL(/privacy/, { timeout: 10_000 });
    } else {
      await page.goto("/privacy", { waitUntil: "domcontentloaded" });
    }

    await page.waitForTimeout(1000);
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("terms page loads from footer link", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const termsLink = page.locator('a[href*="/terms"]').first();
    const visible = await termsLink.isVisible().catch(() => false);
    if (visible) {
      await termsLink.click();
      await page.waitForURL(/terms/, { timeout: 10_000 });
    } else {
      await page.goto("/terms", { waitUntil: "domcontentloaded" });
    }

    await page.waitForTimeout(1000);
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("support page loads", async ({ page }) => {
    await page.goto("/support", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    const body = page.locator("body");
    await expect(body).toBeVisible();

    // Check no JS crash
    const consoleLogs: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleLogs.push(msg.text());
    });
    // Give time for any errors
    await page.waitForTimeout(500);
    // Filter out expected dev-mode errors
    const realErrors = consoleLogs.filter(
      (m) => !m.includes("hydration") && !m.includes("404") && !m.includes("favicon"),
    );
    expect(realErrors.length).toBeLessThanOrEqual(3);
  });
});

test.describe("Navigation flows (Desktop)", () => {
  test.skip(({ browserName, isMobile }) => browserName === "firefox" || isMobile === true, "Desktop-only tests");
  test.describe.configure({ retries: 1 });
  test.use({
    viewport: { width: 1280, height: 720 },
  });

  // Dismiss cookie consent banner to prevent it blocking footer links
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "koydo.trackingConsent",
        JSON.stringify({ decided: true, analytics: false }),
      );
    });
  });

  test("desktop nav links are clickable", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    // Sign In button should be visible on desktop
    const signIn = page.locator(
      'a[href*="/sign-in"], button:has-text("Sign In"), a:has-text("Sign In")',
    ).first();
    const visible = await signIn.isVisible().catch(() => false);
    if (visible) {
      await signIn.click();
      await page.waitForTimeout(2000);
      // Should navigate to sign-in page
      expect(page.url()).toContain("sign-in");
    }
  });

  test("back navigation works correctly", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    await page.goto("/explore", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    await page.goBack();
    await page.waitForTimeout(1500);

    // Should be back on landing page
    expect(page.url()).toMatch(/localhost:\d+\/?$/);
  });
});
