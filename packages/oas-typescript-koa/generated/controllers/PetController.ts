import {
  AddPetParameters,
  AddPetErrors,
  AddPetResponse,
  UpdatePetParameters,
  UpdatePetErrors,
  UpdatePetResponse,
  FindPetsByStatusParameters,
  FindPetsByStatusErrors,
  FindPetsByStatusResponse,
  FindPetsByTagsParameters,
  FindPetsByTagsErrors,
  FindPetsByTagsResponse,
  GetPetByIdParameters,
  GetPetByIdErrors,
  GetPetByIdResponse,
  UpdatePetWithFormParameters,
  UpdatePetWithFormErrors,
  DeletePetParameters,
  DeletePetErrors,
  UploadFileParameters,
  UploadFileResponse,
  Pet
} from '../generated/client.js';
import { ParsedRequestInfo } from '../generated/utils.js';
import { ControllerReturnType, ErrorStatuses } from '../generated/types.js';
import { customAlphabet } from 'nanoid';

const db: Record<string, Pet> = {};

export class PetController {
  static async addPet(
    params: ParsedRequestInfo<typeof AddPetParameters>
  ): Promise<
    ControllerReturnType<
      typeof AddPetResponse,
      ErrorStatuses<typeof AddPetErrors>,
      200
    >
  > {
    if (db[params.body.name]) {
      return {
        error: {
          code: 10000,
          message: `pet with name ${params.body.name} already exists`
        },
        status: 405
      };
    }

    db[params.body.name] = {
      ...params.body,
      id: Number(customAlphabet('1234567890'))
    };

    return {
      data: db[params.body.name],
      status: 200
    };
  }
  static async updatePet(
    params: ParsedRequestInfo<typeof UpdatePetParameters>
  ): Promise<
    ControllerReturnType<
      typeof UpdatePetResponse,
      ErrorStatuses<typeof UpdatePetErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async findPetsByStatus(
    params: ParsedRequestInfo<typeof FindPetsByStatusParameters>
  ): Promise<
    ControllerReturnType<
      typeof FindPetsByStatusResponse,
      ErrorStatuses<typeof FindPetsByStatusErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async findPetsByTags(
    params: ParsedRequestInfo<typeof FindPetsByTagsParameters>
  ): Promise<
    ControllerReturnType<
      typeof FindPetsByTagsResponse,
      ErrorStatuses<typeof FindPetsByTagsErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async getPetById(
    params: ParsedRequestInfo<typeof GetPetByIdParameters>
  ): Promise<
    ControllerReturnType<
      typeof GetPetByIdResponse,
      ErrorStatuses<typeof GetPetByIdErrors>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
  static async updatePetWithForm(
    params: ParsedRequestInfo<typeof UpdatePetWithFormParameters>
  ): Promise<
    ControllerReturnType<
      typeof undefined,
      ErrorStatuses<typeof UpdatePetWithFormErrors>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
  static async deletePet(
    params: ParsedRequestInfo<typeof DeletePetParameters>
  ): Promise<
    ControllerReturnType<
      typeof undefined,
      ErrorStatuses<typeof DeletePetErrors>,
      NaN
    >
  > {
    return {
      data: undefined,
      status: NaN
    };
  }
  static async uploadFile(
    params: ParsedRequestInfo<typeof UploadFileParameters>
  ): Promise<
    ControllerReturnType<
      typeof UploadFileResponse,
      ErrorStatuses<typeof undefined>,
      200
    >
  > {
    return {
      data: undefined,
      status: 200
    };
  }
}
