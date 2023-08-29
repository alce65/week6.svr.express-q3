import { NotesController } from './notes.controller.js';
import { NotesMongoRepository } from '../repository/notes.mongo.repository.js';
import { Request, Response } from 'express';

describe('NotesController', () => {
  describe('happy path', () => {
    const mockRepo: NotesMongoRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as NotesMongoRepository;

    const noteController = new NotesController(mockRepo);

    test('should call getAll and return data', async () => {
      const mockData = [{ id: '1', name: 'Lion' }];
      (mockRepo.getAll as jest.Mock).mockResolvedValue(mockData);

      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await noteController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('errors', () => {
    const mockRepo: NotesMongoRepository = {
      getAll: jest.fn().mockRejectedValue(new Error('GetAll Error')),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as NotesMongoRepository;

    const noteController = new NotesController(mockRepo);

    test('should call getAll and next is call ', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await noteController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
  });
});
