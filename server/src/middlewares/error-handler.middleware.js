import { DatabaseError } from 'sequelize';

export const errorHandler = (err, req, res, next) => {
  console.error('ERROR LOG: ', err.name);
  console.error(err);

  // manejo de errores de validacion, en caso que falten datos
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      msg: 'Invalid input data',
      errors: err.errors.map((e) => e.message),
    });
  }

  // manejo de errores de duplicidad, osea unique
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0].path;
    return res.status(409).json({
      status: 'error',
      msg: `The field ${field} is already in use`,
    });
  }

  // manejo de erroren caso que la FK no exista
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      status: 'error',
      msg: 'The specified reference does not exist. Invalid ID.',
    });
  }

  // manejo de error en la estructura de la BD
  if (err instanceof DatabaseError) {
    console.error('There is a problem in DB structure: ', err.message);
    return res.status(500).json({ error: 'Intern error in database config' });
  }

  res.status(500).json({
    status: 'error',
    msg: 'Unexpected error on server',
  });
};
