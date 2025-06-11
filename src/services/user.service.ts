import { PrismaClient, Prisma } from '@prisma/client';
import { AppError } from '../utils/AppError';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser({ email, password }: { email: string; password: string }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    return await prisma.user.create({
      data: { email, password: hashedPassword },
      select: { id: true, email: true },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new AppError('Email already exists', 409);
    }
    throw new AppError('Failed to create user');
  }
}

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });
}