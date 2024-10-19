// import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '#server/api/trpc'

export const drinksRouter = createTRPCRouter({
  getAllDrinks: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.recipe.findMany({
      orderBy: { name: 'asc' },
      include: {
        recipeIngredients: {
          include: {
            ingredient: true,
            unit: true,
          },
        },
      },
    })
    return result.map((item) => ({
      ...item,
      recipeIngredients: item.recipeIngredients.map((ingredient) => ({
        ...ingredient,
        amount: ingredient.amount?.toString(),
        unit: {
          ...ingredient.unit,
          asMl: ingredient.unit.asMl?.toString(),
        },
      })),
    }))
  }),
  getAllIngredients: publicProcedure.query(async ({ ctx }) =>
    ctx.db.ingredient.findMany({
      orderBy: { name: 'asc' },
    })
  ),
})
