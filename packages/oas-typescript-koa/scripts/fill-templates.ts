import fs from 'fs/promises';
import path from 'path';

const TEMPLATES_DIR = path.join(process.cwd(), 'templates');

async function main() {
  const [defaultHandlebars, middlewareHelpersTs, utilsTs] = await Promise.all([
    fs.readFile(path.join(TEMPLATES_DIR, 'handlebars/default.hbs'), 'utf-8'),
    fs.readFile(
      path.join(TEMPLATES_DIR, 'typescript/middleware-helpers.ts'),
      'utf-8'
    ),
    fs.readFile(path.join(TEMPLATES_DIR, 'typescript/utils.ts'), 'utf-8')
  ]);

  const templatesContent = `
export const defaultHandlebars = \`${escapeCharacters(defaultHandlebars)}\`

export const middlewareHelpersTs = \`${escapeCharacters(middlewareHelpersTs)}\`

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
