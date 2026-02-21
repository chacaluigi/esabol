import { User } from '../models/user.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0)
      return res.status(404).json({ msg: 'Users not found' });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user.length === 0)
      return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({ msg: 'Bad request. Empty fields' });
    const user = await User.create({ name, email });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    if (error.name === 'SequelizeUniqueConstraintError')
      return res.status(409).json({ msg: 'Email already exists' });
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.set(data);
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError')
      return res.status(409).json({ msg: 'Email already exists' });

    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { userId: id } });

    if (user === 0)
      return res.status(404).json({ msg: 'User does not exists.' });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
