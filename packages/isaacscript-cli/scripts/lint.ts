import chalk from "chalk";
import { $, $s, diff, echo, exit, lintScript, readFile } from "complete-node";
import path from "node:path";

const REPO_ROOT = path.join(import.meta.dirname, "..");
const LOCAL_GITIGNORE_PATH = path.join(
  REPO_ROOT,
  "file-templates",
  "dynamic",
  "Node.gitignore",
);
const GITIGNORE_URL =
  "https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore";

await lintScript(async () => {
  $s`pip install isaac-xml-validator --upgrade --quiet`;

  await Promise.all([
    $`tsc --noEmit`,
    $`tsc --noEmit --project ./scripts/tsconfig.json`,
    $`eslint --max-warnings 0 .`,
    $`isaac-xml-validator --quiet`,
    checkGitIgnoreUpdates(),
  ]);
});

async function checkGitIgnoreUpdates(): Promise<void> {
  const localGitIgnore = readFile(LOCAL_GITIGNORE_PATH);

  const response = await fetch(GITIGNORE_URL);
  const remoteGitIgnore = await response.text();

  if (localGitIgnore !== remoteGitIgnore) {
    echo('New "Node.gitignore" file:');
    diff(localGitIgnore, remoteGitIgnore);
    echo();
    echo(`Get it at: ${chalk.green(GITIGNORE_URL)}`);

    exit(1);
  }
}
