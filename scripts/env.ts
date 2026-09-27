import { readFileSync } from 'node:fs'
import { parseEnv } from 'node:util'

import { createEnv } from '@t3-oss/env-core'

import { databaseEnvSchema, nodeEnvSchema } from '../src/env/schemas'

export const processScriptEnv = (source: Record<string, string | undefined>) =>
  createEnv({
    isServer: true,
    server: databaseEnvSchema,
    shared: {
      NODE_ENV: nodeEnvSchema,
    },
    runtimeEnv: source,
    emptyStringAsUndefined: true,
  })

export const loadScriptEnv = (path: string) => processScriptEnv(parseEnv(readFileSync(path, 'utf8')))

export type ScriptEnv = ReturnType<typeof processScriptEnv>
