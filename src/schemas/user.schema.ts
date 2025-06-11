import { z } from 'zod';

export const createUserSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
  response: {
    201: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
    }),
  },
};

export const getUsersSchema = {
  response: {
    200: z.array(
      z.object({
        id: z.string().uuid(),
        email: z.string().email(),
        createdAt: z.string(),
      })
    ),
  },
};