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
} from '../client';
import { ParsedRequestInfo } from '../utils';
import { ControllerReturnType, ErrorStatuses } from '../types';

export type AddPetControllerFunction = (
  params: ParsedRequestInfo<typeof AddPetParameters>
) => ControllerReturnType<{
  success: AddPetResponse;
  error: AddPetErrors;
}>;

export type UpdatePetControllerFunction = (
  params: ParsedRequestInfo<typeof UpdatePetParameters>
) => ControllerReturnType<{
  success: UpdatePetResponse;
  error: UpdatePetErrors;
}>;

export type FindPetsByStatusControllerFunction = (
  params: ParsedRequestInfo<typeof FindPetsByStatusParameters>
) => ControllerReturnType<{
  success: FindPetsByStatusResponse;
  error: FindPetsByStatusErrors;
}>;

export type FindPetsByTagsControllerFunction = (
  params: ParsedRequestInfo<typeof FindPetsByTagsParameters>
) => ControllerReturnType<{
  success: FindPetsByTagsResponse;
  error: FindPetsByTagsErrors;
}>;

export type GetPetByIdControllerFunction = (
  params: ParsedRequestInfo<typeof GetPetByIdParameters>
) => ControllerReturnType<{
  success: GetPetByIdResponse;
  error: GetPetByIdErrors;
}>;

export type UpdatePetWithFormControllerFunction = (
  params: ParsedRequestInfo<typeof UpdatePetWithFormParameters>
) => ControllerReturnType<{
  success: UpdatePetWithFormResponse;
  error: UpdatePetWithFormErrors;
}>;

export type DeletePetControllerFunction = (
  params: ParsedRequestInfo<typeof DeletePetParameters>
) => ControllerReturnType<{
  success: DeletePetResponse;
  error: DeletePetErrors;
}>;

export type UploadFileControllerFunction = (
  params: ParsedRequestInfo<typeof UploadFileParameters>
) => ControllerReturnType<{
  success: UploadFileResponse;
  error: UploadFileErrors;
}>;
