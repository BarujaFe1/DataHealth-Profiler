/**
 * Capture portfolio screenshots with Playwright against the Next.js app.
 * Usage (from frontend/):
 *   npx --yes playwright install chromium
 *   npm run capture:screenshots
 */
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const outDir = path.resolve(__dirname, "../../assets/screenshots");
  fs.mkdirSync(outDir, { recursive: true });
  const base = process.env.SCREENSHOT_BASE_URL || "http://127.0.0.1:3000";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, "01-hero-demos.png"),
    fullPage: false,
  });

  const demoButton = page.locator("button.demo-card").first();
  await demoButton.click();
  await page.waitForSelector(".summary-panel", { timeout: 15000 });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outDir, "02-health-flags.png"),
    fullPage: false,
  });

  await page.locator(".column-table tbody tr").first().click();
  await page.waitForSelector(".column-detail h3", { timeout: 5000 });
  await page.evaluate(() => {
    document.querySelector(".columns-layout")?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, "03-column-detail.png"),
    fullPage: false,
  });

  await browser.close();
  console.log(`Screenshots written to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
