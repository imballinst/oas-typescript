export type ResponseHeaders = Record<
  string,
  { schema: number | string; nullable?: boolean }
>;

export interface ErrorResponse {
  schema: string;
  headers?: ResponseHeaders;
}

export interface ResponseSchema {
  success: {
    schema?: string;
    status: number;
    headers?: ResponseHeaders;
  };
  error?: Record<string | number, ErrorResponse>;
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
