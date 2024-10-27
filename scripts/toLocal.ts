#!/usr/bin/env node_modules/.bin/tsx
import chalk from 'chalk'
import { Listr } from 'listr2'

import { loadEnv } from './shared/importUtils'
import { TaskContext, copyDatabaseTaskFactory } from './shared/tasks'

const awsEnv = loadEnv('.env.aws')
const localEnv = loadEnv('.env')

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
