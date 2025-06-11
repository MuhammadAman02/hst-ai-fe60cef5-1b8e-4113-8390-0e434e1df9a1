import { z } from 'zod';

export const signupSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
  }),
  response: {
    201: z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      message: z.string(),
    }),
  },
};

export const loginSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
  response: {
    200: z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      token: z.string(),
      message: z.string(),
    }),
  },
};