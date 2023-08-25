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
  response?: string;
  /**
   * Contains the response headers.
   */
  responseHeaders?: Record<string, number | string>;
  /**
   * Contains the response success status, which is required.
   */
  responseSuccessStatus: number;
  /**
   * Contains the error type, which is derived from `client.ts`.
   */
  errorType?: string;
  /**
   * Mostly used for default responses. So, for errors, if defined explicitly, it'll be this:
   *
   * ```
   * { status: 400, error: { ... }}
   * ```
   *
   * However, if we use `default`, then it'll be this:
   *
   * ```
   * { status: number, error: { ... }}
   * ```
   */
  hasDefaultResponseStatus: boolean;
}
