import React, { useCallback, useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import { Footer } from '#components/Footer'
import { Header } from '#components/Header'
import { LoginButton } from '#components/LoginButton'
import { MenuItems, rootRoutes } from '#components/Navigation'

const DrawerContents: React.FC = () => (
  <>
    <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />
    <Divider />
    <MenuItems menuItems={rootRoutes} />
    <Box sx={{ height: '100%' }} />
    <Footer />
  </>
)

const RightMenu = (props: { size: 'normal' | 'small' | 'tiny' }) => (
  <List
    sx={{
      fontSize: '14px',
      m: 0,
      listStyle: 'none',
      pl: '0',
      pt: '0',
      pb: '0',
      color: 'inherit',
    }}
  >
    <ListItem
      sx={{
        float: 'left',
        color: 'inherit',
        position: 'relative',
        display: 'block',
        width: 'auto',
        m: 0,
        p: 0,
      }}
    >
      <LoginButton {...props} />
    </ListItem>
  </List>
)

export const Layout: React.FC<{ children: React.ReactNode }> = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = useCallback(() => {
      setMobileOpen(!mobileOpen)
    }, [mobileOpen])

    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
        <Box component='main' sx={{ minHeight: '100vh', width: '100%', flexGrow: 1, paddingBottom: 3 }}>
          <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />
          {children}
        </Box>
      </Box>
    )
  }
)
