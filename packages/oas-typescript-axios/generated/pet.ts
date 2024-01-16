import { z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
import { getFinalUrlAndRequestConfig } from './utils/request.js';

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
export const uploadFileMultipart_Body = z
  .object({ name: z.string(), profileImage: z.instanceof(File) })
  .partial()
  .passthrough();
export interface uploadFileMultipart_Body
  extends z.infer<typeof uploadFileMultipart_Body> {}

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
const FindPetsByStatusResponse = z.array(Pet);
interface FindPetsByStatusResponse
  extends z.infer<typeof FindPetsByStatusResponse> {}

const FindPetsByTagsParams = z.object({
  query: z.object({ tags: z.array(z.string()).optional() })
});
const FindPetsByTagsResponse = z.array(Pet);
interface FindPetsByTagsResponse
  extends z.infer<typeof FindPetsByTagsResponse> {}

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
  params: z.object({ petId: z.number().int() }),
  headers: z.object({ api_key: z.string().optional() })
});

const UploadFileParams = z.object({
  params: z.object({ petId: z.number().int() }),
  query: z.object({ additionalMetadata: z.string().optional() }),
  body: z.instanceof(File)
});

const UploadFileMultipartParams = z.object({
  params: z.object({ petId: z.number().int() }),
  query: z.object({ additionalMetadata: z.string().optional() }),
  body: uploadFileMultipart_Body
});
const UploadFileMultipartResponse = z
  .object({ code: z.number().int(), type: z.string(), message: z.string() })
  .partial()
  .passthrough();
interface UploadFileMultipartResponse
  extends z.infer<typeof UploadFileMultipartResponse> {}

export function PetApi({
  defaultAxiosRequestConfig
}: {
  defaultAxiosRequestConfig?: AxiosRequestConfig;
}) {
  async function updatePet(
    fnParam: z.infer<typeof UpdatePetParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<Pet> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet`,
      method: 'put',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return Pet.parse(response.data);
  }
  async function addPet(
    fnParam: z.infer<typeof AddPetParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<Pet> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return Pet.parse(response.data);
  }
  async function findPetsByStatus(
    fnParam: z.infer<typeof FindPetsByStatusParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<FindPetsByStatusResponse> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/findByStatus`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      queryParameters: fnParam.query
    });

    const response = await axios(url, config);
    return z.array(Pet).parse(response.data);
  }
  async function findPetsByTags(
    fnParam: z.infer<typeof FindPetsByTagsParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<FindPetsByTagsResponse> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/findByTags`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      queryParameters: fnParam.query
    });

    const response = await axios(url, config);
    return z.array(Pet).parse(response.data);
  }
  async function getPetById(
    fnParam: z.infer<typeof GetPetByIdParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<Pet> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/${fnParam.params.petId}`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return Pet.parse(response.data);
  }
  async function updatePetWithForm(
    fnParam: z.infer<typeof UpdatePetWithFormParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/${fnParam.params.petId}`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      queryParameters: fnParam.query
    });

    const response = await axios(url, config);
    return z.void().parse(response.data);
  }
  async function deletePet(
    fnParam: z.infer<typeof DeletePetParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/${fnParam.params.petId}`,
      method: 'delete',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      headers: fnParam.headers
    });

    const response = await axios(url, config);
    return z.void().parse(response.data);
  }
  async function uploadFile(
    fnParam: z.infer<typeof UploadFileParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/${fnParam.params.petId}/uploadImage`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      queryParameters: fnParam.query
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return z.void().parse(response.data);
  }
  async function uploadFileMultipart(
    fnParam: z.infer<typeof UploadFileMultipartParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<UploadFileMultipartResponse> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/pet/${fnParam.params.petId}/updatePetMultipart`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      queryParameters: fnParam.query
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return z
      .object({ code: z.number().int(), type: z.string(), message: z.string() })
      .partial()
      .passthrough()
      .parse(response.data);
  }

  return {
    updatePet,
    addPet,
    findPetsByStatus,
    findPetsByTags,
    getPetById,
    updatePetWithForm,
    deletePet,
    uploadFile,
    uploadFileMultipart
  };
}
