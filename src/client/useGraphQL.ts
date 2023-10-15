import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Kind, ASTNode, OperationDefinitionNode } from 'graphql'
import request from 'graphql-request'

import { QueryError } from './error'

const isOperationDefinition = (def: ASTNode): def is OperationDefinitionNode => def.kind === Kind.OPERATION_DEFINITION

type TQueryKey<TVariables> = [string, TVariables | undefined]

type TOptions<TResult, TVariables> = Omit<
  UseQueryOptions<TResult, QueryError, TResult, TQueryKey<TVariables>>,
  'queryKey' | 'initialData'
> & {
  initialData?: TResult | (() => TResult)
}

type WithOptions<TResult, TVariables> = {
  variables?: TVariables
  options?: TOptions<TResult, TVariables>
}

const isWithOptions = <TResult, TVariables>(
  value: TVariables | WithOptions<TResult, TVariables>
): value is WithOptions<TResult, TVariables> => value && typeof value === 'object' && Object.hasOwn(value, 'options')

const parseVars = <TResult, TVariables>(params?: TVariables | WithOptions<TResult, TVariables>) => {
  if (params && isWithOptions(params)) {
    return [params.variables, params.options] as const
  } else {
    return [params, undefined] as const
  }
}

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables | WithOptions<TResult, TVariables>
) {
  const operationName = document.definitions.find(isOperationDefinition)?.name?.value ?? 'missing operation'
  const [vars, opts] = parseVars(variables)
  return useQuery<TResult, QueryError, TResult, TQueryKey<TVariables>>(
    [operationName, vars],
    async ({ queryKey }) => request(`/api/graphql/${operationName}`, document, queryKey[1] ? queryKey[1] : undefined),
    opts
  )
}

export function fetchGraphQl<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const operationName = document.definitions.find(isOperationDefinition)?.name?.value
  return request(`/api/graphql/${operationName}`, document, variables ?? undefined)
}
