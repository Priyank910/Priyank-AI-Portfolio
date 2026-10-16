import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    panel.getByRole("heading", { name: /Less time calculating/ }),
  ).toBeVisible();
  await expect(
    panel.getByRole("link", { name: "Download Android" }),
  ).toHaveAttribute("href", apk);
  await page.keyboard.press("End");
  await expect(tabs.getByRole("tab", { name: /MixTape/ })).toBeFocused();
  await expect(
    page
      .getByRole("tabpanel", { name: /MixTape/ })
      .getByRole("heading", { name: /A place to find/ }),
  ).toBeVisible();
  await page.keyboard.press("Home");
  await expect(tabs.getByRole("tab", { name: /Isoliq Inno 1/ })).toBeFocused();
  await page
    .getByRole("button", { name: "Previous featured project", exact: true })
    .click();
  await expect(tabs.getByRole("tab", { name: /MixTape/ })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page
    .getByRole("button", { name: "Next featured project", exact: true })
    .click();
  await expect(
    tabs.getByRole("tab", { name: /Isoliq Inno 1/ }),
  ).toHaveAttribute("aria-selected", "true");
  await page
    .getByRole("button", { name: "Next featured project", exact: true })
    .click();
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

test("the authentic portrait leads to About without loading a graphics engine", async ({
  page,
}) => {
  const graphicsRequests = [];
  page.on("request", (request) => {
    if (/sculpture|three|hero-art|contact-art/.test(request.url()))
      graphicsRequests.push(request.url());
  });
  await page.goto("/");
  const portrait = page
    .locator(".hero")
    .getByRole("img", { name: "Priyank Chavda", exact: true });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveAttribute("src", "/images/priyank-chavda.webp");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Priyank",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await page
    .getByRole("link", { name: "A little more about me", exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
  await expect(
    page.getByRole("heading", { name: "A little about me.", exact: true }),
  ).toBeVisible();
  expect(graphicsRequests).toEqual([]);
});

test("the About tabs expose real experience, approach, and skills with the keyboard", async ({
  page,
}) => {
  await page.goto("/about");
  const tabs = page.getByRole("tablist", {
    name: "About Priyank",
    exact: true,
  });
  const experience = tabs.getByRole("tab", { name: "Experience", exact: true });
  await expect(experience).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("tabpanel", { name: "Experience", exact: true }),
  ).toContainText("Payment Poster");
  await experience.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(
    tabs.getByRole("tab", { name: "My approach", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tabpanel", { name: "My approach", exact: true }),
  ).toContainText("Daily Ledger");
  await page.keyboard.press("End");
  await expect(
    tabs.getByRole("tab", { name: "Toolbox", exact: true }),
  ).toBeFocused();
  const panel = page.getByRole("tabpanel", { name: "Toolbox", exact: true });
  await expect(panel).toContainText("PyTorch");
  await expect(panel).toContainText("Diploma in Computer Engineering");
  await expect(panel).toContainText("Learning & certifications");
});

test("the portrait moves gently on pointer input and stays still with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const mount = page.locator(".hero .portrait-mount");
  await mount.scrollIntoViewIfNeeded();
  const bounds = await page.locator(".hero .portrait").boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width * 0.85,
    bounds.y + bounds.height * 0.3,
  );
  await expect
    .poll(async () =>
      mount.evaluate(
        (element) => new DOMMatrix(getComputedStyle(element).transform).m41,
      ),
    )
    .toBeGreaterThan(1);
  await page.mouse.move(5, 5);
  await expect
    .poll(async () =>
      mount.evaluate((element) =>
        Math.abs(new DOMMatrix(getComputedStyle(element).transform).m41),
      ),
    )
    .toBeLessThan(0.1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(
    bounds.x + bounds.width * 0.9,
    bounds.y + bounds.height * 0.7,
  );
  await expect
    .poll(async () =>
      mount.evaluate((element) =>
        Math.abs(new DOMMatrix(getComputedStyle(element).transform).m41),
      ),
    )
    .toBeLessThan(0.1);
});
