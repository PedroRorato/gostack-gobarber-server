import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Hello Barber 1234' }));

app.listen(3333, () => console.log('Server Started!'));
