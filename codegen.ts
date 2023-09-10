/* eslint-disable import/no-extraneous-dependencies */
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql-schema.graphql',
  documents: './src/graphql/*.graphql',
  config: {
    scalars: {
      Datetime: 'string',
      JSON: '{ [key: string]: any }',
    },
    nonOptionalTypename: true,
  },
  generates: {
    'src/client/graphql/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
}

export default config
