import { Pet } from '../static/client';
import {
  AddPetControllerFunction,
  UpdatePetControllerFunction,
  FindPetsByStatusControllerFunction,
  FindPetsByTagsControllerFunction,
  GetPetByIdControllerFunction,
  UpdatePetWithFormControllerFunction,
  DeletePetControllerFunction,
  UploadFileControllerFunction
} from '../static/controller-types/PetControllerTypes';

const db: Pet[] = [];

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    const existingPet = db.find((row) => row.name === params.body.name);
    if (existingPet) {
      return {
        status: 405,
        body: {}
      };
    }

    db.push({ id: db.length + 1, ...params.body });

    return {
      body: params.body,
      status: 200
    };
  };
  static updatePet: UpdatePetControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static findPetsByStatus: FindPetsByStatusControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static findPetsByTags: FindPetsByTagsControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static getPetById: GetPetByIdControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static updatePetWithForm: UpdatePetWithFormControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static deletePet: DeletePetControllerFunction = (params) => {
    const existingPetIndex = db.findIndex(
      (row) => row.id === params.pathParams.petId
    );
    if (existingPetIndex > -1) {
      db.splice(existingPetIndex, 1);
    }

    return {
      body: undefined,
      status: 204
    };
  };
  static uploadFile: UploadFileControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
}
