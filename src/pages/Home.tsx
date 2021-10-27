import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'

import {
  GetFilteredDrinksDocument,
  GetFilteredDrinksQuery,
  GetFilteredDrinksQueryVariables,
  useGetAllDrinksQuery,
} from '../client'
import { useFetchData } from '../client/fetcher'
import { useAuth } from '../components/Auth'
import { Drink, DrinkCard } from '../components/DrinkCard'
import { GraphQLError } from '../components/GraphQLError'
import { Loader } from '../components/Loader'
import { Page } from '../components/Page'
import { Search } from '../components/Search'
import { notEmpty } from '../utils'
import { NotLoggedIn } from './NotLoggedIn'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const toQueryParams = (input: string[]): string => input.map((s) => s.replace(/ /g, '_')).join(' ')

const fromQueryParams = (input: string): string[] => input.split(' ').map((s) => s.replace(/_/g, ' '))

const useDrinks = () => {
  const queryClient = useQueryClient()
  const history = useHistory()
  const query = useQuery()
  const ingredient = query.get('ingredient')

  const [search, setSearch] = useState<string[]>(ingredient ? fromQueryParams(ingredient) : [])
  const hasSearch = search?.length > 0 || false

  const [drinks, setDrinks] = useState<Drink[] | undefined>(undefined)
  const { data: allData, error: allError } = useGetAllDrinksQuery({}, { enabled: !hasSearch })
  const filteredFetcher = useFetchData<GetFilteredDrinksQuery, GetFilteredDrinksQueryVariables>(
    GetFilteredDrinksDocument
  )

  useEffect(() => {
    const params = new URLSearchParams()
    if (hasSearch) {
      params.append('ingredient', toQueryParams(search))
    } else {
      params.delete('ingredient')
    }
    history.push({ search: params.toString() })
  }, [hasSearch, search, history])

  useEffect(() => {
    setDrinks(allData?.recipes?.nodes?.filter(notEmpty))
  }, [allData])

  useEffect(() => {
    const variables = { value: search.join(' ') }
    async function getFilterData() {
      if (hasSearch) {
        const filteredData = await queryClient.fetchQuery(
          ['getFilteredDrinks', variables],
          filteredFetcher.bind(null, variables)
        )
        setDrinks(filteredData?.recipes?.nodes?.filter(notEmpty))
      } else {
        setDrinks(allData?.recipes?.nodes?.filter(notEmpty))
      }
    }
    getFilterData().then()
  }, [search, hasSearch, queryClient, filteredFetcher, allData?.recipes?.nodes])

  return { drinks, allError, setSearch, search }
}

const LoggedIn = () => {
  const { drinks, allError, setSearch, search } = useDrinks()

  if (allError) {
    return <GraphQLError error={allError} />
  }
  if (!drinks) {
    return <Loader />
  }

  return (
    <Page title='Festive Beverages' hideTitle>
      <Search value={search} onChange={setSearch} />
      <Grid container spacing={3}>
        {drinks?.map((d, i) => (
          <Grid key={i} item xs={6} sm={3}>
            <DrinkCard drink={d} />
          </Grid>
        ))}
      </Grid>
    </Page>
  )
}

export const Home = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <LoggedIn /> : <NotLoggedIn />
}
