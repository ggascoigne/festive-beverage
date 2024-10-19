import React from 'react'

import Typography from '@mui/material/Typography'
import { typeToFlattenedError } from 'zod'

import { Maybe } from '#utils/ts-utils.ts'

interface QuoteProps {
  text: React.ReactNode
  author?: React.ReactNode
}

export const Quote: React.FC<QuoteProps> = (props) => {
  const { text, author } = props
  return (
    <Typography
      component='blockquote'
      sx={{
        fontWeight: 300,
        lineHeight: '1.5em',
        padding: '10px 20px',
        margin: '0 0 20px',
        fontSize: '17.5px',
        borderLeft: '5px solid #eee',
      }}
    >
      <Typography paragraph sx={{ margin: '0 0 10px', fontStyle: 'italic' }}>
        {text}
      </Typography>
      <Typography component='small' sx={{ display: 'block', fontSize: '80%', lineHeight: '1.42857143', color: '#777' }}>
        {author}
      </Typography>
    </Typography>
  )
}

type ErrorDataType = {
  zodError: typeToFlattenedError<any, string> | null
  code: string
  httpStatus: number
  path?: string | undefined
  stack?: string | undefined
}

type Error = {
  message: string
  shape: Maybe<{
    data: ErrorDataType
    message: string
    code: number
  }>
  data: Maybe<ErrorDataType>
}

interface TrpcErrorProps {
  error: Error | null
}

export const TrpcError = ({ error }: TrpcErrorProps) => {
  console.log(JSON.stringify(error, null, 2))
  return (
    <>
      <Typography variant='h3' color='inherit'>
        tRPC Error
      </Typography>
      {error?.message && <Quote text={error.message} />}
      {/* {error?.graphQLErrors && error?.graphQLErrors.length !== 0 && (
        <Quote text={JSON.stringify(error.graphQLErrors, null, 2)} />
      )} */}
      {/* {networkErrors?.map((e: any, i: any) => <Quote key={i} text={e.message} />)} */}
    </>
  )
}
