import { Request, Response } from "express";
import { MongoUpdatePostRepository } from "../../repositories/updatePost/mongoUpdatePostRepository";
import { UpdatePostController } from "./updatePostController";

export function updatePost(req: Request, res: Response){
    const mongoUpdatePostRepository = new MongoUpdatePostRepository();
    const controller = new UpdatePostController(mongoUpdatePostRepository);
    controller.handle(req, res);
}