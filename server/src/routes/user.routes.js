import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
