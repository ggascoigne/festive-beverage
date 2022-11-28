import React from 'react'

import { Children } from '../../utils'
import { useTypographyStyles } from './typographyStyle'

export const Warning: React.FC<Children> = (props) => {
  const { classes } = useTypographyStyles()
  const { children } = props
  return <div className={classes.defaultFontStyle + ' ' + classes.warningText}>{children}</div>
}
