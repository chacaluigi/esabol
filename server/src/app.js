import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import roleRoutes from './routes/role.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

export default app;
