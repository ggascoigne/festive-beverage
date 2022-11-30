/* eslint-disable @typescript-eslint/no-shadow */
import { postgraphile } from 'postgraphile'

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import fs from 'fs'
import { getPool, getSchemas, PoolType } from '@/shared/config'
import { options } from '@/shared/postgraphileOptions'
import { isDev } from '@/pages/api/_constants'
import { getUserId, isAdmin } from '@/pages/api/_utils'

// note that the route here is /api/graphql/[:operation] because I like to append the query
// operation name to the path to make debugging the queries easier in Chrome dev tools.

// FYI export DEBUG="postgraphile:postgres*"to access the postgraphile debugging

// /api/graphql
// auth token: optional
// body: graphql query/mutation

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })

// GraphQL route that handles queries
export const graphqlRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.url?.startsWith('/api/graphql')) req.url = '/api/graphql'

  // try {
  //   // force a file access to force next.js to include the files in the serverless bundle
  //   const path = `${process.cwd()}/src/shared`
  //   const _arrayOfFiles = fs.readdirSync(path)
  // } catch (e) {
  //   console.log(e)
  // }

  await runMiddleware(
    req,
    res,
    postgraphile(getPool(PoolType.USER, `${process.cwd()}/src/shared/`), getSchemas(), {
      ...options,
      readCache: `${process.cwd()}/src/shared/postgraphile.cache`,
      pgSettings: (request) => {
        const { user } = getSession(request, res) ?? { user: null }
        const settings: Record<string, any> = {}
        if (user) {
          const admin = isAdmin(user)
          const userId = getUserId(user)
          // string values because pgSettings only groks strings
          settings['user.id'] = `${userId}`
          settings['user.admin'] = `${admin}`
          isDev && console.log(`userId(${userId}) is ${admin ? 'admin' : 'not-admin'}`)
        } else {
          isDev && console.log('not logged in')
        }
        return settings
      },
    })
  )
  res.end()
}

export const config = {
  unstable_includeFiles: [`${process.cwd()}/src/shared/**`],
  api: {
    bodyParser: false,
  },
}

export default graphqlRoute
