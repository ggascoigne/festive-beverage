import * as React from 'react'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Layout } from '#components/Layout'
import { NotificationProvider } from '#components/Notifications'
import { theme } from '#components/Theme'
import createEmotionCache from '#utils/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { user } = pageProps

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Festive Beverage</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <NotificationProvider>
            <UserProvider user={user}>
              <QueryClientProvider client={queryClient}>
                <Layout>
                  <Component {...pageProps} />
                  <ReactQueryDevtools />
                </Layout>
              </QueryClientProvider>
            </UserProvider>
          </NotificationProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
