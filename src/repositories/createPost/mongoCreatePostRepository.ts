import PostMongoose from '../../entities/post/PostMongoose';
import { IPost } from '../../entities/post/Protocol';
import { ICreatePostDTO } from '../../useCases/createPost/createPostDTO';
import { ICreatePostRepository } from './protocols';

export class MongoCreatePostRepository implements ICreatePostRepository {
    async createPost(post: ICreatePostDTO): Promise<IPost> {
        const createdPost = await PostMongoose.create<IPost>(post);

        return {
            id: createdPost._id,
            title: post.title,
            body: post.body,
        };
    }
}
