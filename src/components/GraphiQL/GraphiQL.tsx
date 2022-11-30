import 'graphiql/graphiql.css'

import { Box, GlobalStyles } from '@mui/material'
import RealGraphiQL from 'graphiql'
import GraphiQLExplorer from 'graphiql-explorer'
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema, parse } from 'graphql'
import fetch from 'isomorphic-fetch'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Page } from '../Page'

const graphQLFetcher = () => (graphQLParams: any) =>
  fetch(`${window.location.origin}/api/graphql`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphQLParams),
  })
    .then((response) => response.text())
    .then((responseBody) => {
      try {
        return JSON.parse(responseBody)
      } catch (e) {
        return responseBody
      }
    })

const GraphiQL: React.FC = () => {
  const graphiqlRef = useRef<any>(null)
  const [schema, setSchema] = useState<GraphQLSchema | null>(null)
  const [query, setQuery] = useState<string>('')
  const [explorerIsOpen, setExplorerIsOpen] = useState<boolean>(true)

  const handleInspectOperation = useCallback(
    (cm: any, mousePos: { line: number; ch: number }) => {
      const parsedQuery = parse(query || '')
      const token = cm.getTokenAt(mousePos)
      const start = { line: mousePos.line, ch: token.start }
      const end = { line: mousePos.line, ch: token.end }
      const position = {
        start: cm.indexFromPos(start),
        end: cm.indexFromPos(end),
      }

      const def = parsedQuery.definitions.find((definition) => {
        if (!definition.loc) {
          console.log('Missing location information for definition')
          return false
        }

        return definition.loc.start <= position.start && definition.loc.end >= position.end
      })

      if (!def) {
        console.error('Unable to find definition corresponding to mouse position')
        return null
      }

      const operationKind =
        def.kind === 'OperationDefinition' ? def.operation : def.kind === 'FragmentDefinition' ? 'fragment' : 'unknown'

      const operationName =
        def.kind === 'OperationDefinition' && !!def.name
          ? def.name.value
          : def.kind === 'FragmentDefinition'
          ? def.name.value
          : 'unknown'

      const selector = `.graphiql-explorer-root #${operationKind}-${operationName}`

      document.querySelector(selector)?.scrollIntoView()
      return undefined
    },
    [query]
  )

  useEffect(() => {
    graphQLFetcher()({
      query: getIntrospectionQuery(),
    }).then((result) => {
      const editor = graphiqlRef.current?.getQueryEditor()
      editor?.setOption('extraKeys', {
        ...(editor.options.extraKeys || {}),
        'Shift-Alt-LeftClick': handleInspectOperation,
      })
      setSchema(buildClientSchema(result.data))
    })
  }, [handleInspectOperation])

  const handleEditQuery = useCallback((q: string) => setQuery(q), [])

  const handleToggleExplorer = useCallback(() => {
    setExplorerIsOpen((old) => !old)
  }, [])

  // @ts-ignore
  return (
    <Page
      title='GraphiQL'
      hideTitle
      sx={{
        height: 'calc(100% - 64px) !Important',
        maxHeight: '100vh',
        padding: 1.5,
      }}
    >
      <Box
        sx={{
          boxSizing: 'content-box',
          height: '100%',
          border: '1px solid #d6d6d6',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
        className='graphiql-container'
      >
        <GlobalStyles
          styles={{
            '.graphiql-explorer-root': {
              overflow: 'unset !important',
              padding: '0 !important',
            },
            '.graphiql-explorer-root > :first-of-type': {
              padding: '8px 8px 0 8px',
              // overflowX: 'hidden !important',  // todo ggp: check this
            },
            '.graphiql-explorer-root > :nth-of-type(2)': {
              padding: '0px 8px 0 8px',
            },
            '.graphiql-container .execute-button:focus': {
              outline: 0,
            },
            '.graphiql-container .historyPaneWrap': {
              width: '300px !important',
              boxShadow: 'none !important',
            },
          }}
        />
        <GraphiQLExplorer
          schema={schema}
          query={query}
          onEdit={handleEditQuery}
          onRunOperation={(operationName: string) => graphiqlRef.current.handleRunQuery(operationName)}
          explorerIsOpen={explorerIsOpen}
          onToggleExplorer={handleToggleExplorer}
        />
        {/* @ts-ignore */}
        <RealGraphiQL
          ref={graphiqlRef}
          fetcher={graphQLFetcher()}
          schema={schema}
          query={query}
          onEditQuery={handleEditQuery}
        >
          <RealGraphiQL.Toolbar>
            <RealGraphiQL.Button
              onClick={() => graphiqlRef.current.handlePrettifyQuery()}
              label='Prettify'
              title='Prettify Query (Shift-Ctrl-P)'
            />
            <RealGraphiQL.Button
              onClick={() => graphiqlRef.current.handleMergeQuery()}
              title='Merge Query (Shift-Ctrl-M)'
              label='Merge'
            />
            <RealGraphiQL.Button
              onClick={() => graphiqlRef.current.handleCopyQuery()}
              title='Copy Query (Shift-Ctrl-C)'
              label='Copy'
            />{' '}
            <RealGraphiQL.Button
              onClick={() => graphiqlRef.current.handleToggleHistory()}
              label='History'
              title='Show History'
            />
            <RealGraphiQL.Button onClick={handleToggleExplorer} label='Explorer' title='Toggle Explorer' />
          </RealGraphiQL.Toolbar>
        </RealGraphiQL>
      </Box>
    </Page>
  )
}

export default GraphiQL
