import { WithId } from './task';

export type NoteNoId = {
  title: string;
  author: string;
  isImportant: boolean;
};

export type Note = WithId & NoteNoId;
