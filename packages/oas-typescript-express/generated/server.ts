// @@@SNIPSTART generated-server-express
import express from 'express';
import { generatedRouter } from './static/router.js';

const app = express();

app.use(generatedRouter);

app.get('/healthz', (_req, res) => {
  res.send({ healthy: true });
});

app.listen(3000, () => {
  console.info('Server is running on port 3000');
});
// @@@SNIPEND
