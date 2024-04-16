import { IPost } from "../../entities/post/Protocol";

export interface IGetPostRepository{
    getPost(id: string): Promise<IPost>
}