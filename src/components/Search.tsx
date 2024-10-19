import React, { PropsWithChildren, ReactElement, useMemo } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { notEmpty } from '#utils'
import { api } from '#utils/api.ts'

interface SearchProps {
  onChange: any
  value: string[]
}
export function Search({ onChange, value }: PropsWithChildren<SearchProps>): ReactElement | null {
  const { data: ingredients } = api.drinks.getAllIngredients.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
  const { data: drinks } = api.drinks.getAllDrinks.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const names = useMemo(() => {
    const set = new Set<string>(
      ingredients?.flatMap((n) => (n?.tags ? [n?.name, ...n.tags.split(' ')] : [n?.name])).filter(notEmpty)
    ).union(new Set(drinks?.map((r) => r?.name).filter(notEmpty)))
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
