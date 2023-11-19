import { z } from 'zod';
import { DefaultHttpErrors } from '../../templates/typescript/types';

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
