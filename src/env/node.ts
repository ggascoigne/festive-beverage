import { vercel } from '@t3-oss/env-core/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'

import { authEnvSchema, databaseEnvSchema, nodeEnvSchema, smtpEnvSchema } from './schemas'

export * from '../utils/connectionStringUtils'

export const env = createEnv({
  extends: [vercel()],
  server: {
    ...databaseEnvSchema,
    ...authEnvSchema,
    ...smtpEnvSchema,
    AUTH_DOMAIN: authEnvSchema.AUTH0_ISSUER_BASE_URL.transform((issuer) => issuer.replace(/^https?:\/\//, '')),
  },
  shared: {
    NODE_ENV: nodeEnvSchema,
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_DATABASE_URL: process.env.ADMIN_DATABASE_URL,
    DATABASE_SCHEMAS: process.env.DATABASE_SCHEMAS,
    DATABASE_SSL_CERT: process.env.DATABASE_SSL_CERT,
    MANAGEMENT_CLIENT_ID: process.env.MANAGEMENT_CLIENT_ID,
    MANAGEMENT_CLIENT_SECRET: process.env.MANAGEMENT_CLIENT_SECRET,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH_DOMAIN: process.env.AUTH0_ISSUER_BASE_URL,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})

export const isDev = env.NODE_ENV !== 'production'
export const isTest = env.NODE_ENV === 'test'
export type EnvType = typeof env
