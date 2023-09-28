import {
  AddPetControllerFunction,
  UpdatePetControllerFunction
} from '../generated/controller-types/PetControllerTypes.js';

export class PetController {
  static addPet: AddPetControllerFunction = (params) => {
    return {
      data: undefined,
      status: undefined
    };
  };
  static updatePet: UpdatePetControllerFunction = (params) => {
    return {
      status: 200,
      data: {
        name: '',
        photoUrls: []
      },
      headers: {
        'x-ratelimit': ''
      }
    };
  };
}
