// Renders the HTML mockups in design/mockups into optimized WebP images.
//
//   node scripts/render-mockups.mjs            # every project
//   node scripts/render-mockups.mjs nava barg  # selected projects
//
// Each design/mockups/<slug>.html declares its boards as
//   <section class="board" id="<name>" data-size="cover|detail|wide|tall">
// Output: src/content/media/<slug>/<board>.webp (and a PNG copy in design/renders for review).

import { execFile } from "node:child_process";
import { mkdir, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mockDir = path.join(root, "design/mockups");
const renderDir = path.join(root, "design/renders");
const mediaDir = path.join(root, "src/content/media");

const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SCALE = 2;

// Keep in sync with .board[data-size] in kit.css.
const SIZES = {
  cover: [1600, 1000],
  detail: [880, 1100],
  wide: [2000, 1000],
  tall: [1600, 1800],
};

// Output widths (px) — large enough for full-bleed retina use without shipping raw renders.
const OUTPUT_WIDTH = { cover: 2400, detail: 1100, wide: 2880, tall: 2400 };

/** Reads the boards (id + size) declared in a mockup file. */
async function boardsOf(slug) {
  const html = await readFile(path.join(mockDir, `${slug}.html`), "utf8");
  const found = [...html.matchAll(/<section class="board[^"]*" id="([^"]+)" data-size="([^"]+)"/g)];
  return found.map(([, id, size]) => {
    if (!SIZES[size]) throw new Error(`${slug}#${id}: unknown size "${size}"`);
    return { id, size };
  });
}

async function renderBoard(slug, { id: board, size }) {
  const [w, h] = SIZES[size];
  const url = `${pathToFileURL(path.join(mockDir, `${slug}.html`)).href}?board=${board}`;
  const png = path.join(renderDir, `${slug}-${board}.png`);
  await run(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-color-profile=srgb",
    `--force-device-scale-factor=${SCALE}`,
    `--window-size=${w},${h}`,
    "--virtual-time-budget=5000",
    `--screenshot=${png}`,
    url,
  ]);
  const outDir = path.join(mediaDir, slug);
  await mkdir(outDir, { recursive: true });
  await sharp(png)
    .resize({ width: OUTPUT_WIDTH[size], withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(outDir, `${board}.webp`));
  return png;
}

async function main() {
  await mkdir(renderDir, { recursive: true });
  const all = (await readdir(mockDir)).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5));
  const wanted = process.argv.slice(2);
  const slugs = wanted.length ? all.filter((s) => wanted.includes(s)) : all;
  if (!slugs.length) throw new Error(`No mockups matched: ${wanted.join(", ")}`);

  for (const slug of slugs) {
    // Files are overwritten in place (never deleted first) so a running dev server keeps resolving them.
    for (const board of await boardsOf(slug)) {
      const png = await renderBoard(slug, board);
      console.log(`✓ ${slug}/${board.id} ← ${path.relative(root, png)}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
