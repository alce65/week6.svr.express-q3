import { Controller } from './controller.js';
import { Repository } from '../repository/repository.js';
import { Task } from '../entities/task.js';
import createDebug from 'debug';
const debug = createDebug('W6E:Controller:TasksController');

export class TaskController extends Controller<Task> {
  constructor(protected repo: Repository<Task>) {
    super(repo);
    debug('Instantiated');
  }
}
