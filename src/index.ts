import { createServer } from 'http';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  console.log('Hola mundo');
  res.write('<h1>Hola Mundo</h1>');
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log(`Lisening on port ${PORT}`);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
