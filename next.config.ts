import type { NextConfig } from "next";

// Tailwind runs through PostCSS (postcss.config.mjs), so it works with both
// Turbopack (`next dev`) and Webpack (`next build --webpack`, used for Hostinger).
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
