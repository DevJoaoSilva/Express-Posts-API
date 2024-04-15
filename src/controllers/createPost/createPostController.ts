import { Request, Response } from 'express';
import { IController } from '../protocols';
import { ICreatePostRepository } from '../../repositories/createPost/protocols';
import { validateResults } from '../../utils/helpers';

export class CreatePostController implements IController {
    constructor(private readonly repository: ICreatePostRepository) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const result = validateResults(req);

        if (!result.isEmpty()) {
            return res.status(400).send({ error: result.array()[0]?.msg });
        }

        try {
            const { title, body } = req.body;
            const post = await this.repository.createPost({ title, body });
            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).send('Something went wrong');
        }
    }
}
