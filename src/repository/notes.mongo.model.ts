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
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
});

noteSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const NoteModel = model('Note', noteSchema, 'notes');
