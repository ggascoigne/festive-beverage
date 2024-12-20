import path from 'path'

import { vercel } from '@t3-oss/env-core/presets'
import { createEnv } from '@t3-oss/env-nextjs'
import dotenv from 'dotenv'
import { z } from 'zod'

import { getPaths } from './shared/filePaths.js'

export * from './utils/connectionStringUtils'

export const isDev = process.env.NODE_ENV !== 'production'
export const isTest = process.env.NODE_ENV === 'test'

if (isDev && typeof window === 'undefined') {
  const { dirname } = getPaths(import.meta.url)
  dotenv.config({ path: path.resolve(dirname, '../.env') })
}

export const processEnv = (src = process.env) =>
  createEnv({
    extends: [vercel()],
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
      DATABASE_URL: z.string().url(),
      ADMIN_DATABASE_URL: z.string().url(),
      NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

      MANAGEMENT_CLIENT_ID: z.string(),
      MANAGEMENT_CLIENT_SECRET: z.string(),
      AUTH0_SECRET: z.string(),
      AUTH0_BASE_URL: z.string().url(),
      AUTH0_ISSUER_BASE_URL: z.string().url(),
      AUTH0_CLIENT_ID: z.string(),
      AUTH0_CLIENT_SECRET: z.string(),
      AUTH0_AUDIENCE: z.string(),
      AUTH_DOMAIN: z.string(),
      DATABASE_SCHEMAS: z.string().optional(),

      DATABASE_SSL_CERT: z.string().optional(),

      SMTP_USERNAME: z.string(),
      SMTP_PASSWORD: z.string(),
      SMTP_HOST: z.string(),
      SMTP_PORT: z.string(),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
      NEXT_PUBLIC_PORT: z.string().optional(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
      DATABASE_URL: src.DATABASE_URL,
      ADMIN_DATABASE_URL: src.ADMIN_DATABASE_URL,
      NODE_ENV: src.NODE_ENV,

      MANAGEMENT_CLIENT_ID: src.MANAGEMENT_CLIENT_ID,
      MANAGEMENT_CLIENT_SECRET: src.MANAGEMENT_CLIENT_SECRET,
      AUTH0_SECRET: src.AUTH0_SECRET,
      AUTH0_BASE_URL: src.AUTH0_BASE_URL,
      AUTH0_ISSUER_BASE_URL: src.AUTH0_ISSUER_BASE_URL,
      AUTH0_CLIENT_ID: src.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: src.AUTH0_CLIENT_SECRET,
      AUTH0_AUDIENCE: src.AUTH0_AUDIENCE,
      AUTH_DOMAIN: (src.AUTH0_ISSUER_BASE_URL ?? '').slice(8),
      DATABASE_SCHEMAS: src.DATABASE_SCHEMAS,

      DATABASE_SSL_CERT: src.DATABASE_SSL_CERT,

      SMTP_USERNAME: src.SMTP_USERNAME,
      SMTP_PASSWORD: src.SMTP_PASSWORD,
      SMTP_HOST: src.SMTP_HOST,
      SMTP_PORT: src.SMTP_PORT,

      NEXT_PUBLIC_PORT: src.PORT,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!src.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
  })

export const env = processEnv()

export type EnvType = typeof env
