import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

import { Page } from '#components/Page'

export const NotFound = () => (
  <Page title='Not Found'>
    <Alert severity='error'>
      <b>404:</b> Page not found...
    </Alert>
    <Typography variant='body1' color='inherit'>
      Sorry, that link no longer exists.
    </Typography>
  </Page>
)
