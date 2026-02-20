import app from './app.js';
import { PORT } from './config/config.js';

function main() {
  app.listen(PORT);
  console.log('Server on port', PORT);
}

main();
