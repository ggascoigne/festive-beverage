import type { SessionData } from '@auth0/nextjs-auth0/types'
import * as jose from 'jose'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserRoles } from '@/server/auth/apiAuthUtils'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      res.status(405).end('method not allowed')
      return
    }

    const auth = (req.headers['x-authorization-token'] as string) ?? ''
    const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : ''

    if (!token) {
      res.status(401).end('missing token')
      return
    }

    const issuerBase = (process.env.AUTH0_DOMAIN ?? process.env.AUTH0_ISSUER_BASE_URL ?? '').replace(/\/$/, '')
    const audience = process.env.AUTH0_CLIENT_ID

    if (!issuerBase || !audience) {
      res.status(500).end('server misconfigured')
      return
    }

    const normalizedBase = issuerBase.startsWith('http') ? issuerBase : `https://${issuerBase}`
    const issuer = `${normalizedBase}/`
    const jwks = jose.createRemoteJWKSet(new URL(`${normalizedBase}/.well-known/jwks.json`))
    const { payload } = await jose.jwtVerify(token, jwks, { issuer, audience })

    const email = payload.email as string | undefined
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const email_verified = (payload.email_verified as boolean | undefined) ?? false
    const sub = payload.sub as string | undefined
    const sid = payload.sid as string | undefined
    const exp = (payload.exp as number | undefined) ?? Math.floor(Date.now() / 1000) + 300

    if (!email || !sub || !sid) {
      res.status(400).end('missing token claims')
      return
    }

    const session: SessionData = {
      user: { email, email_verified, sub },
      tokenSet: { accessToken: '', expiresAt: exp, idToken: token },
      internal: { sid, createdAt: Math.floor(Date.now() / 1000) },
    }

    const authorization = await getUserRoles(session)
    if (!authorization) {
      res.status(204).end()
      return
    }

    res.status(200).json(authorization)
  } catch {
    res.status(401).end('invalid token')
  }
}
