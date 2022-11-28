/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  rewrites: [{ source: '/api/graphql/:match', destination: '/api/graphql' }],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
