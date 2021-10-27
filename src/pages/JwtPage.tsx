import { Grid } from '@material-ui/core'
import React, { Suspense } from 'react'

import { useAuth } from '../components/Auth'
import { Loader } from '../components/Loader'
import { Page } from '../components/Page'
import { formatRemaining, formatUnixTime } from '../utils/timeUtils'

const ReactJson = React.lazy(() => import('react-json-view'))

export const JwtPage = () => {
  const { user } = useAuth()
  const token = user?.decodedToken
  if (token) {
    return (
      <Page title='JWT Details'>
        <Suspense fallback={<Loader />}>
          <ReactJson src={token} indentWidth={2} enableClipboard={false} sortKeys />
          <Grid container>
            <Grid item xs={2}>
              Issued at:
            </Grid>
            <Grid item xs={10}>
              {formatUnixTime(token.iat!)}
            </Grid>
            <Grid item xs={2}>
              Expires at:
            </Grid>
            <Grid item xs={10}>
              {formatUnixTime(token.exp!)}
            </Grid>
            <Grid item xs={2}>
              Expires in:
            </Grid>
            <Grid item xs={10}>
              {formatRemaining(token.exp!)}
            </Grid>
          </Grid>
        </Suspense>
      </Page>
    )
  } else {
    return null
  }
}
