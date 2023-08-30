import { Controller } from './controller.js';
import { Repository } from '../repository/repository.js';
import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Note } from '../entities/note.js';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';
const debug = createDebug('W6E:Controller:NotesController');

export class NotesController extends Controller<Note> {
  constructor(protected repo: Repository<Note>) {
    super(repo);
    debug('Instantiated');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const userRepo = new UsersMongoRepository();
      const user = await userRepo.getById(userId);
      req.body.author = user.id;
      const finalNote = await this.repo.create(req.body);
      user.notes.push(finalNote);
      userRepo.update(user.id, user);
      res.status(201);
      res.json(finalNote);
    } catch (error) {
      next(error);
    }
  }
}
