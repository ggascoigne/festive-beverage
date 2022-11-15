import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Config, useGetConfig } from 'utils'

import { makeStyles } from '../utils/makeStyles'
import { HasPermission, Perms } from './Auth'

const useStyles = makeStyles()((theme: Theme) => ({
  appBar: {
    flex: '1 1 auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 20,
  },
  toolbar: {
    width: '100%',
  },
}))

interface HeaderProps {
  handleDrawerToggle: () => void
  rightMenu: (props?: any) => ReactNode
}

export const Header: React.FC<HeaderProps> = ({ handleDrawerToggle, rightMenu }) => {
  const { classes } = useStyles()

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
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <HasPermission permission={Perms.IsAdmin}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
            size='large'
          >
            <MenuIcon />
          </IconButton>
        </HasPermission>
        <Link to='/' style={{ color: 'white' }}>
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
