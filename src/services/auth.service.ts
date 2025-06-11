import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

// Mock user storage (replace with database later)
const mockUsers: Array<{
  id: string;
  email: string;
  name: string;
  password: string;
}> = [];

export async function signupUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  console.log('Attempting to signup user:', email);

  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    throw new AppError('Email already exists', 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    id: `user_${Date.now()}`,
    email,
    name,
    password: hashedPassword,
  };

  mockUsers.push(newUser);
  console.log('User created successfully:', newUser.id);

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    message: 'User created successfully',
  };
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log('Attempting to login user:', email);

  // Find user
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AppError('Invalid email or password', 401);
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  console.log('User logged in successfully:', user.id);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    token,
    message: 'Login successful',
  };
}