import { Router as createRouter } from 'express';
import { TaskController } from '../controller/tasks.controller.js';
import { TasksFsRepository } from '../repository/tasks.fs.repository.js';
import createDebug from 'debug';
const debug = createDebug('W6E:Router:TasksRouter');

debug('Loaded');
const repo = new TasksFsRepository();
const taskController = new TaskController(repo);
export const taskRouter = createRouter();

taskRouter.get('/', taskController.getAll.bind(taskController));
taskRouter.get('/:id', taskController.getById.bind(taskController));
taskRouter.post('/', taskController.create.bind(taskController));
taskRouter.patch('/:id', taskController.update.bind(taskController));
taskRouter.delete('/:id', taskController.delete.bind(taskController));
