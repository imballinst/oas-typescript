import { 
  CreateUserParameters,
  CreateUsersWithListInputParameters,
  LoginUserParameters,
  LogoutUserParameters,
  GetUserByNameParameters,
  UpdateUserParameters,
  DeleteUserParameters
} from '../client'
import { FilterByParameterType } from '../utils';

export class UserController {
static async createUser(params: FilterByParameterType<typeof CreateUserParameters>) {

}
  static async createUsersWithListInput(params: FilterByParameterType<typeof CreateUsersWithListInputParameters>) {

}
  static async loginUser(params: FilterByParameterType<typeof LoginUserParameters>) {

}
  static async logoutUser(params: FilterByParameterType<typeof LogoutUserParameters>) {

}
  static async getUserByName(params: FilterByParameterType<typeof GetUserByNameParameters>) {

}
  static async updateUser(params: FilterByParameterType<typeof UpdateUserParameters>) {

}
  static async deleteUser(params: FilterByParameterType<typeof DeleteUserParameters>) {

}
}