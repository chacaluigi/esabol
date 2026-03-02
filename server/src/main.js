import app from './app.js';
import { PORT } from './config/config.js';
import { sequelize } from './config/database.js';

async function main() {
  try {
    await sequelize.sync();

    //revisa estado actual de la tabla y añade columnas que faltan sin borrar los datos
    //await sequelize.sync({ alter: true });

    //borra todas las tablas y las vuelve a crear
    //sequelize.sync({ force: true });
    app.listen(PORT);
    console.log('Server on port', PORT);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
