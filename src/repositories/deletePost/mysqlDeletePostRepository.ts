import { Model } from 'sequelize';
import { PostMysql } from '../../entities/post/PostMysql';
import { IDeletePostRepository } from './protocols';
import { IPost } from '../../entities/post/Protocol';

export class MysqlDeletePostRepository implements IDeletePostRepository {
    async deletePost(id: string): Promise<void> {
        const post = await PostMysql.findByPk<Model<IPost>>(id);

        if (!post) throw new Error('Post not found');

        await post.destroy();

        const isPostStillExist = await PostMysql.findByPk<Model<IPost>>(id);

        if (isPostStillExist) throw new Error('Something went wrong');
    }
}
