import { Request, Response } from "express";
// import { MongoGetPostsRepository } from "../../repositories/getPosts/mongoGetPostsRepository";
import { MysqlGetPostsRepository } from "../../repositories/getPosts/mysqlGetPostsRepository";
import { GetPostsController } from "./getPostsController";

export function getPosts(req: Request, res: Response){
    
    // const mongoGetPostsRepository = new MongoGetPostsRepository();
    const mysqlGetPostsRepository = new MysqlGetPostsRepository();
    const controller = new GetPostsController(mysqlGetPostsRepository);

    controller.handle(req, res);
}