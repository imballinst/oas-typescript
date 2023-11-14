import { z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
import { getQueryParameterString } from './utils/query.js';

import { ApiResponse } from './common';

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

export function PetApi({
  defaultAxiosRequestConfig
}: {
  defaultAxiosRequestConfig?: AxiosRequestConfig;
}) {
  async function updatePet(
    fnParam: z.infer<typeof UpdatePetParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<Pet> {
    let url = `/pet`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'put'
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    return Pet.parse(response.data);
  }
  async function addPet(
    fnParam: z.infer<typeof AddPetParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<Pet> {
    let url = `/pet`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'post'
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    return Pet.parse(response.data);
  }
  async function findPetsByStatus(
    fnParam: z.infer<typeof FindPetsByStatusParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<FindPetsByStatusResponse> {
    let url = `/pet/findByStatus`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'get'
    };
    const response = await axios(url, config);
    return z.array(Pet).parse(response.data);
  }
  async function findPetsByTags(
    fnParam: z.infer<typeof FindPetsByTagsParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<FindPetsByTagsResponse> {
    let url = `/pet/findByTags`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'get'
    };
    const response = await axios(url, config);
    return z.array(Pet).parse(response.data);
  }
  async function getPetById(
    fnParam: z.infer<typeof GetPetByIdParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<Pet> {
    let url = `/pet/${fnParam.params.petId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'get'
    };
    const response = await axios(url, config);
    return Pet.parse(response.data);
  }
  async function updatePetWithForm(
    fnParam: z.infer<typeof UpdatePetWithFormParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<void> {
    let url = `/pet/${fnParam.params.petId}`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'post'
    };
    const response = await axios(url, config);
    return z.void().parse(response.data);
  }
  async function deletePet(
    fnParam: z.infer<typeof DeletePetParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<void> {
    let url = `/pet/${fnParam.params.petId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers,
        ...fnParam.headers
      },
      method: 'delete'
    };
    const response = await axios(url, config);
    return z.void().parse(response.data);
  }
  async function uploadFile(
    fnParam: z.infer<typeof UploadFileParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<ApiResponse> {
    let url = `/pet/${fnParam.params.petId}/uploadImage`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      },
      method: 'post'
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    return ApiResponse.parse(response.data);
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
