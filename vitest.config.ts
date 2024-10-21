// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    globals: true,
  },
})
