import { print } from 'graphql'
import gql from 'graphql-tag'
import { useCallback } from 'react'

// eslint-disable-next-line etc/no-misused-generics
export const fetchData = async <TData, TVariables>(query: string, variables?: TVariables) => {
  const ast = gql(query)
  // note that we use gql from graphql-tag to drop duplicate fragment definitions
  // then we use graphql print to convert that back to a text string.
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(ast),
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    const { message } = json.errors[0] || 'Error..'
    throw new Error(message)
  }

  return json.data as TData
}

// eslint-disable-next-line etc/no-misused-generics
export const useFetchData = <TData, TVariables>(query: string): (() => Promise<TData>) =>
  useCallback(async (variables?: TVariables) => fetchData(query, variables), [query])
