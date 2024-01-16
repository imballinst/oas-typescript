import { getHandlebars } from 'openapi-zod-client';
import { capitalizeFirstCharacter } from './change-case.js';
import { EndpointProcessResult } from '../types.js';

const FN_PARAM_NAME = 'fnParam';
const Z_VOID = 'z.void()';

export function getHandlebarsInstance({
  isWithHeaders
}: {
  isWithHeaders: boolean;
}) {
  const handlebarsInstance = getHandlebars();

  const operationParamsCache: Record<string, EndpointProcessResult> = {};
  const apiClientNameToQueryParameterExistence: Map<string, boolean> =
    new Map();

  // Register helpers.
  // TODO: maybe we don't need this. Maybe we can use endpointDefinitionRefiner?
  handlebarsInstance.registerHelper(
    'processFunctionParameter',
    function (parameters: any, options: any) {
      const apiClientName = options.data.root.options.apiClientName;
      const result = constructFunctionParameterFromString({
        parameters,
        operationId: this.operationId,
        url: this.path,
        method: this.method,
        apiClientName,
        apiClientNameToQueryParameterExistence,
        responseSchema: this.response,
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
    'getResponseDeclaration',
    function (operationId: any) {
      const { schema, responseDeclarationName } =
        operationParamsCache[operationId].responseInfo;

      if (!responseDeclarationName) return '';

      let renderedType = `const ${responseDeclarationName} = ${schema}`;
      renderedType += `\ninterface ${responseDeclarationName} extends z.infer<typeof ${responseDeclarationName}> {}`;

      return renderedType;
    }
  );
  handlebarsInstance.registerHelper(
    'getFunctionParameter',
    function (operationId: any) {
      const paramsName = operationParamsCache[operationId].paramsName;
      const params: string[] = ['axiosRequestConfig?: AxiosRequestConfig'];
      if (paramsName) {
        params.unshift(`${FN_PARAM_NAME}: z.infer<typeof ${paramsName}>`);
      }

      return params.join(', ');
    }
  );
  handlebarsInstance.registerHelper(
    'getFunctionContent',
    function (operationId: any) {
      const { urlDefinition, method, queryParams, hasHeaders } =
        operationParamsCache[operationId];

      const arrayOfFields: string[] = [
        `url: ${urlDefinition}`,
        `method: "${method}"`,
        'defaultAxiosRequestConfig',
        'axiosRequestConfig'
      ];

      if (queryParams) {
        arrayOfFields.push(`queryParameters: ${queryParams}`);
      }

      if (hasHeaders) {
        arrayOfFields.push(`headers: fnParam.headers`);
      }

      return `
const { url, config } = getFinalUrlAndRequestConfig({
  ${arrayOfFields.join(',\n\t')}
})
      `.trim();
    }
  );
  handlebarsInstance.registerHelper(
    'getFunctionReturnType',
    function (operationId: any) {
      const {
        responseInfo: { promiseDataReturnType }
      } = operationParamsCache[operationId];
      let promiseContent = promiseDataReturnType;

      if (isWithHeaders) {
        promiseContent = `AxiosResponse<${promiseContent}>`;
      }

      return `Promise<${promiseContent}>`;
    }
  );
  handlebarsInstance.registerHelper(
    'getFunctionReturns',
    function (operationId: string) {
      const { bodySchemaName, responseInfo } =
        operationParamsCache[operationId];
      let restArgs: string = '';

      if (bodySchemaName) {
        restArgs = `, { ...config, data: fnParam.body }`;
      } else {
        restArgs = `, config`;
      }

      let renderedAxiosCall = `\nconst response = await axios(url${restArgs})`;

      if (isWithHeaders) {
        renderedAxiosCall += `\nresponse.data = ${responseInfo.schema}.parse(response.data)`;
        renderedAxiosCall += `\nreturn response`;
      } else {
        renderedAxiosCall += `\nreturn ${responseInfo.schema}.parse(response.data)`;
      }

      return renderedAxiosCall;
    }
  );
  handlebarsInstance.registerHelper('getAxiosImports', function () {
    const namedImports: string[] = ['AxiosRequestConfig'];
    if (isWithHeaders) {
      namedImports.push('AxiosResponse');
    }

    return `import axios, { ${namedImports.join(', ')} } from 'axios';`;
  });
  handlebarsInstance.registerHelper('getRequestUtilsImport', function () {
    const val = apiClientNameToQueryParameterExistence.get(
      this.options.apiClientName
    );
    return val
      ? `import { getFinalUrlAndRequestConfig } from "./utils/request.js"`
      : '';
  });

  return handlebarsInstance;
}

// Helper functions.
function constructFunctionParameterFromString({
  parameters,
  operationId,
  url,
  method,
  apiClientName,
  responseSchema,
  apiClientNameToQueryParameterExistence,
  requestBodyContentType
}: {
  parameters: any;
  operationId: string;
  url: string;
  method: string;
  apiClientName: string;
  responseSchema: string;
  apiClientNameToQueryParameterExistence: Map<string, boolean>;
  requestBodyContentType: string | undefined;
}) {
  const result: EndpointProcessResult = {
    urlDefinition: `\`${url}\``,
    method,
    paramsDeclaration: '',
    paramsName: '',
    queryParams: '',
    contentType: '',
    hasHeaders: false,
    bodySchemaName: '',
    responseInfo: getResponseInfo(responseSchema, operationId)
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
        result.bodySchemaName = parameter.schema;
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

    result.queryParams = `${FN_PARAM_NAME}.query`;
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

function getResponseInfo(schema: string, operationId: string) {
  let responseDeclarationName: string | undefined;
  let promiseDataReturnType = schema;

  if (schema === Z_VOID) {
    promiseDataReturnType = 'void';
  } else if (schema.startsWith('z.')) {
    responseDeclarationName = `${capitalizeFirstCharacter(
      operationId
    )}Response`;
    promiseDataReturnType = responseDeclarationName;
  }

  return {
    schema,
    promiseDataReturnType,
    responseDeclarationName
  };
}
