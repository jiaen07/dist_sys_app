import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // This is the crucial line for your Docker multi-stage build
};

export default nextConfig;