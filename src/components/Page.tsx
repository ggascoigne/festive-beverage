import { useTheme } from '@mui/material'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      background: '#FFFFFF',
      position: 'relative',
      zIndex: 3,
    },
    mainRaised: {
      margin: '0px 20px 0px',
      borderRadius: '6px',
      boxShadow: theme.mixins.boxShadow.page,
      padding: theme.spacing(3),
    },
    small: {
      padding: 16,
    },
    smaller: {
      fontSize: '2.25rem',
      lineHeight: '1.5em',
      fontWeight: 300,
      color: 'inherit',
      marginTop: 20,
      marginBottom: 10,
    },
  })
)

interface PageProps {
  className?: string
  title: string
  titleElement?: ReactNode
  hideTitle?: boolean
  smaller?: boolean
}

export const Page: React.FC<PageProps> = ({
  children,
  className,
  title,
  titleElement,
  hideTitle = false,
  smaller = false,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <div
      className={clsx(
        {
          [classes.main]: true,
          [classes.mainRaised]: !fullScreen,
          [classes.small]: fullScreen,
        },
        className
      )}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {!hideTitle ? titleElement ? titleElement : <h1 className={classes.smaller}>{title}</h1> : null}
      {children}
    </div>
  )
}
