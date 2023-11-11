const VALID_MODULES = ['esm', 'cjs'];

export function updateImportBasedOnModule(fileContent: string, module: string) {
  if (!VALID_MODULES.includes(module)) {
    throw new Error(
      `Invalid module ${module}. Expected ${VALID_MODULES.map(
        (moduleString) => `\`${moduleString}\``
      ).join(' or ')}.`
    );
  }

  if (module === 'esm') {
    return fileContent;
  }

  const regex = /(import .+ from '.+)\.js'/g;
  return fileContent.replace(regex, "$1'");
}
