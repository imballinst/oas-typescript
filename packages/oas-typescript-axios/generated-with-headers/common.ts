import { z } from 'zod';

export const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();
