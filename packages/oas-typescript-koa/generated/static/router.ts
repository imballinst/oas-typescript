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
  bodyParser(),
  KoaGeneratedUtils.createSecurityMiddleware(AddPetSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: AddPetParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.addPet(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.put(
  '/pet',
  bodyParser(),
  KoaGeneratedUtils.createSecurityMiddleware(UpdatePetSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UpdatePetParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.updatePet(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.get(
  '/pet/findByStatus',
  KoaGeneratedUtils.createSecurityMiddleware(FindPetsByStatusSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: FindPetsByStatusParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.findPetsByStatus(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.get(
  '/pet/findByTags',
  KoaGeneratedUtils.createSecurityMiddleware(FindPetsByTagsSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: FindPetsByTagsParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.findPetsByTags(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.get(
  '/pet/:petId',
  KoaGeneratedUtils.createSecurityMiddleware(GetPetByIdSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: GetPetByIdParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.getPetById(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.post(
  '/pet/:petId',
  KoaGeneratedUtils.createSecurityMiddleware(UpdatePetWithFormSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UpdatePetWithFormParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.updatePetWithForm(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.delete(
  '/pet/:petId',
  KoaGeneratedUtils.createSecurityMiddleware(DeletePetSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: DeletePetParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.deletePet(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.post(
  '/pet/:petId/uploadImage',
  bodyParser(),
  KoaGeneratedUtils.createSecurityMiddleware(UploadFileSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UploadFileParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.uploadFile(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.get(
  '/store/inventory',
  KoaGeneratedUtils.createSecurityMiddleware(GetInventorySecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: GetInventoryParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await StoreController.getInventory(parsedRequestInfo);
    ctx.status = result.status;
    ctx.body = result.body;
  }
);

router.post('/store/order', bodyParser(), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: PlaceOrderParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await StoreController.placeOrder(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.get('/store/order/:orderId', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: GetOrderByIdParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await StoreController.getOrderById(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.delete('/store/order/:orderId', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: DeleteOrderParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await StoreController.deleteOrder(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.post('/user', bodyParser(), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: CreateUserParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await UserController.createUser(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.post('/user/createWithList', bodyParser(), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: CreateUsersWithListInputParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result =
    await UserController.createUsersWithListInput(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.get('/user/login', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: LoginUserParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await UserController.loginUser(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.post('/user/logout', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: LogoutUserParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await UserController.logoutUser(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.get('/user/:username', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: GetUserByNameParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await UserController.getUserByName(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.put('/user/:username', bodyParser(), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: UpdateUserParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await UserController.updateUser(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

router.delete('/user/:username', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
    ctx,
    oasParameters: DeleteUserParameters
  });
  if (!parsedRequestInfo) {
    ctx.status = 400;
    return;
  }

  const result = await UserController.deleteUser(parsedRequestInfo);
  ctx.status = result.status;
  ctx.body = result.body;
});

export const generatedRouter = router;
