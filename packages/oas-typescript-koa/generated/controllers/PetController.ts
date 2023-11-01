import {
  AddPetControllerFunction,
  UpdatePetControllerFunction
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
}
