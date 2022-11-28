#!/usr/bin/env bash
eval "$(fnm env)"

fnm use
pnpm db:start
pnpm dev:debug
#pnpm dev
