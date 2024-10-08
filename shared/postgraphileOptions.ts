import PgOrderByRelatedPlugin from '@graphile-contrib/pg-order-by-related'
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector'
import PgFulltextFilterPlugin from '@pyramation/postgraphile-plugin-fulltext-filter'
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'

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
