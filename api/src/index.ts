import express from 'express';
import { setupMongoose, setupServer } from '$lib/config';
import { setupRoutes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

setupMongoose();
setupRoutes(app);

const server = setupServer(app);

export default server;
