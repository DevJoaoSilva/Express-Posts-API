import { Request, Response } from 'express';
import { DeletePostController } from './deletePostController';
// import { MongoDeletePostRepository } from '../../repositories/deletePost/mongoDeletePostRepository';
import { MysqlDeletePostRepository } from '../../repositories/deletePost/mysqlDeletePostRepository';

export function deletePost(req: Request, res: Response) {
    // const mongoDeletePostRepository = new MongoDeletePostRepository();
    const mysqlDeletePostRepository = new MysqlDeletePostRepository();
    const controller = new DeletePostController(mysqlDeletePostRepository);

    controller.handle(req, res);
}
