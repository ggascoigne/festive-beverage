/* eslint-disable no-underscore-dangle */
import path from 'path'

import { certs } from '../src/shared/dbCerts'

import { env } from '#env'

const ssl = env.DATABASE_SSL === '1'

const certName = path.basename(env.DATABASE_SSL_CERT ?? '', '.pem')
// eslint-disable-next-line no-prototype-builtins
if (ssl && !certs.hasOwnProperty(certName)) {
  throw new Error(`SSL was enabled, but the named cert, ${certName} is not installed.`)
}

const ca = ssl ? certs[certName] : ''

const knexConfig = {
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations',
    loadExtensions: ['.js', '.cjs', '.mjs'],
  },
  client: 'pg',
  connection: {
    host: env.DATABASE_HOST,
    database: env.DATABASE_NAME,
    user: env.DATABASE_ADMIN,
    password: env.DATABASE_ADMIN_PASSWORD ?? '',
    port: parseInt(env.DATABASE_PORT ?? '', 10),
    ssl:
      env.DATABASE_SSL === '1'
        ? {
            rejectUnauthorized: true,
            sslmode: 'verify-all',
            ca,
          }
        : false,
    charset: 'utf8',
    dateStrings: true,
    timezone: 'UTC',
  },
  acquireConnectionTimeout: 5000,
}

const config = knexConfig.connection
console.log(`using: postgres://${config.user}:*****@${config.host}:${config.port}/${config.database}`)

export default knexConfig
