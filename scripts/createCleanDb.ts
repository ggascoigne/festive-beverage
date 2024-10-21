#!/usr/bin/env node_modules/.bin/tsx
import chalk from 'chalk'
import { Listr } from 'listr2'

import { createCleanDb } from './shared/scriptUtils'

import { config } from '../src/shared/config'

import { parsePostgresConnectionString } from '#env'

const { database } = parsePostgresConnectionString(config.rootDatabase)
const { user: targetUser, password: targetUserPassword } = parsePostgresConnectionString(config.userDatabase)

console.log(`Recreating database ${database}`)

const tasks = new Listr([
  {
    title: `cleaning database`,
    task: () => createCleanDb(config.rootDatabase, targetUser!, targetUserPassword!, false),
  },
])

tasks.run().catch((reason: any) => {
  console.error(chalk.bold.red('error detected'))
  console.error(reason)
  process.exit(-1)
})
