import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
import { taskRouter } from './router/task.router.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const debug = createDebug('W6E:App');
export const app = express();

debug('Started');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  debug('Soy un Middleware');
  next();
});

app.get('/', (req: Request, res: Response) => {
  debug('Hola mundo de Express');
  res.write('<h1>Hola Mundo de Express</h1>');
  res.end();
});

app.use('/tasks', taskRouter);

app.use(errorMiddleware);
