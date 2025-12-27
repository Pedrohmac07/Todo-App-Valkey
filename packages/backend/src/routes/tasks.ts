import { Elysia, t } from 'elysia';
import { db } from '../database/connection';
import { type Task } from '../types/task';
import { jwt } from '@elysiajs/jwt';

export const tasksRoutes = new Elysia({ prefix: '/tasks' })
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
      schema: t.Object({
        id: t.String()
      })
    })
  )
  .derive(async ({ jwt, cookie: { auth }, set }) => {
    const payload = await jwt.verify(auth.value);
    if (!payload) {
      set.status = 401;
      throw new Error('Unauthorized');
    }
    return { userId: payload.id };
  })

  .get('/', async ({ userId }) => {
    const taskIds = await db.smembers(`user:${userId}:tasks`);

    if (taskIds.length === 0) return [];

    const tasksJSON = await db.mget(...taskIds.map(id => `task:${id}`));
    return tasksJSON
      .filter((item) => item !== null)
      .map((item) => JSON.parse(item as string));
  })

  .get('/search', async ({ query, userId }) => {
    const searchTerm = query.q?.toLowerCase();

    if (!searchTerm) return [];

    const taskIds = await db.smembers(`user:${userId}:tasks`);
    if (taskIds.length === 0) return [];

    const tasksJSON = await db.mget(...taskIds.map(id => `task:${id}`));

    return tasksJSON
      .filter((item) => item !== null)
      .map((item) => JSON.parse(item as string) as Task)
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.content.toLowerCase().includes(searchTerm)
      )
  })

  .post('/', async ({ body, userId }) => {
    const taskId = crypto.randomUUID();
    const newTask: Task = {
      id: taskId,
      title: body.title,
      content: body.content,
      completed: false,
      createdAt: Date.now(),
      userId: userId
    };

    await db.set(`task:${taskId}`, JSON.stringify(newTask));
    await db.sadd(`user:${userId}:tasks`, taskId);

    return newTask;
  }, {
    body: t.Object({
      title: t.String(),
      content: t.String()
    })
  })

  .patch('/:id', async ({ params: { id }, userId, set }) => {
    const rawTask = await db.get(`task:${id}`);
    if (!rawTask) {
      set.status = 404;
      return { error: "Task not found" };
    }

    const task = JSON.parse(rawTask) as Task;

    if (task.userId !== userId) {
      set.status = 403;
      return { error: "Forbidden: This task is not yours" };
    }

    task.completed = !task.completed;
    await db.set(`task:${id}`, JSON.stringify(task));
    return task;
  })

  .delete('/:id', async ({ params: { id }, userId, set }) => {
    const rawTask = await db.get(`task:${id}`);
    if (!rawTask) {
      set.status = 404;
      return { error: "Task not found" };
    }

    const task = JSON.parse(rawTask) as Task;

    if (task.userId !== userId) {
      set.status = 403;
      return { error: "Forbidden" };
    }

    await db.del(`task:${id}`);
    await db.srem(`user:${userId}:tasks`, id);

    return { message: "Deleted", id };
  })

