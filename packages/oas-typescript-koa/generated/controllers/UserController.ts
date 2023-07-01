import { 
  CreateUserParameters,
  CreateUsersWithListInputParameters,
  LoginUserParameters,
  LogoutUserParameters,
  GetUserByNameParameters,
  UpdateUserParameters,
  DeleteUserParameters
} from '../client'
import { ParsedRequestInfo } from '../utils';

export class UserController {
static async createUser(params: ParsedRequestInfo<typeof CreateUserParameters>) {

}
  static async createUsersWithListInput(params: ParsedRequestInfo<typeof CreateUsersWithListInputParameters>) {

}
  static async loginUser(params: ParsedRequestInfo<typeof LoginUserParameters>) {

}
  static async logoutUser(params: ParsedRequestInfo<typeof LogoutUserParameters>) {

}
  static async getUserByName(params: ParsedRequestInfo<typeof GetUserByNameParameters>) {

}
  static async updateUser(params: ParsedRequestInfo<typeof UpdateUserParameters>) {

}
  static async deleteUser(params: ParsedRequestInfo<typeof DeleteUserParameters>) {

}
}