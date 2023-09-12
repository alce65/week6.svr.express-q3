import { Note } from '../entities/note.js';
import { HttpError } from '../types/http.error.js';
import { NoteModel } from './notes.mongo.model.js';
import { Repository } from './repository.js';
import createDebug from 'debug';
const debug = createDebug('W6E:Repo:NotesMongoRepo');

export class NotesMongoRepository implements Repository<Note> {
  constructor() {
    debug('Instantiated');
  }

  async getAll(): Promise<Note[]> {
    const data = await NoteModel.find()
      .populate('author', {
        userName: 1,
        email: 1,
      })
      .exec();
    return data;
  }

  async getById(id: string): Promise<Note> {
    const data = await NoteModel.findById(id)
      .populate('author', {
        userName: 1,
        email: 1,
      })
      .exec();
    if (!data)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying getById',
      });
    return data;
  }

  async create(newData: Omit<Note, 'id'>): Promise<Note> {
    const data = await NoteModel.create(newData);
    return data;
  }

  async update(id: string, newData: Partial<Note>): Promise<Note> {
    const data = await NoteModel.findByIdAndUpdate(id, newData, {
      new: true,
    })
      .populate('author', {
        userName: 1,
        email: 1,
      })
      .exec();
    if (!data)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying update',
      });
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await NoteModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new HttpError(404, 'Not Found', 'Task not found in file system', {
        cause: 'Trying delete',
      });
  }
}
