import {
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  MuiThemeProvider,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LoginMenu } from './components/LoginMenu'
import { MenuItems, SelectedContent, rootRoutes } from './components/Navigation'
import { theme } from './components/Theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '.MuiListItem-root.Mui-selected': {
        backgroundColor: 'rgba(0,0,0,0.18)',
      },
      'ul, ol': {
        fontSize: 14,
      },
    },
    // "@global": {
    //   // MUI typography elements use REMs, so you can scale the global
    //   // font size by setting the font-size on the <html> element.
    //   body: {
    //     [theme.breakpoints.down("sm")]: {
    //       fontWeight:400
    //     },
    //   }
    // },
    // "@global": {
    //   // MUI typography elements use REMs, so you can scale the global
    //   // font size by setting the font-size on the <html> element.
    //   html: {
    //     fontSize: 12.5,
    //     [theme.breakpoints.up("sm")]: {
    //       fontSize: 14
    //     },
    //     [theme.breakpoints.up("md")]: {
    //       fontSize: 16
    //     },
    //     [theme.breakpoints.up("lg")]: {
    //       fontSize: 18
    //     }
    //   }
    // },
    root: {
      display: 'flex',
      minHeight: '100vh',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      minHeight: '100vh',
      width: '100%',
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    list: {
      fontSize: '14px',
      margin: 0,
      paddingLeft: '0',
      listStyle: 'none',
      paddingTop: '0',
      paddingBottom: '0',
      color: 'inherit',
    },
    listItem: {
      float: 'left',
      color: 'inherit',
      position: 'relative',
      display: 'block',
      width: 'auto',
      margin: '0',
      padding: '0',
    },
    listItemText: {
      padding: '0 !important',
    },
  })
)

const DrawerContents: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <MenuItems menuItems={rootRoutes} />
      <div style={{ height: '100%' }} />
      <Footer />
    </>
  )
}

const RightMenu: React.FC<{ small?: boolean }> = (props) => {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <LoginMenu {...props} />
      </ListItem>
    </List>
  )
}

export const App: React.FC = React.memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen)
  }, [mobileOpen])

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Header handleDrawerToggle={handleDrawerToggle} rightMenu={RightMenu} />
        <Drawer
          variant='temporary'
          anchor='left'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerContents />
          <Divider />
          <RightMenu small />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <SelectedContent routes={rootRoutes} />
        </main>
      </MuiThemeProvider>
    </div>
  )
})
