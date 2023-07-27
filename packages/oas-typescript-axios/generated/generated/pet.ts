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
export const ApiResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();
export interface ApiResponse extends z.infer<typeof ApiResponse> {}

const UpdatePetParams = z.object({ body: Pet });
const AddPetParams = z.object({ body: Pet });
const FindPetsByStatusParams = z.object({
  query: z.object({
    status: z
      .enum(['available', 'pending', 'sold'])
      .optional()
      .default('available')
  })
});
const FindPetsByTagsParams = z.object({
  query: z.object({ tags: z.array(z.string()).optional() })
});
const GetPetByIdParams = z.object({
  params: z.object({ petId: z.number().int() })
});
const UpdatePetWithFormParams = z.object({
  params: z.object({ petId: z.number().int() }),
  query: z.object({
    name: z.string().optional(),
    status: z.string().optional()
  })
});
const DeletePetParams = z.object({
  params: z.object({ petId: z.number().int() })
});
const UploadFileParams = z.object({
  params: z.object({ petId: z.number().int() }),
  query: z.object({ additionalMetadata: z.string().optional() }),
  body: z.instanceof(File)
});

export class PetApi {
  updatePet = (params: z.infer<typeof UpdatePetParams>) => {};
  addPet = (params: z.infer<typeof AddPetParams>) => {};
  findPetsByStatus = (params: z.infer<typeof FindPetsByStatusParams>) => {};
  findPetsByTags = (params: z.infer<typeof FindPetsByTagsParams>) => {};
  getPetById = (params: z.infer<typeof GetPetByIdParams>) => {};
  updatePetWithForm = (params: z.infer<typeof UpdatePetWithFormParams>) => {};
  deletePet = (params: z.infer<typeof DeletePetParams>) => {};
  uploadFile = (params: z.infer<typeof UploadFileParams>) => {};
}
