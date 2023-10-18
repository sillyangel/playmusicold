#!/bin/bash

echo "installing and updating all packages"
npm i
npm run buildwebpack
node .