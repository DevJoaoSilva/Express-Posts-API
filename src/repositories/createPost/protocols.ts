import { ICreatePostDTO } from "../../controllers/createPost/createPostDTO";
import { IPost } from "../../entities/post/Protocol";

export interface ICreatePostRepository {
    createPost(post: ICreatePostDTO): Promise<IPost>
}