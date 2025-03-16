import type { Post } from "../../routes/schemas/posts.schema";

export interface IPostsService {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post>;
  createPost(data: Omit<Post, "id">): Promise<Post>;
  updatePost(id: string, data: Omit<Post, "id">): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
