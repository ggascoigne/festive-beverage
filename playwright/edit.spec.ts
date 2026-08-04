import { expect, test } from '@playwright/test'

import { authenticateEditorUser } from './auth'
import { cleanupEditorFixtures } from './cleanup'

const runId = `${Date.now()}-${process.pid}`
const ingredientName = `Playwright Ingredient ${runId}`
const studioIngredientName = `Playwright Studio Ingredient ${runId}`
const recipeName = `Playwright Recipe ${runId}`

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ context }) => {
  await authenticateEditorUser(context)
})

test.afterAll(async () => {
  await cleanupEditorFixtures([recipeName], [ingredientName, studioIngredientName])
})

test('authenticated user can open the recipe editor', async ({ page }) => {
  await page.goto('/edit')

  await expect(page.getByRole('button', { name: 'New Recipe' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Recipe Library' })).toBeVisible()
})

test('user can add an ingredient from Ingredient Studio', async ({ page }) => {
  await page.goto('/edit')

  await page.getByRole('tab', { name: 'Ingredient Studio' }).click()
  await page.getByLabel('Ingredient Name').fill(studioIngredientName)
  await page.getByLabel('Tags').fill('playwright studio')
  await page.getByRole('button', { name: 'Save Ingredient' }).click()

  await expect(page.getByRole('alert').filter({ hasText: `Saved ingredient "${studioIngredientName}".` })).toBeVisible()
})

test('user can create an ingredient inline and create and update a recipe', async ({ page }) => {
  await page.goto('/edit')

  await page.getByRole('button', { name: 'New Recipe' }).click()
  await page.getByLabel('Recipe Name').fill(recipeName)
  await page.getByLabel('Ingredient').fill(ingredientName)
  await page.getByRole('button', { name: `Create "${ingredientName}"` }).click()

  const createIngredientDialog = page.getByRole('dialog', { name: 'Create Ingredient' })
  await expect(createIngredientDialog.getByLabel('Ingredient Name')).toHaveValue(ingredientName)
  await createIngredientDialog.getByLabel('Tags').fill('playwright citrus')
  await createIngredientDialog.getByRole('button', { name: 'Save Ingredient' }).click()
  await expect(page.getByRole('alert').filter({ hasText: `Saved ingredient "${ingredientName}".` })).toBeVisible()
  await expect(page.getByLabel('Ingredient')).toHaveValue(ingredientName)

  await page.getByLabel('Amount').fill('1 1/2')
  await page.getByLabel('Unit').selectOption({ label: 'oz' })
  await page.getByLabel('Modifier').fill('fresh')
  await page.getByRole('button', { name: 'Create Recipe' }).click()
  await expect(page.getByRole('alert').filter({ hasText: `Created recipe "${recipeName}".` })).toBeVisible()

  await page.getByLabel('Description').fill('Updated by the authenticated Playwright editor flow.')
  await page.getByRole('button', { name: 'Save Recipe Changes' }).click()
  await expect(page.getByRole('alert').filter({ hasText: `Saved changes to "${recipeName}".` })).toBeVisible()

  await page.goto('/')
  const recipeLibraryEntry = page.getByText(recipeName, { exact: true })
  await expect(recipeLibraryEntry).toBeVisible()
  await recipeLibraryEntry.click()
  await page.getByRole('link', { name: 'Edit Recipe' }).click()
  await expect(page.getByLabel('Description')).toHaveValue('Updated by the authenticated Playwright editor flow.')
})

test('phone workflow switches between the recipe library and a focused editor', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/edit')

  await expect(page.getByText('Catalog control room')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'New Recipe' })).toBeVisible()

  const recipeLibrary = page.getByRole('list', { name: 'Recipe library' })
  const firstRecipe = recipeLibrary.getByRole('button').first()
  const firstRecipeName = (await firstRecipe.innerText()).trim()
  await firstRecipe.click()

  await expect(page.getByRole('button', { name: 'Back to Recipe Library' })).toBeVisible()
  await expect(page.getByText('Recipe Workspace')).toHaveCount(0)
  await expect(page.getByLabel('Recipe Name')).toHaveValue(firstRecipeName)

  const ingredient = page.getByLabel('Ingredient').first()
  const amount = page.getByLabel('Amount').first()
  const unit = page.getByLabel('Unit').first()
  const modifier = page.getByLabel('Modifier').first()
  const deleteButtons = page.getByRole('button', { name: 'Delete recipe line' })
  const initialIngredientCount = await deleteButtons.count()
  const deleteButton = deleteButtons.first()
  const [ingredientBox, amountBox, unitBox, modifierBox, deleteBox] = await Promise.all([
    ingredient.boundingBox(),
    amount.boundingBox(),
    unit.boundingBox(),
    modifier.boundingBox(),
    deleteButton.boundingBox(),
  ])

  expect(ingredientBox).not.toBeNull()
  expect(amountBox).not.toBeNull()
  expect(unitBox).not.toBeNull()
  expect(modifierBox).not.toBeNull()
  expect(deleteBox).not.toBeNull()
  expect(amountBox!.y).toBeGreaterThan(ingredientBox!.y)
  expect(Math.abs(amountBox!.y - unitBox!.y)).toBeLessThan(6)
  expect(Math.abs(amountBox!.y - modifierBox!.y)).toBeLessThan(6)
  expect(Math.abs(amountBox!.y - deleteBox!.y)).toBeLessThan(6)

  await page.getByRole('button', { name: 'Add Ingredient' }).click()
  await expect(deleteButtons).toHaveCount(initialIngredientCount + 1)
  await deleteButtons.last().click()
  await expect(page.getByRole('dialog', { name: 'Remove ingredient?' })).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(deleteButtons).toHaveCount(initialIngredientCount + 1)

  await deleteButtons.last().click()
  await page.getByRole('button', { name: 'Remove' }).click()
  await expect(deleteButtons).toHaveCount(initialIngredientCount)

  await page.getByRole('button', { name: 'Back to Recipe Library' }).click()
  await expect(page.getByRole('heading', { name: 'Recipe Library' })).toBeVisible()
})
