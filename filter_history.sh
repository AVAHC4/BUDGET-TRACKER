#!/bin/bash
# Script to filter out a specific contributor from Git history

# Make sure we're in the repository directory
cd /Users/akhil/Desktop/MERN_APP/ExpenseTracker

# Create a backup branch just in case
git branch backup-$(date +%Y%m%d)

# Set up environment variables for the filter-branch
export OLD_EMAIL="maciekt07@gmail.com"
export CORRECT_NAME="AVAHC4"
export CORRECT_EMAIL="your-email@example.com"

# Use git filter-branch to rewrite history
git filter-branch --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ] || [ "$GIT_COMMITTER_NAME" = "maciekt07" ] || [ "$GIT_COMMITTER_NAME" = "Maciej Twarog" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ] || [ "$GIT_AUTHOR_NAME" = "maciekt07" ] || [ "$GIT_AUTHOR_NAME" = "Maciej Twarog" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --all

echo "History has been rewritten. You can verify with 'git log'."
echo "To push this to GitHub, you'll need to force push with: git push origin main --force"
echo "CAUTION: Force pushing rewrites history on the remote. Only do this if you're sure."
