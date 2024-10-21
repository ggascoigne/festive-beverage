import { env, safeConnectionString } from '#env'
import { createTRPCRouter, publicProcedure } from '#server/api/trpc'
import { config } from '#shared/config'

export const configRouter = createTRPCRouter({
  getConfig: publicProcedure.query(async ({ ctx }) => {
    const { isAdmin } = ctx
    const { userDatabase } = config
    const summary = {
      local: !userDatabase.includes('aws'),
      nodeVersion: process.version,
      authDomain: env.AUTH_DOMAIN,
    }
    return isAdmin ? { ...summary, url: safeConnectionString(userDatabase) } : { ...summary }
  }),
})
