import { mkdir, rename } from 'fs/promises';
import { Pet } from '../static/client.js';
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
} from '../static/controller-types/PetControllerTypes.js';
import path from 'path';

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
  static uploadFile: UploadFileControllerFunction = async (params) => {
    await mkdir(path.join(process.cwd(), 'tests/output'), { recursive: true });
    await rename(
      params.body.profileImage.filepath,
      path.join(
        process.cwd(),
        'tests/output',
        path.basename(params.body.profileImage.filepath)
      )
    );
    return {
      body: undefined,
      status: 200
    };
  };
  static uploadFileMultipart: UploadFileMultipartControllerFunction = (
    params
  ) => {
    return {
      body: {},
      status: 200
    };
  };
}
