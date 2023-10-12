#!/bin/bash

# This script simplifies the process of deploying code to Firebase with Git commits.
# It also handles custom error messages and additional checks.

# Prompt the user for a commit message
echo "Please enter a commit message:"
read commit_message

# Check if the commit message is empty
if [ -z "$commit_message" ]; then
    echo "Error: commit message cannot be empty."
    exit 1
fi

# Deploy to Firebase with a custom message
echo "Deploying to Firebase with the following commit message:"
echo ">> $commit_message"
firebase deploy

# Add all changes to the Git staging area
echo "Adding changes to Git staging area..."
git add .

# Commit changes with the provided message
echo "Committing changes with message: $commit_message"
git commit -m "$commit_message"

# Push changes to the remote repository with a custom branch
remote_branch="main"
echo "Pushing changes to the remote repository to the '$remote_branch' branch..."
git push origin "$remote_branch"

# Check if the push was successful
if [ $? -eq 0 ]; then
    echo "Deployment and commit to '$remote_branch' branch successful!"
else
    echo "Error: failed to push changes to the '$remote_branch' branch."
    exit 1
fi

