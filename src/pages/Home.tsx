import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useQueryStringKey } from 'use-route-as-state'

import { useGetAllDrinksQuery } from '../client'
import { Drink, DrinkCard } from '../components/DrinkCard'
import { GraphQLError } from '../components/GraphQLError'
import { Loader } from '../components/Loader'
import { Page } from '../components/Page'
import { Search } from '../components/Search'
import { notEmpty } from '../utils'

const DrinkList: React.FC<{ drinks: Drink[] }> = ({ drinks }) => (
  <Grid container spacing={3}>
    {drinks?.map((d, i) => (
      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
        <Link to={(location: any) => `${location.pathname}?drink=${d.id}`}>
          <DrinkCard drink={d} />
        </Link>
      </Grid>
    ))}
  </Grid>
)

export const SingleDrink: React.FC<{ drink?: Drink }> = ({ drink }) => {
  const history = useHistory()
  return (
    <>
      <Button variant='contained' onClick={() => history.goBack()} style={{ marginBottom: 16 }}>
        Back
      </Button>
      <DrinkCard drink={drink} zoomed />
    </>
  )
}

const matchesOne = (s: string, d: Drink) => {
  const sl = s.toLocaleLowerCase()

  return (
    d.name.toLocaleLowerCase().includes(sl) ||
    d.ingredientText.toLocaleLowerCase().includes(sl) ||
    (d.description ?? '').toLocaleLowerCase().includes(sl) ||
    (d.instructions ?? '').toLocaleLowerCase().includes(sl) ||
    (d.garnish ?? '').toLocaleLowerCase().includes(sl) ||
    (d.glass ?? '').toLocaleLowerCase().includes(sl) ||
    (d.source ?? '').toLocaleLowerCase().includes(sl)
  )
}

const matchesSearch = (search: string[], drink: Drink) => search.every((s) => matchesOne(s, drink))

const LoggedIn = () => {
  const [search, setSearch] = useQueryStringKey('ingredient')
  const [drink] = useQueryStringKey('drink')
  const hasSearch = (search as string[])?.length > 0 || false
  const { data, error } = useGetAllDrinksQuery({}, { staleTime: 60 * 60 * 1000 })
  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined)

  useEffect(() => {
    if (hasSearch) {
      setDrinks(data?.recipes?.nodes?.filter(notEmpty).filter((d) => matchesSearch(search as string[], d)))
    } else {
      setDrinks(data?.recipes?.nodes?.filter(notEmpty))
    }
  }, [data, hasSearch, search])

  if (error) {
    return <GraphQLError error={error} />
  }
  if (!drinks) {
    return <Loader />
  }

  if (drink) {
    return (
      <Page title='Festive Beverages' hideTitle>
        <SingleDrink drink={drinks.find((d) => d.id === parseInt(drink as string))} />
      </Page>
    )
  } else {
    return (
      <Page title='Festive Beverages' hideTitle>
        <Search value={(search ?? []) as string[]} onChange={setSearch} />
        <DrinkList drinks={drinks} />
      </Page>
    )
  }
}

export const Home = () => <LoggedIn />
