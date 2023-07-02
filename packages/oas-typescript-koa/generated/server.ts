
import Koa from 'koa'
import Router from '@koa/router'
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
} from './client.js'
import { KoaGeneratedUtils } from './utils.js'

import { PetController } from './controllers/PetController.js'
import { StoreController } from './controllers/StoreController.js'
import { UserController } from './controllers/UserController.js'

const app = new Koa()
const router = new Router()

app.use(bodyParser());

router.post('/pet', KoaGeneratedUtils.createSecurityMiddleware(AddPetSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: AddPetParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.addPet(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.put('/pet', KoaGeneratedUtils.createSecurityMiddleware(UpdatePetSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UpdatePetParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.updatePet(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/pet/findByStatus', KoaGeneratedUtils.createSecurityMiddleware(FindPetsByStatusSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: FindPetsByStatusParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.findPetsByStatus(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/pet/findByTags', KoaGeneratedUtils.createSecurityMiddleware(FindPetsByTagsSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: FindPetsByTagsParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.findPetsByTags(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/pet/:petId', KoaGeneratedUtils.createSecurityMiddleware(GetPetByIdSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetPetByIdParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.getPetById(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.post('/pet/:petId', KoaGeneratedUtils.createSecurityMiddleware(UpdatePetWithFormSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UpdatePetWithFormParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.updatePetWithForm(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.delete('/pet/:petId', KoaGeneratedUtils.createSecurityMiddleware(DeletePetSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: DeletePetParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.deletePet(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.post('/pet/:petId/uploadImage', KoaGeneratedUtils.createSecurityMiddleware(UploadFileSecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UploadFileParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await PetController.uploadFile(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/store/inventory', KoaGeneratedUtils.createSecurityMiddleware(GetInventorySecurity), async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetInventoryParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await StoreController.getInventory(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.post('/store/order', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: PlaceOrderParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await StoreController.placeOrder(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/store/order/:orderId', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetOrderByIdParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await StoreController.getOrderById(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.delete('/store/order/:orderId', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: DeleteOrderParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await StoreController.deleteOrder(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.post('/user', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: CreateUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.createUser(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.post('/user/createWithList', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: CreateUsersWithListInputParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.createUsersWithListInput(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/user/login', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: LoginUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.loginUser(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/user/logout', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: LogoutUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.logoutUser(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.get('/user/:username', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetUserByNameParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.getUserByName(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.put('/user/:username', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UpdateUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.updateUser(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

router.delete('/user/:username', async (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: DeleteUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { body, status } = await UserController.deleteUser(parsedRequestInfo)
  ctx.status = status
  if (body) ctx.body = body
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
  