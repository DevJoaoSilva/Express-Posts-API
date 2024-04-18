import { Model } from 'sequelize';
import { PostMysql } from '../../entities/post/PostMysql';
import { IPost } from '../../entities/post/Protocol';
import { IGetPostRepository } from './protocols';

export class MysqlGetPostRepository implements IGetPostRepository {
    async getPost(id: string): Promise<IPost> {

        const post = await PostMysql.findByPk<Model<IPost>>(id);

        if (!post) throw new Error('Post not found');

        return {
            id: post.toJSON().id,
            title: post.toJSON().title,
            body: post.toJSON().body,
        };
    }
}
