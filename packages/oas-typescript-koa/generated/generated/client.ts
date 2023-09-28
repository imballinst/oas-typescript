import { z } from 'zod';

// Schemas.
export const Category = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
export interface Category extends z.infer<typeof Category> {}
export const Tag = z
  .object({ id: z.number().int(), name: z.string() })
  .partial()
  .passthrough();
export interface Tag extends z.infer<typeof Tag> {}
export const Pet = z
  .object({
    id: z.number().int().optional(),
    name: z.string(),
    category: Category.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(Tag).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional()
  })
  .passthrough();
export interface Pet extends z.infer<typeof Pet> {}
export const ErrorObject = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();
export interface ErrorObject extends z.infer<typeof ErrorObject> {}

// Endpoints.
export const UpdatePetParameters = [
  {
    name: 'body',
    description: `Update an existent pet in the store`,
    type: 'Body',
    schema: Pet
  }
] as const;
export const UpdatePetSecurity = [
  { petstore_auth: ['write:pets', 'read:pets'] }
];

export const UpdatePetResponse = {
  schema: Pet,
  status: 200,
  headers: {
    'x-ratelimit': {
      schema: z.string(),
      nullable: true
    }
  }
} as const;
export type UpdatePetResponse = typeof UpdatePetResponse;

export const UpdatePetErrors = {
  '400': {
    schema: z.void(),
    status: 400
  },
  '404': {
    schema: z.void(),
    status: 404
  },
  '405': {
    schema: z.void(),
    status: 405
  }
} as const;
export type UpdatePetErrors = typeof UpdatePetErrors;

export const AddPetParameters = [
  {
    name: 'body',
    description: `Create a new pet in the store`,
    type: 'Body',
    schema: Pet
  }
] as const;
export const AddPetSecurity = [{ petstore_auth: ['write:pets', 'read:pets'] }];

export const AddPetResponse = {
  schema: Pet,
  status: 200
} as const;
export type AddPetResponse = typeof AddPetResponse;

export const AddPetErrors = {
  '400': {
    schema: ErrorObject,
    status: 400
  },
  '405': {
    schema: z.void(),
    status: 405
  }
} as const;
export type AddPetErrors = typeof AddPetErrors;
