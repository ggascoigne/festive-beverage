import ListItem, { ListItemProps } from '@mui/material/ListItem'
import React from 'react'
import Link, { LinkProps } from '@/components/Link'

// FYI see the composition examples at https://material-ui.com/guides/composition/#button

export const ListItemLink: React.FC<ListItemProps & LinkProps> = ({ children, ...rest }) => (
  // @ts-ignore
  // @ts-ignore
  <ListItem {...rest} component={Link}>
    {children}
  </ListItem>
)
