import { z } from 'zod';

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
  UpdatePetWithFormResponse,
  DeletePetParameters,
  DeletePetErrors,
  DeletePetResponse,
  UploadFileParameters,
  UploadFileErrors,
  UploadFileResponse
} from '../client.js';
import { ParsedRequestInfo } from '../utils.js';
import { ControllerReturnType, ErrorStatuses } from '../types.js';

export type AddPetControllerFunction = (
  params: ParsedRequestInfo<typeof AddPetParameters>
) => ControllerReturnType<
  typeof AddPetResponse,
  ErrorStatuses<typeof AddPetErrors>,
  200
>;

export type UpdatePetControllerFunction = (
  params: ParsedRequestInfo<typeof UpdatePetParameters>
) => ControllerReturnType<
  typeof UpdatePetResponse,
  ErrorStatuses<typeof UpdatePetErrors>,
  200
>;

export type FindPetsByStatusControllerFunction = (
  params: ParsedRequestInfo<typeof FindPetsByStatusParameters>
) => ControllerReturnType<
  typeof FindPetsByStatusResponse,
  ErrorStatuses<typeof FindPetsByStatusErrors>,
  200
>;

export type FindPetsByTagsControllerFunction = (
  params: ParsedRequestInfo<typeof FindPetsByTagsParameters>
) => ControllerReturnType<
  typeof FindPetsByTagsResponse,
  ErrorStatuses<typeof FindPetsByTagsErrors>,
  200
>;

export type GetPetByIdControllerFunction = (
  params: ParsedRequestInfo<typeof GetPetByIdParameters>
) => ControllerReturnType<
  typeof GetPetByIdResponse,
  ErrorStatuses<typeof GetPetByIdErrors>,
  200
>;

export type UpdatePetWithFormControllerFunction = (
  params: ParsedRequestInfo<typeof UpdatePetWithFormParameters>
) => ControllerReturnType<
  typeof UpdatePetWithFormResponse,
  ErrorStatuses<typeof UpdatePetWithFormErrors>,
  204
>;

export type DeletePetControllerFunction = (
  params: ParsedRequestInfo<typeof DeletePetParameters>
) => ControllerReturnType<
  typeof DeletePetResponse,
  ErrorStatuses<typeof DeletePetErrors>,
  204
>;

export type UploadFileControllerFunction = (
  params: ParsedRequestInfo<typeof UploadFileParameters>
) => ControllerReturnType<
  typeof UploadFileResponse,
  ErrorStatuses<typeof UploadFileErrors>,
  200
>;
