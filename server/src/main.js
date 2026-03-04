import app from './app.js';
import { PORT } from './config/config.js';
import { sequelize } from './models/index.js';

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Successfully Database connection...');

    await sequelize.sync();

    //revisa estado actual de la tabla y añade columnas que faltan sin borrar los datos
    //await sequelize.sync({ alter: true });

    //borra todas las tablas y las vuelve a crear
    //await sequelize.sync({ force: true });

    app.listen(PORT);
    console.log('Server running on port', PORT);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
