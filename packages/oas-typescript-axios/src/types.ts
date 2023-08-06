export interface EndpointProcessResult {
  urlDefinition: string;
  paramsDeclaration: string;
  paramsName: string;
  queryParams: string;
  contentType: string;
  hasHeaders: boolean;
  bodySchemaName: string;
  responseInfo: {
    name: string;
    responseDeclarationName: string | undefined;
  };
}
