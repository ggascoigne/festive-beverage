import { configs } from '@ggascoigne/eslint-config'

const localIgnores = [
  {
    name: 'local-ignores',
    ignores: [
      '.{next,vercel}',
      'src/generated',
      'next-env.d.ts',
      'playwright-report',
    ],
  },
]

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...configs.globalIgnores,
  ...localIgnores,
  ...configs.recommendedJs,
  // ...configs.slow,
  ...configs.officialReact,
  ...configs.react,
  ...configs.recommendedTs,
  {
    name: 'local overrides',
    rules: {
      'no-console': ['off'],
      '@typescript-eslint/no-empty-function': 'off',
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
