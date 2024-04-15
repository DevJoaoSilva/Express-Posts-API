import { IPost } from "../../entities/post/Protocol";

export interface IGetPostsRepository{
    getPosts(): Promise<IPost[]>
}