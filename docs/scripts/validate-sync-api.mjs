import { execSync } from 'child_process';

const output = execSync('git status -s').toString().trim().split('\n').filter(entry => entry.includes('docs/')).join('\n');
if (output) {
  throw new Error(
    'There are differences after running the `yarn sync-api-reference` in the `docs` folder. You might want to run it first, then re-commit.` Changes include: ' +
      output
  );
}
