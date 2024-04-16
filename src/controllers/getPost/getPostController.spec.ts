jest.mock('../../utils/helpers', () => ({
    validateResults: jest.fn(() => ({
        isEmpty: jest.fn(() => true),
    })),
}));

import { getMockReq, getMockRes } from '@jest-mock/express';
import { GetPostController } from './getPostController';
import { validateResults } from '../../utils/helpers';

const data = {
    id: '1',
    title: 'title Post 1',
    body: 'body Post 1',
};

const mockRepository = {
    getPost: jest.fn(async () => data),
};
const mockErrorRepository = {
    getPost: jest.fn(async () => {
        throw new Error();
    }),
};

const { res, clearMockRes } = getMockRes();

beforeEach(() => clearMockRes());

describe('Get Post', () => {
    it('Should send a single post', async () => {
        const controller = new GetPostController(mockRepository);
        await controller.handle(getMockReq({ params: { id: '1' } }), res);

        expect(res.send).toHaveBeenCalledWith(data);
    });

    it('Should send a status error of 400', async () => {
        const controller = new GetPostController(mockErrorRepository);
        await controller.handle(getMockReq({ params: { id: '1' } }), res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('Should send a status error by not sending id param', async () => {
        // @ts-expect-error mock implementation of missing id param
        validateResults.mockImplementation(() => ({
            isEmpty: jest.fn(() => false),
            array: jest.fn(() => [{ msg: 'Missing id' }]),
        }));

        const controller = new GetPostController(mockErrorRepository);
        await controller.handle(getMockReq(), res);

        expect(res.send).toHaveBeenCalledWith({ error: 'Missing id' });
    });
});
