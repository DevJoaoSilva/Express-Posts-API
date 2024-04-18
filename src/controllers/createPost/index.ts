import { Request, Response } from "express";
// import { MongoCreatePostRepository } from "../../repositories/createPost/mongoCreatePostRepository";
import { CreatePostController } from "./createPostController";
import { MysqlCreatePostRepository } from "../../repositories/createPost/mysqlCreatePostRepository";

export function createPost(req: Request, res: Response){
    // const mongoCreatePostRepository = new MongoCreatePostRepository();
    const mysqlCreatePostRepository = new MysqlCreatePostRepository();

    const createPostController = new CreatePostController(mysqlCreatePostRepository);

    createPostController.handle(req, res);
}