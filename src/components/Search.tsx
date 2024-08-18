import React, { PropsWithChildren, ReactElement, useMemo } from 'react'

import { Autocomplete, TextField } from '@mui/material'

import { GetAllDrinksDocument, GetAllDrinksQuery, GetAllIngredientsDocument, useGraphQL } from '@/client'
import { notEmpty } from '@/utils'

interface SearchProps {
  onChange: any
  value: string[]
  allDrinks: GetAllDrinksQuery
}
export function Search({ onChange, value, allDrinks }: PropsWithChildren<SearchProps>): ReactElement | null {
  const { data: ingredients } = useGraphQL(GetAllIngredientsDocument, {
    options: { staleTime: 60 * 60 * 1000, initialData: allDrinks },
  })
  const { data: drinks } = useGraphQL(GetAllDrinksDocument)

  const names = useMemo(() => {
    const set = new Set<string>(
      ingredients?.ingredients?.nodes
        ?.flatMap((n) => (n?.tags ? [n?.name, ...n.tags.split(' ')] : [n?.name]))
        .filter(notEmpty)
    ).union(new Set(drinks?.recipes?.nodes?.map((r) => r?.name).filter(notEmpty)))
    return Array.from(set).sort((a, b) => -b.localeCompare(a)) ?? []
  }, [ingredients, drinks])

  return (
    <Autocomplete
      id='search'
      sx={{ paddingBottom: 1.5 }}
      options={names}
      freeSolo
      multiple
      value={value || []}
      renderOption={(props, ingredient) => (
        <li {...props}>
          <>{ingredient || ''}</>
        </li>
      )}
      fullWidth
      renderInput={(params) => <TextField {...params} label='Search' variant='outlined' />}
      onChange={(e, v) => {
        onChange(v)
      }}
    />
  )
}
