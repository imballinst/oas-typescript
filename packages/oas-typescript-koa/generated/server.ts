
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

router.post('/pet', KoaGeneratedUtils.createSecurityMiddleware(AddPetSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: AddPetParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.addPet(parsedRequestInfo)
  ctx.status = 200
})

router.put('/pet', KoaGeneratedUtils.createSecurityMiddleware(UpdatePetSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UpdatePetParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.updatePet(parsedRequestInfo)
  ctx.status = 200
})

router.get('/pet/findByStatus', KoaGeneratedUtils.createSecurityMiddleware(FindPetsByStatusSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: FindPetsByStatusParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.findPetsByStatus(parsedRequestInfo)
  ctx.status = 200
})

router.get('/pet/findByTags', KoaGeneratedUtils.createSecurityMiddleware(FindPetsByTagsSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: FindPetsByTagsParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.findPetsByTags(parsedRequestInfo)
  ctx.status = 200
})

router.get('/pet/:petId', KoaGeneratedUtils.createSecurityMiddleware(GetPetByIdSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetPetByIdParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.getPetById(parsedRequestInfo)
  ctx.status = 200
})

router.post('/pet/:petId', KoaGeneratedUtils.createSecurityMiddleware(UpdatePetWithFormSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UpdatePetWithFormParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.updatePetWithForm(parsedRequestInfo)
  ctx.status = 200
})

router.delete('/pet/:petId', KoaGeneratedUtils.createSecurityMiddleware(DeletePetSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: DeletePetParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.deletePet(parsedRequestInfo)
  ctx.status = 200
})

router.post('/pet/:petId/uploadImage', KoaGeneratedUtils.createSecurityMiddleware(UploadFileSecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UploadFileParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = PetController.uploadFile(parsedRequestInfo)
  ctx.status = 200
})

router.get('/store/inventory', KoaGeneratedUtils.createSecurityMiddleware(GetInventorySecurity), (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetInventoryParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = StoreController.getInventory(parsedRequestInfo)
  ctx.status = 200
})

router.post('/store/order', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: PlaceOrderParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = StoreController.placeOrder(parsedRequestInfo)
  ctx.status = 200
})

router.get('/store/order/:orderId', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetOrderByIdParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = StoreController.getOrderById(parsedRequestInfo)
  ctx.status = 200
})

router.delete('/store/order/:orderId', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: DeleteOrderParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = StoreController.deleteOrder(parsedRequestInfo)
  ctx.status = 200
})

router.post('/user', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: CreateUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.createUser(parsedRequestInfo)
  ctx.status = 200
})

router.post('/user/createWithList', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: CreateUsersWithListInputParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.createUsersWithListInput(parsedRequestInfo)
  ctx.status = 200
})

router.get('/user/login', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: LoginUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.loginUser(parsedRequestInfo)
  ctx.status = 200
})

router.get('/user/logout', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: LogoutUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.logoutUser(parsedRequestInfo)
  ctx.status = 200
})

router.get('/user/:username', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: GetUserByNameParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.getUserByName(parsedRequestInfo)
  ctx.status = 200
})

router.put('/user/:username', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: UpdateUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.updateUser(parsedRequestInfo)
  ctx.status = 200
})

router.delete('/user/:username', (ctx, next) => {
  const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({ 
    ctx,
    oasParameters: DeleteUserParameters
  })
  if (!parsedRequestInfo) {
    ctx.status = 400
    return
  }

  const { } = UserController.deleteUser(parsedRequestInfo)
  ctx.status = 200
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
  