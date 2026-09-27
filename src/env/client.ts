import { createEnv } from '@t3-oss/env-nextjs'

import { nodeEnvSchema, publicEnvSchema } from './schemas'

export const env = createEnv({
  client: publicEnvSchema,
  shared: {
    NODE_ENV: nodeEnvSchema,
  },
  runtimeEnv: {
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    NODE_ENV: process.env.NODE_ENV,
  },
  emptyStringAsUndefined: true,
})

export const isDev = env.NODE_ENV !== 'production'
export const isTest = env.NODE_ENV === 'test'
