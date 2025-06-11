import { FastifyRequest, FastifyReply } from 'fastify';
import { signupUser, loginUser } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function signupHandler(
  req: FastifyRequest<{ Body: { email: string; password: string; name: string } }>,
  res: FastifyReply
) {
  try {
    const user = await signupUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    console.error('Signup error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const result = await loginUser(req.body);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    console.error('Login error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}