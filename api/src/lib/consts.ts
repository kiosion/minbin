import { config as configEnv } from 'dotenv';

configEnv();

let {
  MONGO_UPW,
  MONGO_HOST,
  NODE_ENV = 'production'
} = process.env || {};

if (NODE_ENV === 'production') {
  try {
    const fs = require('fs'),
      path = require('path');

    MONGO_UPW = fs.readFileSync(path.join(MONGO_UPW), 'utf8');
    MONGO_HOST = fs.readFileSync(path.join(MONGO_HOST), 'utf8');
  } catch {
    throw new Error('[ENV] Failed to eval required MongoDB environment variables');
  }
}

if (!MONGO_UPW || !MONGO_HOST) {
  throw new Error('[ENV] Missing required MongoDB environment variables');
}

const MONGO_URL = `mongodb+srv://${MONGO_UPW.trim()}@${MONGO_HOST.trim()}/minbin?retryWrites=true&w=majority`;

export { MONGO_URL };

export const API_ROUTE = '/v1';
