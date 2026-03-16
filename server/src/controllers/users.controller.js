import { Role, Task, User } from '../models/index.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (users.length === 0)
      return res.status(404).json({ msg: 'Users not found' });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user.length === 0)
      return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const userWithRole = await User.findByPk(user.id, {
      include: [{ model: Role, attributes: ['name'] }],
    });

    res.status(201).json(userWithRole);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.update(req.body, { where: { id } });

    const updatedUser = await User.findByPk(id, {
      include: [{ model: Role, attributes: ['name'] }],
    });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });

    if (!user) return res.status(404).json({ msg: 'User does not exists.' });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// obtener tareas de un usuario
export const getUserTasks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Task,
        },
      ],
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json(user.Tasks);
  } catch (error) {
    next(error);
  }
};
