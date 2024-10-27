#!/usr/bin/env node_modules/.bin/tsx
import chalk from 'chalk'
import { Listr } from 'listr2'

import { resetOwnerTask } from './shared/tasks'

const tasks = new Listr(resetOwnerTask)

tasks.run().catch((reason: any) => {
  console.error(chalk.bold.red('error detected'))
  console.error(reason)
  process.exit(-1)
})
