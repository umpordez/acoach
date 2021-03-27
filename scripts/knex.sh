#!/bin/bash
root=$( cd "$(dirname "$0")/.."; pwd -P)
$root/nodejs/node_modules/knex/bin/cli.js \
    --knexfile $root/nodejs/knexfile.js \
    --cwd $root/nodejs \
    $@
