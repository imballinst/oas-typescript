import { execSync } from 'child_process';

const output = execSync('git status -s').toString().trim();
if (output) {
  throw new Error(
    'There are differences after running the `yarn sync-api-reference` in the `docs` folder. You might want to run it first, then re-commit.`'
  );
}
