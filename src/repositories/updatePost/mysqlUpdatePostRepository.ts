import { Model } from 'sequelize';
import { IUpdatePostDTO } from '../../controllers/updatePost/updatePostDTO';
import { PostMysql } from '../../entities/post/PostMysql';
import { IPost } from '../../entities/post/Protocol';
import { IUpdatePostRepository } from './protocols';

export class MysqlUpdatePostRepository implements IUpdatePostRepository {
    async updatePost(id: string, data: IUpdatePostDTO): Promise<IPost> {
        const post = await PostMysql.findByPk<Model<IPost>>(id);

        if (!post) throw new Error('Post not found');

        await post.update(data);

        await post.save();

        return {
            id: post.toJSON().id,
            title: post.toJSON().title,
            body: post.toJSON().body,
        };
    }
}
