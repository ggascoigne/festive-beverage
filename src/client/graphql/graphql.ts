/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: { input: any; output: any }
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: { input: any; output: any }
  FullText: { input: any; output: any }
}

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']['input']>
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']['input']>
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']['input']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']['input']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']['input']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']['input']>
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']['input']>
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']['input']>>
}

/** All input for the create `Ingredient` mutation. */
export type CreateIngredientInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Ingredient` to be created by this mutation. */
  ingredient: IngredientInput
}

/** The output of our create `Ingredient` mutation. */
export type CreateIngredientPayload = {
  __typename: 'CreateIngredientPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Ingredient` that was created by this mutation. */
  ingredient?: Maybe<Ingredient>
  /** An edge for our `Ingredient`. May be used by Relay 1. */
  ingredientEdge?: Maybe<IngredientsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our create `Ingredient` mutation. */
export type CreateIngredientPayloadIngredientEdgeArgs = {
  orderBy?: InputMaybe<Array<IngredientsOrderBy>>
}

/** All input for the create `RecipeIngredient` mutation. */
export type CreateRecipeIngredientInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `RecipeIngredient` to be created by this mutation. */
  recipeIngredient: RecipeIngredientInput
}

/** The output of our create `RecipeIngredient` mutation. */
export type CreateRecipeIngredientPayload = {
  __typename: 'CreateRecipeIngredientPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Ingredient` that is related to this `RecipeIngredient`. */
  ingredient?: Maybe<Ingredient>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Recipe` that is related to this `RecipeIngredient`. */
  recipe?: Maybe<Recipe>
  /** The `RecipeIngredient` that was created by this mutation. */
  recipeIngredient?: Maybe<RecipeIngredient>
  /** An edge for our `RecipeIngredient`. May be used by Relay 1. */
  recipeIngredientEdge?: Maybe<RecipeIngredientsEdge>
  /** Reads a single `Unit` that is related to this `RecipeIngredient`. */
  unit?: Maybe<Unit>
}

/** The output of our create `RecipeIngredient` mutation. */
export type CreateRecipeIngredientPayloadRecipeIngredientEdgeArgs = {
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/** All input for the create `Recipe` mutation. */
export type CreateRecipeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Recipe` to be created by this mutation. */
  recipe: RecipeInput
}

/** The output of our create `Recipe` mutation. */
export type CreateRecipePayload = {
  __typename: 'CreateRecipePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Recipe` that was created by this mutation. */
  recipe?: Maybe<Recipe>
  /** An edge for our `Recipe`. May be used by Relay 1. */
  recipeEdge?: Maybe<RecipesEdge>
}

/** The output of our create `Recipe` mutation. */
export type CreateRecipePayloadRecipeEdgeArgs = {
  orderBy?: InputMaybe<Array<RecipesOrderBy>>
}

/** All input for the create `Role` mutation. */
export type CreateRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Role` to be created by this mutation. */
  role: RoleInput
}

/** The output of our create `Role` mutation. */
export type CreateRolePayload = {
  __typename: 'CreateRolePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Role` that was created by this mutation. */
  role?: Maybe<Role>
  /** An edge for our `Role`. May be used by Relay 1. */
  roleEdge?: Maybe<RolesEdge>
}

/** The output of our create `Role` mutation. */
export type CreateRolePayloadRoleEdgeArgs = {
  orderBy?: InputMaybe<Array<RolesOrderBy>>
}

/** All input for the create `Unit` mutation. */
export type CreateUnitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `Unit` to be created by this mutation. */
  unit: UnitInput
}

/** The output of our create `Unit` mutation. */
export type CreateUnitPayload = {
  __typename: 'CreateUnitPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Unit` that was created by this mutation. */
  unit?: Maybe<Unit>
  /** An edge for our `Unit`. May be used by Relay 1. */
  unitEdge?: Maybe<UnitsEdge>
}

/** The output of our create `Unit` mutation. */
export type CreateUnitPayloadUnitEdgeArgs = {
  orderBy?: InputMaybe<Array<UnitsOrderBy>>
}

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `User` to be created by this mutation. */
  user: UserInput
}

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename: 'CreateUserPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>
}

/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>
}

/** All input for the create `UserRole` mutation. */
export type CreateUserRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The `UserRole` to be created by this mutation. */
  userRole: UserRoleInput
}

/** The output of our create `UserRole` mutation. */
export type CreateUserRolePayload = {
  __typename: 'CreateUserRolePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Role` that is related to this `UserRole`. */
  role?: Maybe<Role>
  /** Reads a single `User` that is related to this `UserRole`. */
  user?: Maybe<User>
  /** The `UserRole` that was created by this mutation. */
  userRole?: Maybe<UserRole>
  /** An edge for our `UserRole`. May be used by Relay 1. */
  userRoleEdge?: Maybe<UserRolesEdge>
}

/** The output of our create `UserRole` mutation. */
export type CreateUserRolePayloadUserRoleEdgeArgs = {
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>
}

/** All input for the `deleteIngredientByNodeId` mutation. */
export type DeleteIngredientByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Ingredient` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteIngredient` mutation. */
export type DeleteIngredientInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** The output of our delete `Ingredient` mutation. */
export type DeleteIngredientPayload = {
  __typename: 'DeleteIngredientPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedIngredientNodeId?: Maybe<Scalars['ID']['output']>
  /** The `Ingredient` that was deleted by this mutation. */
  ingredient?: Maybe<Ingredient>
  /** An edge for our `Ingredient`. May be used by Relay 1. */
  ingredientEdge?: Maybe<IngredientsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our delete `Ingredient` mutation. */
export type DeleteIngredientPayloadIngredientEdgeArgs = {
  orderBy?: InputMaybe<Array<IngredientsOrderBy>>
}

/** All input for the `deleteRecipeByNodeId` mutation. */
export type DeleteRecipeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Recipe` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteRecipeIngredientByNodeId` mutation. */
export type DeleteRecipeIngredientByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `RecipeIngredient` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteRecipeIngredient` mutation. */
export type DeleteRecipeIngredientInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** The output of our delete `RecipeIngredient` mutation. */
export type DeleteRecipeIngredientPayload = {
  __typename: 'DeleteRecipeIngredientPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedRecipeIngredientNodeId?: Maybe<Scalars['ID']['output']>
  /** Reads a single `Ingredient` that is related to this `RecipeIngredient`. */
  ingredient?: Maybe<Ingredient>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Recipe` that is related to this `RecipeIngredient`. */
  recipe?: Maybe<Recipe>
  /** The `RecipeIngredient` that was deleted by this mutation. */
  recipeIngredient?: Maybe<RecipeIngredient>
  /** An edge for our `RecipeIngredient`. May be used by Relay 1. */
  recipeIngredientEdge?: Maybe<RecipeIngredientsEdge>
  /** Reads a single `Unit` that is related to this `RecipeIngredient`. */
  unit?: Maybe<Unit>
}

/** The output of our delete `RecipeIngredient` mutation. */
export type DeleteRecipeIngredientPayloadRecipeIngredientEdgeArgs = {
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/** All input for the `deleteRecipe` mutation. */
export type DeleteRecipeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** The output of our delete `Recipe` mutation. */
export type DeleteRecipePayload = {
  __typename: 'DeleteRecipePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedRecipeNodeId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Recipe` that was deleted by this mutation. */
  recipe?: Maybe<Recipe>
  /** An edge for our `Recipe`. May be used by Relay 1. */
  recipeEdge?: Maybe<RecipesEdge>
}

/** The output of our delete `Recipe` mutation. */
export type DeleteRecipePayloadRecipeEdgeArgs = {
  orderBy?: InputMaybe<Array<RecipesOrderBy>>
}

/** All input for the `deleteRoleByAuthority` mutation. */
export type DeleteRoleByAuthorityInput = {
  authority: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** All input for the `deleteRoleByNodeId` mutation. */
export type DeleteRoleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Role` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteRole` mutation. */
export type DeleteRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** The output of our delete `Role` mutation. */
export type DeleteRolePayload = {
  __typename: 'DeleteRolePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedRoleNodeId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Role` that was deleted by this mutation. */
  role?: Maybe<Role>
  /** An edge for our `Role`. May be used by Relay 1. */
  roleEdge?: Maybe<RolesEdge>
}

/** The output of our delete `Role` mutation. */
export type DeleteRolePayloadRoleEdgeArgs = {
  orderBy?: InputMaybe<Array<RolesOrderBy>>
}

/** All input for the `deleteUnitByNodeId` mutation. */
export type DeleteUnitByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Unit` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteUnit` mutation. */
export type DeleteUnitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** The output of our delete `Unit` mutation. */
export type DeleteUnitPayload = {
  __typename: 'DeleteUnitPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedUnitNodeId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Unit` that was deleted by this mutation. */
  unit?: Maybe<Unit>
  /** An edge for our `Unit`. May be used by Relay 1. */
  unitEdge?: Maybe<UnitsEdge>
}

/** The output of our delete `Unit` mutation. */
export type DeleteUnitPayloadUnitEdgeArgs = {
  orderBy?: InputMaybe<Array<UnitsOrderBy>>
}

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
}

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
}

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename: 'DeleteUserPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedUserNodeId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>
}

/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>
}

/** All input for the `deleteUserRoleByNodeId` mutation. */
export type DeleteUserRoleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `UserRole` to be deleted. */
  nodeId: Scalars['ID']['input']
}

/** All input for the `deleteUserRole` mutation. */
export type DeleteUserRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  roleId: Scalars['Int']['input']
  userId: Scalars['Int']['input']
}

/** The output of our delete `UserRole` mutation. */
export type DeleteUserRolePayload = {
  __typename: 'DeleteUserRolePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  deletedUserRoleNodeId?: Maybe<Scalars['ID']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Role` that is related to this `UserRole`. */
  role?: Maybe<Role>
  /** Reads a single `User` that is related to this `UserRole`. */
  user?: Maybe<User>
  /** The `UserRole` that was deleted by this mutation. */
  userRole?: Maybe<UserRole>
  /** An edge for our `UserRole`. May be used by Relay 1. */
  userRoleEdge?: Maybe<UserRolesEdge>
}

/** The output of our delete `UserRole` mutation. */
export type DeleteUserRolePayloadUserRoleEdgeArgs = {
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>
}

/** All input for the `fTruncateTables` mutation. */
export type FTruncateTablesInput = {
  _username?: InputMaybe<Scalars['String']['input']>
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
}

/** The output of our `fTruncateTables` mutation. */
export type FTruncateTablesPayload = {
  __typename: 'FTruncateTablesPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** A filter to be used against FullText fields. All fields are combined with a logical ‘and.’ */
export type FullTextFilter = {
  /** Performs a full text search on the field. */
  matches?: InputMaybe<Scalars['String']['input']>
}

export type Ingredient = Node & {
  __typename: 'Ingredient'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['Int']['output']
  name: Scalars['String']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `RecipeIngredient`. */
  recipeIngredients: RecipeIngredientsConnection
  sort?: Maybe<Scalars['Int']['output']>
  tags?: Maybe<Scalars['String']['output']>
}

export type IngredientRecipeIngredientsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<RecipeIngredientCondition>
  filter?: InputMaybe<RecipeIngredientFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/**
 * A condition to be used against `Ingredient` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type IngredientCondition = {
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `sort` field. */
  sort?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `tags` field. */
  tags?: InputMaybe<Scalars['String']['input']>
}

/** A filter to be used against `Ingredient` object types. All fields are combined with a logical ‘and.’ */
export type IngredientFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<IngredientFilter>>
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>
  /** Negates the expression. */
  not?: InputMaybe<IngredientFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<IngredientFilter>>
  /** Filter by the object’s `sort` field. */
  sort?: InputMaybe<IntFilter>
  /** Filter by the object’s `tags` field. */
  tags?: InputMaybe<StringFilter>
}

/** An input for mutations affecting `Ingredient` */
export type IngredientInput = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  name: Scalars['String']['input']
  sort?: InputMaybe<Scalars['Int']['input']>
  tags?: InputMaybe<Scalars['String']['input']>
}

/** Represents an update to a `Ingredient`. Fields that are set will be updated. */
export type IngredientPatch = {
  description?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<Scalars['Int']['input']>
  tags?: InputMaybe<Scalars['String']['input']>
}

/** A connection to a list of `Ingredient` values. */
export type IngredientsConnection = {
  __typename: 'IngredientsConnection'
  /** A list of edges which contains the `Ingredient` and cursor to aid in pagination. */
  edges: Array<IngredientsEdge>
  /** A list of `Ingredient` objects. */
  nodes: Array<Maybe<Ingredient>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Ingredient` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Ingredient` edge in the connection. */
export type IngredientsEdge = {
  __typename: 'IngredientsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Ingredient` at the end of the edge. */
  node?: Maybe<Ingredient>
}

/** Methods to use when ordering `Ingredient`. */
export enum IngredientsOrderBy {
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecipeIngredientsByIngredientIdCountAsc = 'RECIPE_INGREDIENTS_BY_INGREDIENT_ID__COUNT_ASC',
  RecipeIngredientsByIngredientIdCountDesc = 'RECIPE_INGREDIENTS_BY_INGREDIENT_ID__COUNT_DESC',
  SortAsc = 'SORT_ASC',
  SortDesc = 'SORT_DESC',
  TagsAsc = 'TAGS_ASC',
  TagsDesc = 'TAGS_DESC',
}

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']['input']>
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']['input']>
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']['input']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']['input']>>
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']['input']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']['input']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']['input']>
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']['input']>
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename: 'Mutation'
  /** Creates a single `Ingredient`. */
  createIngredient?: Maybe<CreateIngredientPayload>
  /** Creates a single `Recipe`. */
  createRecipe?: Maybe<CreateRecipePayload>
  /** Creates a single `RecipeIngredient`. */
  createRecipeIngredient?: Maybe<CreateRecipeIngredientPayload>
  /** Creates a single `Role`. */
  createRole?: Maybe<CreateRolePayload>
  /** Creates a single `Unit`. */
  createUnit?: Maybe<CreateUnitPayload>
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>
  /** Creates a single `UserRole`. */
  createUserRole?: Maybe<CreateUserRolePayload>
  /** Deletes a single `Ingredient` using a unique key. */
  deleteIngredient?: Maybe<DeleteIngredientPayload>
  /** Deletes a single `Ingredient` using its globally unique id. */
  deleteIngredientByNodeId?: Maybe<DeleteIngredientPayload>
  /** Deletes a single `Recipe` using a unique key. */
  deleteRecipe?: Maybe<DeleteRecipePayload>
  /** Deletes a single `Recipe` using its globally unique id. */
  deleteRecipeByNodeId?: Maybe<DeleteRecipePayload>
  /** Deletes a single `RecipeIngredient` using a unique key. */
  deleteRecipeIngredient?: Maybe<DeleteRecipeIngredientPayload>
  /** Deletes a single `RecipeIngredient` using its globally unique id. */
  deleteRecipeIngredientByNodeId?: Maybe<DeleteRecipeIngredientPayload>
  /** Deletes a single `Role` using a unique key. */
  deleteRole?: Maybe<DeleteRolePayload>
  /** Deletes a single `Role` using a unique key. */
  deleteRoleByAuthority?: Maybe<DeleteRolePayload>
  /** Deletes a single `Role` using its globally unique id. */
  deleteRoleByNodeId?: Maybe<DeleteRolePayload>
  /** Deletes a single `Unit` using a unique key. */
  deleteUnit?: Maybe<DeleteUnitPayload>
  /** Deletes a single `Unit` using its globally unique id. */
  deleteUnitByNodeId?: Maybe<DeleteUnitPayload>
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>
  /** Deletes a single `UserRole` using a unique key. */
  deleteUserRole?: Maybe<DeleteUserRolePayload>
  /** Deletes a single `UserRole` using its globally unique id. */
  deleteUserRoleByNodeId?: Maybe<DeleteUserRolePayload>
  fTruncateTables?: Maybe<FTruncateTablesPayload>
  /** Updates a single `Ingredient` using a unique key and a patch. */
  updateIngredient?: Maybe<UpdateIngredientPayload>
  /** Updates a single `Ingredient` using its globally unique id and a patch. */
  updateIngredientByNodeId?: Maybe<UpdateIngredientPayload>
  /** Updates a single `Recipe` using a unique key and a patch. */
  updateRecipe?: Maybe<UpdateRecipePayload>
  /** Updates a single `Recipe` using its globally unique id and a patch. */
  updateRecipeByNodeId?: Maybe<UpdateRecipePayload>
  /** Updates a single `RecipeIngredient` using a unique key and a patch. */
  updateRecipeIngredient?: Maybe<UpdateRecipeIngredientPayload>
  /** Updates a single `RecipeIngredient` using its globally unique id and a patch. */
  updateRecipeIngredientByNodeId?: Maybe<UpdateRecipeIngredientPayload>
  /** Updates a single `Role` using a unique key and a patch. */
  updateRole?: Maybe<UpdateRolePayload>
  /** Updates a single `Role` using a unique key and a patch. */
  updateRoleByAuthority?: Maybe<UpdateRolePayload>
  /** Updates a single `Role` using its globally unique id and a patch. */
  updateRoleByNodeId?: Maybe<UpdateRolePayload>
  /** Updates a single `Unit` using a unique key and a patch. */
  updateUnit?: Maybe<UpdateUnitPayload>
  /** Updates a single `Unit` using its globally unique id and a patch. */
  updateUnitByNodeId?: Maybe<UpdateUnitPayload>
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>
  /** Updates a single `UserRole` using a unique key and a patch. */
  updateUserRole?: Maybe<UpdateUserRolePayload>
  /** Updates a single `UserRole` using its globally unique id and a patch. */
  updateUserRoleByNodeId?: Maybe<UpdateUserRolePayload>
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateIngredientArgs = {
  input: CreateIngredientInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRecipeIngredientArgs = {
  input: CreateRecipeIngredientInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRoleArgs = {
  input: CreateRoleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUnitArgs = {
  input: CreateUnitInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserRoleArgs = {
  input: CreateUserRoleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIngredientArgs = {
  input: DeleteIngredientInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteIngredientByNodeIdArgs = {
  input: DeleteIngredientByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecipeArgs = {
  input: DeleteRecipeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecipeByNodeIdArgs = {
  input: DeleteRecipeByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecipeIngredientArgs = {
  input: DeleteRecipeIngredientInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRecipeIngredientByNodeIdArgs = {
  input: DeleteRecipeIngredientByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleByAuthorityArgs = {
  input: DeleteRoleByAuthorityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleByNodeIdArgs = {
  input: DeleteRoleByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUnitArgs = {
  input: DeleteUnitInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUnitByNodeIdArgs = {
  input: DeleteUnitByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRoleArgs = {
  input: DeleteUserRoleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserRoleByNodeIdArgs = {
  input: DeleteUserRoleByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationFTruncateTablesArgs = {
  input: FTruncateTablesInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIngredientArgs = {
  input: UpdateIngredientInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateIngredientByNodeIdArgs = {
  input: UpdateIngredientByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecipeByNodeIdArgs = {
  input: UpdateRecipeByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecipeIngredientArgs = {
  input: UpdateRecipeIngredientInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRecipeIngredientByNodeIdArgs = {
  input: UpdateRecipeIngredientByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleByAuthorityArgs = {
  input: UpdateRoleByAuthorityInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleByNodeIdArgs = {
  input: UpdateRoleByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUnitArgs = {
  input: UpdateUnitInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUnitByNodeIdArgs = {
  input: UpdateUnitByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserRoleArgs = {
  input: UpdateUserRoleInput
}

/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserRoleByNodeIdArgs = {
  input: UpdateUserRoleByNodeIdInput
}

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename: 'PageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename: 'Query'
  currentUserId?: Maybe<Scalars['Int']['output']>
  currentUserIsAdmin?: Maybe<Scalars['Boolean']['output']>
  ingredient?: Maybe<Ingredient>
  /** Reads a single `Ingredient` using its globally unique `ID`. */
  ingredientByNodeId?: Maybe<Ingredient>
  /** Reads and enables pagination through a set of `Ingredient`. */
  ingredients?: Maybe<IngredientsConnection>
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output']
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query
  recipe?: Maybe<Recipe>
  /** Reads a single `Recipe` using its globally unique `ID`. */
  recipeByNodeId?: Maybe<Recipe>
  recipeIngredient?: Maybe<RecipeIngredient>
  /** Reads a single `RecipeIngredient` using its globally unique `ID`. */
  recipeIngredientByNodeId?: Maybe<RecipeIngredient>
  /** Reads and enables pagination through a set of `RecipeIngredient`. */
  recipeIngredients?: Maybe<RecipeIngredientsConnection>
  /** Reads and enables pagination through a set of `Recipe`. */
  recipes?: Maybe<RecipesConnection>
  role?: Maybe<Role>
  roleByAuthority?: Maybe<Role>
  /** Reads a single `Role` using its globally unique `ID`. */
  roleByNodeId?: Maybe<Role>
  /** Reads and enables pagination through a set of `Role`. */
  roles?: Maybe<RolesConnection>
  unit?: Maybe<Unit>
  /** Reads a single `Unit` using its globally unique `ID`. */
  unitByNodeId?: Maybe<Unit>
  /** Reads and enables pagination through a set of `Unit`. */
  units?: Maybe<UnitsConnection>
  user?: Maybe<User>
  userByEmail?: Maybe<User>
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>
  userRole?: Maybe<UserRole>
  /** Reads a single `UserRole` using its globally unique `ID`. */
  userRoleByNodeId?: Maybe<UserRole>
  /** Reads and enables pagination through a set of `UserRole`. */
  userRoles?: Maybe<UserRolesConnection>
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>
}

/** The root query type which gives access points into the data universe. */
export type QueryIngredientArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryIngredientByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryIngredientsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<IngredientCondition>
  filter?: InputMaybe<IngredientFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<IngredientsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRecipeArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRecipeByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRecipeIngredientArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRecipeIngredientByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRecipeIngredientsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<RecipeIngredientCondition>
  filter?: InputMaybe<RecipeIngredientFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryRecipesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<RecipeCondition>
  filter?: InputMaybe<RecipeFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryRoleArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRoleByAuthorityArgs = {
  authority: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRoleByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<RoleCondition>
  filter?: InputMaybe<RoleFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RolesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryUnitArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUnitByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUnitsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UnitCondition>
  filter?: InputMaybe<UnitFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UnitsOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserRoleArgs = {
  roleId: Scalars['Int']['input']
  userId: Scalars['Int']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserRoleByNodeIdArgs = {
  nodeId: Scalars['ID']['input']
}

/** The root query type which gives access points into the data universe. */
export type QueryUserRolesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UserRoleCondition>
  filter?: InputMaybe<UserRoleFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>
}

/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UserCondition>
  filter?: InputMaybe<UserFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UsersOrderBy>>
}

export type Recipe = Node & {
  __typename: 'Recipe'
  description?: Maybe<Scalars['String']['output']>
  garnish?: Maybe<Scalars['String']['output']>
  glass?: Maybe<Scalars['String']['output']>
  id: Scalars['Int']['output']
  ingredientText: Scalars['String']['output']
  instructions?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `RecipeIngredient`. */
  recipeIngredients: RecipeIngredientsConnection
  source?: Maybe<Scalars['String']['output']>
  ts?: Maybe<Scalars['FullText']['output']>
  /** Full-text search ranking when filtered by `ts`. */
  tsRank?: Maybe<Scalars['Float']['output']>
}

export type RecipeRecipeIngredientsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<RecipeIngredientCondition>
  filter?: InputMaybe<RecipeIngredientFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/** A condition to be used against `Recipe` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RecipeCondition = {
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `garnish` field. */
  garnish?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `glass` field. */
  glass?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `ingredientText` field. */
  ingredientText?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `instructions` field. */
  instructions?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `ts` field. */
  ts?: InputMaybe<Scalars['FullText']['input']>
}

/** A filter to be used against `Recipe` object types. All fields are combined with a logical ‘and.’ */
export type RecipeFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RecipeFilter>>
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>
  /** Filter by the object’s `garnish` field. */
  garnish?: InputMaybe<StringFilter>
  /** Filter by the object’s `glass` field. */
  glass?: InputMaybe<StringFilter>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Filter by the object’s `ingredientText` field. */
  ingredientText?: InputMaybe<StringFilter>
  /** Filter by the object’s `instructions` field. */
  instructions?: InputMaybe<StringFilter>
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>
  /** Negates the expression. */
  not?: InputMaybe<RecipeFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RecipeFilter>>
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>
  /** Filter by the object’s `ts` field. */
  ts?: InputMaybe<FullTextFilter>
}

export type RecipeIngredient = Node & {
  __typename: 'RecipeIngredient'
  amount?: Maybe<Scalars['BigFloat']['output']>
  id: Scalars['Int']['output']
  /** Reads a single `Ingredient` that is related to this `RecipeIngredient`. */
  ingredient?: Maybe<Ingredient>
  ingredientId: Scalars['Int']['output']
  modifier?: Maybe<Scalars['String']['output']>
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `Recipe` that is related to this `RecipeIngredient`. */
  recipe?: Maybe<Recipe>
  recipeId: Scalars['Int']['output']
  /** Reads a single `Unit` that is related to this `RecipeIngredient`. */
  unit?: Maybe<Unit>
  unitId: Scalars['Int']['output']
}

/**
 * A condition to be used against `RecipeIngredient` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type RecipeIngredientCondition = {
  /** Checks for equality with the object’s `amount` field. */
  amount?: InputMaybe<Scalars['BigFloat']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `ingredientId` field. */
  ingredientId?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `modifier` field. */
  modifier?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `recipeId` field. */
  recipeId?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `unitId` field. */
  unitId?: InputMaybe<Scalars['Int']['input']>
}

/** A filter to be used against `RecipeIngredient` object types. All fields are combined with a logical ‘and.’ */
export type RecipeIngredientFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigFloatFilter>
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RecipeIngredientFilter>>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Filter by the object’s `ingredientId` field. */
  ingredientId?: InputMaybe<IntFilter>
  /** Filter by the object’s `modifier` field. */
  modifier?: InputMaybe<StringFilter>
  /** Negates the expression. */
  not?: InputMaybe<RecipeIngredientFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RecipeIngredientFilter>>
  /** Filter by the object’s `recipeId` field. */
  recipeId?: InputMaybe<IntFilter>
  /** Filter by the object’s `unitId` field. */
  unitId?: InputMaybe<IntFilter>
}

/** An input for mutations affecting `RecipeIngredient` */
export type RecipeIngredientInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  ingredientId: Scalars['Int']['input']
  modifier?: InputMaybe<Scalars['String']['input']>
  recipeId: Scalars['Int']['input']
  unitId: Scalars['Int']['input']
}

/** Represents an update to a `RecipeIngredient`. Fields that are set will be updated. */
export type RecipeIngredientPatch = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  ingredientId?: InputMaybe<Scalars['Int']['input']>
  modifier?: InputMaybe<Scalars['String']['input']>
  recipeId?: InputMaybe<Scalars['Int']['input']>
  unitId?: InputMaybe<Scalars['Int']['input']>
}

/** A connection to a list of `RecipeIngredient` values. */
export type RecipeIngredientsConnection = {
  __typename: 'RecipeIngredientsConnection'
  /** A list of edges which contains the `RecipeIngredient` and cursor to aid in pagination. */
  edges: Array<RecipeIngredientsEdge>
  /** A list of `RecipeIngredient` objects. */
  nodes: Array<Maybe<RecipeIngredient>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `RecipeIngredient` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `RecipeIngredient` edge in the connection. */
export type RecipeIngredientsEdge = {
  __typename: 'RecipeIngredientsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `RecipeIngredient` at the end of the edge. */
  node?: Maybe<RecipeIngredient>
}

/** Methods to use when ordering `RecipeIngredient`. */
export enum RecipeIngredientsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IngredientByIngredientIdDescriptionAsc = 'INGREDIENT_BY_INGREDIENT_ID__DESCRIPTION_ASC',
  IngredientByIngredientIdDescriptionDesc = 'INGREDIENT_BY_INGREDIENT_ID__DESCRIPTION_DESC',
  IngredientByIngredientIdIdAsc = 'INGREDIENT_BY_INGREDIENT_ID__ID_ASC',
  IngredientByIngredientIdIdDesc = 'INGREDIENT_BY_INGREDIENT_ID__ID_DESC',
  IngredientByIngredientIdNameAsc = 'INGREDIENT_BY_INGREDIENT_ID__NAME_ASC',
  IngredientByIngredientIdNameDesc = 'INGREDIENT_BY_INGREDIENT_ID__NAME_DESC',
  IngredientByIngredientIdSortAsc = 'INGREDIENT_BY_INGREDIENT_ID__SORT_ASC',
  IngredientByIngredientIdSortDesc = 'INGREDIENT_BY_INGREDIENT_ID__SORT_DESC',
  IngredientByIngredientIdTagsAsc = 'INGREDIENT_BY_INGREDIENT_ID__TAGS_ASC',
  IngredientByIngredientIdTagsDesc = 'INGREDIENT_BY_INGREDIENT_ID__TAGS_DESC',
  IngredientIdAsc = 'INGREDIENT_ID_ASC',
  IngredientIdDesc = 'INGREDIENT_ID_DESC',
  ModifierAsc = 'MODIFIER_ASC',
  ModifierDesc = 'MODIFIER_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecipeByRecipeIdDescriptionAsc = 'RECIPE_BY_RECIPE_ID__DESCRIPTION_ASC',
  RecipeByRecipeIdDescriptionDesc = 'RECIPE_BY_RECIPE_ID__DESCRIPTION_DESC',
  RecipeByRecipeIdGarnishAsc = 'RECIPE_BY_RECIPE_ID__GARNISH_ASC',
  RecipeByRecipeIdGarnishDesc = 'RECIPE_BY_RECIPE_ID__GARNISH_DESC',
  RecipeByRecipeIdGlassAsc = 'RECIPE_BY_RECIPE_ID__GLASS_ASC',
  RecipeByRecipeIdGlassDesc = 'RECIPE_BY_RECIPE_ID__GLASS_DESC',
  RecipeByRecipeIdIdAsc = 'RECIPE_BY_RECIPE_ID__ID_ASC',
  RecipeByRecipeIdIdDesc = 'RECIPE_BY_RECIPE_ID__ID_DESC',
  RecipeByRecipeIdIngredientTextAsc = 'RECIPE_BY_RECIPE_ID__INGREDIENT_TEXT_ASC',
  RecipeByRecipeIdIngredientTextDesc = 'RECIPE_BY_RECIPE_ID__INGREDIENT_TEXT_DESC',
  RecipeByRecipeIdInstructionsAsc = 'RECIPE_BY_RECIPE_ID__INSTRUCTIONS_ASC',
  RecipeByRecipeIdInstructionsDesc = 'RECIPE_BY_RECIPE_ID__INSTRUCTIONS_DESC',
  RecipeByRecipeIdNameAsc = 'RECIPE_BY_RECIPE_ID__NAME_ASC',
  RecipeByRecipeIdNameDesc = 'RECIPE_BY_RECIPE_ID__NAME_DESC',
  RecipeByRecipeIdSourceAsc = 'RECIPE_BY_RECIPE_ID__SOURCE_ASC',
  RecipeByRecipeIdSourceDesc = 'RECIPE_BY_RECIPE_ID__SOURCE_DESC',
  RecipeByRecipeIdTsAsc = 'RECIPE_BY_RECIPE_ID__TS_ASC',
  RecipeByRecipeIdTsDesc = 'RECIPE_BY_RECIPE_ID__TS_DESC',
  RecipeIdAsc = 'RECIPE_ID_ASC',
  RecipeIdDesc = 'RECIPE_ID_DESC',
  UnitByUnitIdAsMlAsc = 'UNIT_BY_UNIT_ID__AS_ML_ASC',
  UnitByUnitIdAsMlDesc = 'UNIT_BY_UNIT_ID__AS_ML_DESC',
  UnitByUnitIdIdAsc = 'UNIT_BY_UNIT_ID__ID_ASC',
  UnitByUnitIdIdDesc = 'UNIT_BY_UNIT_ID__ID_DESC',
  UnitByUnitIdNameAsc = 'UNIT_BY_UNIT_ID__NAME_ASC',
  UnitByUnitIdNameDesc = 'UNIT_BY_UNIT_ID__NAME_DESC',
  UnitByUnitIdSortAsc = 'UNIT_BY_UNIT_ID__SORT_ASC',
  UnitByUnitIdSortDesc = 'UNIT_BY_UNIT_ID__SORT_DESC',
  UnitIdAsc = 'UNIT_ID_ASC',
  UnitIdDesc = 'UNIT_ID_DESC',
}

/** An input for mutations affecting `Recipe` */
export type RecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>
  garnish?: InputMaybe<Scalars['String']['input']>
  glass?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  ingredientText: Scalars['String']['input']
  instructions?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
  source?: InputMaybe<Scalars['String']['input']>
  ts?: InputMaybe<Scalars['FullText']['input']>
}

/** Represents an update to a `Recipe`. Fields that are set will be updated. */
export type RecipePatch = {
  description?: InputMaybe<Scalars['String']['input']>
  garnish?: InputMaybe<Scalars['String']['input']>
  glass?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  ingredientText?: InputMaybe<Scalars['String']['input']>
  instructions?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  source?: InputMaybe<Scalars['String']['input']>
  ts?: InputMaybe<Scalars['FullText']['input']>
}

/** A connection to a list of `Recipe` values. */
export type RecipesConnection = {
  __typename: 'RecipesConnection'
  /** A list of edges which contains the `Recipe` and cursor to aid in pagination. */
  edges: Array<RecipesEdge>
  /** A list of `Recipe` objects. */
  nodes: Array<Maybe<Recipe>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Recipe` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Recipe` edge in the connection. */
export type RecipesEdge = {
  __typename: 'RecipesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Recipe` at the end of the edge. */
  node?: Maybe<Recipe>
}

/** Methods to use when ordering `Recipe`. */
export enum RecipesOrderBy {
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  GarnishAsc = 'GARNISH_ASC',
  GarnishDesc = 'GARNISH_DESC',
  GlassAsc = 'GLASS_ASC',
  GlassDesc = 'GLASS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IngredientTextAsc = 'INGREDIENT_TEXT_ASC',
  IngredientTextDesc = 'INGREDIENT_TEXT_DESC',
  InstructionsAsc = 'INSTRUCTIONS_ASC',
  InstructionsDesc = 'INSTRUCTIONS_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecipeIngredientsByRecipeIdCountAsc = 'RECIPE_INGREDIENTS_BY_RECIPE_ID__COUNT_ASC',
  RecipeIngredientsByRecipeIdCountDesc = 'RECIPE_INGREDIENTS_BY_RECIPE_ID__COUNT_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  TsAsc = 'TS_ASC',
  TsDesc = 'TS_DESC',
  TsRankAsc = 'TS_RANK_ASC',
  TsRankDesc = 'TS_RANK_DESC',
}

export type Role = Node & {
  __typename: 'Role'
  authority: Scalars['String']['output']
  id: Scalars['Int']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `UserRole`. */
  userRoles: UserRolesConnection
}

export type RoleUserRolesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UserRoleCondition>
  filter?: InputMaybe<UserRoleFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>
}

/** A condition to be used against `Role` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RoleCondition = {
  /** Checks for equality with the object’s `authority` field. */
  authority?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
}

/** A filter to be used against `Role` object types. All fields are combined with a logical ‘and.’ */
export type RoleFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RoleFilter>>
  /** Filter by the object’s `authority` field. */
  authority?: InputMaybe<StringFilter>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Negates the expression. */
  not?: InputMaybe<RoleFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RoleFilter>>
}

/** An input for mutations affecting `Role` */
export type RoleInput = {
  authority: Scalars['String']['input']
  id?: InputMaybe<Scalars['Int']['input']>
}

/** Represents an update to a `Role`. Fields that are set will be updated. */
export type RolePatch = {
  authority?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
}

/** A connection to a list of `Role` values. */
export type RolesConnection = {
  __typename: 'RolesConnection'
  /** A list of edges which contains the `Role` and cursor to aid in pagination. */
  edges: Array<RolesEdge>
  /** A list of `Role` objects. */
  nodes: Array<Maybe<Role>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Role` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Role` edge in the connection. */
export type RolesEdge = {
  __typename: 'RolesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Role` at the end of the edge. */
  node?: Maybe<Role>
}

/** Methods to use when ordering `Role`. */
export enum RolesOrderBy {
  AuthorityAsc = 'AUTHORITY_ASC',
  AuthorityDesc = 'AUTHORITY_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserRolesByRoleIdCountAsc = 'USER_ROLES_BY_ROLE_ID__COUNT_ASC',
  UserRolesByRoleIdCountDesc = 'USER_ROLES_BY_ROLE_ID__COUNT_DESC',
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>
}

export type Unit = Node & {
  __typename: 'Unit'
  asMl?: Maybe<Scalars['BigFloat']['output']>
  id: Scalars['Int']['output']
  name: Scalars['String']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `RecipeIngredient`. */
  recipeIngredients: RecipeIngredientsConnection
  sort?: Maybe<Scalars['Int']['output']>
}

export type UnitRecipeIngredientsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<RecipeIngredientCondition>
  filter?: InputMaybe<RecipeIngredientFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/** A condition to be used against `Unit` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UnitCondition = {
  /** Checks for equality with the object’s `asMl` field. */
  asMl?: InputMaybe<Scalars['BigFloat']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `sort` field. */
  sort?: InputMaybe<Scalars['Int']['input']>
}

/** A filter to be used against `Unit` object types. All fields are combined with a logical ‘and.’ */
export type UnitFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UnitFilter>>
  /** Filter by the object’s `asMl` field. */
  asMl?: InputMaybe<BigFloatFilter>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>
  /** Negates the expression. */
  not?: InputMaybe<UnitFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UnitFilter>>
  /** Filter by the object’s `sort` field. */
  sort?: InputMaybe<IntFilter>
}

/** An input for mutations affecting `Unit` */
export type UnitInput = {
  asMl?: InputMaybe<Scalars['BigFloat']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  name: Scalars['String']['input']
  sort?: InputMaybe<Scalars['Int']['input']>
}

/** Represents an update to a `Unit`. Fields that are set will be updated. */
export type UnitPatch = {
  asMl?: InputMaybe<Scalars['BigFloat']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  sort?: InputMaybe<Scalars['Int']['input']>
}

/** A connection to a list of `Unit` values. */
export type UnitsConnection = {
  __typename: 'UnitsConnection'
  /** A list of edges which contains the `Unit` and cursor to aid in pagination. */
  edges: Array<UnitsEdge>
  /** A list of `Unit` objects. */
  nodes: Array<Maybe<Unit>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `Unit` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `Unit` edge in the connection. */
export type UnitsEdge = {
  __typename: 'UnitsEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `Unit` at the end of the edge. */
  node?: Maybe<Unit>
}

/** Methods to use when ordering `Unit`. */
export enum UnitsOrderBy {
  AsMlAsc = 'AS_ML_ASC',
  AsMlDesc = 'AS_ML_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecipeIngredientsByUnitIdCountAsc = 'RECIPE_INGREDIENTS_BY_UNIT_ID__COUNT_ASC',
  RecipeIngredientsByUnitIdCountDesc = 'RECIPE_INGREDIENTS_BY_UNIT_ID__COUNT_DESC',
  SortAsc = 'SORT_ASC',
  SortDesc = 'SORT_DESC',
}

/** All input for the `updateIngredientByNodeId` mutation. */
export type UpdateIngredientByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Ingredient` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `Ingredient` being updated. */
  patch: IngredientPatch
}

/** All input for the `updateIngredient` mutation. */
export type UpdateIngredientInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `Ingredient` being updated. */
  patch: IngredientPatch
}

/** The output of our update `Ingredient` mutation. */
export type UpdateIngredientPayload = {
  __typename: 'UpdateIngredientPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** The `Ingredient` that was updated by this mutation. */
  ingredient?: Maybe<Ingredient>
  /** An edge for our `Ingredient`. May be used by Relay 1. */
  ingredientEdge?: Maybe<IngredientsEdge>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
}

/** The output of our update `Ingredient` mutation. */
export type UpdateIngredientPayloadIngredientEdgeArgs = {
  orderBy?: InputMaybe<Array<IngredientsOrderBy>>
}

/** All input for the `updateRecipeByNodeId` mutation. */
export type UpdateRecipeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Recipe` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `Recipe` being updated. */
  patch: RecipePatch
}

/** All input for the `updateRecipeIngredientByNodeId` mutation. */
export type UpdateRecipeIngredientByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `RecipeIngredient` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `RecipeIngredient` being updated. */
  patch: RecipeIngredientPatch
}

/** All input for the `updateRecipeIngredient` mutation. */
export type UpdateRecipeIngredientInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `RecipeIngredient` being updated. */
  patch: RecipeIngredientPatch
}

/** The output of our update `RecipeIngredient` mutation. */
export type UpdateRecipeIngredientPayload = {
  __typename: 'UpdateRecipeIngredientPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Reads a single `Ingredient` that is related to this `RecipeIngredient`. */
  ingredient?: Maybe<Ingredient>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Recipe` that is related to this `RecipeIngredient`. */
  recipe?: Maybe<Recipe>
  /** The `RecipeIngredient` that was updated by this mutation. */
  recipeIngredient?: Maybe<RecipeIngredient>
  /** An edge for our `RecipeIngredient`. May be used by Relay 1. */
  recipeIngredientEdge?: Maybe<RecipeIngredientsEdge>
  /** Reads a single `Unit` that is related to this `RecipeIngredient`. */
  unit?: Maybe<Unit>
}

/** The output of our update `RecipeIngredient` mutation. */
export type UpdateRecipeIngredientPayloadRecipeIngredientEdgeArgs = {
  orderBy?: InputMaybe<Array<RecipeIngredientsOrderBy>>
}

/** All input for the `updateRecipe` mutation. */
export type UpdateRecipeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `Recipe` being updated. */
  patch: RecipePatch
}

/** The output of our update `Recipe` mutation. */
export type UpdateRecipePayload = {
  __typename: 'UpdateRecipePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Recipe` that was updated by this mutation. */
  recipe?: Maybe<Recipe>
  /** An edge for our `Recipe`. May be used by Relay 1. */
  recipeEdge?: Maybe<RecipesEdge>
}

/** The output of our update `Recipe` mutation. */
export type UpdateRecipePayloadRecipeEdgeArgs = {
  orderBy?: InputMaybe<Array<RecipesOrderBy>>
}

/** All input for the `updateRoleByAuthority` mutation. */
export type UpdateRoleByAuthorityInput = {
  authority: Scalars['String']['input']
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `Role` being updated. */
  patch: RolePatch
}

/** All input for the `updateRoleByNodeId` mutation. */
export type UpdateRoleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Role` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `Role` being updated. */
  patch: RolePatch
}

/** All input for the `updateRole` mutation. */
export type UpdateRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `Role` being updated. */
  patch: RolePatch
}

/** The output of our update `Role` mutation. */
export type UpdateRolePayload = {
  __typename: 'UpdateRolePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Role` that was updated by this mutation. */
  role?: Maybe<Role>
  /** An edge for our `Role`. May be used by Relay 1. */
  roleEdge?: Maybe<RolesEdge>
}

/** The output of our update `Role` mutation. */
export type UpdateRolePayloadRoleEdgeArgs = {
  orderBy?: InputMaybe<Array<RolesOrderBy>>
}

/** All input for the `updateUnitByNodeId` mutation. */
export type UpdateUnitByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `Unit` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `Unit` being updated. */
  patch: UnitPatch
}

/** All input for the `updateUnit` mutation. */
export type UpdateUnitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `Unit` being updated. */
  patch: UnitPatch
}

/** The output of our update `Unit` mutation. */
export type UpdateUnitPayload = {
  __typename: 'UpdateUnitPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `Unit` that was updated by this mutation. */
  unit?: Maybe<Unit>
  /** An edge for our `Unit`. May be used by Relay 1. */
  unitEdge?: Maybe<UnitsEdge>
}

/** The output of our update `Unit` mutation. */
export type UpdateUnitPayloadUnitEdgeArgs = {
  orderBy?: InputMaybe<Array<UnitsOrderBy>>
}

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  email: Scalars['String']['input']
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch
}

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch
}

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  id: Scalars['Int']['input']
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch
}

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename: 'UpdateUserPayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>
}

/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>
}

/** All input for the `updateUserRoleByNodeId` mutation. */
export type UpdateUserRoleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** The globally unique `ID` which will identify a single `UserRole` to be updated. */
  nodeId: Scalars['ID']['input']
  /** An object where the defined keys will be set on the `UserRole` being updated. */
  patch: UserRolePatch
}

/** All input for the `updateUserRole` mutation. */
export type UpdateUserRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>
  /** An object where the defined keys will be set on the `UserRole` being updated. */
  patch: UserRolePatch
  roleId: Scalars['Int']['input']
  userId: Scalars['Int']['input']
}

/** The output of our update `UserRole` mutation. */
export type UpdateUserRolePayload = {
  __typename: 'UpdateUserRolePayload'
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>
  /** Reads a single `Role` that is related to this `UserRole`. */
  role?: Maybe<Role>
  /** Reads a single `User` that is related to this `UserRole`. */
  user?: Maybe<User>
  /** The `UserRole` that was updated by this mutation. */
  userRole?: Maybe<UserRole>
  /** An edge for our `UserRole`. May be used by Relay 1. */
  userRoleEdge?: Maybe<UserRolesEdge>
}

/** The output of our update `UserRole` mutation. */
export type UpdateUserRolePayloadUserRoleEdgeArgs = {
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>
}

export type User = Node & {
  __typename: 'User'
  email: Scalars['String']['output']
  id: Scalars['Int']['output']
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads and enables pagination through a set of `UserRole`. */
  userRoles: UserRolesConnection
}

export type UserUserRolesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>
  before?: InputMaybe<Scalars['Cursor']['input']>
  condition?: InputMaybe<UserRoleCondition>
  filter?: InputMaybe<UserRoleFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>
}

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>
}

/** An input for mutations affecting `User` */
export type UserInput = {
  email: Scalars['String']['input']
  id?: InputMaybe<Scalars['Int']['input']>
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['Int']['input']>
}

export type UserRole = Node & {
  __typename: 'UserRole'
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output']
  /** Reads a single `Role` that is related to this `UserRole`. */
  role?: Maybe<Role>
  roleId: Scalars['Int']['output']
  /** Reads a single `User` that is related to this `UserRole`. */
  user?: Maybe<User>
  userId: Scalars['Int']['output']
}

/**
 * A condition to be used against `UserRole` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserRoleCondition = {
  /** Checks for equality with the object’s `roleId` field. */
  roleId?: InputMaybe<Scalars['Int']['input']>
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** A filter to be used against `UserRole` object types. All fields are combined with a logical ‘and.’ */
export type UserRoleFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserRoleFilter>>
  /** Negates the expression. */
  not?: InputMaybe<UserRoleFilter>
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserRoleFilter>>
  /** Filter by the object’s `roleId` field. */
  roleId?: InputMaybe<IntFilter>
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<IntFilter>
}

/** An input for mutations affecting `UserRole` */
export type UserRoleInput = {
  roleId: Scalars['Int']['input']
  userId: Scalars['Int']['input']
}

/** Represents an update to a `UserRole`. Fields that are set will be updated. */
export type UserRolePatch = {
  roleId?: InputMaybe<Scalars['Int']['input']>
  userId?: InputMaybe<Scalars['Int']['input']>
}

/** A connection to a list of `UserRole` values. */
export type UserRolesConnection = {
  __typename: 'UserRolesConnection'
  /** A list of edges which contains the `UserRole` and cursor to aid in pagination. */
  edges: Array<UserRolesEdge>
  /** A list of `UserRole` objects. */
  nodes: Array<Maybe<UserRole>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `UserRole` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `UserRole` edge in the connection. */
export type UserRolesEdge = {
  __typename: 'UserRolesEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `UserRole` at the end of the edge. */
  node?: Maybe<UserRole>
}

/** Methods to use when ordering `UserRole`. */
export enum UserRolesOrderBy {
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleByRoleIdAuthorityAsc = 'ROLE_BY_ROLE_ID__AUTHORITY_ASC',
  RoleByRoleIdAuthorityDesc = 'ROLE_BY_ROLE_ID__AUTHORITY_DESC',
  RoleByRoleIdIdAsc = 'ROLE_BY_ROLE_ID__ID_ASC',
  RoleByRoleIdIdDesc = 'ROLE_BY_ROLE_ID__ID_DESC',
  RoleIdAsc = 'ROLE_ID_ASC',
  RoleIdDesc = 'ROLE_ID_DESC',
  UserByUserIdEmailAsc = 'USER_BY_USER_ID__EMAIL_ASC',
  UserByUserIdEmailDesc = 'USER_BY_USER_ID__EMAIL_DESC',
  UserByUserIdIdAsc = 'USER_BY_USER_ID__ID_ASC',
  UserByUserIdIdDesc = 'USER_BY_USER_ID__ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
}

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename: 'UsersConnection'
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output']
}

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename: 'UsersEdge'
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>
  /** The `User` at the end of the edge. */
  node?: Maybe<User>
}

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserRolesByUserIdCountAsc = 'USER_ROLES_BY_USER_ID__COUNT_ASC',
  UserRolesByUserIdCountDesc = 'USER_ROLES_BY_USER_ID__COUNT_DESC',
}

export type DrinkFragment = {
  __typename: 'Recipe'
  name: string
  id: number
  description?: string | null
  instructions?: string | null
  ingredientText: string
  glass?: string | null
  garnish?: string | null
  source?: string | null
  recipeIngredients: {
    __typename: 'RecipeIngredientsConnection'
    nodes: Array<{
      __typename: 'RecipeIngredient'
      amount?: any | null
      ingredient?: { __typename: 'Ingredient'; name: string } | null
      unit?: { __typename: 'Unit'; name: string } | null
    } | null>
  }
}

export type GetAllDrinksQueryVariables = Exact<{ [key: string]: never }>

export type GetAllDrinksQuery = {
  __typename: 'Query'
  recipes?: {
    __typename: 'RecipesConnection'
    nodes: Array<{
      __typename: 'Recipe'
      name: string
      id: number
      description?: string | null
      instructions?: string | null
      ingredientText: string
      glass?: string | null
      garnish?: string | null
      source?: string | null
      recipeIngredients: {
        __typename: 'RecipeIngredientsConnection'
        nodes: Array<{
          __typename: 'RecipeIngredient'
          amount?: any | null
          ingredient?: { __typename: 'Ingredient'; name: string } | null
          unit?: { __typename: 'Unit'; name: string } | null
        } | null>
      }
    } | null>
  } | null
}

export type GetFilteredDrinksQueryVariables = Exact<{
  value: Scalars['String']['input']
}>

export type GetFilteredDrinksQuery = {
  __typename: 'Query'
  recipes?: {
    __typename: 'RecipesConnection'
    nodes: Array<{
      __typename: 'Recipe'
      name: string
      id: number
      description?: string | null
      instructions?: string | null
      ingredientText: string
      glass?: string | null
      garnish?: string | null
      source?: string | null
      recipeIngredients: {
        __typename: 'RecipeIngredientsConnection'
        nodes: Array<{
          __typename: 'RecipeIngredient'
          amount?: any | null
          ingredient?: { __typename: 'Ingredient'; name: string } | null
          unit?: { __typename: 'Unit'; name: string } | null
        } | null>
      }
    } | null>
  } | null
}

export type IngredientFragment = { __typename: 'Ingredient'; name: string; tags?: string | null }

export type GetAllIngredientsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllIngredientsQuery = {
  __typename: 'Query'
  ingredients?: {
    __typename: 'IngredientsConnection'
    nodes: Array<{ __typename: 'Ingredient'; name: string; tags?: string | null } | null>
  } | null
}

export type GetDrinkByIdQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetDrinkByIdQuery = {
  __typename: 'Query'
  recipe?: {
    __typename: 'Recipe'
    name: string
    id: number
    description?: string | null
    instructions?: string | null
    ingredientText: string
    glass?: string | null
    garnish?: string | null
    source?: string | null
    recipeIngredients: {
      __typename: 'RecipeIngredientsConnection'
      nodes: Array<{
        __typename: 'RecipeIngredient'
        amount?: any | null
        ingredient?: { __typename: 'Ingredient'; name: string } | null
        unit?: { __typename: 'Unit'; name: string } | null
      } | null>
    }
  } | null
}

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input']
}>

export type GetUserByEmailQuery = {
  __typename: 'Query'
  userByEmail?: { __typename: 'User'; id: number; email: string } | null
}

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input']
}>

export type GetUserByIdQuery = { __typename: 'Query'; user?: { __typename: 'User'; id: number; email: string } | null }

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput
}>

export type UpdateUserMutation = {
  __typename: 'Mutation'
  updateUser?: {
    __typename: 'UpdateUserPayload'
    user?: { __typename: 'User'; id: number; email: string } | null
  } | null
}

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllUsersQuery = {
  __typename: 'Query'
  users?: {
    __typename: 'UsersConnection'
    nodes: Array<{ __typename: 'User'; id: number; email: string } | null>
  } | null
}

export type UserFieldsFragment = { __typename: 'User'; id: number; email: string }

export const DrinkFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Drink' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ingredientText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'glass' } },
          { kind: 'Field', name: { kind: 'Name', value: 'garnish' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipeIngredients' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ingredient' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DrinkFragment, unknown>
export const IngredientFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Ingredient' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Ingredient' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<IngredientFragment, unknown>
export const UserFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'userFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFieldsFragment, unknown>
export const GetAllDrinksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllDrinks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'NAME_ASC' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Drink' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Drink' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ingredientText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'glass' } },
          { kind: 'Field', name: { kind: 'Name', value: 'garnish' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipeIngredients' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ingredient' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllDrinksQuery, GetAllDrinksQueryVariables>
export const GetFilteredDrinksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getFilteredDrinks' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'value' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipes' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ts' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'matches' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'value' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'NAME_ASC' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Drink' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Drink' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ingredientText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'glass' } },
          { kind: 'Field', name: { kind: 'Name', value: 'garnish' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipeIngredients' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ingredient' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFilteredDrinksQuery, GetFilteredDrinksQueryVariables>
export const GetAllIngredientsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllIngredients' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ingredients' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderBy' },
                value: { kind: 'EnumValue', value: 'NAME_ASC' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Ingredient' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Ingredient' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Ingredient' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>
export const GetDrinkByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getDrinkById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipe' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'Drink' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Drink' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Recipe' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ingredientText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'glass' } },
          { kind: 'Field', name: { kind: 'Name', value: 'garnish' } },
          { kind: 'Field', name: { kind: 'Name', value: 'source' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'recipeIngredients' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ingredient' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unit' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDrinkByIdQuery, GetDrinkByIdQueryVariables>
export const GetUserByEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUserByEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'userByEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'userFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'userFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>
export const GetUserByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getUserById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'userFields' } }],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'userFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>
export const UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUserInput' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'userFields' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'userFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>
export const GetAllUsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getAllUsers' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'userFields' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'userFields' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>
