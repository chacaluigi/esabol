import app from './app.js';
import { PORT } from './config/config.js';
import { sequelize } from './config/db.js';

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT);
    console.log('Server on port', PORT);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
