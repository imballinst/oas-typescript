import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    pet: Pet,
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(['placed', 'approved', 'delivered']),
    complete: z.boolean()
  })
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
const Category = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
const Tag = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();

export const schemas = {
  Order,
  Pet,
  Category,
  Tag
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/store/inventory',
    description: `Returns a map of status codes to quantities`,
    requestFormat: 'json',
    response: z.record(z.number())
  },
  {
    method: 'post',
    path: '/store/order',
    description: `Place a new order in the store`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Order
      }
    ],
    response: Order,
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
    path: '/store/order/:orderId',
    description: `For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generate exceptions.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'orderId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: Order,
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Order not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'delete',
    path: '/store/order/:orderId',
    description: `For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'orderId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Order not found`,
        schema: z.void()
      }
    ]
  }
]);

export const StoreApi = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
