import mongoose from 'mongoose';
import { MONGO_URL } from '$lib/consts';
import type { Express } from 'express';

let teardownExpress: undefined | (() => void);

export const teardown = () => {
  mongoose.disconnect();
  teardownExpress?.();
};

export const setupMongoose = () => {
  console.log('[Mongoose] Connecting...');
  mongoose.connect(MONGO_URL);

  mongoose.connection
    .on('error', (err) => {
      console.error('[Mongoose] Error: ', err);
      teardown();
      process.exit(1);
    })
    .once('open', () => {
      console.log('[Mongoose] Connected');
    });

  return mongoose;
};

export const setupServer = (app: Express) => {
  const { PORT = 3000 } = process.env || {};

  const server = app.listen(PORT, () => {
    console.log(`[Express] Listening on port ${PORT}`);
  });

  teardownExpress = () => {
    console.log('[Express] Closing server...');
    server.close();
  };

  process.on('SIGTERM', teardown);
  process.on('SIGINT', teardown);

  return server;
};
