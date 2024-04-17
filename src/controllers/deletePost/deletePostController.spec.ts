jest.mock('../../utils/helpers', () => ({
    validateResults: jest.fn(() => ({
        isEmpty: jest.fn(() => true),
    })),
}));

import { getMockReq, getMockRes } from '@jest-mock/express';
import { DeletePostController } from './deletePostController';
import { validateResults } from '../../utils/helpers';

const mockRepository = {
    deletePost: jest.fn(async()=> {}),
};

const { res, clearMockRes } = getMockRes();

beforeEach(() => clearMockRes());

describe('Delete post', () => {
    const controller = new DeletePostController(mockRepository);

    it('should return 200', async () => {
        await controller.handle(getMockReq({ params: { id: '1' } }), res);

        expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should return status 400 when is missing id param', async () => {
        // @ts-expect-error mock implementation for returning error
        validateResults.mockImplementation(() => ({
            isEmpty: () => false,
            array: jest.fn(() => [{ msg: 'Missing id' }]),
        }));

        await controller.handle(
            getMockReq(),
            res
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
});
