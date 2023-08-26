import { Router as createRouter } from 'express';
import { TaskController } from '../controller/tasks.controller.js';

const taskController = new TaskController();
export const taskRouter = createRouter();

taskRouter.get('/', taskController.getAll.bind(taskController));
taskRouter.get('/:id', taskController.getById.bind(taskController));
taskRouter.post('/', taskController.create.bind(taskController));
taskRouter.patch('/:id', taskController.update.bind(taskController));
taskRouter.delete('/:id', taskController.delete.bind(taskController));
