import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashed },
    select: { id: true, email: true },
  });
}
