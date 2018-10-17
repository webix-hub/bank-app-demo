#!/bin/bash
set -e

PACKAGE=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1).zip

if [ "$DRONE_BRANCH" = "release" ]
then
    mv index.production.html index.html
fi

zip -rq ${PACKAGE} index.html ./data ./codebase
aws s3 cp --quiet ./${PACKAGE} s3://webix-temp/${PACKAGE}

if [ "$DRONE_BRANCH" = "release" ]
then
    curl -s "http://webix.com:2280/h00ks/demo-release?token=${DEPLOY_HOOK_TOKEN}&file=${PACKAGE}&demo=bank-app"
else
    curl -s "http://webix.io:2280/h00ks/deploy-preview?token=${PREVIEW_HOOK_TOKEN}&file=${PACKAGE}&source=webix&component=bank-app-demo&branch=${DRONE_BRANCH}"
fi