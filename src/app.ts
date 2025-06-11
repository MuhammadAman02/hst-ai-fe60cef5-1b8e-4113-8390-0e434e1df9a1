import Fastify from 'fastify';
import { userRoutes } from './routes/user.route';
import { env } from './config/env';

const app = Fastify({
  logger: true,
});

// Register routes
app.register(userRoutes);

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(500).send({ error: 'Something went wrong' });
});

// Health check
app.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

export default app;