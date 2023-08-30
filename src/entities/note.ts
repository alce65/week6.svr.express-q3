import { WithId } from '../types/id.js';
import { User } from './user.js';

export type NoteNoId = {
  title: string;
  author: User;
  isImportant: boolean;
};

export type Note = WithId & NoteNoId;
