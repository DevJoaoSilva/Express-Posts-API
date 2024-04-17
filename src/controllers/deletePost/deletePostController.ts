import { Request, Response } from 'express';
import { IController } from '../protocols';
import { IDeletePostRepository } from '../../repositories/deletePost/protocols';
import { validateResults } from '../../utils/helpers';

export class DeletePostController implements IController {
    constructor(private readonly repository: IDeletePostRepository) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const result = validateResults(req);

        if (!result.isEmpty())
            return res.status(400).send({ msg: result.array()[0].msg });

        try {
            await this.repository.deletePost(req.params.id);

            return res.sendStatus(200);
        } catch (error) {
            if (error instanceof Error) {
                return error.message === 'Post not found'
                    ? res.status(404).send({ msg: error.message })
                    : res.status(400).send({ msg: error.message });
            }
            return res.status(500).send({ msg: 'Something went wrong' });
        }
    }
}
