import { Elysia } from 'elysia';
import { authRoutes } from './routes/auth.ts';
import { tasksRoutes } from './routes/tasks.ts';

const app = new Elysia()
  .get('/', () => 'API cache running!')

  .use(authRoutes)
  .use(tasksRoutes)

  .listen(process.env.PORT || '')

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
