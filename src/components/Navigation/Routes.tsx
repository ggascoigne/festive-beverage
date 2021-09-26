import React from 'react'

import { Home } from '../../pages/Home'
import { Perms } from '../Auth'

// note that entries are only displayed if they have a label
export interface RouteInfo {
  path: string
  label?: string
  link?: string
  subText?: string
  exact: boolean
  redirect?: string
  component?: React.ComponentType<any>
  permission?: Perms
  condition?: boolean
  alwaysAddRoute?: boolean
}

export type RootRoutes = RouteInfo[]

export const rootRoutes: RootRoutes = [
  {
    path: '/',
    label: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/graphiql',
    label: 'GraphiQL',
    subText: 'Dynamically query the database',
    exact: false,
    component: React.lazy(() => import('components/GraphiQL/GraphiQL')),
    permission: Perms.GraphiqlLoad,
  },
]
