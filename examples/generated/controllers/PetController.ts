import { z } from 'zod';
import { customAlphabet } from 'nanoid';

import {
  AddPetParameters,
  UpdatePetParameters,
  FindPetsByStatusParameters,
  FindPetsByTagsParameters,
  GetPetByIdParameters,
  UpdatePetWithFormParameters,
  DeletePetParameters,
  UploadFileParameters,
  Pet
} from '../generated/client.js';
import { ParsedRequestInfo } from '../generated/utils.js';

const db: Record<string, z.output<typeof Pet>> = {};

export class PetController {
  static async addPet(params: ParsedRequestInfo<typeof AddPetParameters>) {
    if (db[params.body.name]) {
      return {
        body: { message: `pet with name ${params.body.name} already exists` },
        status: 400
      };
    }

    db[params.body.name] = {
      ...params.body,
      id: Number(customAlphabet('1234567890'))
    };

    return {
      body: db[params.body.name],
      status: 200
    };
  }
  static async updatePet(
    params: ParsedRequestInfo<typeof UpdatePetParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async findPetsByStatus(
    params: ParsedRequestInfo<typeof FindPetsByStatusParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async findPetsByTags(
    params: ParsedRequestInfo<typeof FindPetsByTagsParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async getPetById(
    params: ParsedRequestInfo<typeof GetPetByIdParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async updatePetWithForm(
    params: ParsedRequestInfo<typeof UpdatePetWithFormParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async deletePet(
    params: ParsedRequestInfo<typeof DeletePetParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
  static async uploadFile(
    params: ParsedRequestInfo<typeof UploadFileParameters>
  ) {
    return {
      body: undefined,
      status: 200
    };
  }
}
