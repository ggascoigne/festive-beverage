import debug from 'debug'
import { config as dotenvConfig } from 'dotenv'
import { ListrTaskWrapper, ListrTask } from 'listr2'
import { temporaryFile } from 'tempy'
import { $ } from 'zx'

import { getPostgresArgs } from './scriptUtils'
import { TaskContext } from './tasks'

import { EnvType, processEnv, parsePostgresConnectionString } from '#env'

const tracing = !!process.env.DEBUG

const log = debug('importUtils')

const $$ = $({
  verbose: true,
})

export const loadEnv = (path: string): EnvType => {
  const obj = {}
  dotenvConfig({
    path,
    processEnv: obj,
  })
  return processEnv(obj as any)
}

let outputFileName

export const dumpDatabaseTask: ListrTask = {
  title: `Dumping database`,
  task: async (ctx: TaskContext, task: ListrTaskWrapper<TaskContext, any, any>) => {
    const logger = log.extend('dumpDatabaseTask')
    const environ = ctx.env!

    const $source = $$({
      verbose: tracing,
      env: {
        ...environ,
        ...process.env,
        NODE_ENV: 'production',
      },
    })

    const name = temporaryFile()
    const { database } = parsePostgresConnectionString(environ.ADMIN_DATABASE_URL)
    // eslint-disable-next-line no-param-reassign
    task.title = `dumping database ${database}`
    logger(`dumping database ${database} to ${name}`)
    await $source`/usr/local/bin/pg_dump ${getPostgresArgs(environ.ADMIN_DATABASE_URL)} -Fc --schema=public > ${name}`
    outputFileName = name
  },
}

export const restoreDatabaseTask: ListrTask = {
  title: `Restoring database`,
  task: async (ctx: TaskContext, task: ListrTaskWrapper<TaskContext, any, any>) => {
    const logger = log.extend('restoreDatabaseTask')
    const environ = ctx.env!
    const { host, database, password, port, user } = parsePostgresConnectionString(environ.ADMIN_DATABASE_URL)

    const $dest = $$({
      verbose: tracing,
      env: {
        ...environ,
        ...process.env,
        NODE_ENV: 'production', // ensure that the script doesn't load dotenv and prefers the environment
        PGHOST: host,
        PGPORT: `${port}`,
        PGUSER: user,
        PGPASSWORD: password,
      },
    })

    // eslint-disable-next-line no-param-reassign
    task.title = `Restoring database ${database}`
    logger(`Restoring database ${database} from ${outputFileName!}`)

    await $dest`/usr/local/bin/pg_restore \
      -j4 \
      -d ${database} \
      --no-privileges \
      --no-owner \
      --clean \
      --if-exists \
      ${outputFileName!}`
  },
}
