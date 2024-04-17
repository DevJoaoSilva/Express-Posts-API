jest.mock('../../utils/helpers', () => ({
    validateResults: jest.fn(() => ({
        isEmpty: jest.fn(() => true),
    })),
}));
import { validateResults } from '../../utils/helpers';
import { CreatePostController } from './createPostController';
import { getMockReq, getMockRes } from '@jest-mock/express';

const data = {
    title: 'test title',
    body: 'test body',
};

const mockRepository = {
    createPost: jest.fn(async () => ({ id: '1', ...data })),
};

const { res, clearMockRes } = getMockRes();

beforeEach(() => {
    jest.clearAllMocks();
    clearMockRes();
});

describe('Create Post', () => {
    const controller = new CreatePostController(mockRepository);

    it('should call createPostRepository with data', async () => {
        await controller.handle(getMockReq({ body: data }), res);

        expect(mockRepository.createPost).toHaveBeenCalledWith(data);
    });

    it('should return the created post', async () => {
        await controller.handle(getMockReq({ body: data }), res);

        expect(res.send).toHaveBeenCalledWith({ id: '1', ...data });
    });

    it('should return status 400', async () => {
        // @ts-expect-error mock implementation for returning error
        validateResults.mockImplementation(() => ({
            isEmpty: () => false,
            array: jest.fn(() => [{ msg: 'invalid field' }]),
        }));

        await controller.handle(
            getMockReq({ body: { title: data.title } }),
            res
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
});
