// eslint-disable-next-line @typescript-eslint/no-var-requires
const assert = require('assert').strict

export const isDev = process.env.NODE_ENV !== 'production'

export const managementClientId = process.env.MANAGEMENT_CLIENT_ID
assert.ok(managementClientId, 'The "MANAGEMENT_CLIENT_ID" environment variable is required')
export const managementClientSecret = process.env.MANAGEMENT_CLIENT_SECRET
assert.ok(managementClientSecret, 'The "MANAGEMENT_CLIENT_SECRET" environment variable is required')

export const auth0Secret = process.env.AUTH0_SECRET
assert.ok(auth0Secret, 'The "AUTH0_SECRET" environment variable is required')
export const auth0BaseUrl = process.env.AUTH0_BASE_URL
assert.ok(auth0BaseUrl, 'The "AUTH0_BASE_URL" environment variable is required')
export const auth0IssuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL
assert.ok(auth0IssuerBaseUrl, 'The "AUTH0_ISSUER_BASE_URL" environment variable is required')
export const auth0ClientId = process.env.AUTH0_CLIENT_ID
assert.ok(auth0ClientId, 'The "AUTH0_CLIENT_ID" environment variable is required')
export const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET
assert.ok(auth0ClientSecret, 'The "AUTH0_CLIENT_SECRET" environment variable is required')
export const auth0Audience = process.env.AUTH0_AUDIENCE
assert.ok(auth0Audience, 'The "AUTH0_AUDIENCE" environment variable is required')

export const authDomain = auth0IssuerBaseUrl!.slice(8)
