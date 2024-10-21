import { env, safeConnectionString } from '#env'

const knexConfig = {
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations',
    loadExtensions: ['.js', '.cjs', '.mjs'],
  },
  client: 'pg',
  connection: {
    connectionString: env.ADMIN_DATABASE_URL,
    charset: 'utf8',
    dateStrings: true,
    timezone: 'UTC',
  },
  acquireConnectionTimeout: 5000,
}

console.log(`using: ${safeConnectionString(env.ADMIN_DATABASE_URL)}`)

export default knexConfig
