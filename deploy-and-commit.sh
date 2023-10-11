#!/bin/bash

# Check if a commit message was provided as an argument
if [ -z "$1" ]; then
  echo "Please provide a commit message."
  exit 1
fi

# Firebase deploy
firebase deploy

# Git actions
git add .
git commit -m "$1"
git push
