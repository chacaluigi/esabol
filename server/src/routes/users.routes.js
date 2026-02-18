import { Router } from 'express';
const router = Router();
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/users.controlles.js';

router.get('/', getUsers);
router.post('/', createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
