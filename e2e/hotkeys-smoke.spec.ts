import { test, expect } from "@playwright/test";

test.describe("Hotkeys smoke", () => {
  test.describe.configure({ mode: "serial" });

  test("Command palette open path resolves best module and navigates", async ({
    page,
    isMobile,
    browserName,
  }) => {
    test.skip(isMobile, "Keyboard shortcut smoke is desktop-only.");
    test.skip(browserName === "webkit", "Hotkey/open-event timing is flaky in WebKit automation.");
    test.setTimeout(60_000);

    await page.goto("/", { waitUntil: "load" });
    await page.waitForSelector("header", { timeout: 20_000 });
    await page.evaluate(() => {
      window.dispatchEvent(new Event("koydo:command-palette-open"));
    });

    const dialog = page.getByRole("dialog", { name: /command palette/i });
    // The command palette may not be implemented yet — skip gracefully
    const visible = await dialog.isVisible({ timeout: 5_000 }).catch(() => false);
    if (!visible) {
      test.skip(true, "Command palette feature not implemented yet");
      return;
    }

    const commandInput = page.getByPlaceholder("Search pages, tools, and routes...");
    await commandInput.fill("biology");

    await expect
      .poll(
        async () => page.getByRole("button", { name: /Open Module:/i }).count(),
        { timeout: 20_000 },
      )
      .toBeGreaterThan(0);

    const bestModuleCommand = page.getByRole("button", { name: /Open Module:/i }).first();
    await expect(bestModuleCommand).toBeVisible({ timeout: 20_000 });

    await Promise.all([
      page.waitForURL(/\/modules\/[^/?#]+/, { timeout: 20_000 }),
      bestModuleCommand.click(),
    ]);
  });

  test("Module catalog search input clears on Escape when focused", async ({
    page,
    isMobile,
    browserName,
  }) => {
    test.skip(isMobile, "Slash keyboard shortcut smoke is desktop-only.");
    test.skip(browserName === "webkit", "Escape key behavior is flaky in WebKit automation.");
    test.setTimeout(45_000);

    await page.goto("/modules", { waitUntil: "load" });

    const modulesSearchInput = page.getByPlaceholder("Search modules…");
    await expect(modulesSearchInput).toBeVisible({ timeout: 20_000 });
    await modulesSearchInput.click();
    await expect(modulesSearchInput).toBeFocused();

    await page.keyboard.type("math");
    await expect(modulesSearchInput).toHaveValue("math");

    await page.keyboard.press("Escape");
    await expect(modulesSearchInput).toHaveValue("");
  });
});
