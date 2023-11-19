export function generateHelpText({
  commandsRecord
}: {
  commandsRecord: Record<
    string,
    {
      aliases: string[];
      helpText: string[];
      required: boolean;
      defaultValue: string;
      examples: string[];
    }
  >;
}) {
  const options: Array<{ option: string; helpText: string }> = [];
  const examples: string[] = [];
  let maxOptionTextLength = -1;

  for (const key in commandsRecord) {
    const val = commandsRecord[key as keyof typeof commandsRecord];
    const aliases = [
      `--${key}`,
      ...val.aliases.map((alias) => `-${alias}`)
    ].join(', ');
    let helpText = val.helpText[0];

    if (val.defaultValue) {
      helpText += ` Defaults to ${val.defaultValue}.`;
    }

    options.push({
      option: aliases,
      helpText
    });
    examples.push(...val.examples);

    maxOptionTextLength = Math.max(maxOptionTextLength, aliases.length);
  }

  const optionsText = options
    .map(
      (item) =>
        `${item.option.padEnd(maxOptionTextLength, ' ')}  ${item.helpText}`
    )
    .join('\n    ');
  const examplesText = examples
    .map((example) => `$ openapi-to-koa ${example}`)
    .join('\n    ');

  return { optionsText, examplesText };
}
