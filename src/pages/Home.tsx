import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useQueryStringKey } from 'use-route-as-state'

import { useGetAllDrinksQuery, useGetDrinkByIdQuery, useGetFilteredDrinksQuery } from '../client'
import { useAuth } from '../components/Auth'
import { Drink, DrinkCard } from '../components/DrinkCard'
import { GraphQLError } from '../components/GraphQLError'
import { Loader } from '../components/Loader'
import { Page } from '../components/Page'
import { Search } from '../components/Search'
import { notEmpty } from '../utils'
import { NotLoggedIn } from './NotLoggedIn'

const DrinkList: React.FC<{ drinks: Drink[] }> = ({ drinks }) => (
  <Grid container spacing={3}>
    {drinks?.map((d, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
        <DrinkCard drink={d} />
      </Grid>
    ))}
  </Grid>
)

const AllResults: React.FC = () => {
  const { data, error } = useGetAllDrinksQuery({}, { staleTime: 5 * 60 * 1000 })
  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined)
  useEffect(() => {
    setDrinks(data?.recipes?.nodes?.filter(notEmpty))
  }, [data])

  if (error) {
    return <GraphQLError error={error} />
  }
  if (!drinks) {
    return <Loader />
  }
  return <DrinkList drinks={drinks} />
}

const SearchResults: React.FC<{ search: string[] }> = ({ search }) => {
  const { data, error } = useGetFilteredDrinksQuery({ value: search.join(' ') }, { staleTime: 5 * 60 * 1000 })
  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined)

  useEffect(() => {
    setDrinks(data?.recipes?.nodes?.filter(notEmpty))
  }, [data])

  if (error) {
    return <GraphQLError error={error} />
  }
  if (!drinks) {
    return <Loader />
  }
  return <DrinkList drinks={drinks} />
}

const SingleDrink: React.FC<{ drinkId: number }> = ({ drinkId }) => {
  const { data, error } = useGetDrinkByIdQuery({ id: drinkId }, { staleTime: 5 * 60 * 1000 })

  if (error) {
    return <GraphQLError error={error} />
  }
  if (!data) {
    return <Loader />
  }
  return <DrinkCard drink={data.recipe!} />
}

const LoggedIn = () => {
  const [search, setSearch] = useQueryStringKey('ingredient')
  const [drink] = useQueryStringKey('drink')
  const hasSearch = (search as string[])?.length > 0 || false

  if (drink) {
    return (
      <Page title='Festive Beverages' hideTitle>
        <SingleDrink drinkId={parseInt(drink as string)} />
      </Page>
    )
  } else {
    return (
      <Page title='Festive Beverages' hideTitle>
        <Search value={search as string[]} onChange={setSearch} />
        {hasSearch ? <SearchResults search={search as string[]} /> : <AllResults />}
      </Page>
    )
  }
}

export const Home = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <LoggedIn /> : <NotLoggedIn />
}
