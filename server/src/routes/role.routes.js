import { Router } from 'express';
import {
  createRole,
  getRoles,
  updateRole,
} from '../controllers/roles.controller.js';
const router = Router();

router.get('/', getRoles);
router.post('/', createRole);
router.put('/:id', updateRole);

export default router;
