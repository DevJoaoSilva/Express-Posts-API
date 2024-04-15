import { Request, Response } from "express";
import { MongoGetPostsRepository } from "../../repositories/getPosts/mongoGetPostsRepository";
import { GetPostsController } from "./getPostsController";

export function getPosts(req: Request, res: Response){
    
    const mongoGetPostsRepository = new MongoGetPostsRepository();
    const controller = new GetPostsController(mongoGetPostsRepository);

    controller.handle(req, res);
}