#!/bin/sh
set -xe
cd page
npm run build
cd ..
rm -rf exe/page-build
cp -r app/build exe/page-build
