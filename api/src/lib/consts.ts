import { config as configEnv } from 'dotenv';

configEnv();

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_DB
} = process.env || {};

if (!MONGO_USER || !MONGO_PASS || !MONGO_HOST || !MONGO_DB) {
  throw new Error('[Env] Missing required MongoDB environment variables');
}

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

export { MONGO_URL };

export const API_ROUTE = '/v1';
