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

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
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
