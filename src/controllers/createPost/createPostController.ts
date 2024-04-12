import { Request, Response } from 'express';
import { IController } from '../protocols';
import { ICreatePostRepository } from '../../repositories/createPost/protocols';

export class CreatePostController implements IController {
    constructor(private readonly repository: ICreatePostRepository) {}

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const post = await this.repository.createPost(req.body);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).send('Something went wrong');
        }
    }
}
