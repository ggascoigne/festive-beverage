import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Kind, ASTNode, OperationDefinitionNode } from 'graphql'
import request from 'graphql-request'

const isOperationDefinition = (def: ASTNode): def is OperationDefinitionNode => def.kind === Kind.OPERATION_DEFINITION

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?:
    | TVariables
    | {
        variables?: TVariables
        options?: Omit<UseQueryOptions<TResult, unknown, TResult, TVariables[]>, 'queryKey' | 'initialData'> & {
          initialData?: TResult | (() => TResult)
        }
      }
) {
  const operationName = document.definitions.find(isOperationDefinition)?.name?.value
  let vars = variables
  let opts
  if (variables && Object.hasOwn(variables, 'operations')) {
    vars = (variables as any).variables
    opts = (variables as any).options
  }
  return useQuery(
    [operationName, vars] as const,
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
