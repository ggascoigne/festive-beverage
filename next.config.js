/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
})
