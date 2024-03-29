/** @type {import('next').NextConfig} */
const defaultRuntimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching: [
    {
      urlPattern: /\/api\/.+$/,
      method: 'GET',
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-data',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    ...defaultRuntimeCaching,
  ],
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  })
)
