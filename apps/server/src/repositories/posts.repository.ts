import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import type { Post } from "../models/post.model";
import type { IPostsRepository } from "./interfaces/posts.repository.interface";

@injectable()
export class PostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async findById(id: string): Promise<Post | undefined> {
    return this.posts.find((post) => post.id === id);
  }

  async create(post: Omit<Post, "id">): Promise<Post> {
    const newPost: Post = { id: uuidv4(), ...post };
    this.posts.push(newPost);
    return newPost;
  }

  async update(id: string, post: Omit<Post, "id">): Promise<Post> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }

    const updatedPost: Post = { id, ...post };
    this.posts[index] = updatedPost;
    return updatedPost;
  }

  async delete(id: string): Promise<void> {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Post not found");
    }

    this.posts.splice(index, 1);
  }
}
