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
export const UpdatePetResponse = Pet;
export interface UpdatePetResponse extends z.infer<typeof UpdatePet> {}
export const UpdatePetErrors = [
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
] as const;

export const AddPetParameters = [
  {
    name: 'body',
    description: `Create a new pet in the store`,
    type: 'Body',
    schema: Pet
  }
] as const;
export const AddPetSecurity = [{ petstore_auth: ['write:pets', 'read:pets'] }];
export const AddPetResponse = Pet;
export interface AddPetResponse extends z.infer<typeof AddPet> {}
export const AddPetErrors = [
  {
    status: 405,
    description: `Invalid input`,
    schema: z.void()
  }
] as const;
