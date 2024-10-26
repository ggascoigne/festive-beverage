import React, { useCallback, useEffect, useMemo, useState } from 'react'

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { QueryClient } from '@tanstack/react-query'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Auth0User, Perms, Roles, useAuth, useRoleOverride } from './Auth'
import { LoginMenu } from './LoginMenu'
import { useNotification } from './Notifications'

import { Children } from '#utils'

const MENU_ITEM_EDIT_PROFILE = 'Edit Profile'
const MENU_ITEM_RESET_PASSWORD = 'Password Reset'
const MENU_ITEM_VIEW_AS_USER = 'View as Regular User'
const MENU_ITEM_VIEW_AS_ADMIN = 'View as Admin'
const MENU_ITEM_SIGN_OUT = 'Sign out'

interface ProfileImageProps {
  user: Auth0User
}

const OurAvatar: React.FC<ProfileImageProps> = ({ user }) => {
  if (user.picture) {
    return <Avatar src={user.picture} />
  }
  const initials = user.nickname ? user.nickname[0] : '...'
  return <Avatar>{initials}</Avatar>
}

const AdminBadge: React.FC<Children> = ({ children }) => (
  <Tooltip title='Site Administrator'>
    <Badge
      overlap='circular'
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      badgeContent={<VerifiedUserIcon sx={{ color: '#fcc60a', width: '18px', height: '18px' }} />}
    >
      {children}
    </Badge>
  </Tooltip>
)

const ProfileImage: React.FC<ProfileImageProps> = ({ user }) => {
  const { hasPermissions } = useAuth()
  const isAdmin = hasPermissions(Perms.IsAdmin)

  if (isAdmin) {
    return (
      <AdminBadge>
        <OurAvatar user={user} />
      </AdminBadge>
    )
  }
  return <OurAvatar user={user} />
}

interface MenuButtonProps {
  user: Auth0User
  size: 'normal' | 'small' | 'tiny'
}

const MenuButton: React.FC<MenuButtonProps> = ({ size, user }) => {
  const unverified = user.email_verified ? '' : ' (unverified)'
  switch (size) {
    case 'tiny':
      return <ProfileImage user={user} />
    case 'small':
      return (
        <>
          <ProfileImage user={user} />
          <Typography component='span' sx={{ textTransform: 'none', padding: 2 }}>
            {user.email}
            {unverified}
          </Typography>
        </>
      )
    case 'normal':
    default:
      return (
        <>
          <Typography component='span' sx={{ textTransform: 'none', padding: 2 }}>
            {user.email}
            {unverified}
          </Typography>
          <ProfileImage user={user} />
        </>
      )
  }
}

interface LoginMenuProps {
  size: 'normal' | 'small' | 'tiny'
}

export const LoginButton: React.FC<LoginMenuProps> = ({ size = 'normal' }) => {
  const { isLoading = true, user, hasPermissions } = useAuth()
  const notify = useNotification()
  const [authInitialized, setAuthInitialized] = useState(false)
  const [roleOverride, setRoleOverride] = useRoleOverride()
  const queryClient = new QueryClient()
  const router = useRouter()

  useEffect(() => setAuthInitialized(!isLoading), [isLoading])

  const menuItems = useMemo(() => {
    const menu = [MENU_ITEM_EDIT_PROFILE]
    if (user?.sub?.startsWith('auth0')) menu.push(MENU_ITEM_RESET_PASSWORD)
    if (hasPermissions(Perms.IsAdmin, { ignoreOverride: true })) {
      if (!roleOverride) {
        menu.push(MENU_ITEM_VIEW_AS_USER)
      } else {
        menu.push(MENU_ITEM_VIEW_AS_ADMIN)
      }
    }
    menu.push(MENU_ITEM_SIGN_OUT)
    return menu
  }, [hasPermissions, roleOverride, user?.sub])

  const resetPassword = useCallback(() => {
    fetch(`${window.location.origin}/api/resetPassword`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((responseBody) => {
        try {
          const result = JSON.parse(responseBody)
          notify({
            text: result.message,
            variant: 'success',
          })
        } catch (e: any) {
          console.log(e)
          notify({
            text: e,
            variant: 'error',
          })
        }
        return responseBody
      })
  }, [notify])

  const viewAsUser = () => {
    if (!roleOverride) {
      setRoleOverride(Roles.ROLE_USER)
    } else {
      setRoleOverride(undefined)
    }
  }

  // @ts-ignore
  return user ? (
    <>
      <LoginMenu
        buttonText={<MenuButton size={size} user={user!} />}
        buttonProps={{
          /*  @ts-ignore */
          sx: (theme: Theme) => ({
            color: 'inherit',
            position: 'relative',
            padding: '0 18px 0 0.9375rem',
            marginRight: '7px',
            fontWeight: 400,
            fontSize: '14px',
            textTransform: 'uppercase',
            borderRadius: '3px',
            lineHeight: '20px',
            textDecoration: 'none',
            margin: '0px',
            display: 'inline-flex',
            '&:hover,&:focus': {
              color: 'inherit',
              background: 'rgba(200, 200, 200, 0.2)',
            },
            [theme.breakpoints.down('md')]: {
              width: 'calc(100% - 30px)',
              marginBottom: '8px',
              marginTop: '8px',
              textAlign: 'left',
              '& > span:first-of-type': {
                justifyContent: 'flex-start',
              },
            },
          }),
        }}
        dropdownList={menuItems}
        onClick={(prop: string) => {
          switch (prop) {
            case MENU_ITEM_VIEW_AS_ADMIN:
            case MENU_ITEM_VIEW_AS_USER:
              viewAsUser()
              break
            case MENU_ITEM_RESET_PASSWORD:
              resetPassword()
              break
            case MENU_ITEM_SIGN_OUT:
            default:
              queryClient.clear()
              router.push('/api/auth/logout')
              break
          }
        }}
      />
    </>
  ) : (
    <Button
      disabled={!authInitialized}
      sx={{
        position: 'relative',
        fontWeight: 400,
        textTransform: 'uppercase',
        fontSize: '12px',
        lineHeight: '20px',
        textDecoration: 'none',
        marginRight: '20px',
        display: 'inline-flex',
        padding: '12px 30px',
        color: 'inherit',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
          color: 'inherit',
          background: 'transparent',
          boxShadow: 'none',
        },
      }}
      component={Link}
      href='/api/auth/login'
    >
      Login
    </Button>
  )
}
