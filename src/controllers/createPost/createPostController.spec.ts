jest.mock('../../utils/helpers', () => ({
    validateResults: jest.fn(() => ({
        isEmpty: jest.fn(() => true),
    })),
}));
import { validateResults } from '../../utils/helpers';
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

    // beforeEach(() => jest.clearAllMocks());

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
        // @ts-expect-error mock implementation for returning error
        validateResults.mockImplementation(() => ({
            isEmpty: () => false,
            array: jest.fn(() => [{ msg: 'invalid field' }]),
        }));

        const controller = new CreatePostController(mockRepository);
        await controller.handle(
            getMockReq({ body: { title: data.title } }),
            res
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
});
