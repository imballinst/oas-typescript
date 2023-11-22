import fs from 'fs/promises';
import path from 'path';

const TEMPLATES_DIR = path.join(process.cwd(), 'templates');

async function main() {
  const [utilsTs] = await Promise.all(
    ['typescript/utils.ts'].map((p) =>
      fs.readFile(path.join(TEMPLATES_DIR, p), 'utf-8')
    )
  );

  const templatesContent = `
export const utilsTs = \`${escapeCharacters(utilsTs)}\`
  `.trimStart();

  await fs.writeFile(
    path.join(process.cwd(), 'src/templates.ts'),
    templatesContent,
    'utf-8'
  );
}

main();

// Helper functions.
function escapeCharacters(str: string) {
  return str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
