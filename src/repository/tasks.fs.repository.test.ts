import { TasksFsRepository } from './tasks.fs.repository';
import { readFile } from 'fs/promises';

jest.mock('fs/promises');

describe('Given class TasksFsRepository', () => {
  describe('When we instantiate it', () => {
    const repo = new TasksFsRepository();

    test('Then getAll should return the FS data', async () => {
      (readFile as jest.Mock).mockReturnValue('[]');
      const result = await repo.getAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
