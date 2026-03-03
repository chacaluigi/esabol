import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import roleRoutes from './routes/role.routes.js';
import teamRoutes from './routes/team.routes.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/teams', teamRoutes);

//middlewares
app.use(errorHandler);

export default app;
