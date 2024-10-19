import React from 'react'

import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

import { Link, LinkProps } from '#components/Navigation/Link'

// FYI see the composition examples at https://material-ui.com/guides/composition/#button

export const ListItemLink: React.FC<ListItemButtonProps & LinkProps> = ({ children, ...rest }) => (
  <ListItemButton {...rest} component={Link}>
    {children}
  </ListItemButton>
)
