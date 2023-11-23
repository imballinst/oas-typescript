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
} from '../client';
import { ParsedRequestInfo } from '../utils';
import { ControllerReturnType, ErrorStatuses } from '../types';

export type CreateUserControllerFunction = (
  params: ParsedRequestInfo<typeof CreateUserParameters>
) => ControllerReturnType<{
  success: CreateUserResponse;
  error: CreateUserErrors;
}>;

export type CreateUsersWithListInputControllerFunction = (
  params: ParsedRequestInfo<typeof CreateUsersWithListInputParameters>
) => ControllerReturnType<{
  success: CreateUsersWithListInputResponse;
  error: CreateUsersWithListInputErrors;
}>;

export type LoginUserControllerFunction = (
  params: ParsedRequestInfo<typeof LoginUserParameters>
) => ControllerReturnType<{
  success: LoginUserResponse;
  error: LoginUserErrors;
}>;

export type LogoutUserControllerFunction = (
  params: ParsedRequestInfo<typeof LogoutUserParameters>
) => ControllerReturnType<{
  success: LogoutUserResponse;
  error: LogoutUserErrors;
}>;

export type GetUserByNameControllerFunction = (
  params: ParsedRequestInfo<typeof GetUserByNameParameters>
) => ControllerReturnType<{
  success: GetUserByNameResponse;
  error: GetUserByNameErrors;
}>;

export type UpdateUserControllerFunction = (
  params: ParsedRequestInfo<typeof UpdateUserParameters>
) => ControllerReturnType<{
  success: UpdateUserResponse;
  error: UpdateUserErrors;
}>;

export type DeleteUserControllerFunction = (
  params: ParsedRequestInfo<typeof DeleteUserParameters>
) => ControllerReturnType<{
  success: DeleteUserResponse;
  error: DeleteUserErrors;
}>;
