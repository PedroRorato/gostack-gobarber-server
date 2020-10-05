import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
// Start Express
const app = express();
// Habilita solicitações de outros servidores
app.use(cors());
// Enable Json
app.use(express.json());
// Rota para arquivos
app.use('/files', express.static(uploadConfig.directory));
// Load Routes
app.use(routes);
// Middleware para tratar erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
// Listener
app.listen(3333, () => console.log('Server Started!'));
