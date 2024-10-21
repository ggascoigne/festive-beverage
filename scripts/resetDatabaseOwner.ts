#!/usr/bin/env node_modules/.bin/tsx
import chalk from 'chalk'
import { Listr } from 'listr2'

import { getPostgresArgs, resetOwner } from './shared/scriptUtils'

import { config } from '../src/shared/config'

import { parsePostgresConnectionString } from '#env'

const { user: targetUser } = parsePostgresConnectionString(config.userDatabase)

console.log(chalk.bold.green('Using'), getPostgresArgs(config.rootDatabase))

const tasks = new Listr([
  {
    title: `resetting database owner for ${targetUser}`,
    task: () => resetOwner(config.rootDatabase, targetUser!, false),
  },
])

tasks.run().catch((reason: any) => {
  console.error(chalk.bold.red('error detected'))
  console.error(reason)
  process.exit(-1)
})
