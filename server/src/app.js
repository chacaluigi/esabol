import express from 'express';
import userRoutes from './routes/users.routes.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/users', userRoutes);

export default app;
