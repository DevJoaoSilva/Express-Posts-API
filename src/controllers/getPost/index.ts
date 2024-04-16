import { Request, Response } from 'express';
import { MongoGetPostRepository } from '../../repositories/getPost/mongoGetPostRepository';
import { GetPostController } from './getPostController';

export function getPost(req: Request, res: Response) {
    const mongoGetPostRepository = new MongoGetPostRepository();
    const controller = new GetPostController(mongoGetPostRepository);

    controller.handle(req, res);
}
