import { test, expect } from '@playwright/test'

test('homepage renders without blowing up', async ({ page }) => {
  const pageErrors: Error[] = []
  page.on('pageerror', (error) => {
    pageErrors.push(error)
  })

  await page.goto('/')

  await expect(page).toHaveTitle(/Festive Beverage/)
  await expect(page.getByRole('link', { name: 'Festive Beverage' })).toBeVisible()
  await expect(page.locator('main')).toBeVisible()
  await expect(page.getByLabel('Search')).toBeVisible()
  await expect(page.getByText('tRPC Error')).toHaveCount(0)
  expect(pageErrors).toEqual([])
})
