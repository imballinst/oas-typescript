import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
import { schemas } from './client';
import { JSONCookie } from 'cookie-parser';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.post('/pet', (ctx, next) => {
  ctx.status = 200;
});

router.put('/pet', (ctx, next) => {
  ctx.status = 200;
});

router.get('/pet/findByStatus', (ctx, next) => {
  ctx.status = 200;
});

router.get('/pet/findByTags', (ctx, next) => {
  ctx.status = 200;
});

router.get('/pet/{petId}', (ctx, next) => {
  ctx.status = 200;
});

router.post('/pet/{petId}', (ctx, next) => {
  ctx.status = 200;
});

router.delete('/pet/{petId}', (ctx, next) => {
  ctx.status = 200;
});

router.post('/pet/{petId}/uploadImage', (ctx, next) => {
  ctx.status = 200;
});

router.get('/store/inventory', (ctx, next) => {
  ctx.status = 200;
});

router.post('/store/order', (ctx, next) => {
  ctx.status = 200;
});

router.get('/store/order/{orderId}', (ctx, next) => {
  ctx.status = 200;
});

router.delete('/store/order/{orderId}', (ctx, next) => {
  ctx.status = 200;
});

router.post('/user', (ctx, next) => {
  ctx.status = 200;
});

router.post('/user/createWithList', (ctx, next) => {
  ctx.status = 200;
});

router.get('/user/login', (ctx, next) => {
  ctx.status = 200;
});

router.get('/user/logout', (ctx, next) => {
  ctx.status = 200;
});

router.get('/user/{username}', (ctx, next) => {
  ctx.status = 200;
});

router.put('/user/{username}', (ctx, next) => {
  ctx.status = 200;
});

router.delete('/user/{username}', (ctx, next) => {
  ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());
