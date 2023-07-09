import { z } from 'zod';

import {
  CreateUserParameters,
  CreateUserErrors,
  CreateUserResponse,
  CreateUsersWithListInputParameters,
  CreateUsersWithListInputErrors,
  CreateUsersWithListInputResponse,
  LoginUserParameters,
  LoginUserErrors,
  LoginUserResponse,
  LogoutUserParameters,
  LogoutUserErrors,
  LogoutUserResponse,
  GetUserByNameParameters,
  GetUserByNameErrors,
  GetUserByNameResponse,
  UpdateUserParameters,
  UpdateUserErrors,
  UpdateUserResponse,
  DeleteUserParameters,
  DeleteUserErrors,
  DeleteUserResponse
} from '../client.js';
import { ParsedRequestInfo } from '../utils.js';
import { ControllerReturnType, ErrorStatuses } from '../types.js';

export type CreateUserControllerFunction = (
  params: ParsedRequestInfo<typeof CreateUserParameters>
) => ControllerReturnType<
  typeof CreateUserResponse,
  ErrorStatuses<typeof CreateUserErrors>,
  204
>;

export type CreateUsersWithListInputControllerFunction = (
  params: ParsedRequestInfo<typeof CreateUsersWithListInputParameters>
) => ControllerReturnType<
  typeof CreateUsersWithListInputResponse,
  ErrorStatuses<typeof CreateUsersWithListInputErrors>,
  200
>;

export type LoginUserControllerFunction = (
  params: ParsedRequestInfo<typeof LoginUserParameters>
) => ControllerReturnType<
  typeof LoginUserResponse,
  ErrorStatuses<typeof LoginUserErrors>,
  200
>;

export type LogoutUserControllerFunction = (
  params: ParsedRequestInfo<typeof LogoutUserParameters>
) => ControllerReturnType<
  typeof LogoutUserResponse,
  ErrorStatuses<typeof LogoutUserErrors>,
  204
>;

export type GetUserByNameControllerFunction = (
  params: ParsedRequestInfo<typeof GetUserByNameParameters>
) => ControllerReturnType<
  typeof GetUserByNameResponse,
  ErrorStatuses<typeof GetUserByNameErrors>,
  200
>;

export type UpdateUserControllerFunction = (
  params: ParsedRequestInfo<typeof UpdateUserParameters>
) => ControllerReturnType<
  typeof UpdateUserResponse,
  ErrorStatuses<typeof UpdateUserErrors>,
  204
>;

export type DeleteUserControllerFunction = (
  params: ParsedRequestInfo<typeof DeleteUserParameters>
) => ControllerReturnType<
  typeof DeleteUserResponse,
  ErrorStatuses<typeof DeleteUserErrors>,
  204
>;
