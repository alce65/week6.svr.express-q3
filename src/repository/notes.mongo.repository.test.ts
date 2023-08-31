import { NotesMongoRepository } from './notes.mongo.repository';
import { NoteModel } from './notes.mongo.model.js';

jest.mock('./notes.mongo.model.js');

describe('Given the class NotesMongoRepository', () => {
  let repo: NotesMongoRepository;
  beforeEach(() => {
    repo = new NotesMongoRepository();
  });

  describe('When we instantiate it and all is OK', () => {
    const mockExec = jest.fn().mockResolvedValue([]);
    NoteModel.find = jest.fn().mockReturnValue({
      exec: mockExec,
    });

    test('We should use getAll', async () => {
      const result = await repo.getAll();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we instantiate it and there are errors', () => {
    const mockExec = jest.fn().mockResolvedValue(null);
    NoteModel.findById = jest.fn().mockReturnValue({
      exec: mockExec,
    });

    test('We should get an error if we use getById', () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
