import { createServer } from 'http';
import 'dotenv/config';
import { app } from './app.js';

const PORT = process.env.PORT || 3000;

const server = createServer(app);

server.listen(PORT);

server.on('listening', () => {
  console.log(`Lisening on port ${PORT}`);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
