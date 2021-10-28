import { TextField, makeStyles } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { PropsWithChildren, ReactElement, useMemo } from 'react'
import Zet from 'zet'

import { useGetAllIngredientsQuery } from '../client'
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
  const { data } = useGetAllIngredientsQuery()

  const names = useMemo(() => {
    const set = new Zet<string>(
      data?.ingredients?.nodes?.flatMap((n) => (n?.tags ? [n?.name, ...n.tags.split(' ')] : [n?.name])).filter(notEmpty)
    )
    return Array.from(set).sort((a, b) => -b.localeCompare(a)) ?? []
  }, [data])

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
