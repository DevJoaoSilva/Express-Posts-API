export interface IDeletePostRepository{
    deletePost(id: string): Promise<void>
}