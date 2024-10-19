/* eslint-disable @typescript-eslint/no-shadow */
import { handleAuth } from '@auth0/nextjs-auth0'

import { authHandlers } from '#server/auth/index.ts'

export default handleAuth(authHandlers)
