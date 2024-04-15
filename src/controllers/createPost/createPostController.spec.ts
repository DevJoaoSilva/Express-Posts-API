import { CreatePostController } from './createPostController';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('Create Post', () => {
    const data = {
        title: 'test title',
        body: 'test body',
    };

    const mockRepository = {
        createPost: jest.fn(async () => ({ id: '1', ...data })),
    };

    jest.mock('../../utils/helpers', () => ({
        validateResults: jest.fn(() => ({
            isEmpty: jest.fn(() => false),
            array: jest.fn(() => [{ msg: 'invalid field' }]),
        })),
    }));

    it('should call createPostRepository with data', async () => {
        const { res } = getMockRes();
        const controller = new CreatePostController(mockRepository);
        await controller.handle(getMockReq({ body: data }), res);

        expect(mockRepository.createPost).toHaveBeenCalledWith(data);
    });

    it('should return the created post', async () => {
        const { res } = getMockRes();
        const controller = new CreatePostController(mockRepository);
        await controller.handle(getMockReq({ body: data }), res);

        expect(res.json).toHaveBeenCalledWith({ id: '1', ...data });
    });

    it('should return status 400', async () => {
        const { res } = getMockRes();

        const controller = new CreatePostController(mockRepository);
        await controller.handle(
            getMockReq({
                body: { title: data.title },
                'express-validator#contexts': [
                    {
                        _errors: [
                            {
                                type: 'field',
                                msg: 'The Post body cannot be empty',
                                path: 'body',
                                location: 'body',
                            },
                        ],
                    },
                ],
            }),
            res
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
});
