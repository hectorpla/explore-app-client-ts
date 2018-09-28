#!/usr/bin/env bash

# DIR=`dirname $BASH_SOURCE`
apollo codegen:generate --queries=*.gql\
 --schema=schema.json --target=typescript

apollo codegen:generate --queries=yelp/*.gql\
 --schema=yelp-schema.json --target=typescript
