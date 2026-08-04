import { describe, expect, it } from 'vitest'

import { findIngredientMatches } from './ingredientMatches'

const ingredients = [
  { id: 1, name: 'Scotch - Islay', tags: 'whiskey smoky' },
  { id: 2, name: 'Scotch - Blended', tags: 'whiskey' },
  { id: 3, name: 'Smoked Salt', tags: 'seasoning smoky' },
  { id: 4, name: 'Lemon Juice', tags: 'citrus sour' },
]

describe('findIngredientMatches', () => {
  it('returns no arbitrary suggestions until the user enters a search', () => {
    expect(findIngredientMatches(ingredients, '  ')).toEqual({ matches: [], total: 0 })
  })

  it('ranks exact and prefix name matches ahead of tag matches', () => {
    expect(findIngredientMatches(ingredients, 'scotch').matches.map(({ id }) => id)).toEqual([2, 1])
    expect(findIngredientMatches(ingredients, 'smok').matches.map(({ id }) => id)).toEqual([3, 1])
  })

  it('reports the full match count while limiting displayed results', () => {
    expect(findIngredientMatches(ingredients, 'whiskey', 1)).toEqual({
      matches: [ingredients[1]],
      total: 2,
    })
  })
})
