import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';

const app = Fastify({
  logger: true,
});

// Register routes
app.register(authRoutes);

// Global error handler
app.setErrorHandler((error, request, reply) => {
  console.error('Global error handler:', error);
  
  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: error.validation,
    });
  }

  return reply.status(500).send({
    error: 'Internal server error',
  });
});

// Health check route
app.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

export default app;