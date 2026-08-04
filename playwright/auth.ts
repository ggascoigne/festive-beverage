import 'dotenv/config'

import { generateSessionCookie } from '@auth0/nextjs-auth0/testing'
import type { BrowserContext } from '@playwright/test'

import { SESSION_COOKIE_NAME } from '../src/server/auth/constants'

export const authenticateEditorUser = async (context: BrowserContext) => {
  const secret = process.env.AUTH0_SECRET
  if (!secret) {
    throw new Error('AUTH0_SECRET is required to generate the Playwright session cookie.')
  }

  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60
  const cookie = await generateSessionCookie(
    {
      user: {
        sub: 'auth0|playwright-editor',
        name: 'Playwright Editor',
        email: 'playwright@example.test',
        email_verified: true,
        userId: 1,
        roles: ['ROLE_ADMIN'],
      },
      tokenSet: {
        accessToken: 'playwright-access-token',
        expiresAt,
      },
    },
    { secret }
  )

  await context.addCookies([
    {
      name: SESSION_COOKIE_NAME,
      value: cookie,
      url: 'http://localhost:40000',
      httpOnly: true,
      sameSite: 'Lax',
      expires: expiresAt,
    },
  ])
}
