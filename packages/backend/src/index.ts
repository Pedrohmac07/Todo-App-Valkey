import { Elysia, t } from 'elysia';
import { type Task } from './types/task';
import { db } from './database/connection.ts';
import { authRoutes } from './routes/auth.ts';
import { tasksRoutes } from './routes/tasks.ts';

const app = new Elysia()
  .get('/', () => 'API cache running!')

  .use(authRoutes)
  .use(tasksRoutes)

  .listen(3000)

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
