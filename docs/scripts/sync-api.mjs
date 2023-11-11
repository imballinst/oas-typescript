import fs from 'fs';
import path from 'path';

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
  const val = helpTextInfo[key];
  const aliases = [`--${key}`, ...val.aliases].join(', ');
  const columns = [
    aliases,
    `${val.defaultValue ? '' : '**[Required]** '}${val.helpText.join(
      '<br />'
    )}`,
    val.defaultValue || '-'
  ];

  rows.push(`|${columns.join('|')}|`);
}

// Build the table.
const table = `
| Option | Description | Default value |
| - | - | - |
${rows}.join('\n')
`;

const quickStartFilePath = path.join(
  process.cwd(),
  'docs/tutorial-basics/01-quickstart.mdx'
);
const quickStartFileContent = fs.readFileSync(quickStartFilePath, 'utf-8');

const SYNCAPI_TOKEN_START = '{/* @@SYNCAPI-START */}';
const SYNCAPI_TOKEN_END = '{/* @@SYNCAPI-END */}';

const indexOfSyncApiStart = quickStartFileContent.indexOf(SYNCAPI_TOKEN_START);
const indexOfSyncApiEnd = quickStartFileContent.indexOf(
  SYNCAPI_TOKEN_END,
  indexOfSyncApiStart
);

const newContent = quickStartFileContent
  .slice(0, indexOfSyncApiStart + SYNCAPI_TOKEN_START.length)
  .concat(`\n${table}\n`)
  .concat(quickStartFileContent.slice(indexOfSyncApiEnd));

fs.writeFileSync(quickStartFilePath, newContent, 'utf-8');
