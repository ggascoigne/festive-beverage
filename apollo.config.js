module.exports = {
  client: {
    includes: ['./src/**/*.ts', './src/**/*.tsx'],
    excludes: ['./src/client/resolvers/*.tsx'],
    service: {
      name: 'fest-bev',
      localSchemaFile: './graphql-schema.json',
      // url: 'http://localhost:40001/graphql'
    },
  },
}
