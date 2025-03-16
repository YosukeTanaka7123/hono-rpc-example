import type { Post } from "../../models/post.model";

export interface IPostsRepository {
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | undefined>;
  create(post: Omit<Post, "id">): Promise<Post>;
  update(id: string, post: Omit<Post, "id">): Promise<Post>;
  delete(id: string): Promise<void>;
}
