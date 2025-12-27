import { Elysia, t } from 'elysia';
import { db } from '../database/connection';
import { type Task } from '../types/task';

export const tasksRoutes = new Elysia({ prefix: '/tasks' })
  .get('/', async () => {
    const keys = await db.keys('task:*');
    if (keys.length === 0) return [];

    const tasksJSON = await db.mget(...keys);
    return tasksJSON
      .filter((item) => item !== null)
      .map((item) => JSON.parse(item as string));
  })

  .post('/', async ({ body }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: body.title,
      content: body.content,
      completed: false,
      createdAt: Date.now(),
      userId: body.userId
    };
    await db.set(`task:${newTask.id}`, JSON.stringify(newTask));
    return newTask;
  }, {
    body: t.Object({
      title: t.String(),
      content: t.String(),
      userId: t.String()
    })
  })

  .patch('/:id', async ({ params: { id }, set }) => {
    const rawTask = await db.get(`task:${id}`);
    if (!rawTask) {
      set.status = 404;
      return "Task not found...";
    }
    const task = JSON.parse(rawTask) as Task;
    task.completed = !task.completed;
    await db.set(`task:${id}`, JSON.stringify(task));
    return task;
  }, {
    params: t.Object({ id: t.String() })
  })

  .delete('/:id', async ({ params: { id }, set }) => {
    const result = await db.del(`task:${id}`);
    if (result === 0) {
      set.status = 404;
      return "Task not found";
    }
    return { message: "Deleted", id };
  }, {
    params: t.Object({ id: t.String() })
  });
