import { Request, Response } from 'express';
import { IController } from '../protocols';
import { ICreatePostRepository } from '../../repositories/createPost/protocols';
import { validationResult } from 'express-validator';

export class CreatePostController implements IController {
    constructor(private readonly repository: ICreatePostRepository) {}

    async handle(req: Request, res: Response): Promise<void> {
        
        const result = validationResult(req);
        
        if (!result.isEmpty()) {
            console.log('empty');
            
            res.status(400).send({ error: result.array()[0].msg });
            return;
        }
        try {
            const { title, body } = req.body;
            const post = await this.repository.createPost({ title, body });
            res.status(201).json(post);
        } catch (error) {
            res.status(500).send('Something went wrong');
        }
    }
}
