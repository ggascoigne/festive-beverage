import type React from 'react'

import type { ListItemButtonProps } from '@mui/material/ListItemButton'
import ListItemButton from '@mui/material/ListItemButton'

import type { LinkProps } from '@/components/Navigation/Link'
import { Link } from '@/components/Navigation/Link'

// FYI see the composition examples at https://material-ui.com/guides/composition/#button

export const ListItemLink: React.FC<ListItemButtonProps & LinkProps> = ({ children, ...rest }) => (
  <ListItemButton {...rest} component={Link}>
    {children}
  </ListItemButton>
)
