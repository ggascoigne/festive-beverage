import * as React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { theme } from '@/components/Theme'
import { augmentDocumentWithEmotionCache } from './_app'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />

          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#000000' />

          <meta name='author' content='guy@wyrdrune.com' />
          <meta name='description' content='Do you want a Festive Beverage?' />

          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />

          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          <meta name='emotion-insertion-point' content='' />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

augmentDocumentWithEmotionCache(MyDocument)

export default MyDocument
