import { defineConfig, devices } from '@playwright/test'

const isLinux = process.platform === 'linux'

export default defineConfig({
  testDir: './playwright',
  fullyParallel: true,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://localhost:40000',
    viewport: { width: 1440, height: 900 },
    headless: true,
  },
  workers: process.env.CI || isLinux ? 1 : 4,
  reporter: [['dot'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  webServer: {
    command: 'pnpm db:start && pnpm boot && pnpm exec next dev -p 40000',
    url: 'http://localhost:40000',
    reuseExistingServer: true,
    cwd: process.cwd(),
    timeout: 120_000,
  },
})
