import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
import { taskRouter } from './router/task.router.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { noteRouter } from './router/note.router.js';
import { userRouter } from './router/user.router.js';
import { HttpError } from './types/http.error.js';

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
app.use('/notes', noteRouter);
app.use('/users', userRouter);

app.use('/:id', (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(418, "I'm a teapot", 'Invalid route');
  next(error);
});

app.use(errorMiddleware);
