import { Team, User, TeamMember } from '../models/index.js';

export const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.findAll();
    if (teams.length === 0)
      return res.status(404).json({ msg: 'Teams not found' });
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

export const createTeam = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const team = await Team.findByPk(id);

    if (!team) return res.status(404).json({ msg: 'Team not found to update' });

    team.set(data);
    await team.save();

    res.json(team);
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await Team.destroy({ where: { id } });

    if (team === 0)
      return res.status(404).json({ msg: 'Team does not exists' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const getTeamMembers = async (req, res, next) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findByPk(teamId, {
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'name', 'username', 'email'],
          through: { attributes: [] },
        },
      ],
    });

    if (!team) return res.status(404).json({ msg: 'Team not found' });

    res.json(team.members || []);
  } catch (error) {
    //console.error(error);
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await Team.destroy({ where: { id } });

    if (team === 0)
      return res.status(404).json({ msg: 'Team does not exists' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await Team.destroy({ where: { id } });

    if (team === 0)
      return res.status(404).json({ msg: 'Team does not exists' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await Team.destroy({ where: { id } });

    if (team === 0)
      return res.status(404).json({ msg: 'Team does not exists' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const removeMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await Team.destroy({ where: { id } });

    if (team === 0)
      return res.status(404).json({ msg: 'Team does not exists' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
