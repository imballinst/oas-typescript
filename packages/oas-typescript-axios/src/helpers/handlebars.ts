import { getHandlebars } from 'openapi-zod-client';
import { capitalizeFirstCharacter } from './change-case.js';
import { EndpointProcessResult } from '../types.js';

const FN_PARAM_NAME = 'fnParam';

export const handlebarsInstance = getHandlebars();
const operationParamsCache: Record<string, EndpointProcessResult> = {};
const apiClientNameToQueryParameterExistence: Map<string, boolean> = new Map();

// Register helpers.
handlebarsInstance.registerHelper(
  'capitalizeFirstLetter',
  function (context: any) {
    return capitalizeFirstCharacter(context);
  }
);
handlebarsInstance.registerHelper('stringify', function (context: any) {
  return JSON.stringify(context);
});
handlebarsInstance.registerHelper(
  'processFunctionParameter',
  function (parameters: any, options: any) {
    const apiClientName = options.data.root.options.apiClientName;
    const result = constructFunctionParameterFromString({
      parameters,
      operationId: this.operationId,
      endpointPath: this.path,
      apiClientName
    });
    operationParamsCache[this.operationId] = result;

    return '';
  }
);
handlebarsInstance.registerHelper(
  'getFunctionParameterDeclaration',
  function (operationId: any) {
    return operationParamsCache[operationId].paramsDeclaration;
  }
);
handlebarsInstance.registerHelper(
  'getFunctionParameter',
  function (operationId: any) {
    const paramsName = operationParamsCache[operationId].paramsName;
    return paramsName ? `${FN_PARAM_NAME}: z.infer<typeof ${paramsName}>` : '';
  }
);
handlebarsInstance.registerHelper(
  'getFunctionContent',
  function (operationId: any) {
    const { urlDefinition } = operationParamsCache[operationId];
    return urlDefinition;
  }
);
handlebarsInstance.registerHelper('getQueryParameterHelperImport', function () {
  const val = apiClientNameToQueryParameterExistence.get(
    this.options.apiClientName
  );
  return val
    ? `import { getQueryParameterString } from "./utils/query.js"`
    : '';
});
handlebarsInstance.registerHelper(
  'adjustUrlWithParams',
  function (operationId: any) {
    const { queryParams } = operationParamsCache[operationId];
    return queryParams;
  }
);
handlebarsInstance.registerHelper(
  'lowercaseFirstCharacter',
  function (context: string) {
    return context.at(0)?.toLowerCase() + context.slice(1);
  }
);

// Helper functions.
function constructFunctionParameterFromString({
  parameters,
  operationId,
  endpointPath,
  apiClientName
}: {
  parameters: any;
  operationId: string;
  endpointPath: string;
  apiClientName: string;
}) {
  const result: EndpointProcessResult = {
    urlDefinition: `\`${endpointPath}\``,
    paramsDeclaration: '',
    paramsName: '',
    queryParams: ''
  };

  if (!parameters) return result;

  const fnParam: {
    params: Record<string, string>;
    query: Record<string, string>;
    body: string;
  } = {
    body: '',
    params: {},
    query: {}
  };

  for (const parameter of parameters) {
    switch (parameter.type) {
      case 'Body': {
        fnParam.body = parameter.schema;
        break;
      }
      case 'Path': {
        const { name, schema } = parameter;
        const replacement = `${FN_PARAM_NAME}.params.${name}`;

        fnParam.params[name] = schema;
        result.urlDefinition = result.urlDefinition.replace(
          new RegExp(`\/:${name}\/`),
          `/\${${replacement}}/`
        );
        break;
      }
      case 'Query': {
        fnParam.query[parameter.name] = parameter.schema;
        break;
      }
    }
  }

  if (Object.keys(fnParam.query).length > 0) {
    const query = { ...fnParam.query };
    const arrayQuery: string[] = [];
    const singleQuery: string[] = [];

    for (const queryName in query) {
      const schema = query[queryName];

      if (schema.includes('z.array(')) {
        arrayQuery.push(queryName);
      } else {
        singleQuery.push(queryName);
      }
    }

    result.queryParams += `url += getQueryParameterString(${FN_PARAM_NAME}.query)`;
    apiClientNameToQueryParameterExistence.set(apiClientName, true);
  }

  let rendered = '';
  let renderedParams = Object.entries(fnParam.params)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  let renderedQuery = Object.entries(fnParam.query)
    .map(([k, v]) => `${k}: ${v}`)
    .join(',\n');
  let renderedBody = fnParam.body;

  rendered += renderedParams ? `params: z.object({${renderedParams}}),` : '';
  rendered += renderedQuery ? `query: z.object({${renderedQuery}}),` : '';
  rendered += renderedBody ? `body: ${renderedBody}` : '';

  if (rendered) {
    const paramsName = `${capitalizeFirstCharacter(operationId)}Params`;
    result.paramsDeclaration = `const ${paramsName} = z.object({${rendered}});`;
    result.paramsName = paramsName;
  }

  return result;
}
