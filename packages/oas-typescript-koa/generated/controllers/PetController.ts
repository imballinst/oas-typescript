import { Pet } from '../static/client.js';
import {
  AddPetControllerFunction,
  UpdatePetControllerFunction,
  FindPetsByStatusControllerFunction,
  FindPetsByTagsControllerFunction,
  GetPetByIdControllerFunction,
  UpdatePetWithFormControllerFunction,
  DeletePetControllerFunction,
  UploadFileControllerFunction
} from '../static/controller-types/PetControllerTypes.js';

const db: Pet[] = [];

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    const existingPet = db.find((row) => row.name === params.body.name);
    if (existingPet) {
      console.info('params.body existing', params.body);
      return {
        status: 405,
        body: {}
      };
    }

    db.push(params.body);

    return {
      body: params.body,
      status: 200
    };
  };
  static updatePet: UpdatePetControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static findPetsByStatus: FindPetsByStatusControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static findPetsByTags: FindPetsByTagsControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static getPetById: GetPetByIdControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static updatePetWithForm: UpdatePetWithFormControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static deletePet: DeletePetControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static uploadFile: UploadFileControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
}
