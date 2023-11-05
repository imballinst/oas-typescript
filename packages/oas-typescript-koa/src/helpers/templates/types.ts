import { z } from 'zod';
import { DefaultHttpErrors } from '../../../templates/typescript/types';

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
   * Contains the variable names of the response object schema.
   */
  responseType: {
    success: string;
    error?: string;
  };
}

export type PrebuildResponseHeaders<THeadersSchemaType = string | number> =
  Record<string, { schema: THeadersSchemaType; nullable?: boolean }>;

interface PrebuildErrorResponse<
  TSchemaType = string,
  TStatus = number | string,
  THeadersSchemaType = string | number
> {
  status: TStatus extends z.ZodNumber ? DefaultHttpErrors : TStatus;
  schema: TSchemaType;
  headers?: PrebuildResponseHeaders<THeadersSchemaType>;
}

export interface PrebuildResponseSchema<
  TSuccessSchemaType = string,
  TErrorSchemaType = string,
  THeadersSchemaType = string | number
> {
  success: {
    schema?: TSuccessSchemaType;
    status: number;
    headers?: PrebuildResponseHeaders;
  };
  error?: Record<
    string | number,
    PrebuildErrorResponse<TErrorSchemaType, string | number, THeadersSchemaType>
  >;
}
