# Abolfazl Irani — Portfolio & Résumé

A bilingual (Persian default, English) portfolio site with a full-screen project gallery,
case studies and a printable résumé. Layout, typography scale and motion follow the
interaction model of robin-noguier.com; all content, images, fonts and code are original.

- Next.js 16 (App Router) + TypeScript, plain CSS
- GSAP for motion, OGL (WebGL) only for the bending covers on the desktop gallery
- Fonts (SIL OFL, self-hosted in `src/fonts`): Vazirmatn (Persian), Gloock + Manrope (English)

## Run

```bash
npm install
npm run dev -- --port 3100 --hostname 127.0.0.1
```

Open http://localhost:3100 (redirects to `/fa`). English lives at `/en`.

```bash
npm run build && npm start   # production build
npm run lint
```

## Routes

| Path | Page |
| --- | --- |
| `/fa`, `/en` | Gallery. `?p=<slug>` opens a specific project. |
| `/fa/work/<slug>`, `/en/work/<slug>` | Case study |
| `/fa/about`, `/en/about` | About, contact and printable résumé (`#contact`, `#resume`) |
| `/`, `/about`, `/work/<slug>` | Redirect to the Persian version |

## Where to change things

| What | File |
| --- | --- |
| Name, job title, bio, email, social links, portrait, experience, education, expertise | `src/content/site.ts` |
| Projects (order, text, colours, images, meta, links, video/prototype) | `src/content/projects.ts` |
| Interface labels in both languages | `src/content/ui.ts` |
| Project images | `src/content/media/<slug>/` |
| Default share image | `public/og.png` (source: `design/og.html`, render with `node scripts/render-og.mjs`) |

`null` in `site.ts` means "not provided yet": the page shows a clearly marked placeholder and
never a link that goes nowhere. Set `resumeFile` to a PDF in `public/` to add a download button;
until then the résumé can be printed or saved as PDF from the browser.

The four projects are marked `concept: true` and labelled "Concept Project" everywhere. To add
real work, replace an entry in `projects.ts` (images are imported at the top of the file).
Each project needs `cover` (16:10), `detail` (4:5) and the figures used in its case study.

## Concept mockups

The concept images are designed in HTML (`design/mockups/<slug>.html`, shared `kit.css`) and
rendered with local Chrome:

```bash
node scripts/render-mockups.mjs            # all projects
node scripts/render-mockups.mjs nava       # one project
```

Output goes to `src/content/media/<slug>/*.webp`; full-size PNGs for review go to
`design/renders/` (git-ignored).

## Notes

- The desktop gallery switches projects with the wheel/trackpad (one step per gesture), arrow
  keys while focus is inside it, the dots, previous/next and the project index. Phones and
  tablets use a horizontal swipe; vertical page scroll is never blocked.
- `prefers-reduced-motion` turns movement into short cross-fades and disables WebGL.
- Without WebGL the gallery falls back to regular images with the same layout.
