#!/usr/bin/env node_modules/.bin/tsx

import fs from 'fs'

import chalk from 'chalk'
import { printSchema } from 'graphql'
import Listr from 'listr'
import { createPostGraphileSchema } from 'postgraphile'

import { PoolType, getPool, getSchemas } from '../shared/config.ts'
import { options } from '../shared/postgraphileOptions.ts'

// Download the schema for codegen, also (and as importantly), save the
// postgraphile cache to speed the lambda  startup time (a lot).

const tasks = new Listr([
  {
    title: 'transforming postgraphile schema',
    task: async () => {
      const pgPool = getPool(PoolType.ADMIN, './shared/')
      const schema = await createPostGraphileSchema(pgPool, getSchemas(), {
        ...options,
        writeCache: `./shared/postgraphile.cache`,
      })
      await pgPool.end()
      fs.writeFileSync('./graphql-schema.graphql', printSchema(schema))
    },
  },
])

tasks.run().catch((reason: any) => {
  console.error(chalk.bold.red('error detected'))
  console.error(reason)
  process.exit(-1)
})
