import { Theme } from '@mui/material/styles'
import React from 'react'
import DotLoader from 'react-spinners/DotLoader'

import { makeStyles } from '@/utils/makeStyles'

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: '1 0 auto',
  },
  tiny: {
    display: 'inline-block',
    paddingLeft: 8,
    marginTop: -3,
    marginBottom: -3,
    '& > .sk-chasing-dots': {
      height: 20,
      width: 20,
    },
  },
}))

interface ILoader {
  error?: boolean
  retry?: (event: React.MouseEvent<HTMLElement>) => void
  timedOut?: boolean
  pastDelay?: boolean
  tiny?: boolean
}

export const Loader: React.FC<ILoader> = ({ error, retry, timedOut, pastDelay, tiny = false }) => {
  const { classes, cx } = useStyles()
  return (
    <div className={cx({ [classes.root]: !tiny, [classes.tiny]: tiny })}>
      {error && (
        <div>
          Error! <button onClick={retry}>Retry</button>
        </div>
      )}
      {timedOut && (
        <div>
          Taking a long time... <button onClick={retry}>Retry</button>
        </div>
      )}
      {pastDelay && <div>Loading...</div>}
      <DotLoader
        color='#3f51b5'
        loading
        cssOverride={{ margin: '16px' }}
        size={32}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  )
}
