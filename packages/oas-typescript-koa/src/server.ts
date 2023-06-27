
import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser';
import { schemas } from './client'
import { MiddlewareHelpers } from './middleware-helpers'

import PetController from './controllers/PetController'
import StoreController from './controllers/StoreController'
import UserController from './controllers/UserController'

const app = new Koa()
const router = new Router()

app.use(bodyParser());

router.post('/pet', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.addPet()
  ctx.status = 200
})

router.put('/pet', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.updatePet()
  ctx.status = 200
})

router.get('/pet/findByStatus', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.findPetsByStatus()
  ctx.status = 200
})

router.get('/pet/findByTags', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.findPetsByTags()
  ctx.status = 200
})

router.get('/pet/{petId}', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.getPetById()
  ctx.status = 200
})

router.post('/pet/{petId}', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.updatePetWithForm()
  ctx.status = 200
})

router.delete('/pet/{petId}', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.deletePet()
  ctx.status = 200
})

router.post('/pet/{petId}/uploadImage', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = PetController.uploadFile()
  ctx.status = 200
})

router.get('/store/inventory', async (ctx, next) => {
  const { status } = await MiddlewareHelpers.doAdditionalSecurityValidation(ctx)
  
  if (status !== 200) {
    ctx.status = status
    return  
  }

  next()
}, (ctx, next) => {
  const { } = StoreController.getInventory()
  ctx.status = 200
})

router.post('/store/order', (ctx, next) => {
  const { } = StoreController.placeOrder()
  ctx.status = 200
})

router.get('/store/order/{orderId}', (ctx, next) => {
  const { } = StoreController.getOrderById()
  ctx.status = 200
})

router.delete('/store/order/{orderId}', (ctx, next) => {
  const { } = StoreController.deleteOrder()
  ctx.status = 200
})

router.post('/user', (ctx, next) => {
  const { } = UserController.createUser()
  ctx.status = 200
})

router.post('/user/createWithList', (ctx, next) => {
  const { } = UserController.createUsersWithListInput()
  ctx.status = 200
})

router.get('/user/login', (ctx, next) => {
  const { } = UserController.loginUser()
  ctx.status = 200
})

router.get('/user/logout', (ctx, next) => {
  const { } = UserController.logoutUser()
  ctx.status = 200
})

router.get('/user/{username}', (ctx, next) => {
  const { } = UserController.getUserByName()
  ctx.status = 200
})

router.put('/user/{username}', (ctx, next) => {
  const { } = UserController.updateUser()
  ctx.status = 200
})

router.delete('/user/{username}', (ctx, next) => {
  const { } = UserController.deleteUser()
  ctx.status = 200
})

app
  .use(router.routes())
  .use(router.allowedMethods());
  