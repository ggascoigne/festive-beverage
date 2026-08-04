import { describe, expect, it, vi } from 'vitest'

import { drinksRouter } from './drinks'

describe('drinksRouter row-level security context', () => {
  it('creates an ingredient on the transaction that carries the authenticated user identity', async () => {
    const createdIngredient = {
      id: 42,
      name: 'Scotch - Islay',
      tags: 'whiskey',
      description: null,
      sort: null,
    }
    const transaction = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      ingredient: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue(createdIngredient),
      },
    }
    const db = {
      $transaction: vi.fn(async (operation: (client: typeof transaction) => Promise<unknown>) =>
        operation(transaction)
      ),
      ingredient: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi
          .fn()
          .mockRejectedValue(new Error('new row violates row-level security policy for table "ingredient"')),
      },
    }
    const caller = drinksRouter.createCaller({
      db,
      session: {
        user: {
          sub: 'auth0|test-user',
          userId: 1,
          roles: ['ROLE_ADMIN'],
        },
      },
      userId: 1,
      isAdmin: true,
    } as never)

    await expect(
      caller.createIngredient({
        name: createdIngredient.name,
        tags: createdIngredient.tags,
        description: null,
        sort: null,
      })
    ).resolves.toEqual(createdIngredient)

    expect(db.$transaction).toHaveBeenCalledOnce()
    expect(transaction.$executeRaw).toHaveBeenCalledTimes(2)
    expect(transaction.ingredient.create).toHaveBeenCalledOnce()
    expect(db.ingredient.create).not.toHaveBeenCalled()
  })
})
