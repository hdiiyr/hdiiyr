import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    // Persian is the default language; bare paths go to /fa.
    return [
      { source: "/", destination: "/fa", permanent: false },
      { source: "/work/:slug", destination: "/fa/work/:slug", permanent: false },
      { source: "/about", destination: "/fa/about", permanent: false },
    ];
  },
};

export default nextConfig;
