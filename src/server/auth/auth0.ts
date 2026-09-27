import { Auth0Client } from '@auth0/nextjs-auth0/server'

import { env } from '@/env/server'

import { SESSION_COOKIE_NAME } from './constants'

const toAbsoluteUrl = (value?: string) =>
  value ? (value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`) : undefined

const authDomain = env.AUTH_DOMAIN
const appBaseUrl = toAbsoluteUrl(env.AUTH0_BASE_URL ?? env.VERCEL_BRANCH_URL ?? env.VERCEL_URL)

export const auth0 = new Auth0Client({
  domain: authDomain,
  clientId: env.AUTH0_CLIENT_ID,
  clientSecret: env.AUTH0_CLIENT_SECRET,
  secret: env.AUTH0_SECRET,
  appBaseUrl,
  session: {
    cookie: {
      name: SESSION_COOKIE_NAME,
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
