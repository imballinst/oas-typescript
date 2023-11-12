import {
  CreateUserControllerFunction,
  CreateUsersWithListInputControllerFunction,
  LoginUserControllerFunction,
  LogoutUserControllerFunction,
  GetUserByNameControllerFunction,
  UpdateUserControllerFunction,
  DeleteUserControllerFunction
} from '../static/controller-types/UserControllerTypes';

export class UserController {
  static createUser: CreateUserControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static createUsersWithListInput: CreateUsersWithListInputControllerFunction =
    (params) => {
      return {
        body: undefined,
        status: undefined
      };
    };
  static loginUser: LoginUserControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static logoutUser: LogoutUserControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static getUserByName: GetUserByNameControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static updateUser: UpdateUserControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static deleteUser: DeleteUserControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
}
