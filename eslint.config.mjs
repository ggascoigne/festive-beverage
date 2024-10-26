import { configs } from '@ggascoigne/eslint-config'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...configs.globalIgnores,
  ...configs.recommendedJs,
  // ...configs.slow,
  ...configs.officialReact,
  ...configs.react,
  ...configs.recommendedTs,
  {
    name: 'local overrides',
    rules: {
      'no-console': ['off'],
    },
  },
  {
    files: ['src/client/graphql/fragment-masking.ts'],
    rules: {
      'import/order': 'off',
    },
  },
  {
    files: ['support/**/*.js'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      'func-names': 'off',
    },
  },
]
