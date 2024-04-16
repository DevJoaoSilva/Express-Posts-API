import { Request, Response } from 'express';
import { IController } from '../protocols';
import { IGetPostsRepository } from '../../repositories/getPosts/protocols';

export class GetPostsController implements IController {
    constructor(private readonly repository: IGetPostsRepository) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const post = await this.repository.getPosts();

            return res.status(200).send(post);
        } catch (err) {
            return res.status(500).send('Something went wrong');
        }
    }
}
