//import { pool } from '../config/db.js';

export const getUsers = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) return res.status(404).json({ msg: 'User not found' });

  res.json(rows[0]);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || !data.email)
      return res.status(404).json({ msg: 'Bad request. Data is missing' });

    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';

    const { rows } = await pool.query(query, [data.name, data.email]);

    res.status(201).json(rows);
  } catch (error) {
    console.error(error);
    if (error?.code === '23505')
      return res.status(409).json({ msg: 'Email already exists' });
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data.name || !data.email)
      return res
        .status(404)
        .json({ msg: 'Bad request, name and email required' });

    const query =
      'UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *';
    const { rows, rowCount } = await pool.query(query, [
      data.name,
      data.email,
      id,
    ]);

    if (rowCount === 0)
      return res.status(404).json({ msg: 'Bad request. user not found' });

    res.json(rows);
  } catch (error) {
    console.error(error);

    if (error?.code === '23505')
      return res.status(409).json({ msg: 'Email already exists' });

    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
  const { rows, rowCount } = await pool.query(query, [id]);

  if (rowCount === 0) return res.status(404).json({ msg: 'User not found' });

  res.sendStatus(204);
};
