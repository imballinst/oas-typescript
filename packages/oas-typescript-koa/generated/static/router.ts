import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
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
import { KoaGeneratedUtils } from './utils.js';

import { PetController } from '../controllers/PetController.js';
import { StoreController } from '../controllers/StoreController.js';
import { UserController } from '../controllers/UserController.js';

const router = new Router();

router.post(
  '/pet',
  KoaGeneratedUtils.createSecurityMiddleware(AddPetSecurity),
  bodyParser(),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: AddPetParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.addPet(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.put(
  '/pet',
  KoaGeneratedUtils.createSecurityMiddleware(UpdatePetSecurity),
  bodyParser(),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UpdatePetParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.updatePet(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.get(
  '/pet/findByStatus',
  KoaGeneratedUtils.createSecurityMiddleware(FindPetsByStatusSecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: FindPetsByStatusParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.findPetsByStatus(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.get(
  '/pet/findByTags',
  KoaGeneratedUtils.createSecurityMiddleware(FindPetsByTagsSecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: FindPetsByTagsParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.findPetsByTags(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.get(
  '/pet/:petId',
  KoaGeneratedUtils.createSecurityMiddleware(GetPetByIdSecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: GetPetByIdParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.getPetById(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.post(
  '/pet/:petId',
  KoaGeneratedUtils.createSecurityMiddleware(UpdatePetWithFormSecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UpdatePetWithFormParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.updatePetWithForm(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.delete(
  '/pet/:petId',
  KoaGeneratedUtils.createSecurityMiddleware(DeletePetSecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: DeletePetParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.deletePet(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.post(
  '/pet/:petId/uploadImage',
  KoaGeneratedUtils.createSecurityMiddleware(UploadFileSecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UploadFileParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await PetController.uploadFile(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.get(
  '/store/inventory',
  KoaGeneratedUtils.createSecurityMiddleware(GetInventorySecurity),
  async (ctx) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: GetInventoryParameters
    });
    if (!parsedRequestInfo) {
      return;
    }

    const result = await StoreController.getInventory(parsedRequestInfo);
    ctx.body = result.body;
    ctx.status = result.status;
  }
);

router.post('/store/order', bodyParser(), async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: PlaceOrderParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await StoreController.placeOrder(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('/store/order/:orderId', async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: GetOrderByIdParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await StoreController.getOrderById(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.delete('/store/order/:orderId', async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: DeleteOrderParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await StoreController.deleteOrder(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.post('/user', bodyParser(), async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: CreateUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.createUser(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.post('/user/createWithList', bodyParser(), async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: CreateUsersWithListInputParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result =
    await UserController.createUsersWithListInput(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('/user/login', async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: LoginUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.loginUser(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.post('/user/logout', async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: LogoutUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.logoutUser(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.get('/user/:username', async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: GetUserByNameParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.getUserByName(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.put('/user/:username', bodyParser(), async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: UpdateUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.updateUser(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

router.delete('/user/:username', async (ctx) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: DeleteUserParameters
  });
  if (!parsedRequestInfo) {
    return;
  }

  const result = await UserController.deleteUser(parsedRequestInfo);
  ctx.body = result.body;
  ctx.status = result.status;
});

export const generatedRouter = router;
