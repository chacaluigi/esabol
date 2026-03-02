import { Router } from 'express';
import { createRole, getRoles } from '../controllers/roles.controller.js';
const router = Router();

router.get('/', getRoles);
router.post('/', createRole);

export default router;
