import { z } from 'zod';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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
const LoginUserResponse = z.string();
interface LoginUserResponse extends z.infer<typeof LoginUserResponse> {}

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
  async function createUser(
    fnParam: z.infer<typeof CreateUserParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<User>> {
    let url = `/user`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    response.data = User.parse(response.data);
    return response;
  }
  async function createUsersWithListInput(
    fnParam: z.infer<typeof CreateUsersWithListInputParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<User>> {
    let url = `/user/createWithList`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    response.data = User.parse(response.data);
    return response;
  }
  async function loginUser(
    fnParam: z.infer<typeof LoginUserParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<LoginUserResponse>> {
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
    const response = await axios(url, config);
    response.data = z.string().parse(response.data);
    return response;
  }
  async function logoutUser(
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    let url = `/user/logout`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, config);
    response.data = z.void().parse(response.data);
    return response;
  }
  async function getUserByName(
    fnParam: z.infer<typeof GetUserByNameParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<User>> {
    let url = `/user/${fnParam.params.username}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, config);
    response.data = User.parse(response.data);
    return response;
  }
  async function updateUser(
    fnParam: z.infer<typeof UpdateUserParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<User>> {
    let url = `/user/${fnParam.params.username}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, { ...config, data: fnParam.body });
    response.data = User.parse(response.data);
    return response;
  }
  async function deleteUser(
    fnParam: z.infer<typeof DeleteUserParams>,
    axiosConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    let url = `/user/${fnParam.params.username}`;

    const config = {
      ...defaultAxiosRequestConfig,
      ...axiosConfig,
      headers: {
        ...defaultAxiosRequestConfig?.headers,
        ...axiosConfig?.headers
      }
    };
    const response = await axios(url, config);
    response.data = z.void().parse(response.data);
    return response;
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
