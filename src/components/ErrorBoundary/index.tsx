import React from 'react'
import { ErrorBoundary as Reb } from 'react-error-boundary'

import { Children } from '../../utils'
import { ErrorMessage } from './ErrorMessage'

export const ErrorBoundary: React.FC<Children> = ({ children }) => (
  <Reb FallbackComponent={ErrorMessage}>{children}</Reb>
)
