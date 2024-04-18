import { Request, Response } from 'express';
// import { MongoGetPostRepository } from '../../repositories/getPost/mongoGetPostRepository';
import { GetPostController } from './getPostController';
import { MysqlGetPostRepository } from '../../repositories/getPost/mysqlGetPostRepository';

export function getPost(req: Request, res: Response) {
    // const mongoGetPostRepository = new MongoGetPostRepository();
    const mysqlGetPostRepository = new MysqlGetPostRepository();
    const controller = new GetPostController(mysqlGetPostRepository);

    controller.handle(req, res);
}
