import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'

import { Page } from '@/components/Page'

const OfflinePage: NextPage = () => (
  <Page title='Offline'>
    <Box sx={{ py: 4 }}>
      <Typography gutterBottom variant='h5'>
        You are offline.
      </Typography>
      <Typography>
        Festive Beverage is unavailable right now. Reconnect to refresh recipes and search results.
      </Typography>
    </Box>
  </Page>
)

export default OfflinePage
