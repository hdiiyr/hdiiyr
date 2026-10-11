import type { NextConfig } from "next";

/**
 * GITHUB_PAGES=true builds a static export for GitHub Pages, served from
 * https://<owner>.github.io/<repo>/ — PAGES_BASE_PATH is "/<repo>" (empty for a
 * <owner>.github.io repo); the workflow sets both. Local `next dev` / `next start` keep the
 * server features (image optimisation, redirects) and no base path.
 */
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? (process.env.PAGES_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  ...(pages ? { output: "export" as const, basePath, trailingSlash: true } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    globalNotFound: true,
  },
  images: pages
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        qualities: [75, 85],
      },
  // Not available in a static export; there, public/index.html sends "/" to "/fa/".
  ...(pages
    ? {}
    : {
        async redirects() {
          // Persian is the default language; bare paths go to /fa.
          return [
            { source: "/", destination: "/fa", permanent: false },
            { source: "/work/:slug", destination: "/fa/work/:slug", permanent: false },
            { source: "/about", destination: "/fa/about", permanent: false },
          ];
        },
      }),
};

export default nextConfig;
