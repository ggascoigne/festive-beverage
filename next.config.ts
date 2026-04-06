import { withSerwist } from '@serwist/turbopack'

export default withSerwist({
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
})
