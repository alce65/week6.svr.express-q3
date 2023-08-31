import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
import { NotesMongoRepository } from '../repository/notes.mongo.repository.js';

const debug = createDebug('W6E:Middleware:Auth.Interceptor');

debug('Loaded');

// Authorization ¿Esta autorizado?
// Authentication ¿Erres quien dices y tienes derecho a ....?

export class AuthInterceptor {
  authorization(req: Request, _res: Response, next: NextFunction) {
    debug('Call interceptor');
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid token', 'No token provided');
      }

      const { id } = Auth.verifyJWTGettingPayload(token);
      req.body.validatedId = id;
      debug(id);
      next();
    } catch (error) {
      next(error);
    }
  }

  async notesAuthentication(req: Request, _res: Response, next: NextFunction) {
    const userID = req.body.validatedId;
    const noteID = req.params.id;

    try {
      const notesRepo = new NotesMongoRepository();
      const note = await notesRepo.getById(noteID);
      if (note.author.id !== userID) {
        const error = new HttpError(403, 'Forbidden', 'Not note owner');
        next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
