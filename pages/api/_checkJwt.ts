/* eslint-disable @typescript-eslint/no-var-requires */
import { auth0Audience, auth0IssuerBaseUrl, authDomain } from './_constants'

const { expressjwt: jwt } = require('express-jwt')
const fs = require('fs')

const publicKey = fs.readFileSync(`${process.cwd()}/shared/certs/${authDomain}.pem`).toString()

// note express-jwt doesn't just validate the token, it puts the decoded token on the request as `user`

export const checkJwt = jwt({
  secret: publicKey,
  audience: auth0Audience,
  issuer: auth0IssuerBaseUrl,
  algorithms: ['RS256'],
  credentialsRequired: false,
})

export const requireJwt = jwt({
  secret: publicKey,
  audience: auth0Audience,
  issuer: auth0IssuerBaseUrl,
  algorithms: ['RS256'],
  credentialsRequired: true,
})
