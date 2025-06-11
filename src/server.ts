import app from './app';

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📋 Health check: http://localhost:${port}/api/health`);
    console.log(`🔐 Signup: POST http://localhost:${port}/api/auth/signup`);
    console.log(`🔑 Login: POST http://localhost:${port}/api/auth/login`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();