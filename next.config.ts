import type { NextConfig } from "next";

// GitHub Pages project-site URL:
// https://z3r0-foxtrot.github.io/fixed-schokk-blitz/
const repoName = "fixed-schokk-blitz";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true
};

export default nextConfig;
