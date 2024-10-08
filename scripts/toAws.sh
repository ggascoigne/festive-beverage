#!/bin/bash
#set -x

# import the aws database to the local dev copy

source `dirname $0`/utils.sh

while read line; do export $line; done < <(grep DATABASE .env.local | egrep -v '^#')
PG_INPUT_ARGS=$(getPgString)
ORIGINAL_DATABASE_NAME=${DATABASE_NAME}

while read line; do export $line; done < <(grep DATABASE .env.aws | egrep -v '^#')
PG_OUTPUT_ARGS=$(getPgString)

cleanDb ${DATABASE_ADMIN} ${DATABASE_NAME} ${PG_OUTPUT_ARGS} 2>&1 | grep -v NOTICE

/usr/local/bin/pg_dump ${PG_INPUT_ARGS} -Fc --schema=public > ${ORIGINAL_DATABASE_NAME}.dump

export PGHOST=${DATABASE_HOST}
export PGPORT=${DATABASE_PORT}
export PGUSER=${DATABASE_ADMIN}
export PGPASSWORD=${DATABASE_ADMIN_PASSWORD}

/usr/local/bin/pg_restore \
  -j4 \
  -d ${DATABASE_NAME} \
  --no-privileges \
  --no-owner \
  --clean \
  --if-exists \
  ${ORIGINAL_DATABASE_NAME}.dump

cp .env .env.backup
cp .env.aws .env
./scripts/resetDatabaseOwner.ts
mv -f .env.backup .env
echo Done
