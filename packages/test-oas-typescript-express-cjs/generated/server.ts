import Koa from 'koa';
import { generatedRouter } from './static/router';
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

app.listen(3001, () => {
  console.info('Server is running on port 3001');
});
