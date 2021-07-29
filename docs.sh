#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Generate the documentation, which will create the "docs" directory
npx typedoc "$DIR/src/index.ts"

# Force push the "docs" directory to the "gh-pages" branch of the repository
# From: https://roelofjanelsinga.com/articles/how-to-set-up-automatically-deploy-website-github-pages/
set -euxo pipefail
git fetch -p origin
GIT_COMMIT=$(git subtree split --prefix docs main -b gh-pages)
git push origin $GIT_COMMIT:refs/heads/gh-pages --force
