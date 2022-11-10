import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
///<reference types="webpack-env" />
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { Auth0Provider } from './components/Auth'
import { NotificationProvider } from './components/Notifications'
import { theme } from './components/Theme'
import { Children } from './utils'

// Usage
// window.toggleDevtools(true)

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
)

// import { useAxe } from './utils/useAxe'

// import registerServiceWorker from './utils/registerServiceWorker'

const queryClient = new QueryClient()

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
})

const RootComponent: React.FC<Children> = ({ children }) => {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  // useAxe()
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CacheProvider value={muiCache}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NotificationProvider>
                <Auth0Provider>
                  <QueryClientProvider client={queryClient}>
                    <Helmet defaultTitle='Festive Beverage' titleTemplate='Festive Beverage - %s'>
                      <html lang='en' />
                    </Helmet>
                    {children}
                    <ReactQueryDevtools />
                    {showDevtools ? (
                      <React.Suspense fallback={null}>
                        <ReactQueryDevtoolsProduction />
                      </React.Suspense>
                    ) : null}
                  </QueryClientProvider>
                </Auth0Provider>
              </NotificationProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </CacheProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

const render = (Component: React.ComponentType) =>
  root.render(
    <RootComponent>
      <Component />
    </RootComponent>
  )

render(App)

// registerServiceWorker()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
