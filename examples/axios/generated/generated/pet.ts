import { z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
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
  params: z.object({ petId: z.number().int() }),
  headers: z.object({ api_key: z.string().optional() })
});
const UploadFileParams = z.object({
  params: z.object({ petId: z.number().int() }),
  query: z.object({ additionalMetadata: z.string().optional() }),
  body: z.instanceof(File)
});

export function petApi({
  defaultAxiosRequestConfig
}: {
  defaultAxiosRequestConfig?: AxiosRequestConfig;
}) {
  function updatePet(
    fnParam: z.infer<typeof UpdatePetParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, { ...config, data: fnParam.body });
  }
  function addPet(
    fnParam: z.infer<typeof AddPetParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, { ...config, data: fnParam.body });
  }
  function findPetsByStatus(
    fnParam: z.infer<typeof FindPetsByStatusParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet/findByStatus`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }
  function findPetsByTags(
    fnParam: z.infer<typeof FindPetsByTagsParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet/findByTags`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }
  function getPetById(
    fnParam: z.infer<typeof GetPetByIdParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet/${fnParam.params.petId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }
  function updatePetWithForm(
    fnParam: z.infer<typeof UpdatePetWithFormParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet/${fnParam.params.petId}`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, config);
  }
  function deletePet(
    fnParam: z.infer<typeof DeletePetParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet/${fnParam.params.petId}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers,
        ...fnParam.headers
      }
    };
    return axios(url, config);
  }
  function uploadFile(
    fnParam: z.infer<typeof UploadFileParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/pet/${fnParam.params.petId}/uploadImage`;
    url += getQueryParameterString(fnParam.query);

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    return axios(url, { ...config, data: fnParam.body });
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
