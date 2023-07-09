import { z } from 'zod';

interface OasError {
  status: number;
  description: string;
  schema: z.ZodTypeAny;
}

export type ErrorStatuses<TOasError extends readonly OasError[]> = Exclude<
  Extract<TOasError[number], { status: number }>['status'],
  401 | 403
>;

export type ControllerReturnType<
  TResponseType extends z.ZodTypeAny,
  TErrorStatus extends number,
  TSuccessStatus extends number
> =
  | {
      status: TErrorStatus;
      error: {
        code: number;
        message: string;
        detail?: z.ZodIssue[];
      };
    }
  | {
      status: TSuccessStatus;
      data: z.output<TResponseType>;
    };
