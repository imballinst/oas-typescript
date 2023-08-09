import { execSync } from 'child_process';

let teardown = false;

export default async function () {
  execSync('yarn start');
  return async () => {
    if (teardown) throw new Error('teardown called twice');
    teardown = true;
    execSync('yarn stop');
    return Promise.resolve();
  };
}
