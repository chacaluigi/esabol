import { Router } from 'express';
import {
  addMembers,
  createTeam,
  deleteTeam,
  getTeamMembers,
  getTeams,
  getTeamTasks,
  removeMembers,
  updateTeam,
} from '../controllers/teams.controller.js';

const router = Router();

router.get('/', getTeams);
router.post('/', createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

router.get('/:teamId/members', getTeamMembers);
router.post('/:teamId/members', addMembers);
router.delete('/:teamId/members', removeMembers);

router.get('/:teamId/tasks', getTeamTasks);

export default router;
