import express from 'express';
import { generatedRouter } from './static/router';

const app = express();

app.use(generatedRouter);

app.get('/healthz', (_req, res) => {
  res.send({ healthy: true });
});

app.listen(3001, () => {
  console.info('Server is running on port 3001');
});
