import { z } from 'zod';

export interface OasError {
  status: number;
  description: string;
  schema: z.ZodTypeAny;
}

export type ErrorStatuses<TOasError extends readonly OasError[]> = Exclude<
  Extract<TOasError[number], { status: number }>['status'],
  401 | 403
>;

export type ResponseHeaders = Record<
  string,
  { schema: number | string; nullable?: boolean }
>;

export interface ErrorResponse<
  TSchemaType = string,
  TStatus = number | string
> {
  status: TStatus extends 'number' ? DefaultHttpErrors : TStatus;
  schema: TSchemaType;
  headers?: ResponseHeaders;
}

export interface ResponseSchema<
  TSuccessSchemaType = string,
  TErrorSchemaType = string
> {
  success: {
    schema?: TSuccessSchemaType;
    status: number;
    headers?: ResponseHeaders;
  };
  error?: Record<string | number, ErrorResponse<TErrorSchemaType>>;
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

export type ControllerReturnType<X extends ResponseSchema<unknown, unknown>> =
  | X['success']['schema'] extends z.ZodSchema
  ?
      | {
          // TOOD: might need some tweaking in case it's undefined, maybe
          // it's better to be `data?: never`.
          data: z.infer<X['success']['schema']>;
          status: X['success']['status'];
          headers: X['success']['headers'];
        }
      | ExtractErrorRecord<X['error']>
  : never;

export type ExtractErrorRecord<
  TErrorRecord extends
    | Record<string | number, ErrorResponse<unknown>>
    | undefined
> = TErrorRecord extends object
  ? {
      [Key in keyof TErrorRecord]: TErrorRecord[Key]['schema'] extends z.ZodVoid
        ? {
            error?: never;
            status: TErrorRecord[Key]['status'];
            headers: TErrorRecord[Key]['headers'];
          }
        : TErrorRecord[Key]['schema'] extends z.ZodSchema
        ? {
            error: z.infer<TErrorRecord[Key]['schema']>;
            status: TErrorRecord[Key]['status'];
            headers: TErrorRecord[Key]['headers'];
          }
        : never;
    }[keyof TErrorRecord]
  : never;

type DefaultHttpErrors =
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
