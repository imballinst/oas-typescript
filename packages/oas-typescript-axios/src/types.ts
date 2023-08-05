export interface EndpointProcessResult {
  urlDefinition: string;
  paramsDeclaration: string;
  paramsName: string;
  queryParams: string;
  contentType: string;
  hasHeaders: boolean;
  hasBody: boolean;
}
