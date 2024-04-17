import mongoose, { isValidObjectId } from 'mongoose';
import PostMongoose from '../../entities/post/PostMongoose';
import { IDeletePostRepository } from './protocols';

export class MongoDeletePostRepository implements IDeletePostRepository {
    async deletePost(id: string): Promise<void> {
        if (!isValidObjectId(id)) throw new Error('Invalid Id');

        const post = await PostMongoose.findById(
            new mongoose.Types.ObjectId(id)
        );

        if (!post) throw new Error('Post not found');

        await post.deleteOne();

        const isPostStillExist = await PostMongoose.findById(
            new mongoose.Types.ObjectId(id)
        );

        if (isPostStillExist) throw new Error('Something went wrong');
    }
}
