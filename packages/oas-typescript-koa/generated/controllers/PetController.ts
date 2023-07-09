import { Pet } from '../generated/client.js';
import {
  AddPetControllerFunction,
  UpdatePetControllerFunction,
  FindPetsByStatusControllerFunction,
  FindPetsByTagsControllerFunction,
  GetPetByIdControllerFunction,
  UpdatePetWithFormControllerFunction,
  DeletePetControllerFunction,
  UploadFileControllerFunction
} from '../generated/controller-types/PetControllerTypes.js';

import { customAlphabet } from 'nanoid';

const db: Record<string, Pet> = {};

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
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
  };
  static updatePet: UpdatePetControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static findPetsByStatus: FindPetsByStatusControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static findPetsByTags: FindPetsByTagsControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static getPetById: GetPetByIdControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
  static updatePetWithForm: UpdatePetWithFormControllerFunction = (params) => {
    return {
      data: undefined,
      status: 204
    };
  };
  static deletePet: DeletePetControllerFunction = (params) => {
    return {
      data: undefined,
      status: 204
    };
  };
  static uploadFile: UploadFileControllerFunction = (params) => {
    return {
      data: undefined,
      status: 200
    };
  };
}
