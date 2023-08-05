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
      url: this.path,
      apiClientName,
      requestBodyContentType: this.requestBodyContentType
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
    const params: string[] = ['axiosConfig?: AxiosRequestConfig'];
    if (paramsName) {
      params.unshift(`${FN_PARAM_NAME}: z.infer<typeof ${paramsName}>`);
    }

    return params.join(', ');
  }
);
handlebarsInstance.registerHelper(
  'getFunctionContent',
  function (operationId: any) {
    const { urlDefinition } = operationParamsCache[operationId];
    return urlDefinition;
  }
);
handlebarsInstance.registerHelper(
  'getFunctionReturns',
  function (operationId: string) {
    const { hasBody, hasHeaders } = operationParamsCache[operationId];
    let configHeaders =
      '...defaultAxiosRequestConfig?.headers, ...axiosConfig?.headers';
    if (hasHeaders) {
      configHeaders += `, ...${FN_PARAM_NAME}.headers`;
    }

    const renderedConfig = `const config = { ...defaultAxiosRequestConfig, ...axiosConfig, headers: { ${configHeaders} } }`;
    let restArgs: string = '';

    if (hasBody) {
      restArgs = `, { ...config, data: fnParam.body }`;
    } else {
      restArgs = `, config`;
    }

    return `${renderedConfig}\nreturn axios(url${restArgs})`;
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
handlebarsInstance.registerHelper(
  'processAxiosConfig',
  function (operationId: string) {
    const { queryParams } = operationParamsCache[operationId];
    return queryParams;
  }
);

// Helper functions.
function constructFunctionParameterFromString({
  parameters,
  operationId,
  url,
  apiClientName,
  requestBodyContentType
}: {
  parameters: any;
  operationId: string;
  url: string;
  apiClientName: string;
  requestBodyContentType: string | undefined;
}) {
  const result: EndpointProcessResult = {
    urlDefinition: `\`${url}\``,
    paramsDeclaration: '',
    paramsName: '',
    queryParams: '',
    contentType: '',
    hasHeaders: false,
    hasBody: false
  };

  if (!parameters) return result;

  const fnParam: {
    params: Record<string, string>;
    query: Record<string, string>;
    headers: Record<string, string>;
    body: string;
  } = {
    body: '',
    params: {},
    query: {},
    headers: {}
  };

  for (const parameter of parameters) {
    switch (parameter.type) {
      case 'Body': {
        fnParam.body = parameter.schema;
        result.hasBody = true;
        result.contentType = requestBodyContentType || '';
        break;
      }
      case 'Path': {
        const { name, schema } = parameter;
        const replacement = `${FN_PARAM_NAME}.params.${name}`;

        fnParam.params[name] = schema;

        const pattern = new RegExp(`\\B:${name}\\b`);
        result.urlDefinition = result.urlDefinition.replace(
          pattern,
          `\${${replacement}}`
        );
        break;
      }
      case 'Query': {
        fnParam.query[parameter.name] = parameter.schema;
        break;
      }
      case 'Header': {
        fnParam.headers[parameter.name] = parameter.schema;
        result.hasHeaders = true;
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
  const renderedParams = Object.entries(fnParam.params)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const renderedQuery = Object.entries(fnParam.query)
    .map(([k, v]) => `${k}: ${v}`)
    .join(',\n');
  const renderedHeaders = Object.entries(fnParam.headers)
    .map(([k, v]) => `${k}: ${v}`)
    .join(',\n');
  const renderedBody = fnParam.body;

  rendered += renderedParams ? `params: z.object({${renderedParams}}),` : '';
  rendered += renderedQuery ? `query: z.object({${renderedQuery}}),` : '';
  rendered += renderedHeaders ? `headers: z.object({${renderedHeaders}}),` : '';
  rendered += renderedBody ? `body: ${renderedBody}` : '';

  if (rendered) {
    const paramsName = `${capitalizeFirstCharacter(operationId)}Params`;
    result.paramsDeclaration = `const ${paramsName} = z.object({${rendered}});`;
    result.paramsName = paramsName;
  }

  return result;
}
