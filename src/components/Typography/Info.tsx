import React from 'react'

import { Children } from '../../utils'
import { useTypographyStyles } from './typographyStyle'

export const Info: React.FC<Children> = (props) => {
  const { classes } = useTypographyStyles()
  const { children } = props
  return <div className={`${classes.defaultFontStyle} ${classes.infoText}`}>{children}</div>
}
