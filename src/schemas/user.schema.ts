import { z } from "zod";

export const createUserSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
  response: {
    201: z.object({
      id: z.string(),
      email: z.string().email(),
    }),
  },
};
