import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Continuous GPU canvas capture is expensive in a software-rendered CI browser.
test.use({ trace: "off" });

const apk =
  "https://github.com/Priyank910/Daily-Ledger/releases/latest/download/Daily-Ledger-Android.apk";

test("featured projects support keyboard selection and lead to the selected evidence", async ({
  page,
}) => {
  await page.goto("/#work");
  const tabs = page.getByRole("tablist", { name: "Featured projects" });
  await tabs.getByRole("tab", { name: /Isoliq Inno 1/ }).focus();
  await page.keyboard.press("ArrowRight");
  const ledgerTab = tabs.getByRole("tab", { name: /Daily Ledger/ });
  await expect(ledgerTab).toBeFocused();
  await expect(ledgerTab).toHaveAttribute("aria-selected", "true");
  const panel = page.getByRole("tabpanel", { name: /Daily Ledger/ });
  await expect(
    panel.getByRole("heading", { name: "Daily Ledger" }),
  ).toBeVisible();
  await expect(
    panel.getByRole("link", { name: "Download Android" }),
  ).toHaveAttribute("href", apk);
  await page.keyboard.press("End");
  await expect(tabs.getByRole("tab", { name: /MixTape/ })).toBeFocused();
  await expect(
    page
      .getByRole("tabpanel", { name: /MixTape/ })
      .getByRole("heading", { name: "MixTape" }),
  ).toBeVisible();
  await page.keyboard.press("Home");
  await expect(tabs.getByRole("tab", { name: /Isoliq Inno 1/ })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await panel
    .getByRole("link", { name: "Explore project", exact: true })
    .click();
  await expect(page).toHaveURL("/projects/daily-ledger");
  await expect(
    page.getByRole("link", { name: "View source code" }),
  ).toHaveAttribute("href", "https://github.com/Priyank910/Daily-Ledger");
});

test("Daily Ledger tour shows real screens, export details, and the released Android app", async ({
  page,
}) => {
  await page.goto("/projects/daily-ledger");
  const tabs = page.getByRole("tablist", {
    name: "Daily Ledger interface tour",
  });
  await tabs.getByRole("tab", { name: "Overview" }).focus();
  await page.keyboard.press("End");
  await expect(tabs.getByRole("tab", { name: "Reports" })).toBeFocused();
  await expect(
    page.getByRole("img", { name: /Daily Ledger reports screen/ }),
  ).toHaveAttribute("src", "/images/ledger-reports.webp");
  await expect(page.getByRole("tabpanel", { name: "Reports" })).toContainText(
    "Export a PDF or CSV",
  );
  await expect(page.getByRole("tabpanel", { name: "Reports" })).toContainText(
    "sample data",
  );
  await expect(
    page.getByRole("link", { name: "Download Android" }),
  ).toHaveAttribute("href", apk);
  await expect(
    page.getByRole("link", { name: "Release notes" }),
  ).toHaveAttribute("href", /releases\/tag\/v1.0.0$/);
});

test("video loads only on request, has a direct link, and restores focus when dismissed", async ({
  page,
}) => {
  let playerRequests = 0;
  await page.route("https://www.youtube-nocookie.com/embed/**", (route) => {
    playerRequests++;
    return route.fulfill({
      contentType: "text/html",
      body: "<html lang='en'><title>Video player test fixture</title><body>Player integration test fixture</body></html>",
    });
  });
  await page.goto("/#videos");
  expect(playerRequests).toBe(0);
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Explore my channel" }),
  ).toHaveAttribute("href", "https://www.youtube.com/@priyankchavdaofficial");
  const play = page.getByRole("button", {
    name: "Watch the Isoliq build story",
    exact: true,
  });
  await play.click();
  const dialog = page.getByRole("dialog", { name: "The Isoliq build story" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie.com\/embed\/LCntJE2pan4/,
  );
  await expect(
    dialog.getByRole("link", { name: "Watch on YouTube" }),
  ).toHaveAttribute("href", "https://youtu.be/LCntJE2pan4");
  const a11y = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(a11y.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(play).toBeFocused();
});

test("reduced motion leaves the sculpture still and visitors can opt into a real keyboard-controlled mesh", async ({
  page,
}) => {
  // Software WebGL on CI needs longer for several full-size canvas captures.
  test.setTimeout(60000);
  await page.goto("/");
  await expect(page.locator(".sculpture canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Enable 3D", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Animate sculpture", exact: true }),
  ).toBeVisible({ timeout: 15000 });
  const canvas = page.locator(".sculpture canvas");
  const stage = page.getByRole("group", {
    name: "Interactive 3D sculpture",
    exact: true,
  });
  await stage.focus();
  await page.waitForTimeout(200);
  const before = await canvas.screenshot();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(700);
  const rotated = await canvas.screenshot();
  expect(before.equals(rotated)).toBe(false);
  await page.getByRole("button", { name: "Orbit", exact: true }).click();
  await page.waitForTimeout(300);
  expect(rotated.equals(await canvas.screenshot())).toBe(false);
  await page
    .getByRole("button", { name: "Animate sculpture", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Pause sculpture", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Pause sculpture", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Animate sculpture", exact: true }),
  ).toBeVisible();
});

test("normal motion offers hardware-aware 3D and dragging turns the live mesh", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#videos");
  await page.waitForTimeout(1000);
  await expect(page.locator(".sculpture canvas")).toHaveCount(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(1000);
  const enable = page.getByRole("button", { name: "Enable 3D", exact: true });
  if (await enable.isVisible()) {
    await enable.click();
    await expect(
      page.getByRole("button", { name: "Animate sculpture", exact: true }),
    ).toBeVisible({ timeout: 15000 });
  } else {
    await page
      .getByRole("button", { name: "Pause sculpture", exact: true })
      .click({ timeout: 15000 });
  }
  await page.waitForTimeout(700);
  const canvas = page.locator(".sculpture canvas");
  const stage = page.getByRole("group", {
    name: "Interactive 3D sculpture",
    exact: true,
  });
  const before = await canvas.screenshot();
  const bounds = await stage.boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width * 0.7,
    bounds.y + bounds.height * 0.5,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width * 0.7 + 55,
    bounds.y + bounds.height * 0.5 + 35,
    { steps: 8 },
  );
  await page.mouse.up();
  await page.waitForTimeout(700);
  expect(before.equals(await canvas.screenshot())).toBe(false);
});

test("a device without WebGL retains the artwork and all portfolio navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return /webgl/.test(type) ? null : original.call(this, type, ...args);
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Enable 3D", exact: true }).click();
  await expect(
    page.getByText("Sculpture preview · 3D unavailable on this device"),
  ).toBeVisible({ timeout: 15000 });
  await expect(page.locator(".sculpture-poster")).toBeVisible();
  await expect(page.locator(".sculpture canvas")).toHaveCount(0);
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
});
