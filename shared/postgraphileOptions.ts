/* eslint-disable @typescript-eslint/no-var-requires */
const PgOrderByRelatedPlugin = require('@graphile-contrib/pg-order-by-related')
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector')
const PgFulltextFilterPlugin = require('@pyramation/postgraphile-plugin-fulltext-filter')
const ConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')

export const options = {
  dynamicJson: true,
  cors: false,
  graphiql: false,
  graphqlRoute: '/api/graphql',
  // externalUrlBase: `/${process.env.AWS_STAGE}`,
  absoluteRoutes: false,
  disableQueryLog: process.env.NODE_ENV === 'production',
  enableCors: false,
  ignoreRBAC: false,
  showErrorStack: false,
  watchPg: false,
  appendPlugins: [PgSimplifyInflectorPlugin, ConnectionFilterPlugin, PgOrderByRelatedPlugin, PgFulltextFilterPlugin],
}
