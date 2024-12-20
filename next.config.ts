/* eslint-disable import/order */
/** @type {import('next').NextConfig} */

import withPWAInit, { runtimeCaching } from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
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
      ...runtimeCaching,
    ],
  },
})

export default withPWA({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
})
