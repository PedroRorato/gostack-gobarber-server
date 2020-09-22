import 'reflect-metadata';
import express from 'express';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';
// Start Express
const app = express();
// Enable Json
app.use(express.json());
// Rota para arquivos
app.use('/files', express.static(uploadConfig.directory));
// Load Routes
app.use(routes);
// Listener
app.listen(3333, () => console.log('Server Started!'));
