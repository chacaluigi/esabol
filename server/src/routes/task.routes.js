import { Router } from 'express';
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
} from '../controllers/tasks.controller.js';
const router = Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);

export default router;
