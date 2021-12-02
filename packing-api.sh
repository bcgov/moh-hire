#!/bin/sh
# Script to pack api app for severless or micro contanier service
echo 'Building ... \n' && yarn workspace @ehpr/api build && \
echo 'Updating prod dependencies...\n' && yarn workspaces focus @ehpr/api --production  && \
echo 'Deleting existing build dir\n' && rm -rf ./.build || true && \
echo 'Creating build dir...\n' && mkdir -p .build/api && \
echo 'Copy Node modules....\n' && cp -r node_modules .build/api && \
echo 'Unlink local packages...\n' && rm -rf .build/api/node_modules/@ehpr/* && \
echo 'Hardlink local packages...\n' && cp -r ./packages/* .build/api/node_modules/@ehpr/ && \
echo 'Copy api ...\n' && cp -r apps/api/dist/* .build/api && \
echo 'Creating Zip ...\n' && cd .build && zip -r api.zip ./api && cd .. && \
echo 'Done!'
