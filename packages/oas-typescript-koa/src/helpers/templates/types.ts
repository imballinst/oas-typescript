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
   * Contains the response object schema.
   */
  response: PrebuildResponseSchema;
  /**
   * Contains the variable names of the response object schema.
   */
  responseType: {
    success: string;
    error?: string;
  };
}

export type PrebuildResponseHeaders<
  THeadersSchemaType = string | number | z.ZodSchema
> = Record<string, { schema: THeadersSchemaType; nullable?: boolean }>;

export interface PrebuildErrorResponse<
  TSchemaType = string,
  TStatus = number | string,
  THeadersSchemaType = string | number | z.ZodSchema
> {
  status: TStatus extends z.ZodNumber ? DefaultHttpErrors : TStatus;
  schema: TSchemaType;
  headers?: PrebuildResponseHeaders<THeadersSchemaType>;
}

export interface PrebuildResponseSchema<
  TSuccessSchemaType = z.ZodSchema,
  TErrorSchemaType = string,
  THeadersSchemaType = string | number | z.ZodSchema
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
