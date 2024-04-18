import { IPost } from '../../entities/post/Protocol';
import { IGetPostsRepository } from './protocols';
import { PostMysql } from '../../entities/post/PostMysql';
import { Model } from 'sequelize';

export class MysqlGetPostsRepository implements IGetPostsRepository {
    async getPosts(): Promise<IPost[]> {
        const posts = await PostMysql.findAll<Model<IPost>>();

        return posts.map((p) => ({
            id: p.toJSON().id,
            title:p.toJSON().title,
            body: p.toJSON().body,
        }));
    }
}
