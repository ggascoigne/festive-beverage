import { Perms } from '../Auth'

// note that entries are only displayed if they have a label
export interface RouteInfo {
  path: string
  label?: string
  link?: string
  subText?: string
  exact: boolean
  redirect?: string
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
  },
]
