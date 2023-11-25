// @ts-check
import fs from 'fs';
import path from 'path';

const SYNCAPI_TOKEN_START = '@@SYNCAPI-START nodejs-http-server-cli-options';
const SYNCAPI_TOKEN_END = '@@SYNCAPI-END';

function main() {
  const targetFilePaths = [
    path.join(process.cwd(), 'docs/nodejs-server-stubs/adapters/00-koa.mdx'),
    path.join(process.cwd(), '../packages/oas-typescript-koa/README.md'),
    path.join(process.cwd(), '../packages/oas-typescript-express/README.md')
  ];

  for (const targetFilePath of targetFilePaths) {
    const fileContent = fs.readFileSync(targetFilePath, 'utf-8');
    const fileContentArray = fileContent.split('\n');

    const indexOfSyncApiStart = fileContentArray.findIndex((line) =>
      line.includes(SYNCAPI_TOKEN_START)
    );
    const indexOfSyncApiEnd = fileContentArray.findIndex((line) =>
      line.includes(SYNCAPI_TOKEN_END)
    );

    if (indexOfSyncApiStart > -1 && indexOfSyncApiEnd > -1) {
      const newContent = fileContentArray
        .slice(0, indexOfSyncApiStart)
        .concat(`\n${createTable()}\n`)
        .concat(fileContentArray.slice(indexOfSyncApiEnd));

      fs.writeFileSync(targetFilePath, newContent.join('\n') + '\n', 'utf-8');
    }
  }
}

main();

// Helper functions.
function createTable() {
  const helpTextContent = fs.readFileSync(
    path.join(
      process.cwd(),
      '..',
      'packages/oas-typescript-koa/src/constants/help-text.json'
    ),
    'utf-8'
  );
  const helpTextJson = JSON.parse(helpTextContent);

  const rows = [];

  for (const key in helpTextJson) {
    const val = helpTextJson[key];
    const aliases = [`--${key}`, ...val.aliases.map((item) => `-${item}`)]
      .map(wrapInInlineCode)
      .join(', ');
    const columns = [
      aliases,
      `${val.defaultValue ? '' : '**[Required]** '}${val.helpText.join(' ')}`,
      val.defaultValue || '-'
    ];

    rows.push(`|${columns.join('|')}|`);
  }

  // Build the table.
  return `
| Option | Description | Default value |
| - | - | - |
${rows.join('\n')}
  `.trim();
}

function wrapInInlineCode(str) {
  return `\`${str}\``;
}
