// Mongoose -> Object Documents Model

import { Schema, model } from 'mongoose';
import { Note } from '../entities/note.js';

const noteSchema = new Schema<Note>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const NoteModel = model('Note', noteSchema, 'notes');
