import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
// Start Express
const app = express();
// Enable Json
app.use(express.json());
// Load Routes
app.use(routes);
// Listener
app.listen(3333, () => console.log('Server Started!'));
