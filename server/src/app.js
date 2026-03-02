import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import roleRoutes from './routes/role.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

//middlewares
app.use(errorHandler);

export default app;
