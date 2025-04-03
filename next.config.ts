import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [{ hostname: "loremflickr.com" }]
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
