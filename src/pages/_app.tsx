import { useEffect } from 'react'

import { Auth0Provider } from '@auth0/nextjs-auth0/client'
import type { EmotionCache } from '@emotion/react'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Layout } from '@/components/Layout'
import { NotificationProvider } from '@/components/Notifications'
import { SerwistProvider } from '@/components/SerwistProvider'
import { theme } from '@/components/Theme'
import { api } from '@/utils/api'
import createEmotionCache from '@/utils/createEmotionCache'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  useEffect(() => {
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
          <link rel='manifest' href='/manifest.json' />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <NotificationProvider>
            <Auth0Provider user={pageProps.user}>
              <SerwistProvider swUrl='/serwist/sw.js'>
                <Layout>
                  <Component {...pageProps} />
                  <ReactQueryDevtools />
                </Layout>
              </SerwistProvider>
            </Auth0Provider>
          </NotificationProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
