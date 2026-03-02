import { DatabaseError } from 'sequelize';
import { User } from '../models/index.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0)
      return res.status(404).json({ msg: 'Users not found' });
    res.json(users);
  } catch (error) {
    // manejo de error en la estructura de la BD
    if (error instanceof DatabaseError) {
      console.error('There is a problem in the DB structure: ', error.message);
      return res.status(500).json({ error: 'Intern error in database config' });
    }
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
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    // manejo de errores de validacion, en caso que falten datos
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({ errors: messages });
    }

    // manejo de errores de duplicidad, osea unique
    if (error.name === 'SequelizeUniqueConstraintError') {
      const path = error.errors[0].path;
      return res.status(409).json({ msg: `The ${path} is already registered` });
    }

    // manejo de erroren caso que la FK no exista
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ msg: 'The specified role does not exist' });
    }

    console.error(error);
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
    // manejo de error de duplicidad
    if (error.name === 'SequelizeUniqueConstraintError') {
      const path = error.errors[0].path;
      return res.status(409).json({ msg: `The ${path} is already registered` });
    }

    // en case que la FK no exista
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ msg: 'The specified role does not exist' });
    }

    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });

    if (user === 0)
      return res.status(404).json({ msg: 'User does not exists.' });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
