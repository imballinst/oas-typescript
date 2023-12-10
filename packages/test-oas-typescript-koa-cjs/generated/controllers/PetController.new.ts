import {
  AddPetControllerFunction,
  UpdatePetControllerFunction,
  FindPetsByStatusControllerFunction,
  FindPetsByTagsControllerFunction,
  GetPetByIdControllerFunction,
  UpdatePetWithFormControllerFunction,
  DeletePetControllerFunction,
  UploadFileControllerFunction,
  UploadFileMultipartControllerFunction
} from '../static/controller-types/PetControllerTypes';

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
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
    return {
      body: undefined,
      status: undefined
    };
  };
  static uploadFile: UploadFileControllerFunction = (params) => {
    return {
      body: undefined,
      status: undefined
    };
  };
  static uploadFileMultipart: UploadFileMultipartControllerFunction = (
    params
  ) => {
    return {
      body: undefined,
      status: undefined
    };
  };
}
