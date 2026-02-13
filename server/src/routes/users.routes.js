import { Router } from 'express';
const router = Router();
import { pool } from '../config/db.js';

router.get('/users', (req, res) => {
  res.send('obteniendo usuarios');
});

export default router;
