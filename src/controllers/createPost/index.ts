// instanciate controller/repo/usecase

import { Request, Response } from "express";
import { MongoCreatePostRepository } from "../../repositories/createPost/mongoCreatePostRepository";
import { CreatePostController } from "./createPostController";

export function createPost(req: Request, res: Response){
    const mongoCreatePostRepository = new MongoCreatePostRepository();

    const createPostController = new CreatePostController(mongoCreatePostRepository);

    createPostController.handle(req, res);
}