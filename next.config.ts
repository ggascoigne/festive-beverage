import { withSerwist } from '@serwist/turbopack'

export const headers = async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'X-Clacks-Overhead',
        value: 'GNU Terry Pratchett, Erick Wujcik, Roger Zelazny',
      },
    ],
  },
]

export default withSerwist({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  headers,
})
