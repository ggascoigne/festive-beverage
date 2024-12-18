import { ReactNode } from 'react'

import { O } from 'ts-toolbelt'
import { Key } from 'ts-toolbelt/out/Any/Key'
import { List } from 'ts-toolbelt/out/List/List'

export type Maybe<T> = T | null | undefined

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

// from https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type
// expands object types one level deep
export type Expand<T> = T extends infer R ? { [K in keyof R]: R[K] } : never

// expands object types recursively
export type ExpandRecursively<T> =
  T extends Record<string, unknown> ? (T extends infer R ? { [K in keyof R]: ExpandRecursively<R[K]> } : never) : T

// Cool trick
// eslint-disable-next-line @typescript-eslint/naming-convention
type _<T> = T
export type FlattenTypes<T> = _<{ [k in keyof T]: T[k] }>

export type MaybeNodes<T> = Array<Maybe<T>> | undefined

export type Nodes<T> = Array<Maybe<T>>

export type Edges<T> = Array<{ node: Maybe<T> }>

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

// extract the type from an array
export type UnpackArray<T> = T extends (infer U)[] ? U : T

// extract the type of an object property
export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

// typesafe filter to use in .filter(notEmpty) dropping nulls in a type safe manner
export function notEmpty<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export type ContentsOf<T, K extends keyof T> = NonNullable<UnpackArray<T[K]>>

// https://realfiction.net/2019/02/03/typescript-type-shenanigans-2-specify-at-least-one-property
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

// https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

export type GqlType<T, V extends List<Key>> = NonNullable<O.Path<T, V>>

export type ToFormValues<T extends { __typename: string; id?: number; nodeId?: string }> = Omit<
  T,
  'nodeId' | 'id' | '__typename'
> &
  Partial<Pick<T, 'nodeId' | 'id'>>

// There are a lot of places where the obvious change would be to reference Record<string,unknown> but we pass objects
// defined by interface rather than by type in a lot of places (in generated code that's tricky to change) When you do
// that, you get tsc errors about Index Signatures missing. This is an issue with TypeScript interfaces in general: a
// specific interface cannot be saved into a more generic interface. However, a specific type can be saved into a more
// generic type.  Using the ObjectOf construct enforces the object extension without falling into this trap.

export type ObjectOf<T> = { [P in keyof T]: T[P] }

export interface Children {
  children?: ReactNode | undefined
}
