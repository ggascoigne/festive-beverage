import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { Config, useGetConfig } from 'utils'
import Link from '@/components/Link'
import { HasPermission, Perms } from './Auth'

interface HeaderProps {
  handleDrawerToggle: () => void
  rightMenu: (props?: any) => ReactNode
}

export const Header: React.FC<HeaderProps> = ({ handleDrawerToggle, rightMenu }) => {
  const [config, getConfig] = useGetConfig()
  const [configDetails, setConfigDetails] = useState('')

  useEffect(() => {
    getConfig()
  }, [getConfig])

  useEffect(() => {
    const getConfigDetails = (conf: Config | undefined, href: string | undefined) => {
      if (href?.includes('festivebeverage.com')) return ''
      return !conf ? '' : conf.local ? '(local)' : '(prod)'
    }

    setConfigDetails(getConfigDetails(config, window.location.href))
  }, [config])

  return (
    <AppBar
      position='fixed'
      sx={{ flex: '1 1 auto', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Toolbar sx={{ width: '100%' }}>
        <HasPermission permission={Perms.IsAdmin}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={handleDrawerToggle}
            sx={{ marginRight: '20px' }}
            size='large'
          >
            <MenuIcon />
          </IconButton>
        </HasPermission>
        <Link href='/' style={{ color: 'white' }}>
          <Typography variant='h6' color='inherit' noWrap>
            Festive Beverage
          </Typography>
        </Link>
        &nbsp;{configDetails}
      </Toolbar>
      {rightMenu({ size: 'tiny' })}
    </AppBar>
  )
}
