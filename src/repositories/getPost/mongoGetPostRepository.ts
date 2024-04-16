import { IPost } from '../../entities/post/Protocol';
import { IGetPostRepository } from './protocols';
import PostMongoose from '../../entities/post/PostMongoose';
import mongoose, { isValidObjectId } from 'mongoose';

export class MongoGetPostRepository implements IGetPostRepository {
    async getPost(id: string): Promise<IPost> {
        if(!isValidObjectId(id)) throw new Error('Id not valid');

        const post = await PostMongoose.findById(new mongoose.Types.ObjectId(id));

        if (!post) throw new Error('Post not found');

        return {
            id: post._id,
            title: post.title,
            body: post.body,
        };
    }
}
