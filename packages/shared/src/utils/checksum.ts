import fs from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';

export async function createOrDuplicateFile({
  previousChecksum,
  filePath,
  fileContent
}: {
  filePath: string;
  previousChecksum: string;
  fileContent: string;
}) {
  const currentChecksum = getChecksum(fileContent);
  let isChecksumExist = false;
  let isChecksumSame = false;

  try {
    await fs.stat(filePath);
    // If it doesn't throw, then it exists.
    isChecksumExist = true;
    isChecksumSame = previousChecksum === currentChecksum;
  } catch (err) {
    // It doesn't exist, so we need to create it first.
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }

  if (isChecksumExist && isChecksumSame) {
    return currentChecksum;
  }

  let newFileName = filePath;
  if (isChecksumExist) {
    newFileName = newFileName.replace('.ts', '.new.ts');
  }

  await fs.writeFile(newFileName, fileContent, 'utf-8');
  return currentChecksum;
}

function getChecksum(str: string) {
  return createHash('md5').update(str).digest('hex');
}
