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
import { ParsedRequestInfo } from '../utils';

export class PetController {
static async addPet(params: ParsedRequestInfo<typeof AddPetParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async updatePet(params: ParsedRequestInfo<typeof UpdatePetParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async findPetsByStatus(params: ParsedRequestInfo<typeof FindPetsByStatusParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async findPetsByTags(params: ParsedRequestInfo<typeof FindPetsByTagsParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async getPetById(params: ParsedRequestInfo<typeof GetPetByIdParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async updatePetWithForm(params: ParsedRequestInfo<typeof UpdatePetWithFormParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async deletePet(params: ParsedRequestInfo<typeof DeletePetParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
  static async uploadFile(params: ParsedRequestInfo<typeof UploadFileParameters>) {
  return {
    body: undefined,
    status: 200
  }
}
}