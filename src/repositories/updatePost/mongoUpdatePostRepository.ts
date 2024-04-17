import { IUpdatePostDTO } from '../../controllers/updatePost/updatePostDTO';
import PostMongoose from '../../entities/post/PostMongoose';
import { IPost } from '../../entities/post/Protocol';
import { IUpdatePostRepository } from './protocols';
import mongoose, { isValidObjectId } from 'mongoose';

export class MongoUpdatePostRepository implements IUpdatePostRepository {
    async updatePost(id: string, data: IUpdatePostDTO): Promise<IPost> {
        if (!isValidObjectId(id)) throw new Error('Id is invalid');

        const post = await PostMongoose.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { $set: { ...data } }
        );

        if (!post) throw new Error('Post not found');

        const newPost = await PostMongoose.findById(id);
        if (!newPost) throw new Error('Something went wrong');

        return {
            id: newPost._id,
            title: newPost.title,
            body: newPost.body,
        };
    }
}
