import 'dotenv/config'

export const cleanupEditorFixtures = async (recipeNames: string[], ingredientNames: string[]) => {
  const { dbAdmin } = await import('../src/server/db')

  try {
    const recipes = await dbAdmin.recipe.findMany({
      where: { name: { in: recipeNames } },
      select: { id: true },
    })
    const recipeIds = recipes.map(({ id }) => id)

    if (recipeIds.length > 0) {
      await dbAdmin.recipeIngredient.deleteMany({ where: { recipeId: { in: recipeIds } } })
      await dbAdmin.recipe.deleteMany({ where: { id: { in: recipeIds } } })
    }

    await dbAdmin.ingredient.deleteMany({ where: { name: { in: ingredientNames } } })
  } finally {
    await dbAdmin.$disconnect()
  }
}
