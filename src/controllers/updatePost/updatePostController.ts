import { Request, Response } from 'express';
import { IController } from '../protocols';
import { validateResults } from '../../utils/helpers';
import { IUpdatePostRepository } from '../../repositories/updatePost/protocols';

export class UpdatePostController implements IController {
    constructor(private readonly repository: IUpdatePostRepository) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const result = validateResults(req);

        if (!result.isEmpty())
            res.status(400).send({ msg: result.array()[0].msg });

        const validKeys = ['title', 'body'];

        const isBodyValid = Object.keys(req.body).every((key) =>
            validKeys.includes(key)
        );

        if (!isBodyValid)
            res.status(400).send({ msg: 'Some fields are missing or not allowed' });

        try {
            const post = await this.repository.updatePost(
                req.params.id,
                req.body
            );

            return res.status(200).send(post);
        } catch (error) {
            if (error instanceof Error)
                return res.status(400).send({ error: error.message });

            return res.status(500).send({ error: 'Something went wrong' });
        }
    }
}
