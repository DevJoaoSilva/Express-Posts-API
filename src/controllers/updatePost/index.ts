import { Request, Response } from "express";
// import { MongoUpdatePostRepository } from "../../repositories/updatePost/mongoUpdatePostRepository";
import { UpdatePostController } from "./updatePostController";
import { MysqlUpdatePostRepository } from "../../repositories/updatePost/mysqlUpdatePostRepository";

export function updatePost(req: Request, res: Response){
    // const mongoUpdatePostRepository = new MongoUpdatePostRepository();
    const mysqlUpdatePostRepository = new MysqlUpdatePostRepository();
    const controller = new UpdatePostController(mysqlUpdatePostRepository);
    controller.handle(req, res);
}