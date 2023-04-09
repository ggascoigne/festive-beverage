import React from 'react'

import { List, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'

import { ListItemLink } from './ListItemLink'
import type { RootRoutes } from './Routes'

import { HasPermission } from '../Auth'

interface MenuItemsProps {
  menuItems: RootRoutes
}

export const MenuItems: React.FC<MenuItemsProps> = ({ menuItems }) => {
  const router = useRouter()

  const activeItem = router.asPath

  return (
    <List>
      {menuItems
        // only display routes with a label
        .filter((menuItem) => menuItem.label)
        .filter((menuItem) => menuItem.condition === undefined || menuItem.condition)

        .map((menuItem) => {
          const link = menuItem.link ? menuItem.link : menuItem.path
          const item = (
            <ListItemLink key={link} href={{ pathname: link }} selected={activeItem === link}>
              <ListItemText primary={menuItem.label} secondary={menuItem.subText} />
            </ListItemLink>
          )
          if (menuItem.permission) {
            return (
              <HasPermission key={link} permission={menuItem.permission}>
                {item}
              </HasPermission>
            )
          }
          return item
        })}
    </List>
  )
}
