import { getMockReq, getMockRes } from '@jest-mock/express';
import { GetPostsController } from './getPostsController';

const posts = [
    { id: '1', title: 'Post 1 title', body: 'Post 1 body' },
    { id: '2', title: 'Post 2 title', body: 'Post 2 body' },
];

const mockRepository = {
    async getPosts() {
        return posts;
    },
};
const mockErrorRepository = {
    async getPosts() {
        throw new Error('');
    },
};

const { res, clearMockRes } = getMockRes();

beforeEach(()=> clearMockRes());

describe('Get Posts', () => {
    it('should return an array of posts', async () => {
        const controller = new GetPostsController(mockRepository);
        await controller.handle(getMockReq(), res);

        expect(res.json).toHaveBeenCalledWith(posts);
    });

    it('should return an 500 if some error happens in the repository', async ()=>{
        const controller = new GetPostsController(mockErrorRepository);
        await controller.handle(getMockReq(), res);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});
