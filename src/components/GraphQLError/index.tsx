import Typography from '@mui/material/Typography'
import { QueryError } from 'client'
import React from 'react'

import { Theme } from '@mui/material'
import { makeStyles } from '@/utils/makeStyles'

export const useTypographyStyles = makeStyles()((theme: Theme) => ({
  defaultFontStyle: {
    fontWeight: 300,
    lineHeight: '1.5em',
    fontSize: '14px',
  },
  quote: {
    padding: '10px 20px',
    margin: '0 0 20px',
    fontSize: '17.5px',
    borderLeft: '5px solid #eee',
  },
  quoteText: {
    margin: '0 0 10px',
    fontStyle: 'italic',
  },
  quoteAuthor: {
    display: 'block',
    fontSize: '80%',
    lineHeight: '1.42857143',
    color: '#777',
  },
}))

interface QuoteProps {
  text: React.ReactNode
  author?: React.ReactNode
}

export const Quote: React.FC<QuoteProps> = (props) => {
  const { text, author } = props
  const { classes } = useTypographyStyles()
  return (
    <blockquote className={`${classes.defaultFontStyle} ${classes.quote}`}>
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  )
}

interface GraphQLErrorProps {
  error: QueryError | null
}

export const GraphQLError = ({ error }: GraphQLErrorProps) => {
  console.log(JSON.stringify(error, null, 2))
  const networkErrors = error?.networkError?.result?.errors
  return (
    <>
      <Typography variant='h3' color='inherit'>
        GraphQL Error
      </Typography>
      {error?.message && <Quote text={error.message} />}
      {error?.graphQLErrors && error?.graphQLErrors.length !== 0 && (
        <Quote text={JSON.stringify(error.graphQLErrors, null, 2)} />
      )}
      {networkErrors?.map((e: any, i: any) => (
        <Quote key={i} text={e.message} />
      ))}
    </>
  )
}
