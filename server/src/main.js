import app from './app.js';
import { PORT } from './config/config.js';
import { sequelize } from './config/database.js';

async function main() {
  try {
    await sequelize.sync();
    //await sequelize.sync({ force: true });
    app.listen(PORT);
    console.log('Server on port', PORT);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();
