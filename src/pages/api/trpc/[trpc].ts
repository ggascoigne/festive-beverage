import { createNextApiHandler } from '@trpc/server/adapters/next'

import { isDev } from '#env'
import { createTRPCContext } from '#server/api/context'
import { appRouter } from '#server/api/root'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: isDev
    ? ({ path, error }) => {
        console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
      }
    : undefined,
})
