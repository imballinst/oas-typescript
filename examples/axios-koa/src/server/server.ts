import Koa from 'koa';
import { generatedRouter } from './generated/static/router.js';
import Router from '@koa/router';

const app = new Koa();

app.use(generatedRouter.routes());
app.use(generatedRouter.allowedMethods());

const commonRouter = new Router();
commonRouter.get('/healthz', (ctx) => {
  ctx.body = { healthy: true };
});
app.use(commonRouter.routes());
app.use(commonRouter.allowedMethods());

app.listen(3000, () => {
  console.info('Server is running on port 3000');
});
