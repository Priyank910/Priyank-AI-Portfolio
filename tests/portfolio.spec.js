import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function fillContact(page) {
  await page.getByLabel("Your name").fill("Portfolio visitor");
  await page.getByLabel("Email (required)").fill("visitor@example.com");
  await page
    .getByLabel("Your message")
    .fill("I would like to discuss a full-stack developer opportunity.");
}

test("a recruiter can follow the flagship project to evidence and the next story", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Priyank",
  );
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await page
    .getByRole("link", { name: "Explore project", exact: true })
    .click();
  await expect(page).toHaveURL("/projects/isoliq-inno");
  await expect(
    page.getByRole("link", { name: "View source code", exact: true }),
  ).toHaveAttribute("href", "https://github.com/Priyank910/Isoliq-Inno-1");
  await expect(
    page.getByRole("heading", { name: "The important lesson", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: /NEXT PROJECT Daily Ledger/ }).click();
  await expect(page).toHaveURL("/projects/daily-ledger");
  await expect(page.getByText(/My first user is my father/)).toBeVisible();
});

test("the project archive filters and restores all eleven projects", async ({
  page,
}) => {
  await page.goto("/projects");
  await expect(page.locator(".archive-rows .project-row")).toHaveCount(11);
  await page
    .getByRole("button", { name: "AI & Research", exact: true })
    .click();
  await expect(page.locator(".archive-rows .project-row")).toHaveCount(5);
  await page
    .getByRole("button", { name: "Real-world tools", exact: true })
    .click();
  await expect(page.locator(".archive-rows .project-row")).toHaveCount(1);
  await expect(page.locator(".archive-rows")).toContainText("Daily Ledger");
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await expect(page.locator(".archive-rows .project-row")).toHaveCount(11);
});

test("contact service failure preserves the draft and offers direct email", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ success: false }),
    }),
  );
  await page.goto("/contact");
  await fillContact(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("couldn’t be sent");
  await expect(page.getByLabel("Your name")).toHaveValue("Portfolio visitor");
  await expect(page.locator("a.form-email")).toHaveAttribute(
    "href",
    "mailto:priyankchavda910@gmail.com",
  );
});

test("contact success announces delivery and clears the submitted draft", async ({
  page,
}) => {
  await page.route("**/api/contact", async (route) => {
    expect(route.request().postDataJSON()).toMatchObject({
      name: "Portfolio visitor",
      email: "visitor@example.com",
    });
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.goto("/contact");
  await fillContact(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("on its way");
  await expect(page.getByLabel("Your name")).toHaveValue("");
});

test("the assistant renders a response and can be dismissed with the keyboard", async ({
  page,
}) => {
  await page.route("**/api/ai/chat", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        reply:
          "Isoliq Inno 1 is an educational 3M-parameter model trained from scratch.",
      }),
    }),
  );
  await page.goto("/#contact");
  const trigger = page.getByRole("button", {
    name: /ask my portfolio assistant/,
  });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Portfolio assistant", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Tell me about Isoliq Inno", exact: true })
    .click();
  await expect(page.getByRole("log")).toContainText(
    "educational 3M-parameter model",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("the assistant gives a useful fallback when unavailable", async ({
  page,
}) => {
  await page.route("**/api/ai/chat", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ success: false }),
    }),
  );
  await page.goto("/#contact");
  await page
    .getByRole("button", { name: /ask my portfolio assistant/ })
    .click();
  await page
    .getByRole("button", { name: "Tell me about Isoliq Inno", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("unavailable right now");
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "View résumé" }),
  ).toHaveAttribute("href", "/resume.html");
});

test("navigation works with the keyboard on both layouts", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    const trigger = page.getByRole("button", {
      name: "Open navigation",
      exact: true,
    });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("dialog", { name: "Navigation", exact: true }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "All projects" })
      .click();
    await expect(page).toHaveURL("/projects");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await expect(page).toHaveURL("/#about");
  }
});

for (const path of [
  "/",
  "/projects",
  "/projects/isoliq-inno",
  "/projects/daily-ledger",
  "/about",
  "/contact",
]) {
  test(`page ${path} has no detected WCAG A/AA issues or horizontal overflow`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    const width = await page.evaluate(() => ({
      actual: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(width.actual).toBeLessThanOrEqual(width.viewport);
    expect(errors).toEqual([]);
  });
}

test("unknown paths recover to the portfolio and the resume contains the new work", async ({
  page,
}) => {
  await page.goto("/missing-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nothing here",
  );
  await page.getByRole("link", { name: "Back to the portfolio" }).click();
  await expect(page).toHaveURL("/");
  await page.goto("/resume.html");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Priyank Chavda",
  );
  await expect(
    page.getByRole("heading", { name: "Daily Ledger", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download PDF" }),
  ).toHaveAttribute("href", "/priyank-chavda-resume.pdf");
});

test("contact stays readable on a compact 320px screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/contact");
  const width = await page.evaluate(() => ({
    actual: document.documentElement.scrollWidth,
    viewport: innerWidth,
  }));
  expect(width.actual).toBeLessThanOrEqual(width.viewport);
  await expect(page.getByLabel("Your name")).toBeVisible();
});
