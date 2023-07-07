import Koa from 'koa';
import { generatedRouter } from './generated/server.js';

const app = new Koa();

app.use(generatedRouter.routes());
app.use(generatedRouter.allowedMethods());

app.listen(3000, () => {
  console.info('Server is running on port 3000');
});
