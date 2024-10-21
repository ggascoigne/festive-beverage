#!/usr/bin/env node_modules/.bin/tsx
import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import { Listr } from 'listr2'

import { certs } from '../src/shared/dbCerts'

import { env } from '#env'

const filename = '/tmp/rds-cert.pem'

const tasks = new Listr([
  {
    title: `Writing RDS cert to ${filename}`,
    task: async () => {
      const certName = path.basename(env.DATABASE_SSL_CERT ?? '', '.pem')
      // eslint-disable-next-line no-prototype-builtins
      if (!certs.hasOwnProperty(certName)) {
        throw new Error(`SSL was enabled, but the named cert, ${certName} is not installed.`)
      }
      fs.writeFileSync(filename, certs[certName]!)
    },
    enabled: () => !!env.DATABASE_SSL_CERT,
  },
])

await tasks.run().catch((reason: any) => {
  console.error(chalk.bold.red('error detected'))
  console.error(reason)
  process.exit(-1)
})
