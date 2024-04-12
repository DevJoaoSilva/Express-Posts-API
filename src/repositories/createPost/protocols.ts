import { IPost } from "../../entities/post/Protocol";
import { ICreatePostDTO } from "../../useCases/createPost/createPostDTO";

export interface ICreatePostRepository {
    createPost(post: ICreatePostDTO): Promise<IPost>
}