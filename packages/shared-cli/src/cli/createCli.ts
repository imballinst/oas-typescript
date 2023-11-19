import meow, { AnyFlags } from 'meow';

export function createCli<FlagsType extends AnyFlags>({
  usageText,
  examplesText,
  optionsText,
  flags
}: {
  usageText: string;
  optionsText: string;
  examplesText: string;
  flags: FlagsType;
}) {
  return meow(
    `
    Usage
      $ ${usageText}
  
    Options
      ${optionsText}
  
    Examples
      ${examplesText}
  
    For more information, visit https://imballinst.github.io/oas-typescript for documentation.
  `,
    {
      importMeta: import.meta,

      flags
    }
  );
}
