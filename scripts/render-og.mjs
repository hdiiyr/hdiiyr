// Renders design/og.html into public/og.png (1200×630), the default social share image.
//   node scripts/render-og.mjs

import { execFile } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const tmp = path.join(root, "design/renders/og-2x.png");
await mkdir(path.dirname(tmp), { recursive: true });
await run(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--allow-file-access-from-files",
  "--force-color-profile=srgb",
  "--force-device-scale-factor=2",
  "--window-size=1200,630",
  "--virtual-time-budget=4000",
  `--screenshot=${tmp}`,
  pathToFileURL(path.join(root, "design/og.html")).href,
]);
await sharp(tmp).resize(1200, 630).png({ compressionLevel: 9 }).toFile(path.join(root, "public/og.png"));
await rm(tmp);
console.log("✓ public/og.png");
