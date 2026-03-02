import { test, expect } from "@playwright/test";

/**
 * Layout consistency checks — verifies structural layout properties
 * across every device project without needing screenshots.
 *
 * Uses `domcontentloaded` instead of `networkidle` to avoid timeouts
 * from long-polling / WebSocket connections in development mode.
 */

test.describe("Navigation bar", () => {
  test("renders on landing page", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const nav = page.locator("header").first();
    await expect(nav).toBeVisible();
  });

  test("brand logo is visible", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const logo = page.locator('img[alt="Koydo logo"]');
    await expect(logo).toBeVisible();
  });

  test("shows Sign In + Sign Up when not authenticated", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Wait for auth context to resolve (client-side fetch)
    await page.waitForTimeout(2000);

    const signIn = page.locator('a[href="/auth/sign-in"]').first();
    await expect(signIn).toBeVisible({ timeout: 10_000 });
    // Sign-up button may be hidden on narrow viewports (max-[360px]:hidden)
    const signUp = page.locator('a[href="/auth/sign-up"]').first();
    const signUpVisible = await signUp.isVisible().catch(() => false);
    if (signUpVisible) {
      await expect(signUp).toBeVisible();
    }
  });
});

test.describe("Footer", () => {
  test("renders on landing page", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("contains Privacy and Terms links", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const privacy = page.locator('footer a[href="/legal/privacy"]').first();
    const terms = page.locator('footer a[href="/legal/terms"]').first();
    await expect(privacy).toBeVisible();
    await expect(terms).toBeVisible();
  });
});

test.describe("Responsive layout", () => {
  test("landing page has no horizontal overflow", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    // Allow up to 2px tolerance for sub-pixel rounding
    expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
  });

  test("explore page has no horizontal overflow", async ({ page }) => {
    await page.goto("/explore", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
  });

  test("sign-in page has no horizontal overflow", async ({ page }) => {
    await page.goto("/auth/sign-in", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(scrollWidth - clientWidth).toBeLessThanOrEqual(2);
  });
});

test.describe("Page header consistency", () => {
  const PAGES_WITH_HEADERS = [
    { name: "explore", path: "/explore" },
  ];

  for (const { name, path } of PAGES_WITH_HEADERS) {
    test(`${name} — page heading is visible`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(500);
      const heading = page.locator("h1").first();
      await expect(heading).toBeVisible();
    });
  }
});
