import { IPost } from '../../entities/post/Protocol';
import { ICreatePostDTO } from '../../controllers/createPost/createPostDTO';
import { ICreatePostRepository } from './protocols';
import { PostMysql } from '../../entities/post/PostMysql';
import { Model } from 'sequelize';

export class MysqlCreatePostRepository implements ICreatePostRepository {
    async createPost(post: ICreatePostDTO): Promise<IPost> {
        const newPost = await PostMysql.create<Model<IPost, Omit<IPost, 'id'>>>(post);
        
        return {
            id: newPost.dataValues.id,
            title: newPost.dataValues.title,
            body: newPost.dataValues.body,
        };
    }
}
