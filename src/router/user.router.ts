import { Router as createRouter } from 'express';
import { UsersController } from '../controller/users.controller.js';

import createDebug from 'debug';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';
const debug = createDebug('W6E:Router:UsersRouter');

debug('Loaded');
const repo = new UsersMongoRepository();
const userController = new UsersController(repo);
export const userRouter = createRouter();

userRouter.patch('/login', userController.login.bind(userController));
userRouter.post('/register', userController.create.bind(userController));

userRouter.get('/', userController.getAll.bind(userController));
userRouter.get('/:id', userController.getById.bind(userController));
userRouter.patch('/:id', userController.update.bind(userController));
userRouter.delete('/:id', userController.delete.bind(userController));
