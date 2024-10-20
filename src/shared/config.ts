import fs from 'fs'

import pg from 'pg'

import { env } from '#env'

const { Pool } = pg

export const getSchemas = () => (env.DATABASE_SCHEMAS ? env.DATABASE_SCHEMAS.split(',') : ['public'])

export enum PoolType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const getPool = (poolType: PoolType, pathToRoot = './') => {
  const {
    DATABASE_HOST: host,
    DATABASE_NAME: database,
    DATABASE_PORT: port,
    DATABASE_SSL: ssl = false,
    DATABASE_SSL_CERT: sslCert = '',
  } = env
  const user = poolType === 'ADMIN' ? env.DATABASE_ADMIN : env.DATABASE_USER
  const password = (poolType === 'ADMIN' ? env.DATABASE_ADMIN_PASSWORD : env.DATABASE_USER_PASSWORD) ?? ''

  const sslChunk = ssl ? `?sslmode=verify-full&ssl=1&sslrootcert=${sslCert}` : ''
  console.log(`using: postgres://${user}:${password && '*****'}@${host}:${port}/${database}${sslChunk}`)
  return new Pool({
    user,
    host,
    database,
    password,
    port: port ? parseInt(port, 10) : undefined,
    ssl: ssl
      ? {
          rejectUnauthorized: true,
          // @ts-ignore
          sslmode: 'verify-all',
          ca: fs.readFileSync(pathToRoot + sslCert).toString(),
        }
      : false,
  })
}

export type DbConfig = {
  database: string
  user: string
  port: number
  host: string
  password: string
  ssl: boolean
  ssl_cert?: string
}

export type EmailConfig = {
  user: string
  port: number
  host: string
  password: string
}

export const config: { rootDatabase: DbConfig; userDatabase: DbConfig; email: EmailConfig } = {
  rootDatabase: {
    host: env.DATABASE_HOST!,
    database: env.DATABASE_NAME!,
    user: env.DATABASE_ADMIN!,
    password: env.DATABASE_ADMIN_PASSWORD ?? '',
    port: parseInt(env.DATABASE_PORT ?? '', 10),
    ssl: env.DATABASE_SSL === '1',
    ssl_cert: env.DATABASE_SSL_CERT ?? '',
  },
  userDatabase: {
    host: env.DATABASE_HOST!,
    database: env.DATABASE_NAME!,
    user: env.DATABASE_USER!,
    password: env.DATABASE_USER_PASSWORD ?? '',
    port: parseInt(env.DATABASE_PORT ?? '', 10),
    ssl: env.DATABASE_SSL === '1',
    ssl_cert: env.DATABASE_SSL_CERT ?? '',
  },
  email: {
    host: env.SMTP_HOST!,
    user: env.SMTP_USERNAME!,
    password: env.SMTP_PASSWORD ?? '',
    port: parseInt(env.SMTP_PORT ?? '', 10),
  },
}
