import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser, getUsers } from '../services/user.service';
import { AppError } from '../utils/AppError';

export async function createUserHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function getUsersHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}