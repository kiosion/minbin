import express from 'express';
import { setupMongoose, setupServer } from '$lib/config';
import { setupRoutes } from './routes';

const app = express();

setupMongoose();
setupRoutes(app);

const server = setupServer(app);

export default server;
