import { AppBar, IconButton, Theme, Toolbar, Typography, createStyles, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Config, useGetConfig } from 'utils'

import { HasPermission, Perms } from './Auth'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)

interface HeaderProps {
  handleDrawerToggle: () => void
  rightMenu: (props?: any) => ReactNode
}

export const Header: React.FC<HeaderProps> = ({ handleDrawerToggle, rightMenu }) => {
  const classes = useStyles()

  const [config, getConfig] = useGetConfig()
  const [configDetails, setConfigDetails] = useState('')

  useEffect(() => {
    getConfig()
  }, [getConfig])

  useEffect(() => {
    const getConfigDetails = (config: Config | undefined, href: string | undefined) => {
      if (href?.includes('festivebeverage.com')) return ''
      return !config ? '' : config.local ? '(local)' : '(prod)'
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
