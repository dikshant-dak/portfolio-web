import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  cacheComponents: true,
  experimental: {
    instantNavigationDevToolsToggle: true,
  },
};

export default nextConfig;
