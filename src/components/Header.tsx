import { AppBar, Hidden, IconButton, Theme, Toolbar, Typography, createStyles, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import React, { ReactNode, useEffect, useState } from 'react'
import { Config, useGetConfig } from 'utils'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flex: '1 1 auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: drawerWidth,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
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
      if (href?.startsWith('https://festivebeverage.com')) return ''
      return !config ? '' : config.local ? '(local)' : '(prod)'
    }

    setConfigDetails(getConfigDetails(config, window.location.href))
  }, [config])

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          aria-label='Open drawer'
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' color='inherit' noWrap>
          Festive Beverage
        </Typography>
        &nbsp;{configDetails}
      </Toolbar>
      <Hidden smDown implementation='css'>
        {rightMenu()}
      </Hidden>
    </AppBar>
  )
}
