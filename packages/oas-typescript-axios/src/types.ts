export interface EndpointProcessResult {
  urlDefinition: string;
  paramsDeclaration: string;
  paramsName: string;
  queryParams: string;
  contentType: string;
  hasHeaders: boolean;
  method: string;
  bodySchemaName: string;
  responseInfo: {
    schema: string;
    promiseDataReturnType: string;
    responseDeclarationName: string | undefined;
  };
}
