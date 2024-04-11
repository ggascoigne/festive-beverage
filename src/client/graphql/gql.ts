/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment Drink on Recipe {\n  name\n  id\n  description\n  instructions\n  ingredientText\n  glass\n  garnish\n  source\n  recipeIngredients {\n    nodes {\n      ingredient {\n        name\n      }\n      amount\n      unit {\n        name\n      }\n    }\n  }\n}\n\nquery getAllDrinks {\n  recipes(orderBy: NAME_ASC) {\n    nodes {\n      ...Drink\n    }\n  }\n}\n\nquery getFilteredDrinks($value: String!) {\n  recipes(filter: {ts: {matches: $value}}, orderBy: NAME_ASC) {\n    nodes {\n      ...Drink\n    }\n  }\n}\n\nfragment Ingredient on Ingredient {\n  name\n  tags\n}\n\nquery getAllIngredients {\n  ingredients(orderBy: NAME_ASC) {\n    nodes {\n      ...Ingredient\n    }\n  }\n}\n\nquery getDrinkById($id: Int!) {\n  recipe(id: $id) {\n    ...Drink\n  }\n}':
    types.DrinkFragmentDoc,
  'query getUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    ...userFields\n  }\n}\n\nquery getUserById($id: Int!) {\n  user(id: $id) {\n    ...userFields\n  }\n}\n\nmutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user {\n      ...userFields\n    }\n  }\n}\n\nquery getAllUsers {\n  users {\n    nodes {\n      ...userFields\n    }\n  }\n}':
    types.GetUserByEmailDocument,
  'fragment userFields on User {\n  id\n  email\n}': types.UserFieldsFragmentDoc,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment Drink on Recipe {\n  name\n  id\n  description\n  instructions\n  ingredientText\n  glass\n  garnish\n  source\n  recipeIngredients {\n    nodes {\n      ingredient {\n        name\n      }\n      amount\n      unit {\n        name\n      }\n    }\n  }\n}\n\nquery getAllDrinks {\n  recipes(orderBy: NAME_ASC) {\n    nodes {\n      ...Drink\n    }\n  }\n}\n\nquery getFilteredDrinks($value: String!) {\n  recipes(filter: {ts: {matches: $value}}, orderBy: NAME_ASC) {\n    nodes {\n      ...Drink\n    }\n  }\n}\n\nfragment Ingredient on Ingredient {\n  name\n  tags\n}\n\nquery getAllIngredients {\n  ingredients(orderBy: NAME_ASC) {\n    nodes {\n      ...Ingredient\n    }\n  }\n}\n\nquery getDrinkById($id: Int!) {\n  recipe(id: $id) {\n    ...Drink\n  }\n}'
): (typeof documents)['fragment Drink on Recipe {\n  name\n  id\n  description\n  instructions\n  ingredientText\n  glass\n  garnish\n  source\n  recipeIngredients {\n    nodes {\n      ingredient {\n        name\n      }\n      amount\n      unit {\n        name\n      }\n    }\n  }\n}\n\nquery getAllDrinks {\n  recipes(orderBy: NAME_ASC) {\n    nodes {\n      ...Drink\n    }\n  }\n}\n\nquery getFilteredDrinks($value: String!) {\n  recipes(filter: {ts: {matches: $value}}, orderBy: NAME_ASC) {\n    nodes {\n      ...Drink\n    }\n  }\n}\n\nfragment Ingredient on Ingredient {\n  name\n  tags\n}\n\nquery getAllIngredients {\n  ingredients(orderBy: NAME_ASC) {\n    nodes {\n      ...Ingredient\n    }\n  }\n}\n\nquery getDrinkById($id: Int!) {\n  recipe(id: $id) {\n    ...Drink\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query getUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    ...userFields\n  }\n}\n\nquery getUserById($id: Int!) {\n  user(id: $id) {\n    ...userFields\n  }\n}\n\nmutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user {\n      ...userFields\n    }\n  }\n}\n\nquery getAllUsers {\n  users {\n    nodes {\n      ...userFields\n    }\n  }\n}'
): (typeof documents)['query getUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    ...userFields\n  }\n}\n\nquery getUserById($id: Int!) {\n  user(id: $id) {\n    ...userFields\n  }\n}\n\nmutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    user {\n      ...userFields\n    }\n  }\n}\n\nquery getAllUsers {\n  users {\n    nodes {\n      ...userFields\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment userFields on User {\n  id\n  email\n}'
): (typeof documents)['fragment userFields on User {\n  id\n  email\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
