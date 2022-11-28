import { Button, Grid } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from '@/components/Link'

import { GetAllDrinksDocument, GetAllDrinksQuery, GetAllDrinksQueryVariables, useGetAllDrinksQuery } from '@/client'
import { Drink, DrinkCard } from '@/components/DrinkCard'
import { GraphQLError } from '@/components/GraphQLError'
import { Loader } from '@/components/Loader'
import { Page } from '@/components/Page'
import { Search } from '@/components/Search'
import { notEmpty } from '@/utils'
import { fetchData } from '@/client/fetcher'

const DrinkList: React.FC<{ drinks: Drink[] }> = ({ drinks }) => {
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

export async function getServerSideProps() {
  const allDrinks: GetAllDrinksQuery = await fetchData<GetAllDrinksQuery, GetAllDrinksQueryVariables>(
    GetAllDrinksDocument
  )
  return { props: { allDrinks } }
}

type HomeViewProps = {
  allDrinks?: GetAllDrinksQuery
}

export const HomeView = (props: HomeViewProps) => {
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
  const { data, error } = useGetAllDrinksQuery(undefined, { staleTime: 60 * 60 * 1000, initialData: props.allDrinks })
  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined)

  useEffect(() => {
    if (hasSearch) {
      setDrinks(data?.recipes?.nodes?.filter(notEmpty).filter((d) => matchesSearch(search as string[], d)))
    } else {
      setDrinks(data?.recipes?.nodes?.filter(notEmpty))
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
    return <GraphQLError error={error} />
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
