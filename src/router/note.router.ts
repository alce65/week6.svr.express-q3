import { Router as createRouter } from 'express';
import { NotesController } from '../controller/notes.controller.js';

import createDebug from 'debug';
import { NotesMongoRepository } from '../repository/notes.mongo.repository.js';
const debug = createDebug('W6E:Router:NotesRouter');

debug('Loaded');
const repo = new NotesMongoRepository();
const noteController = new NotesController(repo);
export const noteRouter = createRouter();

noteRouter.get('/', noteController.getAll.bind(noteController));
noteRouter.get('/:id', noteController.getById.bind(noteController));
noteRouter.post('/', noteController.create.bind(noteController));
noteRouter.patch('/:id', noteController.update.bind(noteController));
noteRouter.delete('/:id', noteController.delete.bind(noteController));
