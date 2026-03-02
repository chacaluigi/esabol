import { Role } from '../models/index.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    if (roles.length === 0)
      return res.status(404).json({ msg: 'Roles not found' });
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
