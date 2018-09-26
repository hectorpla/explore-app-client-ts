#!/usr/bin/env bash

# DIR=`dirname $BASH_SOURCE`
apollo codegen:generate --queries=**/*.gql\
 --schema=schema.json --target=typescript
