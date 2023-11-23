import { Router, json, urlencoded } from 'express';
import {
  AddPetSecurity,
  UpdatePetSecurity,
  FindPetsByStatusSecurity,
  FindPetsByTagsSecurity,
  GetPetByIdSecurity,
  UpdatePetWithFormSecurity,
  DeletePetSecurity,
  UploadFileSecurity,
  GetInventorySecurity,
  AddPetParameters,
  UpdatePetParameters,
  FindPetsByStatusParameters,
  FindPetsByTagsParameters,
  GetPetByIdParameters,
  UpdatePetWithFormParameters,
  DeletePetParameters,
  UploadFileParameters,
  GetInventoryParameters,
  PlaceOrderParameters,
  GetOrderByIdParameters,
  DeleteOrderParameters,
  CreateUserParameters,
  CreateUsersWithListInputParameters,
  LoginUserParameters,
  LogoutUserParameters,
  GetUserByNameParameters,
  UpdateUserParameters,
  DeleteUserParameters
} from './client.js';
import { ExpressGeneratedUtils } from './utils.js';

import { PetController } from '../controllers/PetController.js';
import { StoreController } from '../controllers/StoreController.js';
import { UserController } from '../controllers/UserController.js';

const router: Router = Router();

router.post(
  '/pet',
  ExpressGeneratedUtils.createSecurityMiddleware(AddPetSecurity),
  json(),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: AddPetParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.addPet(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.put(
  '/pet',
  ExpressGeneratedUtils.createSecurityMiddleware(UpdatePetSecurity),
  json(),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: UpdatePetParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.updatePet(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.get(
  '/pet/findByStatus',
  ExpressGeneratedUtils.createSecurityMiddleware(FindPetsByStatusSecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: FindPetsByStatusParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.findPetsByStatus(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.get(
  '/pet/findByTags',
  ExpressGeneratedUtils.createSecurityMiddleware(FindPetsByTagsSecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: FindPetsByTagsParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.findPetsByTags(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.get(
  '/pet/:petId',
  ExpressGeneratedUtils.createSecurityMiddleware(GetPetByIdSecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: GetPetByIdParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.getPetById(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.post(
  '/pet/:petId',
  ExpressGeneratedUtils.createSecurityMiddleware(UpdatePetWithFormSecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: UpdatePetWithFormParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.updatePetWithForm(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.delete(
  '/pet/:petId',
  ExpressGeneratedUtils.createSecurityMiddleware(DeletePetSecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: DeletePetParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.deletePet(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.post(
  '/pet/:petId/uploadImage',
  ExpressGeneratedUtils.createSecurityMiddleware(UploadFileSecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: UploadFileParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.uploadFile(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.get(
  '/store/inventory',
  ExpressGeneratedUtils.createSecurityMiddleware(GetInventorySecurity),
  async (request, response) => {
    const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
      request,
      response,
      oasParameters: GetInventoryParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await StoreController.getInventory(parsedRequestInfo);
    response.status(result.status).send(result.body);
  }
);

router.post('/store/order', json(), async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: PlaceOrderParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await StoreController.placeOrder(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.get('/store/order/:orderId', async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: GetOrderByIdParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await StoreController.getOrderById(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.delete('/store/order/:orderId', async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: DeleteOrderParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await StoreController.deleteOrder(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.post('/user', json(), async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: CreateUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.createUser(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.post('/user/createWithList', json(), async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: CreateUsersWithListInputParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result =
    await UserController.createUsersWithListInput(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.get('/user/login', async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: LoginUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.loginUser(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.post('/user/logout', async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: LogoutUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.logoutUser(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.get('/user/:username', async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: GetUserByNameParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.getUserByName(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.put('/user/:username', json(), async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: UpdateUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.updateUser(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

router.delete('/user/:username', async (request, response) => {
  const parsedRequestInfo = ExpressGeneratedUtils.parseRequestInfo({
    request,
    response,
    oasParameters: DeleteUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.deleteUser(parsedRequestInfo);
  response.status(result.status).send(result.body);
});

export const generatedRouter = router;
