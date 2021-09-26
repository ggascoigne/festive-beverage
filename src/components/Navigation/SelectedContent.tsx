import { NotFound } from 'pages'
import React, { Suspense, useMemo } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { ErrorBoundary } from '../ErrorBoundary'
import { Loader } from '../Loader'
import type { RootRoutes } from './Routes'

export const SelectedContent: React.FC<{ routes: RootRoutes }> = ({ routes }) => {
  const loader = <Loader />
  const results = useMemo(
    () =>
      routes
        .filter((menuItem) => menuItem.condition === undefined || menuItem.condition)
        .map((route, index) => {
          if (route.redirect) {
            return (
              <Route
                exact={route.exact}
                path={route.path}
                render={() => <Redirect to={route.redirect!} />}
                key={index}
              />
            )
          } else {
            return <Route exact={route.exact} path={route.path} component={route.component!} key={index} />
          }
        }),
    [routes]
  )

  return (
    <ErrorBoundary>
      <Suspense fallback={loader}>
        <Switch>
          {results}
          <Route path='*' component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
