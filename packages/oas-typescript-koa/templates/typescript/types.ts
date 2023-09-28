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

export type ResponseHeaders<
  THeadersSchemaType = string | number | z.ZodSchema
> = Record<string, { schema: THeadersSchemaType; nullable?: boolean }>;

type ExtractResponseHeaders<
  TResponseHeadersType extends ResponseHeaders | undefined
> = TResponseHeadersType extends object
  ? {
      [K in keyof TResponseHeadersType]: TResponseHeadersType[K]['schema'] extends z.ZodSchema
        ? z.infer<TResponseHeadersType[K]['schema']>
        : TResponseHeadersType[K]['schema'];
    }
  : never;

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
      | {
          // TOOD: might need some tweaking in case it's undefined, maybe
          // it's better to be `data?: never`.
          data: z.infer<X['success']['schema']>;
          status: X['success']['status'];
          headers: ExtractResponseHeaders<X['success']['headers']>;
        }
      | ExtractErrorRecord<X['error']>
  : never;

export type ExtractErrorRecord<
  TErrorRecord extends
    | Record<string | number, ErrorResponse<unknown, unknown, z.ZodSchema>>
    | undefined
> = TErrorRecord extends object
  ? {
      [Key in keyof TErrorRecord]: TErrorRecord[Key]['schema'] extends z.ZodVoid
        ? {
            error?: never;
            status: TErrorRecord[Key]['status'];
            headers?: ExtractResponseHeaders<TErrorRecord[Key]['headers']>;
          }
        : TErrorRecord[Key]['schema'] extends z.ZodSchema
        ? {
            error: z.infer<TErrorRecord[Key]['schema']>;
            status: TErrorRecord[Key]['status'];
            headers?: ExtractResponseHeaders<TErrorRecord[Key]['headers']>;
          }
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
