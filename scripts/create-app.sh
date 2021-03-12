#!/bin/bash
#
# Create mobile app using Cordova.
# See https://cordova.apache.org/docs/en/10.x/guide/cli/.
#
set -e

APPFOLDER="mobile_app"
BASE="$(pwd)"
echo '=> Creating mobile app using Cordova.'
echo ' => Initializing.'
docker run -v "$BASE/$APPFOLDER":/app/"$APPFOLDER" --rm dcycle/cordova:1 create "$APPFOLDER" com.example.hello HelloWorld
echo ' => Adding platforms.'
cd "$APPFOLDER"
docker run -v "$BASE/$APPFOLDER":/app --rm dcycle/cordova:1 platform add ios
docker run -v "$BASE/$APPFOLDER":/app --rm dcycle/cordova:1 platform add android
docker run -v "$BASE/$APPFOLDER":/app --rm dcycle/cordova:1 platform ls
