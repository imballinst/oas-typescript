import { execSync } from 'child_process';

let teardown = false;

export default async function () {
  execSync('yarn test:server:start');
  return async () => {
    if (teardown) throw new Error('teardown called twice');
    teardown = true;
    execSync('yarn test:server:stop');
    return Promise.resolve();
  };
}
