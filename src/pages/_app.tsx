import { EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { UserProvider } from '@auth0/nextjs-auth0'
import { createEmotionSsrAdvancedApproach } from 'tss-react/next'
import { theme } from '@/components/Theme'
import { NotificationProvider } from '@/components/Notifications'
import { Layout } from '@/components/Layout'

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({ key: 'css' })

export { augmentDocumentWithEmotionCache }

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
)

const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props
  const { user } = pageProps
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <>
      <Head>
        <title>Festive Beverage</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
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
                {showDevtools ? (
                  <React.Suspense fallback={null}>
                    <ReactQueryDevtoolsProduction />
                  </React.Suspense>
                ) : null}
              </Layout>
            </QueryClientProvider>
          </UserProvider>
        </NotificationProvider>
      </ThemeProvider>
    </>
  )
}

export default withAppEmotionCache(MyApp)
