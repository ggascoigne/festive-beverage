/* eslint-disable no-underscore-dangle */

import fs from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env') })

const knexConfig = {
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations',
    loadExtensions: ['.js', '.cjs', '.mjs'],
  },
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_ADMIN,
    password: process.env.DATABASE_ADMIN_PASSWORD || '',
    port: parseInt(process.env.DATABASE_PORT ?? '', 10),
    ssl:
      process.env.DATABASE_SSL === '1'
        ? {
            rejectUnauthorized: true,
            sslmode: 'verify-all',
            ca: fs.readFileSync(resolve(__dirname, `../shared/${process.env.DATABASE_SSL_CERT}`) || '').toString(),
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
