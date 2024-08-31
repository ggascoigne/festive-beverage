module.exports = {
  // when changing this, remember that you can run `pnpm eslint --print-config <filename>` to print
  // the existing used config for that path
  extends: '@ggascoigne/eslint-config/ts',
  parserOptions: {
    project: `./tsconfig.json`,
    ecmaVersion: 2024,
  },
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: 'src/client/graphql/fragment-masking.ts',
      rules: {
        'import/order': 'off',
      },
    },
    {
      files: '{api,scripts,shared}/*.{ts,tsx}',
      rules: {
        // this is node.js code, it needs require
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: 'scripts/*.{js,ts}',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: 'support/**/*.js',
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        'func-names': 'off',
      },
    },
  ],
}
