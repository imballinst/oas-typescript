import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const Category = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
const Tag = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
const Pet = z
  .object({
    id: z.number().int().optional(),
    name: z.string(),
    category: Category.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(Tag).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional()
  })
  .passthrough();
const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();

export const schemas = {
  Category,
  Tag,
  Pet,
  ApiResponse
};

const endpoints = makeApi([
  {
    method: 'put',
    path: '/pet',
    description: `Update an existing pet by Id`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Update an existent pet in the store`,
        type: 'Body',
        schema: Pet
      }
    ],
    response: Pet,
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      },
      {
        status: 405,
        description: `Validation exception`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/pet',
    description: `Add a new pet to the store`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Create a new pet in the store`,
        type: 'Body',
        schema: Pet
      }
    ],
    response: Pet,
    errors: [
      {
        status: 405,
        description: `Invalid input`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/pet/findByStatus',
    description: `Multiple status values can be provided with comma separated strings`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['available', 'pending', 'sold'])
          .optional()
          .default('available')
      }
    ],
    response: z.array(Pet),
    errors: [
      {
        status: 400,
        description: `Invalid status value`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/pet/findByTags',
    description: `Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'tags',
        type: 'Query',
        schema: z.array(z.string()).optional()
      }
    ],
    response: z.array(Pet),
    errors: [
      {
        status: 400,
        description: `Invalid tag value`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/pet/:petId',
    description: `Returns a single pet`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: Pet,
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/pet/:petId',
    requestFormat: 'json',
    parameters: [
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      },
      {
        name: 'name',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 405,
        description: `Invalid input`,
        schema: ApiResponse
      }
    ]
  },
  {
    method: 'delete',
    path: '/pet/:petId',
    requestFormat: 'json',
    parameters: [
      {
        name: 'api_key',
        type: 'Header',
        schema: z.string().optional()
      },
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid pet value`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/pet/:petId/uploadImage',
    requestFormat: 'binary',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.instanceof(File)
      },
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      },
      {
        name: 'additionalMetadata',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: ApiResponse
  }
]);

export const PetApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
