import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'

import { DrinkCard } from '#components/DrinkCard'
import { Loader } from '#components/Loader'
import { Link } from '#components/Navigation'
import { Page } from '#components/Page'
import { Search } from '#components/Search'
import { TrpcError } from '#components/TrpcError'
import { notEmpty } from '#utils'
import { api } from '#utils/api'
import { Drink } from '#utils/apiTypes.ts'

const DrinkList: React.FC<{ drinks: readonly Drink[] }> = ({ drinks }) => {
  const router = useRouter()
  return (
    <Grid container spacing={3}>
      {drinks?.map((d, i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Link href={`${router.pathname}?drink=${d.id}`} sx={{ textDecoration: 'none' }}>
            <DrinkCard drink={d} />
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export const SingleDrink: React.FC<{ drink?: Drink }> = ({ drink }) => {
  const router = useRouter()
  return (
    <>
      <Button variant='contained' onClick={() => router.back()} style={{ marginBottom: 16 }}>
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

export const HomeView = () => {
  const router = useRouter()
  const search: string[] = useMemo(() => {
    if (!router.query?.search) {
      return []
    } else {
      return typeof router.query?.search === 'object' ? router.query?.search : [router.query?.search]
    }
  }, [router.query?.search])
  const drink = router.query?.drink
  const hasSearch = (search as string[])?.length > 0 || false
  const { data, error } = api.drinks.getAllDrinks.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined)

  useEffect(() => {
    if (hasSearch) {
      setDrinks(data?.filter(notEmpty).filter((d) => matchesSearch(search as string[], d)))
    } else {
      setDrinks(data?.filter(notEmpty))
    }
  }, [data, hasSearch, search])

  const setSearch = useCallback(
    (newVal: string) => {
      router.replace({
        query: { ...router.query, search: newVal },
      })
    },
    [router]
  )

  if (error) {
    return <TrpcError error={error} />
  }
  if (!drinks) {
    return <Loader />
  }

  if (drink) {
    return (
      <Page title='Festive Beverages' hideTitle>
        <SingleDrink drink={drinks.find((d) => d.id === parseInt(drink as string, 10))} />
      </Page>
    )
  } else {
    return (
      <Page title='Festive Beverages' hideTitle>
        <Search value={search} onChange={setSearch} />
        <DrinkList drinks={drinks} />
      </Page>
    )
  }
}
