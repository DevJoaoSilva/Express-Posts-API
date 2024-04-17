import { Request, Response } from 'express';
import { DeletePostController } from './deletePostController';
import { MongoDeletePostRepository } from '../../repositories/deletePost/mongoDeletePostRepository';

export function deletePost(req: Request, res: Response) {
    const mongoDeletePostRepository = new MongoDeletePostRepository();
    const controller = new DeletePostController(mongoDeletePostRepository);

    controller.handle(req, res);
}
