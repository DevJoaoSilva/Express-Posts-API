jest.mock('../../utils/helpers', () => ({
    validateResults: jest.fn(() => ({ isEmpty: () => true })),
}));

import { getMockReq, getMockRes } from '@jest-mock/express';
import { UpdatePostController } from './updatePostController';
import { validateResults } from '../../utils/helpers';

const data = {
    id: '1',
    title: 'titulo',
    body: 'body',
};
const dataToUpdate = {
    title: 'titulo updated',
    body: 'body updated',
};

const mockRepository = {
    updatePost: jest.fn(async () => ({
        id: data.id,
        ...dataToUpdate,
    })),
};

const { res, clearMockRes } = getMockRes();

beforeEach(() => clearMockRes());

describe('Update Post', () => {
    const controller = new UpdatePostController(mockRepository);

    it('Should call updatePost with data passed', async () => {
        await controller.handle(
            getMockReq({ params: { id: '1' }, body: dataToUpdate }),
            res
        );

        expect(mockRepository.updatePost).toHaveBeenCalledWith(
            '1',
            dataToUpdate
        );
    });
    it('Should return data updated', async () => {
        await controller.handle(
            getMockReq({ params: { id: '1' }, body: dataToUpdate }),
            res
        );

        expect(res.send).toHaveBeenCalledWith({
            id: data.id,
            ...dataToUpdate,
        });
    });
    it('Should return 400 when fields missing', async () => {
        // @ts-expect-error mock implementation to error missing field
        validateResults.mockImplementation(() => ({
            isEmpty: jest.fn(() => false),
            array: jest.fn(() => [{ msg: 'Missing body' }]),
        }));
        await controller.handle(
            getMockReq({
                params: { id: '1' },
                body: { title: dataToUpdate.title },
            }),
            res
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
    it('Should return 400 when send fields that are not allowed', async () => {
        await controller.handle(
            getMockReq({
                params: { id: '1' },
                body: { ...dataToUpdate, test: 'not allowed' },
            }),
            res
        );

        expect(res.status).toHaveBeenCalledWith(400);
    });
});
