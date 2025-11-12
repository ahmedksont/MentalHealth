// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  experimental: {
    serverActions: {}, // must be an object, not boolean
  },
  turbopack: {
    // use absolute path
    root: path.resolve("./"),
  },
};

export default nextConfig;
