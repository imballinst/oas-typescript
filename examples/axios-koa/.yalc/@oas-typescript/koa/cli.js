#!/usr/bin/env node

// src/index.ts
import { tmpdir } from "os";
import {
  generateZodClientFromOpenAPI,
  getHandlebars
} from "openapi-zod-client";
import meow from "meow";
import fs2 from "fs/promises";
import path2 from "path";
import { createRequire } from "node:module";

// ../shared/src/utils/checksum.ts
import fs from "fs/promises";
import path from "path";
import { createHash } from "crypto";
async function createOrDuplicateFile({
  previousChecksum,
  filePath,
  fileContent
}) {
  const currentChecksum = getChecksum(fileContent);
  let isChecksumExist = false;
  let isChecksumSame = false;
  try {
    await fs.stat(filePath);
    isChecksumExist = true;
    isChecksumSame = previousChecksum === currentChecksum;
  } catch (err) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
  }
  if (isChecksumExist && isChecksumSame) {
    return currentChecksum;
  }
  let newFileName = filePath;
  if (isChecksumExist) {
    newFileName = newFileName.replace(".ts", ".new.ts");
  }
  await fs.writeFile(newFileName, fileContent, "utf-8");
  return currentChecksum;
}
function getChecksum(str) {
  return createHash("md5").update(str).digest("hex");
}

// src/templates.ts
var defaultHandlebars = `import { z } from 'zod';

{{#if imports}}
{{#each imports}}
import { {{{@key}}} } from './{{{this}}}'
{{/each}}
{{/if}}


{{#if types}}
{{#each types}}
{{{this}}};
{{/each}}
{{/if}}

// Schemas.
{{#each schemas}}
export const {{@key}}{{#if (lookup ../circularTypeByName @key)}}: z.ZodType<{{@key}}>{{/if}} = {{{this}}};
export interface {{@key}} extends z.infer<typeof {{@key}}> {}
{{/each}}

// Endpoints.
{{#each endpoints}}
export const {{capitalizeFirstLetter operationId "Parameters"}} = [
  {{#if parameters}}
  {{#each parameters}}
  { 
    name: '{{name}}',
    {{#if description}}
    description: \`{{description}}\`,
    {{/if}}
    {{#if type}}
    type: '{{type}}',
    {{/if}}
    schema: {{{schema}}}
  },
  {{/each}}
  {{/if}}
] as const
{{#if security}}
export const {{capitalizeFirstLetter operationId "Security"}} = {{{security}}}
{{/if}}

export const {{capitalizeFirstLetter operationId "Response"}} = {{{responseSchema.success}}} as const
{{{interfaceFromZod operationId "Response"}}}

export const {{capitalizeFirstLetter operationId "Errors"}} = {{{responseSchema.error}}} as const
{{{interfaceFromObject operationId "Errors"}}}

{{/each}}
`;
var middlewareHelpersTs = `import Koa from 'koa';
import Router from '@koa/router';

type KoaCtx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  unknown
>;

export class MiddlewareHelpers {
  static async doAdditionalSecurityValidation(
    ctx: KoaCtx,
    scopes: string[] | undefined
  ) {
    return {
      status: 200
    };
  }
}
`;
var utilsTs = `import Koa from 'koa';
import Router from '@koa/router';
import { z } from 'zod';
import { OpenAPIV3 } from 'openapi-types';

import { securitySchemes } from '../generated/security-schemes.js';
import { MiddlewareHelpers } from '../middleware-helpers.js';

type KoaCtx = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
  unknown
>;

const securitySchemeWithOauthScope =
  findSecuritySchemeWithOauthScope(securitySchemes);

interface OasSecurity {
  [name: string]: string[] | undefined;
}

interface OasParameter {
  name: string;
  description?: string;
  type: 'Path' | 'Query' | 'Body' | 'Header';
  schema: z.ZodTypeAny;
}

type ExtractMatchingType<
  TArray extends readonly OasParameter[],
  Type extends TArray[number]['type']
> = Extract<TArray[number], { type: Type }>;

type ExtractFilteredRecordFromArray<
  TArray extends readonly OasParameter[],
  Type extends TArray[number]['type']
> = ExtractMatchingType<TArray, Type> extends never
  ? never
  : {
      [K in ExtractMatchingType<TArray, Type>['name']]: z.output<
        ExtractMatchingType<TArray, Type>['schema']
      >;
    };

enum ParseRequestErrors {
  INVALID_PATH_PARAMETER = '10000',
  INVALID_BODY = '10001',
  INVALID_QUERY_PARAMETER = '10002',
  INVALID_HTTP_HEADER = '10003'
}
const ParseRequestErrorsMessage: Record<ParseRequestErrors, string> = {
  [ParseRequestErrors.INVALID_PATH_PARAMETER]: 'invalid path parameter',
  [ParseRequestErrors.INVALID_BODY]: 'invalid body',
  [ParseRequestErrors.INVALID_QUERY_PARAMETER]: 'invalid query parameter',
  [ParseRequestErrors.INVALID_HTTP_HEADER]: 'invalid http header'
};

type RemoveNeverKeys<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K;
  }[keyof T]
>;

export type ParsedRequestInfo<
  OasParametersType extends readonly OasParameter[]
> = RemoveNeverKeys<{
  body: z.output<ExtractMatchingType<OasParametersType, 'Body'>['schema']>;
  pathParams: ExtractFilteredRecordFromArray<OasParametersType, 'Path'>;
  headerParams: ExtractFilteredRecordFromArray<OasParametersType, 'Header'>;
  queryParams: ExtractFilteredRecordFromArray<OasParametersType, 'Query'>;
}>;

export class KoaGeneratedUtils {
  static parseRequestInfo<OasParametersType extends readonly OasParameter[]>({
    ctx,
    oasParameters
  }: {
    ctx: Koa.ParameterizedContext<
      Koa.DefaultState,
      Koa.DefaultContext &
        Router.RouterParamContext<Koa.DefaultState, Koa.DefaultContext>,
      unknown
    >;
    oasParameters: OasParametersType;
  }): ParsedRequestInfo<OasParametersType> | undefined {
    const pathParams: Record<string, any> = {};
    const queryParams: Record<string, any> = {};
    const headerParams: Record<string, any> = {};
    let bodyParams: any | undefined = undefined;

    // Validate path parameters.
    for (const oasParameter of oasParameters) {
      if (oasParameter.type === 'Path') {
        let param: string | number = ctx.params[oasParameter.name];
        if (oasParameter.schema._def.typeName === 'ZodNumber') {
          param = Number(param);
        }

        const result = oasParameter.schema.safeParse(param);
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_PATH_PARAMETER,
            zodError: result.error,
            additionalMessage: oasParameter.name
          });
          return;
        }

        pathParams[oasParameter.name] = ctx.params[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Body') {
        const body = ctx.request.body as any;
        const result = oasParameter.schema.safeParse(body);
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_BODY,
            zodError: result.error
          });
          return;
        }

        bodyParams = body;
        continue;
      }

      if (oasParameter.type === 'Query') {
        const result = oasParameter.schema.safeParse(
          ctx.query[oasParameter.name]
        );
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_QUERY_PARAMETER,
            zodError: result.error,
            additionalMessage: oasParameter.name
          });
          return;
        }

        queryParams[oasParameter.name] = ctx.query[oasParameter.name];
        continue;
      }

      if (oasParameter.type === 'Header') {
        const result = oasParameter.schema.safeParse(
          ctx.headers[oasParameter.name]
        );
        if (!result.success) {
          ctx.status = 400;
          ctx.body = createErrorResponse({
            errorCode: ParseRequestErrors.INVALID_HTTP_HEADER,
            zodError: result.error,
            additionalMessage: oasParameter.name
          });
          return;
        }

        headerParams[oasParameter.name] = ctx.headers[oasParameter.name];
        continue;
      }
    }

    return {
      pathParams,
      queryParams,
      headerParams,
      body: bodyParams
    } as unknown as ParsedRequestInfo<OasParametersType>;
  }

  static createSecurityMiddleware<EndpointParameter extends OasSecurity[]>(
    security: EndpointParameter | undefined
  ) {
    const scopes = security?.find(
      (item) => Object.keys(item)[0] === securitySchemeWithOauthScope
    )?.[securitySchemeWithOauthScope];

    return async (ctx: KoaCtx, next: Koa.Next) => {
      const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(
        ctx,
        scopes
      );

      if (status !== 200) {
        ctx.status = status;
        return;
      }

      next();
    };
  }
}

// Helper functions.
function findSecuritySchemeWithOauthScope(
  securitySchemes: OpenAPIV3.ComponentsObject['securitySchemes']
) {
  if (!securitySchemes) return '';

  for (const key in securitySchemes) {
    const securityScheme = securitySchemes[
      key
    ] as OpenAPIV3.SecuritySchemeObject;

    if (securityScheme.type === 'oauth2') {
      return key;
    }
  }

  return '';
}

function createErrorResponse({
  errorCode,
  zodError,
  additionalMessage
}: {
  errorCode: ParseRequestErrors;
  zodError: z.ZodError;
  additionalMessage?: string;
}) {
  let message = ParseRequestErrorsMessage[errorCode];
  if (additionalMessage) {
    message = \`\${message} \${additionalMessage}\`;
  }

  return {
    code: errorCode,
    message,
    detail: zodError.errors
  };
}
`;
var typesTs = `import { z } from 'zod';

export interface OasError {
  status: number;
  description: string;
  schema: z.ZodTypeAny;
}

export type ErrorStatuses<TOasError extends readonly OasError[]> = Exclude<
  Extract<TOasError[number], { status: number }>['status'],
  401 | 403
>;

export type ResponseHeaders<
  THeadersSchemaType = string | number | z.ZodSchema
> = Record<string, { schema: THeadersSchemaType; nullable?: boolean }>;

type BuildResponseObject<TObject extends { headers?: ResponseHeaders }> =
  TObject['headers'] extends object
    ? Omit<TObject, 'headers'> & {
        headers: {
          [K in keyof TObject['headers']]: TObject['headers'][K]['schema'] extends z.ZodSchema
            ? z.infer<TObject['headers'][K]['schema']>
            : TObject['headers'][K]['schema'];
        };
      }
    : Omit<TObject, 'headers'>;

export interface ErrorResponse<
  TSchemaType = string,
  TStatus = number | string,
  THeadersSchemaType = string | number | z.ZodSchema
> {
  status: TStatus extends z.ZodNumber ? DefaultHttpErrors : TStatus;
  schema: TSchemaType;
  headers?: ResponseHeaders<THeadersSchemaType>;
}

export interface ResponseSchema<
  TSuccessSchemaType = z.ZodSchema,
  TErrorSchemaType = string,
  THeadersSchemaType = string | number | z.ZodSchema
> {
  success: {
    schema?: TSuccessSchemaType;
    status: number;
    headers?: ResponseHeaders;
  };
  error?: Record<
    string | number,
    ErrorResponse<TErrorSchemaType, string | number, THeadersSchemaType>
  >;
}

export interface OperationInfo {
  /**
   * Contains the operation ID, which is required.
   */
  operationId: string;
  /**
   * Contains the function type, which will be imported to the controller.
   */
  functionType: string;
  /**
   * Contains the parameters type for the operation. This is so that in the controller-types file,
   * the generator can import the right parameter.
   */
  parametersName?: string;
  /**
   * Contains the response object schema.
   */
  response?: ResponseSchema;
}
export type ControllerReturnType<
  X extends ResponseSchema<z.ZodSchema, unknown, z.ZodSchema>
> = X['success']['schema'] extends object
  ?
      | BuildResponseObject<{
          // TOOD: might need some tweaking in case it's undefined, maybe
          // it's better to be \`data?: never\`.
          data: z.infer<X['success']['schema']>;
          status: X['success']['status'];
          headers: X['success']['headers'];
        }>
      | ExtractErrorRecord<X['error']>
  : never;

export type ExtractErrorRecord<
  TErrorRecord extends
    | Record<string | number, ErrorResponse<unknown, unknown, z.ZodSchema>>
    | undefined
> = TErrorRecord extends object
  ? {
      [Key in keyof TErrorRecord]: TErrorRecord[Key]['schema'] extends z.ZodVoid
        ? BuildResponseObject<{
            error?: never;
            status: TErrorRecord[Key]['status'];
            headers: TErrorRecord[Key]['headers'];
          }>
        : TErrorRecord[Key]['schema'] extends z.ZodSchema
        ? BuildResponseObject<{
            error: z.infer<TErrorRecord[Key]['schema']>;
            status: TErrorRecord[Key]['status'];
            headers: TErrorRecord[Key]['headers'];
          }>
        : never;
    }[keyof TErrorRecord]
  : never;

export type DefaultHttpErrors =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;
`;

// src/helpers/templates/controller.ts
function generateTemplateController({
  controllerName,
  operations
}) {
  return `
import {
  ${operations.map((op) => op.functionType).join(",\n  ")}
} from '../static/controller-types/${controllerName}Types.js'

export class ${controllerName} {
${operations.map((op) => renderControllerMethod(op)).join("\n  ")}
}  
  `.trim();
}
function renderControllerMethod(controller) {
  return `
static ${controller.operationId}: ${controller.functionType} = (params) => {
  return {
    data: undefined,
    status: undefined
  }
}
  `.trim();
}

// src/helpers/templates/router.ts
function generateTemplateRouter({
  allServerSecurityImports,
  controllerToOperationsRecord,
  routers,
  parametersImportsPerController
}) {
  return `
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
import { 
  ${allServerSecurityImports.concat(Object.values(parametersImportsPerController).flat()).join(",\n  ")}
} from './client.js'
import { KoaGeneratedUtils } from './utils.js'

${Object.keys(controllerToOperationsRecord).map((c) => `import { ${c} } from '../controllers/${c}.js'`).join("\n")}

const router = new Router()

router.use(bodyParser());

${routers.join("\n\n")}

export const generatedRouter = router
  `.trim();
}

// src/helpers/templates/controller-types.ts
function generateTemplateControllerTypes({
  imports,
  operations
}) {
  const renderedOperations = [];
  let isRequireZodImport = false;
  for (const operation of operations) {
    if (!operation.response) {
      throw new Error(
        `Operation ${operation.operationId} does not contain responses`
      );
    }
    if (operation.response.error?.default) {
      operation.response.error.default.status = "number";
    }
    renderedOperations.push(
      `
export type ${operation.functionType} = (params: ParsedRequestInfo<typeof ${operation.parametersName}>) => ControllerReturnType<{
  success: ${operation.responseType.success};
  error: ${operation.responseType.error}
}> 
      `.trim()
    );
    if (operation.response === void 0) {
      isRequireZodImport = true;
    }
  }
  return `
${isRequireZodImport ? `import { z } from 'zod'` : ""}

import {
  ${imports.join(",\n  ")}
} from '../client.js'
import { ParsedRequestInfo } from '../utils.js'
import { ControllerReturnType, ErrorStatuses } from '../types.js'

${renderedOperations.join("\n\n")}`.trim();
}
function stringifyControllerReturnTypeGenericType(obj) {
  return JSON.stringify(obj, null, 2).replace(/"status": "([\w\d]+)"/g, '"status": $1').replace(/"schema": "([\w\d\[\]\(\).']+)"/g, '"schema": $1');
}

// src/helpers/change-case.ts
function capitalizeFirstCharacter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// src/core/paths-parser.ts
import { titleCase } from "title-case";

// src/helpers/templates/middleware.ts
function generateRouteMiddleware({
  parametersName,
  controllerName,
  operationId
}) {
  return `
async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: ${parametersName}
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const result = await ${controllerName}.${operationId}(parsedRequestInfo)
  ctx.status = result.status

  if (result.status > 400) {
    ctx.body = result.error
  } else {
    ctx.body = result.data
  }
}
  `.trim();
}

// src/core/paths-parser.ts
import { z } from "zod";
var PARSED_METHODS = ["get", "post", "put", "delete", "patch"];
function parsePaths({ paths }) {
  const routers = [];
  const operationIdToResponseSchemaRecord = {};
  const controllerToOperationsRecord = {};
  const parametersImportsPerController = {};
  const controllerImportsPerController = {};
  const allServerSecurityImports = [];
  for (const pathKey in paths) {
    const pathItem = paths[pathKey];
    if (!pathItem)
      continue;
    for (const methodKey of PARSED_METHODS) {
      const operation = pathItem[methodKey];
      if (!operation)
        continue;
      const { tags = [], operationId, security, responses } = operation;
      const [tag] = tags;
      if (!tag) {
        throw new Error(
          `The tag for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }
      if (!operationId) {
        throw new Error(
          `The operation ID for the method ${methodKey} of ${pathKey} is not defined. Define it, then try again.`
        );
      }
      const controllerName = `${titleCase(tag)}Controller`;
      if (!controllerToOperationsRecord[controllerName]) {
        controllerToOperationsRecord[controllerName] = [];
      }
      if (!parametersImportsPerController[controllerName]) {
        parametersImportsPerController[controllerName] = [];
      }
      if (!controllerImportsPerController[controllerName]) {
        controllerImportsPerController[controllerName] = [];
      }
      const pascalCasedOperationId = capitalizeFirstCharacter(operationId);
      const errorType = `${pascalCasedOperationId}Errors`;
      let parametersName = `${pascalCasedOperationId}Parameters`;
      let responseName = `${pascalCasedOperationId}Response`;
      let responseSuccessStatus = Number(
        Object.keys(responses).find(
          // Assume that 3xx redirections are also possible, e.g. OAuth endpoint.
          (status) => Number(status) >= 200 && Number(status) < 400
        )
      );
      if (isNaN(responseSuccessStatus)) {
        throw new Error(
          `Invalid response of ${operationId}: should have 2xx or 3xx response defined`
        );
      }
      const openAPISuccessResponseHeaders = responses[responseSuccessStatus].headers;
      const responseSuccessHeaders = convertOpenAPIHeadersToResponseSchemaHeaders(
        openAPISuccessResponseHeaders
      );
      const responseSchema = {
        success: getSuccessResponseSchema({
          status: responseSuccessStatus,
          response: responses[responseSuccessStatus],
          operationId: pascalCasedOperationId
        }),
        error: {}
      };
      if (responseSuccessHeaders) {
        responseSchema.success.headers = responseSuccessHeaders;
      }
      const responseErrorStatuses = Object.keys(responses).filter(
        (status) => Number(status) >= 400
      );
      const hasDefaultResponseStatus = responses.default !== void 0;
      if (responseErrorStatuses.length || hasDefaultResponseStatus) {
        responseSchema.error = {};
        if (hasDefaultResponseStatus) {
          responseSchema.error.default = getErrorResponseSchema(
            "default",
            responses.default
          );
        } else {
          for (const responseStatus of responseErrorStatuses) {
            responseSchema.error[responseStatus] = getErrorResponseSchema(
              responseStatus,
              responses[responseStatus]
            );
          }
        }
      }
      controllerToOperationsRecord[controllerName].push({
        operationId,
        functionType: `${pascalCasedOperationId}ControllerFunction`,
        parametersName,
        response: responseSchema,
        responseType: {
          success: responseName,
          error: errorType
        }
      });
      operationIdToResponseSchemaRecord[operationId] = responseSchema;
      if (parametersName) {
        parametersImportsPerController[controllerName].push(parametersName);
        controllerImportsPerController[controllerName].push(parametersName);
      }
      controllerImportsPerController[controllerName].push(errorType);
      controllerImportsPerController[controllerName].push(responseName);
      const middlewares = [
        generateRouteMiddleware({
          controllerName,
          operationId,
          parametersName
        })
      ];
      if (security) {
        const securityName = `${capitalizeFirstCharacter(operationId)}Security`;
        allServerSecurityImports.push(securityName);
        middlewares.unshift(
          `KoaGeneratedUtils.createSecurityMiddleware(${securityName})`
        );
      }
      const koaPath = pathKey.split("/").map(convertOpenApiPathToKoaPath).join("/");
      routers.push(
        `
router.${methodKey}('${koaPath}', ${middlewares.join(", ")})
      `.trim()
      );
    }
  }
  return {
    routers,
    operationIdToResponseSchemaRecord,
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports
  };
}
var zodSuccessResponseSchema = z.object({
  schema: z.object({
    $ref: z.string()
  })
});
function convertOpenApiPathToKoaPath(s) {
  if (!s.startsWith("{") && !s.endsWith("}"))
    return s;
  return `:${s.slice(1, -1)}`;
}
function getSuccessResponseSchema({
  response,
  operationId,
  status
}) {
  const content = response.content;
  const responseJSONObject = content?.["application/json"];
  let contentSchema = "";
  if (responseJSONObject) {
    const parsedSchema = zodSuccessResponseSchema.safeParse(responseJSONObject);
    if (parsedSchema.success) {
      contentSchema = parsedSchema.data.schema.$ref.replace(
        "#/components/schemas/",
        ""
      );
    } else {
      contentSchema = operationId;
    }
  }
  const successContent = {
    schema: contentSchema || "z.void()",
    status
  };
  const headers = convertOpenAPIHeadersToResponseSchemaHeaders(
    content?.["headers"]
  );
  if (headers)
    successContent.headers = headers;
  return successContent;
}
function getErrorResponseSchema(status, errorObject) {
  const content = errorObject.content?.["application/json"];
  const contentSchema = content?.["schema"]["$ref"].replace(
    "#/components/schemas/",
    ""
  );
  const errorCodeContent = {
    schema: contentSchema || "z.void()",
    status
  };
  const headers = convertOpenAPIHeadersToResponseSchemaHeaders(
    content?.["headers"]
  );
  if (headers)
    errorCodeContent.headers = headers;
  return errorCodeContent;
}
function convertOpenAPIHeadersToResponseSchemaHeaders(responseHeaders) {
  if (!responseHeaders)
    return void 0;
  const openAPIHeaders = responseHeaders;
  let responseSchemaHeaders = void 0;
  for (const headerKey in openAPIHeaders) {
    const schema = openAPIHeaders[headerKey].schema;
    if (!schema)
      continue;
    if (!responseSchemaHeaders)
      responseSchemaHeaders = {};
    const { type, nullable } = schema;
    responseSchemaHeaders[headerKey] = {
      schema: `z.${type || "void"}()`
    };
    if (nullable)
      responseSchemaHeaders[headerKey].nullable = nullable;
  }
  return responseSchemaHeaders;
}

// src/index.ts
import { execSync } from "child_process";
var cli = meow(
  `
	Usage
	  $ openapi-to-koa generate <path-to-openapi-json>

	Options
	  --output, -o                  Specify a place for output, defaults to (pwd)/generated.
	  --app-security-field, -a      Specify the custom security field used in the backend application.
                                  Mostly useful when you have role names in the application, in which
                                  these roles are required to do the operation. You might not need this
                                  parameter if you are using OpenAPI Specification v3.1.0. Reference:
                                  https://spec.openapis.org/oas/v3.1.0#patterned-fields-2.

	Examples
	  $ openapi-to-koa generate ./openapi/api.json --output src/generated
	  $ openapi-to-koa generate ./openapi/api.json --output src/generated --app-security-field x-security
`,
  {
    importMeta: import.meta,
    flags: {
      output: {
        type: "string",
        shortFlag: "o"
      },
      appSecurityField: {
        type: "string",
        shortFlag: "a"
      }
    }
  }
);
var DEFAULT_OUTPUT = path2.join(process.cwd(), "generated");
var DEFAULT_SECURITY_FIELD = "security";
var VALID_COMMANDS = ["generate"];
var require2 = createRequire(import.meta.url);
async function main() {
  const [command, cliInput] = cli.input;
  if (!cliInput || !VALID_COMMANDS.includes(command)) {
    cli.showHelp();
    return;
  }
  const input = path2.isAbsolute(cliInput) ? cliInput : path2.join(process.cwd(), cliInput);
  const {
    output: cliOutput,
    appSecurityField: cliAppSecurityField = DEFAULT_SECURITY_FIELD
  } = cli.flags;
  const rootOutputFolder = cliOutput && path2.isAbsolute(cliOutput) ? cliOutput : path2.join(process.cwd(), cliOutput || DEFAULT_OUTPUT);
  const lockedGeneratedFilesFolder = path2.join(rootOutputFolder, "static");
  const tmpFolder = path2.join(tmpdir(), "@oast");
  const handlebarsFilePath = path2.join(tmpFolder, "koa/default.hbs");
  const checksumFilePath = path2.join(
    lockedGeneratedFilesFolder,
    "checksum.json"
  );
  let previousChecksum = {};
  let nextChecksum = {};
  try {
    const content = await fs2.readFile(
      path2.join(lockedGeneratedFilesFolder, "checksum.json"),
      "utf-8"
    );
    previousChecksum = JSON.parse(content);
  } catch (err) {
  }
  await Promise.all([
    fs2.mkdir(path2.dirname(handlebarsFilePath), { recursive: true }),
    fs2.mkdir(lockedGeneratedFilesFolder, { recursive: true })
  ]);
  const [, , , middlewareHelpersChecksum] = await Promise.all([
    fs2.writeFile(handlebarsFilePath, defaultHandlebars, "utf-8"),
    fs2.writeFile(
      path2.join(lockedGeneratedFilesFolder, "utils.ts"),
      utilsTs,
      "utf-8"
    ),
    fs2.writeFile(
      path2.join(lockedGeneratedFilesFolder, "types.ts"),
      typesTs,
      "utf-8"
    ),
    createOrDuplicateFile({
      filePath: path2.join(rootOutputFolder, "middleware-helpers.ts"),
      fileContent: middlewareHelpersTs,
      previousChecksum: previousChecksum["middleware-helpers.ts"]
    })
  ]);
  nextChecksum["middleware-helpers.ts"] = middlewareHelpersChecksum;
  const document = JSON.parse(
    await fs2.readFile(input, "utf-8")
  );
  const handlebars = getHandlebars();
  handlebars.registerHelper("capitalizeFirstLetter", function(...args) {
    const [firstWord, ...rest] = args.slice(0, -1);
    return capitalizeFirstCharacter(firstWord) + rest.join("");
  });
  handlebars.registerHelper("interfaceFromZod", function(...args) {
    const [firstWord, ...rest] = args.slice(0, -1);
    const interfaceName = capitalizeFirstCharacter(firstWord) + rest.join("");
    return `export type ${interfaceName} = typeof ${interfaceName}`;
  });
  handlebars.registerHelper("interfaceFromObject", function(...args) {
    const [firstWord, ...rest] = args.slice(0, -1);
    const interfaceName = capitalizeFirstCharacter(firstWord) + rest.join("");
    return `export type ${interfaceName} = typeof ${interfaceName}`;
  });
  const {
    routers,
    operationIdToResponseSchemaRecord,
    controllerToOperationsRecord,
    parametersImportsPerController,
    controllerImportsPerController,
    allServerSecurityImports
  } = parsePaths({ paths: document.paths });
  await generateZodClientFromOpenAPI({
    openApiDoc: document,
    distPath: path2.join(lockedGeneratedFilesFolder, "client.ts"),
    templatePath: handlebarsFilePath,
    options: {
      endpointDefinitionRefiner: (defaultDefinition, operation) => {
        const newDefinition = defaultDefinition;
        if (cliAppSecurityField !== DEFAULT_SECURITY_FIELD) {
          operation.security = operation[cliAppSecurityField];
        }
        if (!operation.operationId) {
          throw new Error("all operations need to have `operationId`");
        }
        const { success, error } = operationIdToResponseSchemaRecord[operation.operationId];
        newDefinition.responseSchema = {
          success: stringifyControllerReturnTypeGenericType(success),
          error: stringifyControllerReturnTypeGenericType(error || {})
        };
        newDefinition.operationId = operation.operationId;
        newDefinition.security = JSON.stringify(operation.security);
        return newDefinition;
      }
    },
    handlebars
  });
  for (const controllerKey in controllerToOperationsRecord) {
    const pathToController = path2.join(
      rootOutputFolder,
      `controllers/${controllerKey}.ts`
    );
    const operations = controllerToOperationsRecord[controllerKey];
    const checksumKey = `controllers/${path2.basename(controllerKey)}`;
    const fileChecksum = await createOrDuplicateFile({
      filePath: pathToController,
      fileContent: generateTemplateController({
        controllerName: controllerKey,
        operations
      }),
      previousChecksum: previousChecksum[checksumKey]
    });
    nextChecksum[checksumKey] = fileChecksum;
  }
  if (document.components?.securitySchemes) {
    await fs2.writeFile(
      path2.join(lockedGeneratedFilesFolder, "security-schemes.ts"),
      `export const securitySchemes = ${JSON.stringify(
        document.components?.securitySchemes,
        null,
        2
      )} as const`,
      "utf-8"
    );
  }
  const template = generateTemplateRouter({
    allServerSecurityImports,
    controllerToOperationsRecord,
    parametersImportsPerController,
    routers
  });
  await fs2.writeFile(
    path2.join(lockedGeneratedFilesFolder, "router.ts"),
    template,
    "utf-8"
  );
  const distClientPath = path2.join(lockedGeneratedFilesFolder, "client.ts");
  let distClientContent = await fs2.readFile(distClientPath, "utf-8");
  if (distClientContent.includes("z.instanceof(File)")) {
    distClientContent = distClientContent.replace(
      /z\.instanceof\(File\)/g,
      "z.any()"
    );
  }
  await fs2.mkdir(path2.join(lockedGeneratedFilesFolder, "controller-types"), {
    recursive: true
  });
  await Promise.all([
    ...Object.keys(controllerImportsPerController).map(
      (key) => fs2.writeFile(
        path2.join(
          lockedGeneratedFilesFolder,
          "controller-types",
          `${key}Types.ts`
        ),
        generateTemplateControllerTypes({
          imports: controllerImportsPerController[key],
          operations: controllerToOperationsRecord[key]
        }),
        "utf-8"
      )
    ),
    fs2.writeFile(
      checksumFilePath,
      JSON.stringify(nextChecksum, null, 2),
      "utf-8"
    ),
    fs2.writeFile(distClientPath, distClientContent, "utf-8"),
    fs2.rm(tmpFolder, { recursive: true, force: true })
  ]);
  const prettierPath = require2.resolve("prettier");
  const prettierCliPath = path2.join(
    path2.dirname(prettierPath),
    "bin/prettier.cjs"
  );
  execSync(`node ${prettierCliPath} ${cliOutput} --write`);
}
main();
