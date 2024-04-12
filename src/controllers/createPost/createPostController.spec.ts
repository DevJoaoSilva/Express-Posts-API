import { Request, Response } from 'express';
import { CreatePostController } from './createPostController';

describe('Create Post', () => {
    const data = {
        title: 'test title',
        body: 'test body',
    };

    jest.mock('express-validator', () => ({
        validationResult: jest.fn(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => [{ msg: 'invalid field' }]),
        })),
        matchedData: jest.fn(() => data),
    }));

    const mockRepository = {
        createPost: jest.fn(async () => ({ id: '1', ...data })),
    };

    const mockRequest = {
        body: data,
    };
    const mockResponse = {
        status: jest.fn(() => mockResponse),
        send: jest.fn(),
    } as unknown as Response;

    it('should have call createPostRepository and been called with data', () => {
        const controller = new CreatePostController(mockRepository);
        controller.handle(mockRequest as Request, mockResponse);

        expect(mockRepository.createPost).toHaveBeenCalled();
        expect(mockRepository.createPost).toHaveBeenCalledWith(data);
    });
});
