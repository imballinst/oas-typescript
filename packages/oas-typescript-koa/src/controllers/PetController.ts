import {
  AddPetParameters,
  UpdatePetParameters,
  FindPetsByStatusParameters,
  FindPetsByTagsParameters,
  GetPetByIdParameters,
  UpdatePetWithFormParameters,
  DeletePetParameters,
  UploadFileParameters
} from '../client';
import { ParsedRequestInfo } from '../utils';

export class PetController {
  static async addPet(params: ParsedRequestInfo<typeof AddPetParameters>) {}
  static async updatePet(
    params: ParsedRequestInfo<typeof UpdatePetParameters>
  ) {}
  static async findPetsByStatus(
    params: ParsedRequestInfo<typeof FindPetsByStatusParameters>
  ) {}
  static async findPetsByTags(
    params: ParsedRequestInfo<typeof FindPetsByTagsParameters>
  ) {}
  static async getPetById(
    params: ParsedRequestInfo<typeof GetPetByIdParameters>
  ) {}
  static async updatePetWithForm(
    params: ParsedRequestInfo<typeof UpdatePetWithFormParameters>
  ) {}
  static async deletePet(
    params: ParsedRequestInfo<typeof DeletePetParameters>
  ) {}
  static async uploadFile(
    params: ParsedRequestInfo<typeof UploadFileParameters>
  ) {}
}
