import { Elysia, t } from 'elysia';
import { type Task } from './types/task';
import { db } from './database/connection.ts';

const app = new Elysia()
  .get('/', () => 'API cache running!')

  .post('/tasks', async ({ body }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: body.title,
      content: body.content,
      completed: false,
      createdAt: Date.now(),
      userId: body.userId
    };
    await db.set(`task:${newTask.id}`, JSON.stringify(newTask));

    console.log('New task', newTask);

    return newTask;
  }, {
    body: t.Object({
      title: t.String(),
      content: t.String(),
      userId: t.String()
    })
  })

  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
