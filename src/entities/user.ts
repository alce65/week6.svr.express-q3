import { WithId } from '../types/id.js';
import { Note } from './note.js';

export type LoginData = {
  userName: string;
  passwd: string;
  email: string;
};

export type UserNoId = LoginData & {
  firstName: string;
  surname: string;
  role: 'admin' | 'pro' | 'user';
  isAlive: boolean;
  notes: Note[];
};

export type User = WithId & UserNoId;
