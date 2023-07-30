import { z } from 'zod';
import axios from 'axios';
import { getQueryParameterString } from './utils/query.js';

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

export function petApi() {
  function updatePet(fnParam: z.infer<typeof UpdatePetParams>) {
    let url = `/pet`;

    return axios(url);
  }
  function addPet(fnParam: z.infer<typeof AddPetParams>) {
    let url = `/pet`;

    return axios(url);
  }
  function findPetsByStatus(fnParam: z.infer<typeof FindPetsByStatusParams>) {
    let url = `/pet/findByStatus`;
    url += getQueryParameterString(fnParam.query);

    return axios(url);
  }
  function findPetsByTags(fnParam: z.infer<typeof FindPetsByTagsParams>) {
    let url = `/pet/findByTags`;
    url += getQueryParameterString(fnParam.query);

    return axios(url);
  }
  function getPetById(fnParam: z.infer<typeof GetPetByIdParams>) {
    let url = `/pet/:petId`;

    return axios(url);
  }
  function updatePetWithForm(fnParam: z.infer<typeof UpdatePetWithFormParams>) {
    let url = `/pet/:petId`;
    url += getQueryParameterString(fnParam.query);

    return axios(url);
  }
  function deletePet(fnParam: z.infer<typeof DeletePetParams>) {
    let url = `/pet/:petId`;

    return axios(url);
  }
  function uploadFile(fnParam: z.infer<typeof UploadFileParams>) {
    let url = `/pet/${fnParam.params.petId}/uploadImage`;
    url += getQueryParameterString(fnParam.query);

    return axios(url);
  }

  return {
    updatePet,
    addPet,
    findPetsByStatus,
    findPetsByTags,
    getPetById,
    updatePetWithForm,
    deletePet,
    uploadFile
  };
}
