import { UserProfile, useUser } from '@auth0/nextjs-auth0/client'
import { useCallback } from 'react'
import { useRoleOverride } from '@/components/Auth/useRoleOverride'
import rules, { Perms } from '@/components/Auth/PermissionRules'
import { checkMany } from '@/components/Auth/authUtils'

interface AuthInfo {
  roles?: string[]
  userId?: number
}

export interface Auth0User extends AuthInfo, UserProfile {}

export const useAuth = () => {
  const [roleOverride] = useRoleOverride()
  const userContext = useUser()
  const user = userContext.user as Auth0User
  const hasPermissions = useCallback(
    (perm: Perms, d?: any) => !!user && checkMany(rules, user.roles, perm, roleOverride, d),
    [roleOverride, user]
  )
  return {
    ...userContext,
    hasPermissions,
  }
}
