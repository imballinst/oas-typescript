import axios from 'axios';
import { execSync } from 'child_process';

let teardown = false;

export default async function () {
  execSync('yarn start');

  while (true) {
    const isServerUp = await checkHealthz();
    console.info('waiting for healthz...', isServerUp);

    if (isServerUp) {
      break;
    }

    await sleep(2000);
  }

  return async () => {
    if (teardown) throw new Error('teardown called twice');
    teardown = true;
    execSync('yarn stop');
    return Promise.resolve();
  };
}

// Helper functions.
async function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(undefined);
    }, ms);
  });
}

async function checkHealthz() {
  try {
    await axios('http://localhost:3000/healthz');
    return true;
  } catch (err) {
    return false;
  }
}
