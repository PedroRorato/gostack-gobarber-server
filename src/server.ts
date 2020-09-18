import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Hello Barber' }));

app.listen(3333, () => console.log('Server Started!'));
