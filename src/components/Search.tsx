import { Autocomplete, TextField } from '@mui/material'
import React, { PropsWithChildren, ReactElement, useMemo } from 'react'
import Zet from 'zet'

import { GetAllDrinksQuery, useGetAllDrinksQuery, useGetAllIngredientsQuery } from '../client'
import { notEmpty } from '@/utils'

interface SearchProps {
  onChange: any
  value: string[]
  allDrinks: GetAllDrinksQuery
}
export function Search({ onChange, value, allDrinks }: PropsWithChildren<SearchProps>): ReactElement | null {
  const { data: ingredients } = useGetAllIngredientsQuery()
  const { data: drinks } = useGetAllDrinksQuery(undefined, { staleTime: 60 * 60 * 1000, initialData: allDrinks })

  const names = useMemo(() => {
    const set = new Zet<string>(
      ingredients?.ingredients?.nodes
        ?.flatMap((n) => (n?.tags ? [n?.name, ...n.tags.split(' ')] : [n?.name]))
        .filter(notEmpty)
    ).union(new Zet(drinks?.recipes?.nodes?.map((r) => r?.name).filter(notEmpty)))
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
