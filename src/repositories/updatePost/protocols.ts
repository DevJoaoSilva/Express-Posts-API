import { IUpdatePostDTO } from "../../controllers/updatePost/updatePostDTO";
import { IPost } from "../../entities/post/Protocol";

export interface IUpdatePostRepository{
    updatePost(id: string, data: IUpdatePostDTO): Promise<IPost>
}