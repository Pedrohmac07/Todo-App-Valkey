import { Elysia, t } from 'elysia';
import { db } from '../database/connection';
import { type User } from '../types/user';

export const authRoutes = new Elysia()
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

    console.log('User created:', newUser.email);

    return { message: "User created", userId: newUser.id };
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String()
    })
  })

  .post('/sign-in', async ({ body, set }) => {
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

    console.log('User logged in:', user.email);
    return { message: "Login successful", userId: user.id, name: user.name };
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })

  .patch('/user', async ({ body, set }) => {
    const userRaw = await db.get(`user:${body.userId}`);

    if (!userRaw) {
      set.status = 404;
      return { error: 'User not found' };
    }

    const oldUser: User = JSON.parse(userRaw);

    const updatedUser: User = {
      ...oldUser,
      name: body.name ?? oldUser.name,
    };

    await db.set(`user:${updatedUser.id}`, JSON.stringify(updatedUser));

    return { message: "User updated", user: updatedUser };
  }, {
    body: t.Object({
      userId: t.String(),
      name: t.Optional(t.String()),
    })
  })

  .delete('/user', async ({ body, set }) => {
    const userRaw = await db.get(`user:${body.userId}`);

    if (!userRaw) {
      set.status = 404;
      return { error: 'User not found' };
    }

    const user: User = JSON.parse(userRaw);

    await db.del(`user:${user.id}`);
    await db.del(`user:email:${user.email}`);

    return { message: "User deleted successfully" };
  }, {
    body: t.Object({
      userId: t.String()
    })
  });
