import { FastifyInstance } from "fastify";
import { createUserHandler } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", {
    schema: createUserSchema,
    handler: createUserHandler,
  });
}
