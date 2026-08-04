import { TRPCError } from '@trpc/server'
import Fraction from 'fraction.js'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

const recipeInclude = {
  recipeIngredients: {
    orderBy: { id: 'asc' },
    include: {
      ingredient: true,
      unit: true,
    },
  },
} as const

type SerializedUnit<T extends { asMl: { toString(): string } | null }> = Omit<T, 'asMl'> & {
  asMl: string | null
}

type SerializedRecipeIngredient<
  T extends {
    amount: { toString(): string } | null
    unit: { asMl: { toString(): string } | null }
  },
> = Omit<T, 'amount' | 'unit'> & {
  amount: string | null
  unit: SerializedUnit<T['unit']>
}

type SerializedRecipe<
  T extends {
    recipeIngredients: Array<{
      amount: { toString(): string } | null
      unit: { asMl: { toString(): string } | null }
    }>
  },
> = Omit<T, 'recipeIngredients'> & {
  recipeIngredients: Array<SerializedRecipeIngredient<T['recipeIngredients'][number]>>
}

const serializeUnit = <T extends { asMl: { toString(): string } | null }>(unit: T): SerializedUnit<T> => ({
  ...unit,
  asMl: unit.asMl?.toString() ?? null,
})

const serializeRecipeIngredient = <
  T extends { amount: { toString(): string } | null; unit: { asMl: { toString(): string } | null } },
>(
  ingredient: T
): SerializedRecipeIngredient<T> => ({
  ...ingredient,
  amount: ingredient.amount?.toString() ?? null,
  unit: serializeUnit(ingredient.unit),
})

const serializeRecipe = <
  T extends {
    recipeIngredients: Array<{ amount: { toString(): string } | null; unit: { asMl: { toString(): string } | null } }>
  },
>(
  recipe: T
): SerializedRecipe<T> => ({
  ...recipe,
  recipeIngredients: recipe.recipeIngredients.map(serializeRecipeIngredient),
})

const nullableTrimmedString = (max?: number) => {
  let schema = z.string().trim()
  if (max) {
    schema = schema.max(max)
  }
  return schema.nullish().transform((value) => {
    const trimmed = value?.trim()
    if (!trimmed) {
      return null
    }
    return trimmed
  })
}

const nullableInt = z
  .number()
  .int()
  .nullish()
  .transform((value) => value ?? undefined)

const nullableAmount = z
  .string()
  .trim()
  .min(1)
  .max(32)
  .refine(
    (value) => {
      try {
        // Accept decimals and common fractions such as "1/2" or "1 1/2".
        const parsed = new Fraction(value)
        return Number.isFinite(parsed.valueOf())
      } catch {
        return false
      }
    },
    {
      message: 'Amount must be a number or fraction.',
    }
  )
  .transform((value) => new Fraction(value).valueOf().toString())
  .nullish()
  .transform((value) => value ?? null)

const ingredientInputSchema = z.object({
  name: z.string().trim().min(1).max(128),
  tags: nullableTrimmedString(128),
  description: nullableTrimmedString(),
  sort: nullableInt,
})

const recipeIngredientInputSchema = z.object({
  ingredientId: z.number().int().positive(),
  unitId: z.number().int().positive(),
  amount: nullableAmount,
  modifier: nullableTrimmedString(32),
})

const recipeInputSchema = z.object({
  name: z.string().trim().min(1).max(128),
  description: nullableTrimmedString(),
  instructions: nullableTrimmedString(),
  glass: nullableTrimmedString(65),
  garnish: nullableTrimmedString(65),
  source: nullableTrimmedString(128),
  recipeIngredients: z.array(recipeIngredientInputSchema).min(1),
})

const createRecipeInputSchema = recipeInputSchema

const updateRecipeInputSchema = recipeInputSchema.extend({
  id: z.number().int().positive(),
})

const toIngredientText = (
  ingredients: Array<{
    name: string
    tags: string | null
  }>
) => {
  const tokens = [
    ...ingredients.map((ingredient) => ingredient.name.trim()),
    ...ingredients.flatMap((ingredient) => ingredient.tags?.split(/\s+/) ?? []),
  ].filter(Boolean)

  return tokens.join(' ')
}

const getIngredientText = async (
  ctx: {
    db: {
      ingredient: {
        findMany: (args: {
          where: { id: { in: number[] } }
          select: { id: true; name: true; tags: true }
          orderBy: { id: 'asc' }
        }) => Promise<Array<{ id: number; name: string; tags: string | null }>>
      }
    }
  },
  recipeIngredients: Array<z.infer<typeof recipeIngredientInputSchema>>
) => {
  const ingredientIds = [...new Set(recipeIngredients.map((ingredient) => ingredient.ingredientId))]
  const ingredients = await ctx.db.ingredient.findMany({
    where: {
      id: {
        in: ingredientIds,
      },
    },
    select: {
      id: true,
      name: true,
      tags: true,
    },
    orderBy: {
      id: 'asc',
    },
  })

  if (ingredients.length !== ingredientIds.length) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'One or more selected ingredients no longer exist.',
    })
  }

  const ingredientMap = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]))
  return toIngredientText(
    recipeIngredients.map((ingredient) => {
      const resolved = ingredientMap.get(ingredient.ingredientId)
      if (!resolved) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'One or more selected ingredients no longer exist.',
        })
      }
      return resolved
    })
  )
}

const getRecipeMutationData = async (
  ctx: {
    db: {
      ingredient: {
        findMany: (args: {
          where: { id: { in: number[] } }
          select: { id: true; name: true; tags: true }
          orderBy: { id: 'asc' }
        }) => Promise<Array<{ id: number; name: string; tags: string | null }>>
      }
    }
  },
  input: z.infer<typeof recipeInputSchema>
) => ({
  name: input.name.trim(),
  description: input.description,
  instructions: input.instructions,
  glass: input.glass,
  garnish: input.garnish,
  source: input.source,
  ingredientText: await getIngredientText(ctx, input.recipeIngredients),
  recipeIngredients: {
    create: input.recipeIngredients.map((ingredient) => ({
      ingredientId: ingredient.ingredientId,
      unitId: ingredient.unitId,
      amount: ingredient.amount,
      modifier: ingredient.modifier,
    })),
  },
})

export const drinksRouter = createTRPCRouter({
  getAllDrinks: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.recipe.findMany({
      orderBy: { name: 'asc' },
      include: recipeInclude,
    })

    return result.map(serializeRecipe)
  }),

  getAllIngredients: publicProcedure.query(async ({ ctx }) =>
    ctx.db.ingredient.findMany({
      orderBy: [{ sort: 'asc' }, { name: 'asc' }],
    })
  ),

  getAllUnits: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.unit.findMany({
      orderBy: [{ sort: 'asc' }, { name: 'asc' }],
    })

    return result.map(serializeUnit)
  }),

  createIngredient: protectedProcedure.input(ingredientInputSchema).mutation(async ({ ctx, input }) => {
    const existingIngredient = await ctx.db.ingredient.findFirst({
      where: {
        name: {
          equals: input.name,
          mode: 'insensitive',
        },
      },
    })

    if (existingIngredient) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `Ingredient "${input.name}" already exists.`,
      })
    }

    return ctx.db.ingredient.create({
      data: {
        name: input.name.trim(),
        tags: input.tags,
        description: input.description,
        ...(input.sort !== undefined ? { sort: input.sort } : {}),
      },
    })
  }),

  createRecipe: protectedProcedure.input(createRecipeInputSchema).mutation(async ({ ctx, input }) => {
    const recipe = await ctx.db.recipe.create({
      data: await getRecipeMutationData(ctx, input),
      include: recipeInclude,
    })

    return serializeRecipe(recipe)
  }),

  updateRecipe: protectedProcedure.input(updateRecipeInputSchema).mutation(async ({ ctx, input }) => {
    const { id, ...recipeInput } = input

    const recipe = await ctx.db.recipe.update({
      where: { id },
      data: {
        ...(await getRecipeMutationData(ctx, recipeInput)),
        recipeIngredients: {
          deleteMany: {},
          create: recipeInput.recipeIngredients.map((ingredient) => ({
            ingredientId: ingredient.ingredientId,
            unitId: ingredient.unitId,
            amount: ingredient.amount,
            modifier: ingredient.modifier,
          })),
        },
      },
      include: recipeInclude,
    })

    return serializeRecipe(recipe)
  }),
})
