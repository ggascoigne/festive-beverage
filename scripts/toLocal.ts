#!/usr/bin/env node_modules/.bin/tsx
import chalk from 'chalk'
import { Listr } from 'listr2'

import type { TaskContext } from './lib'
import { copyDatabaseTaskFactory } from './lib'
import { loadScriptEnv } from './env'

const awsEnv = loadScriptEnv('.env.aws')
const localEnv = loadScriptEnv('.env')

const tasks = new Listr<TaskContext>([
  {
    title: `AWS -> Local`,
    task: copyDatabaseTaskFactory(awsEnv, localEnv),
  },
])

tasks.run().catch((reason: any) => {
  console.error(chalk.bold.red('error detected'))
  console.error(reason)
  process.exit(-1)
})
