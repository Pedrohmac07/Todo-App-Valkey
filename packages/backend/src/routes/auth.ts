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
  });
