import { z } from 'zod'

export const nodeEnvSchema = z.enum(['development', 'test', 'production']).default('development')

export const databaseEnvSchema = {
  DATABASE_URL: z.string().url(),
  ADMIN_DATABASE_URL: z.string().url(),
  DATABASE_SCHEMAS: z.string().optional(),
  DATABASE_SSL_CERT: z.string().optional(),
}

export const authEnvSchema = {
  MANAGEMENT_CLIENT_ID: z.string(),
  MANAGEMENT_CLIENT_SECRET: z.string(),
  AUTH0_SECRET: z.string(),
  AUTH0_BASE_URL: z.string().url(),
  AUTH0_ISSUER_BASE_URL: z.string().url(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_AUDIENCE: z.string(),
}

export const smtpEnvSchema = {
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
}

export const publicEnvSchema = {
  NEXT_PUBLIC_PORT: z.string().optional(),
}
