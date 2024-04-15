import PostMongoose from '../../entities/post/PostMongoose';
import { IPost } from '../../entities/post/Protocol';
import { IGetPostsRepository } from './protocols';

export class MongoGetPostsRepository implements IGetPostsRepository {
    async getPosts(): Promise<IPost[]> {
        const posts = await PostMongoose.find();

        return posts.map(({ _id, title, body }) => ({
            id: _id,
            title,
            body,
        }));
    }
}
