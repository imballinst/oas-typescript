import fs from 'fs/promises';
import path from 'path';

const TEMPLATES_DIR = path.join(process.cwd(), 'templates');

async function main() {
  const [defaultHandlebars] = await Promise.all(
    ['handlebars/default.hbs'].map((p) =>
      fs.readFile(path.join(TEMPLATES_DIR, p), 'utf-8')
    )
  );

  const templatesContent = `
export const defaultHandlebars = \`${escapeCharacters(defaultHandlebars)}\`
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
