import { Role } from '../models/index.js';

export const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.findAll();
    if (roles.length === 0)
      return res.status(404).json({ msg: 'Roles not found' });
    res.json(roles);
  } catch (error) {
    next(error);
  }
};

export const createRole = async (req, res, next) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const role = await Role.findByPk(id);

    if (!role) return res.status(404).json({ msg: 'Role not found' });

    role.set(data);
    await role.save();

    res.json(role);
  } catch (error) {
    next(error);
  }
};
