import { readFile, writeFile } from 'fs/promises';
import { Task, TaskNoId } from '../entities/task.js';
import { Repository } from './repository.js';
import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W6E:Repo:TasksFsRepo');

export class TasksFsRepository implements Repository<Task> {
  private file: string;
  constructor() {
    this.file = 'data.json';
    debug('Instantiated');
  }

  async getAll(): Promise<Task[]> {
    const data: Task[] = JSON.parse(
      await readFile(this.file, { encoding: 'utf-8' })
    );
    return data;
  }

  async getById(id: Task['id']): Promise<Task> {
    const data: Task[] = await this.getAll();
    const item = data.find((item) => item.id === id);
    if (!item)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying getById',
      });
    return item;
  }

  async create(newData: TaskNoId): Promise<Task> {
    const newTask: Task = { ...newData, id: crypto.randomUUID() };
    const data: Task[] = await this.getAll();
    data.push(newTask);
    await this.saveOnFile(data);
    return newTask;
  }

  async update(id: Task['id'], item: Partial<Task>): Promise<Task> {
    const data: Task[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying update',
      });
    data[index] = { ...data[index], ...item };
    await this.saveOnFile(data);
    return data[index];
  }

  async delete(id: Task['id']): Promise<void> {
    const data: Task[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying delete',
      });
    data.splice(index, 1);
    await this.saveOnFile(data);
  }

  private async saveOnFile(data: Task[]) {
    await writeFile(this.file, JSON.stringify(data), {
      encoding: 'utf-8',
    });
  }
}
