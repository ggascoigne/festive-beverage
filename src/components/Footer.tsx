import React, { Suspense } from 'react'

import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import { DateTime } from 'luxon'

import { HasPermission, Perms, useAuth } from './Auth'
import { Loader } from './Loader'

import { api } from '#utils/api.ts'
import { gitHash } from '#version'

const ReactJson = React.lazy(() => import('react-json-view'))

const containerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
}
const container = {
  ...containerFluid,
  '@media (min-width: 576px)': {
    maxWidth: '540px',
  },
  '@media (min-width: 768px)': {
    maxWidth: '720px',
  },
  '@media (min-width: 992px)': {
    maxWidth: '960px',
  },
  '@media (min-width: 1200px)': {
    maxWidth: '1140px',
  },
}

export const Footer: React.FC = (_props) => {
  const { hasPermissions } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const { data: config } = api.config.getConfig.useQuery(undefined, {
    staleTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (hasPermissions(Perms.IsAdmin)) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const hash = gitHash.hash.length > 0 ? gitHash.hash.substring(0, 8) : 'dev'
  const open = Boolean(anchorEl)
  const commitDate = DateTime.fromISO(gitHash.date)
  const id = open ? 'simple-popover' : undefined
  return (
    <Box
      component='footer'
      sx={{ padding: '0.9375rem 0', textAlign: 'center', display: 'flex', zIndex: 2, position: 'relative' }}
    >
      <Box sx={{ ...container, fontSize: '0.75rem' }}>
        <HasPermission permission={Perms.IsAdmin}>
          {open && (
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ padding: '20px' }}>
                <h3>Site configuration</h3>
                <Suspense fallback={<Loader />}>
                  <ReactJson
                    src={{
                      commitDate: commitDate.toLocaleString(DateTime.DATETIME_FULL),
                      config,
                    }}
                    enableClipboard={false}
                    indentWidth={2}
                  />
                </Suspense>
              </Box>
            </Popover>
          )}
        </HasPermission>
        <Box component='span' sx={{ cursor: 'pointer' }} onClick={handleClick}>
          {hash}
        </Box>{' '}
        | &copy; {DateTime.fromJSDate(new Date()).year} festivebeverage.com
      </Box>
    </Box>
  )
}
