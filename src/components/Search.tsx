import { Autocomplete, TextField } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React, { PropsWithChildren, ReactElement, useMemo } from 'react'
import Zet from 'zet'

import { useGetAllDrinksQuery, useGetAllIngredientsQuery } from '../client'
import { notEmpty } from '../utils'

interface SearchProps {
  onChange: any
  value: string[]
}

const useStyles = makeStyles({
  search: {
    paddingBottom: 12,
  },
})

export function Search({ onChange, value }: PropsWithChildren<SearchProps>): ReactElement | null {
  const classes = useStyles()
  const { data: ingredients } = useGetAllIngredientsQuery()
  const { data: drinks } = useGetAllDrinksQuery()

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
      className={classes.search}
      options={names}
      freeSolo
      multiple
      value={value}
      renderOption={(ingredient) => <span>{ingredient || ''}</span>}
      fullWidth
      renderInput={(params) => <TextField {...params} label='Search' variant='outlined' />}
      onChange={(e, value) => {
        onChange(value)
      }}
    />
  )
}
