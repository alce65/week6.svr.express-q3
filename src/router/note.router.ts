import { Router as createRouter } from 'express';
import { NotesController } from '../controller/notes.controller.js';

import createDebug from 'debug';
import { NotesMongoRepository } from '../repository/notes.mongo.repository.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
const debug = createDebug('W6E:Router:NotesRouter');

debug('Loaded');
const repo = new NotesMongoRepository();
const authInterceptor = new AuthInterceptor();
const noteController = new NotesController(repo);
export const noteRouter = createRouter();

noteRouter.get('/', noteController.getAll.bind(noteController));
noteRouter.get('/:id', noteController.getById.bind(noteController));
noteRouter.post(
  '/',
  authInterceptor.authorization.bind(authInterceptor),
  noteController.create.bind(noteController)
);
noteRouter.patch(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.notesAuthentication.bind(authInterceptor),
  noteController.update.bind(noteController)
);
noteRouter.delete(
  '/:id',
  authInterceptor.authorization.bind(authInterceptor),
  authInterceptor.notesAuthentication.bind(authInterceptor),
  noteController.delete.bind(noteController)
);
