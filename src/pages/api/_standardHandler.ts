import { NextApiRequest, NextApiResponse } from 'next'

export interface Handler {
  (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void): Promise<any>
}

export function combineHandlers(handlers: Array<Handler>) {
  return handlers.reduce(
    (
        parent: (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void,
        fn: (req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void
      ): ((req: NextApiRequest, res: NextApiResponse, next: (err?: any) => void) => void) =>
      (req, res, next) => {
        parent(req, res, (error) => {
          if (error) {
            return next(error)
          }
          return fn(req, res, next)
        })
      },
    (_req: NextApiRequest, _res: NextApiResponse, next: (err?: any) => void) => next()
  )
}

export function withApiHandler(handlers: Handler[]): Handler {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept, Content-Type')
    console.log('in withApiHandler')
    if (req.method === 'OPTIONS') {
      return res.status(200).json({})
    }

    // Note that this is a very specific hack to allow for using the graphql operation name
    // as an api differentiator in the browser network tab
    if (req.url?.startsWith('/api/graphql')) req.url = '/api/graphql'

    const handler = combineHandlers(handlers)
    console.log('combined handlers, calling...')
    try {
      return handler(req, res, (err) => {
        if (err) {
          return res.status(err.status || err.statusCode || 500).json({ errors: [{ message: err.message }] })
        }
        if (!res.writableEnded) {
          if (!res.headersSent) {
            res.statusCode = 404
          }
          res.end(`'${req.url}' not found`)
        }
        return undefined
      })
    } catch (err: any) {
      return res.status(err.status || err.statusCode || 500).json({ errors: [{ message: err.message }] })
    }
  }
}
