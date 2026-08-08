import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  },
  // A stray package-lock.json in the home directory makes Next infer the wrong
  // workspace root, which means it watches the wrong tree and hot reload gets
  // unreliable. Pin it to this project.
  outputFileTracingRoot: path.join(__dirname),
  // Lets a verification build write somewhere other than .next, so running a
  // build never clobbers the chunks a running `npm run dev` is serving.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
