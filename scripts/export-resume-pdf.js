import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import "./generate-resume.js";

// Run locally after editing résumé data. Production builds serve the committed
// PDF without depending on a browser being installed on the deployment host.
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {}),
});
try {
  const page = await browser.newPage();
  await page.setContent(
    await readFile(new URL("../public/resume.html", import.meta.url), "utf8"),
  );
  await page.pdf({
    path: fileURLToPath(
      new URL("../public/priyank-chavda-resume.pdf", import.meta.url),
    ),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
  });
  console.log("Exported public/priyank-chavda-resume.pdf");
} finally {
  await browser.close();
}
