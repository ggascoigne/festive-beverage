interface SearchableIngredient {
  name: string
  tags: string | null
}

interface IngredientMatches<T> {
  matches: T[]
  total: number
}

const getMatchRank = (ingredient: SearchableIngredient, normalizedQuery: string) => {
  const normalizedName = ingredient.name.toLocaleLowerCase()
  if (normalizedName === normalizedQuery) return 0
  if (normalizedName.startsWith(normalizedQuery)) return 1
  if (normalizedName.includes(normalizedQuery)) return 2

  const normalizedTags = ingredient.tags?.toLocaleLowerCase().split(/\s+/).filter(Boolean) ?? []
  if (normalizedTags.some((tag) => tag === normalizedQuery)) return 3
  if (normalizedTags.some((tag) => tag.startsWith(normalizedQuery))) return 4
  if (normalizedTags.some((tag) => tag.includes(normalizedQuery))) return 5

  return undefined
}

export const findIngredientMatches = <T extends SearchableIngredient>(
  ingredients: readonly T[],
  query: string,
  limit = 12
): IngredientMatches<T> => {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) {
    return { matches: [], total: 0 }
  }

  const rankedMatches = ingredients.flatMap((ingredient) => {
    const rank = getMatchRank(ingredient, normalizedQuery)
    return rank === undefined ? [] : [{ ingredient, rank }]
  })

  rankedMatches.sort(
    (left, right) => left.rank - right.rank || left.ingredient.name.localeCompare(right.ingredient.name)
  )

  return {
    matches: rankedMatches.slice(0, limit).map(({ ingredient }) => ingredient),
    total: rankedMatches.length,
  }
}
