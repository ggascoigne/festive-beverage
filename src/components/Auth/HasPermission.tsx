import React from 'react'

import { useAuth } from './Auth0'
import type { Perms } from './PermissionRules'

interface PermissionProps {
  permission: Perms
  data?: any
  denied?: () => React.ReactElement | null
}

const nullOp = (): null => null

export const HasPermission: React.FC<PermissionProps> = ({ permission, data, children = null, denied = nullOp }) => {
  const { hasPermissions } = useAuth()
  const allowed = hasPermissions(permission, data)
  return allowed ? <>{children}</> : denied()
}

export const IsLoggedIn: React.FC = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  return isAuthenticated && !!user ? <>{children}</> : null
}

export const IsNotLoggedIn: React.FC = ({ children }) => {
  const { isAuthenticated, user } = useAuth()
  return isAuthenticated && !!user ? null : <>{children}</>
}
