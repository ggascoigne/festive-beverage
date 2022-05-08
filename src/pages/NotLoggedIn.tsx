import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import { useAuth } from '../components/Auth'
import { Page } from '../components/Page'

export const NotLoggedIn = () => {
  const { isInitializing = true, loginWithRedirect } = useAuth()
  const [authInitialized, setAuthInitialized] = useState(false)

  useEffect(() => setAuthInitialized(!isInitializing), [isInitializing])

  const login = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      return loginWithRedirect && (await loginWithRedirect())
    },
    [loginWithRedirect]
  )

  return (
    <Page title='Festive Beverages'>
      <p>
        You need to Login to see this site. If you don't have an account then email the admin for instructions. If you
        don't know who the admin is, then you are not authorized to use this site.
      </p>
      <Button disabled={!authInitialized} variant='contained' color='primary' onClick={login}>
        Login
      </Button>
    </Page>
  )
}
