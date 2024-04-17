import { Request, Response } from 'express';
import { IController } from '../protocols';
import { validateResults } from '../../utils/helpers';
import { IGetPostRepository } from '../../repositories/getPost/protocols';

export class GetPostController implements IController {
    constructor(private readonly repository: IGetPostRepository) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const result = validateResults(req as Request);

        if (!result.isEmpty()) {
            return res.status(400).send({ error: result.array()[0]?.msg });
        }

        try {
            const post = await this.repository.getPost(req.params.id);

            return res.status(200).send(post);
        } catch (error) {
            if (error instanceof Error) {
                return error.message === 'Post not found'
                    ? res.status(404).send({ msg: error.message })
                    : res.status(400).send({ msg: error.message });
            }
            return res.status(500).send({ error: 'Something went wrong' });
        }
    }
}
