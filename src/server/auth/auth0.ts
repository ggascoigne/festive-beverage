import { Auth0Client } from '@auth0/nextjs-auth0/server'

const toAbsoluteUrl = (value?: string) =>
  value ? (value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`) : undefined

const authDomain = (process.env.AUTH0_DOMAIN ?? process.env.AUTH0_ISSUER_BASE_URL ?? '').replace(/^https?:\/\//, '')
const appBaseUrl = toAbsoluteUrl(
  process.env.AUTH0_BASE_URL ?? process.env.APP_BASE_URL ?? process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL
)

export const auth0 = new Auth0Client({
  domain: authDomain,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl,
  session: {
    cookie: {
      name: 'festive-beverage-session-v4',
    },
  },
  routes: {
    login: '/api/auth/login',
    callback: '/api/auth/callback',
    logout: '/api/auth/logout',
    backChannelLogout: '/api/auth/backchannel-logout',
  },
  beforeSessionSaved: async (session, idToken) => {
    try {
      if (!idToken) {
        return session
      }

      const url = new URL('/api/auth/roles', appBaseUrl ?? 'http://localhost')
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-authorization-token': `Bearer ${idToken}`,
        },
      })

      if (!response.ok) {
        return session
      }

      const authorization = (await response.json()) as { userId?: number; roles?: string[] }
      if (!authorization.userId || !authorization.roles) {
        return session
      }

      return {
        ...session,
        user: {
          ...session.user,
          ...authorization,
        },
      }
    } catch {
      return session
    }
  },
})
