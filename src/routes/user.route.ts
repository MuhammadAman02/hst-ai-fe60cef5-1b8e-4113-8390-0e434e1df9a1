import { FastifyInstance } from 'fastify';
import { createUserHandler, getUsersHandler } from '../controllers/user.controller';
import { createUserSchema, getUsersSchema } from '../schemas/user.schema';

export async function userRoutes(app: FastifyInstance) {
  app.post('/api/users', {
    schema: createUserSchema,
    handler: createUserHandler,
  });

  app.get('/api/users', {
    schema: getUsersSchema,
    handler: getUsersHandler,
  });
}