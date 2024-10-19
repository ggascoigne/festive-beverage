import { env } from '#env'
import { createTRPCRouter, publicProcedure } from '#server/api/trpc'
import { config, DbConfig } from '#shared/config'

export const configRouter = createTRPCRouter({
  getConfig: publicProcedure.query(async ({ ctx }) => {
    const { isAdmin } = ctx
    const database: Partial<DbConfig> = { ...config.userDatabase }
    delete database.password
    const summary = {
      local: !database.host?.includes('aws'),
      databaseName: database.database,
      nodeVersion: process.version,
      authDomain: env.AUTH_DOMAIN,
    }
    return isAdmin ? { ...summary, database } : { ...summary }
  }),
})
