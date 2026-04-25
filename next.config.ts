import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "mdx"],
}

export default nextConfig
