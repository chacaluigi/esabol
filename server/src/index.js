import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(userRoutes);

app.listen(PORT || 3000);
console.log('Server on port', PORT);
