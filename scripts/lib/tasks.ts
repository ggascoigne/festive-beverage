import fs from 'fs'
import os from 'os'
import path from 'path'

import debug from 'debug'
import type { Listr, ListrTask, ListrTaskWrapper } from 'listr2'

import { dumpDatabaseTask, restoreDatabaseTask } from './importUtils'
import { createCleanDb, resetOwner } from './scriptUtils'

import { certs } from '../../src/shared/dbCerts'

import type { EnvType } from '@/env'
import { env, parsePostgresConnectionString, safeConnectionString } from '@/env'

const log = debug('script:tasks')
const filename = path.join(os.platform() === 'win32' ? os.tmpdir() : '/tmp', 'rds-cert.pem')

export type TaskContext = {
  env?: EnvType
}

export const writeCertsTask: ListrTask = {
  title: `Writing RDS cert`,
  task: (ctx: TaskContext, task: ListrTaskWrapper<TaskContext, any, any>) => {
    const environ = ctx?.env ?? env
    if (!environ.DATABASE_SSL_CERT) {
      return task.skip('Persisting cert: skipped')
    } else {
      const certName = path.basename(environ.DATABASE_SSL_CERT ?? '', '.pem')
      log('certName', certName)
      // eslint-disable-next-line no-prototype-builtins
      if (!certs.hasOwnProperty(certName)) {
        throw new Error(`SSL was enabled, but the named cert, '${certName}' is not installed.`)
      }
      fs.writeFileSync(filename, certs[certName]!)
      log(`Wrote ${environ.DATABASE_SSL_CERT} to ${filename}`)
      return Promise.resolve(`Persisting cert: ${filename}`)
    }
  },
}

export const createCleanDbTask: ListrTask = {
  title: `Cleaning database`,
  task: async (ctx: TaskContext) => {
    const environ = ctx?.env ?? env
    const { user: targetUser, password: targetUserPassword } = parsePostgresConnectionString(environ.DATABASE_URL)
    await createCleanDb(environ.ADMIN_DATABASE_URL, targetUser!, targetUserPassword!, false)
    return Promise.resolve(`Recreating database ${safeConnectionString(environ.ADMIN_DATABASE_URL)}`)
  },
}

export const resetOwnerTask = {
  title: `Resetting database owner`,
  task: async (ctx: TaskContext) => {
    const environ = ctx?.env ?? env
    const { user: targetUser } = parsePostgresConnectionString(environ.DATABASE_URL)
    await resetOwner(environ.ADMIN_DATABASE_URL, targetUser!, false)
    return Promise.resolve(`Reset owner on ${safeConnectionString(environ.ADMIN_DATABASE_URL)}`)
  },
}

export const debugTask: ListrTask = {
  title: `debug`,
  task: (ctx: TaskContext) => {
    console.log('context', ctx)
  },
}

export const copyDatabaseTaskFactory =
  (source: EnvType, dest: EnvType) => async (ctx: TaskContext, task: ListrTaskWrapper<TaskContext, any, any>) =>
    task.newListr<TaskContext>(
      [
        {
          title: `Export source database`,
          task: (_ctx2, task2): Listr =>
            task2.newListr<TaskContext>([writeCertsTask, dumpDatabaseTask], {
              ctx: { env: source },
            }),
        },
        {
          title: `Configure destination database`,
          task: (_ctx2, task2): Listr =>
            task2.newListr<TaskContext>([writeCertsTask, createCleanDbTask, restoreDatabaseTask, resetOwnerTask], {
              ctx: { env: dest },
            }),
        },
      ],
      {
        rendererOptions: {
          // You can configure more verbose output here to ensure nothing is hidden
          collapse: false, // Prevents collapsing of completed tasks
          showErrorMessage: true, // Ensures that errors aren't masked
          showSubtasks: true, // Show all subtasks if you have nested tasks
        },
        exitOnError: true,
        concurrent: false,
      }
    )
