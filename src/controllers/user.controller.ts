import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../services/user.service";

export async function createUserHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  const user = await createUser({
    email: req.body.email,
    password: req.body.password,
  });
  res.status(201).send(user);
}
