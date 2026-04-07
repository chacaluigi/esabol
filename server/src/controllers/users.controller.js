import { Op } from 'sequelize';
import { Role, Task, User } from '../models/index.js';

export const getUsers = async (req, res, next) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {

    const whereCondition = search
      ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          //{ username: { [Op.iLike]: `%${search}%` } }
        ]
      }
      : {};

    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['id', 'name'],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['status', 'DESC'],
        ['createdAt', 'DESC'],
      ],
    });

    // if (rows.length === 0)
    //   return res.status(404).json({ msg: 'Users not found' });

    console.log('limit', typeof (limit))

    res.json({
      users: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalItems: count,
    });
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
    res.status(201).json({ success: true, id: user.id });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.set(req.body);
    await user.save();
    res.json({ success: true });
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
