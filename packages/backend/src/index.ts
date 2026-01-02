import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { authRoutes } from './routes/auth';
import { tasksRoutes } from './routes/tasks';

const app = new Elysia()
  .use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))

  .get('/', () => 'API cache running!')

  .use(authRoutes)
  .use(tasksRoutes)

  .listen(process.env.PORT || '')

console.log(`Elysia is running.`);
