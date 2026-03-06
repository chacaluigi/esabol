import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  getUserTasks,
  updateUser,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

router.get('/:userId/tasks', getUserTasks);

export default router;
