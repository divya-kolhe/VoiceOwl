import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', routes);

// basic health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// basic error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: any) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

export default app;
