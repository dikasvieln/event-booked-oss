import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@eventhub/contracts", "@eventhub/state"],
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
