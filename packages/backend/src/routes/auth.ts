import { Elysia, t } from 'elysia';
import { db } from '../database/connection';
import { type User } from '../types/user';
import { jwt } from '@elysiajs/jwt';

export const authRoutes = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
      schema: t.Object({
        id: t.String()
      })
    })
  )

  .post('/sign-up', async ({ body, set }) => {
    const emailExists = await db.exists(`user:email:${body.email}`);

    if (emailExists) {
      set.status = 409;
      return { error: 'Email already taken' };
    }

    const passwordHash = await Bun.password.hash(body.password);

    const newUser: User = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      password: passwordHash,
      createdAt: Date.now()
    };

    await db.set(`user:${newUser.id}`, JSON.stringify(newUser));
    await db.set(`user:email:${newUser.email}`, newUser.id);

    return { message: "User created", userId: newUser.id };
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  })

  .post('/sign-in', async ({ body, set, jwt, cookie: { auth } }) => {
    const userId = await db.get(`user:email:${body.email}`);

    if (!userId) {
      set.status = 401;
      return { error: 'Invalid email or password' };
    }

    const userRaw = await db.get(`user:${userId}`);
    if (!userRaw) {
      set.status = 401;
      return { error: 'Invalid email or password' };
    }

    const user: User = JSON.parse(userRaw);

    const isPasswordValid = await Bun.password.verify(body.password, user.password);
    if (!isPasswordValid) {
      set.status = 401;
      return { error: 'Invalid email or password' };
    }

    const token = await jwt.sign({ id: user.id });


    const isProduction = process.env.NODE_ENV === 'production';
    auth.set({
      value: token,
      httpOnly: true,
      secure: isProduction,
      maxAge: 7 * 86400, // 7 days
      path: '/',
    });

    return {
      message: "Login successful",
      userId: user.id,
      name: user.name
    };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })

  .patch('/user', async ({ body, set, jwt, cookie: { auth } }) => {
    const payload = await jwt.verify(auth.value);

    if (!payload) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }

    const userRaw = await db.get(`user:${payload.id}`);
    if (!userRaw) {
      set.status = 404;
      return { error: 'User not found' };
    }

    const oldUser: User = JSON.parse(userRaw);
    const updatedUser: User = { ...oldUser, name: body.name ?? oldUser.name };

    await db.set(`user:${updatedUser.id}`, JSON.stringify(updatedUser));

    return { message: "User updated", user: { id: updatedUser.id, name: updatedUser.name } };
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
    })
  })

  .get('/me', async ({ jwt, cookie: { auth }, set }) => {
    const payload = await jwt.verify(auth.value);

    if (!payload) {
      set.status = 401;
      return { error: 'Unauthorized' }
    }

    const userRaw = await db.get(`user:${payload.id}`)
    if (!userRaw) {
      set.status = 404;
      return { error: 'User not found' }
    }

    const user: User = JSON.parse(userRaw);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  })

  .delete('/me', async ({ jwt, cookie: { auth }, set }) => {
    const payload = await jwt.verify(auth.value);
    if (!payload) {
      set.status = 401;
      return { error: 'Unauthorized' };
    }

    const userId = payload.id;

    const userRaw = await db.get(`user:${userId}`);
    if (!userRaw) {
      set.status = 404;
      return { error: 'User not found' };
    }
    const user: User = JSON.parse(userRaw);

    const taskIds = await db.smembers(`user:${userId}:tasks`);

    if (taskIds.length > 0) {
      for (const taskId of taskIds) {
        await db.del(`task:${taskId}`);
      }

      await db.del(`user:${userId}:tasks`);
    }

    await db.del(`user:${userId}`);

    await db.del(`user:email:${user.email}`);

    auth.remove();

    return { message: "Account and all associated data deleted successfully" };
  })

  .post('sign-out', ({ cookie: { auth } }) => {
    auth?.remove();

    return { message: 'Logged Out' };
  })
