import { 
  AddPetParameters,
  UpdatePetParameters,
  FindPetsByStatusParameters,
  FindPetsByTagsParameters,
  GetPetByIdParameters,
  UpdatePetWithFormParameters,
  DeletePetParameters,
  UploadFileParameters
} from '../client'
import { FilterByParameterType } from '../utils';

export class PetController {
static async addPet(params: FilterByParameterType<typeof AddPetParameters>) {

}
  static async updatePet(params: FilterByParameterType<typeof UpdatePetParameters>) {

}
  static async findPetsByStatus(params: FilterByParameterType<typeof FindPetsByStatusParameters>) {

}
  static async findPetsByTags(params: FilterByParameterType<typeof FindPetsByTagsParameters>) {

}
  static async getPetById(params: FilterByParameterType<typeof GetPetByIdParameters>) {

}
  static async updatePetWithForm(params: FilterByParameterType<typeof UpdatePetWithFormParameters>) {

}
  static async deletePet(params: FilterByParameterType<typeof DeletePetParameters>) {

}
  static async uploadFile(params: FilterByParameterType<typeof UploadFileParameters>) {

}
}