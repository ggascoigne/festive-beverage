import { PrismaClient } from '@prisma/client'

import { env, isDev } from '#env'

export const getDbUrl = (type: 'ADMIN' | 'USER', pathToRoot = './') => {
  const {
    DATABASE_HOST: host,
    DATABASE_NAME: database,
    DATABASE_SSL: ssl = false,
    DATABASE_SSL_CERT: sslCert = '',
  } = env
  const port = env.DATABASE_PORT ? parseInt(env.DATABASE_PORT, 10) : undefined
  const user = type === 'ADMIN' ? env.DATABASE_ADMIN : env.DATABASE_USER
  const password = (type === 'ADMIN' ? env.DATABASE_ADMIN_PASSWORD : env.DATABASE_USER_PASSWORD) ?? ''

  const sslChunk = ssl ? `?sslmode=verify-full&ssl=1&sslrootcert=${pathToRoot + sslCert}` : ''
  return `postgres://${user}:${password}@${host}:${port}/${database}${sslChunk}`
}

const createPrismaClient = (type: 'ADMIN' | 'USER') =>
  new PrismaClient({
    log: isDev ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: { url: getDbUrl(type, `${process.cwd()}/shared/`) },
    },
  })

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
  prismaAdmin: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient('USER')
export const dbAdmin = globalForPrisma.prismaAdmin ?? createPrismaClient('ADMIN')

if (isDev) globalForPrisma.prisma = db
if (isDev) globalForPrisma.prismaAdmin = dbAdmin
