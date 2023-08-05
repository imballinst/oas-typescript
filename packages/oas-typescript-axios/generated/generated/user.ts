import { z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
import { getQueryParameterString } from './utils/query.js';

// Schemas.
export const User = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int()
  })
  .partial()
  .passthrough();
export interface User extends z.infer<typeof User> {}

const CreateUserParams = z.object({ body: User });
const CreateUsersWithListInputParams = z.object({ body: z.array(User) });
const LoginUserParams = z.object({
  query: z.object({
    username: z.string().optional(),
    password: z.string().optional()
  })
});
const GetUserByNameParams = z.object({
  params: z.object({ username: z.string() })
});
const UpdateUserParams = z.object({
  params: z.object({ username: z.string() }),
  body: User
});
const DeleteUserParams = z.object({
  params: z.object({ username: z.string() })
});

export function UserApi({
  defaultAxiosRequestConfig
}: {
  defaultAxiosRequestConfig?: AxiosRequestConfig;
}) {
  function createUser(
    fnParam: z.infer<typeof CreateUserParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/user`;

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
  function createUsersWithListInput(
    fnParam: z.infer<typeof CreateUsersWithListInputParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/user/createWithList`;

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
  function loginUser(
    fnParam: z.infer<typeof LoginUserParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/user/login`;
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
  function logoutUser(axiosConfig?: AxiosRequestConfig) {
    let url = `/user/logout`;

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
  function getUserByName(
    fnParam: z.infer<typeof GetUserByNameParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/user/${fnParam.params.username}`;

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
  function updateUser(
    fnParam: z.infer<typeof UpdateUserParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/user/${fnParam.params.username}`;

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
  function deleteUser(
    fnParam: z.infer<typeof DeleteUserParams>,
    axiosConfig?: AxiosRequestConfig
  ) {
    let url = `/user/${fnParam.params.username}`;

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

  return {
    createUser,
    createUsersWithListInput,
    loginUser,
    logoutUser,
    getUserByName,
    updateUser,
    deleteUser
  };
}
