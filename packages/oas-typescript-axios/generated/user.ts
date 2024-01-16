import { z } from 'zod';
import axios, { AxiosRequestConfig } from 'axios';
import { getFinalUrlAndRequestConfig } from './utils/request.js';

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
const LoginUserResponse = z
  .object({ status: z.string() })
  .partial()
  .passthrough();
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
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<User> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return User.parse(response.data);
  }
  async function createUsersWithListInput(
    fnParam: z.infer<typeof CreateUsersWithListInputParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<User> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user/createWithList`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return User.parse(response.data);
  }
  async function loginUser(
    fnParam: z.infer<typeof LoginUserParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<LoginUserResponse> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user/login`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig,
      queryParameters: fnParam.query
    });

    const response = await axios(url, config);
    return z
      .object({ status: z.string() })
      .partial()
      .passthrough()
      .parse(response.data);
  }
  async function logoutUser(
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user/logout`,
      method: 'post',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return z.void().parse(response.data);
  }
  async function getUserByName(
    fnParam: z.infer<typeof GetUserByNameParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<User> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user/${fnParam.params.username}`,
      method: 'get',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return User.parse(response.data);
  }
  async function updateUser(
    fnParam: z.infer<typeof UpdateUserParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<User> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user/${fnParam.params.username}`,
      method: 'put',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, { ...config, data: fnParam.body });
    return User.parse(response.data);
  }
  async function deleteUser(
    fnParam: z.infer<typeof DeleteUserParams>,
    axiosRequestConfig?: AxiosRequestConfig
  ): Promise<void> {
    const { url, config } = getFinalUrlAndRequestConfig({
      url: `/user/${fnParam.params.username}`,
      method: 'delete',
      defaultAxiosRequestConfig,
      axiosRequestConfig
    });

    const response = await axios(url, config);
    return z.void().parse(response.data);
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
