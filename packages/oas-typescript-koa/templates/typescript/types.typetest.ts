import { z } from 'zod';
import { ControllerReturnType, ExtractErrorRecord } from './types';

// Errors.
// Single.
export const AddPetErrors = {
  405: {
    status: 405,
    description: `Invalid input`,
    schema: z.void()
  }
} as const;

type Extracted = ExtractErrorRecord<typeof AddPetErrors>;
const extracted: Extracted = {
  status: 405,
  error: undefined,
  headers: {}
};

// Union.
export const AddPetErrorsUnion = {
  405: {
    status: 405,
    description: `Invalid input`,
    schema: z.void()
  },
  406: {
    status: 406,
    description: `Invalid input`,
    schema: z.object({ something: z.string() })
  }
} as const;

type ExtractedUnion = ExtractErrorRecord<typeof AddPetErrorsUnion>;
const extractedUnion1: ExtractedUnion = {
  status: 405,
  error: undefined,
  headers: {}
};
const extractedUnion2: ExtractedUnion = {
  status: 406,
  error: {
    something: ''
  },
  headers: {}
};

// Error and success combined.
const CombinedSuccessType = z.object({ success: z.string() });
const CombinedErrorType = z.object({ error: z.string() });

type Combined = ControllerReturnType<{
  success: {
    schema: z.infer<typeof CombinedSuccessType>;
    status: 200;
  };
  error: {
    '405': {
      schema: typeof CombinedErrorType;
      status: 405;
    };
  };
}>;
const combined: Combined = {
  status: 200,
  data: {
    success: ''
  },
  headers: {}
};
const combined2: Combined = {
  status: 405,
  error: {
    error: ''
  },
  headers: {}
};
