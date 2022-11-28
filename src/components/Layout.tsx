import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LoginButton } from '@/components/LoginButton'
import { MenuItems, rootRoutes } from '@/components/Navigation'
import { makeStyles } from '@/utils/makeStyles'
import { Divider, Drawer, List, ListItem, Theme } from '@mui/material'
import React, { useCallback, useState } from 'react'

// @ts-ignore
const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    minHeight: '100vh',
    width: '100%',
    flexGrow: 1,
    // paddingTop: theme.spacing(3),
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
}))

const DrawerContents: React.FC = () => {
  const { classes } = useStyles()
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

const RightMenu: React.FC<{ size: 'normal' | 'small' | 'tiny' }> = (props) => {
  const { classes } = useStyles()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <LoginButton {...props} />
      </ListItem>
    </List>
  )
}

export const Layout: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen)
  }, [mobileOpen])

  const { classes } = useStyles()

  return (
    <div className={classes.root}>
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
        <RightMenu size='small' />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
})
