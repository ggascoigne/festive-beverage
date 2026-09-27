import { describe, expect, it } from 'vitest'

import { processScriptEnv } from '../../scripts/env'

const databaseEnvironment = {
  DATABASE_URL: 'postgresql://user:password@localhost:5432/application',
  ADMIN_DATABASE_URL: 'postgresql://admin:password@localhost:5432/application',
}

describe('processScriptEnv', () => {
  it('validates a supplied environment without reading process.env', () => {
    expect(processScriptEnv(databaseEnvironment).DATABASE_URL).toBe(databaseEnvironment.DATABASE_URL)
  })

  it('rejects incomplete script environments', () => {
    expect(() => processScriptEnv({ DATABASE_URL: databaseEnvironment.DATABASE_URL })).toThrow(
      'Invalid environment variables'
    )
  })
})
