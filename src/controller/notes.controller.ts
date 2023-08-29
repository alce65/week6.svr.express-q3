import { Controller } from './controller.js';
import { Repository } from '../repository/repository.js';
import createDebug from 'debug';
import { Note } from '../entities/note.js';
const debug = createDebug('W6E:Controller:NotesController');

export class NotesController extends Controller<Note> {
  constructor(protected repo: Repository<Note>) {
    super(repo);
    debug('Instantiated');
  }
}
