import { HTTPException } from "hono/http-exception";
import { inject, injectable } from "tsyringe";
import type { IPostsRepository } from "../repositories/interfaces/posts.repository.interface";
import type { Post } from "../routes/schemas/posts.schema";
import type { IPostsService } from "./interfaces/posts.service.interface";

@injectable()
export class PostsService implements IPostsService {
  constructor(
    @inject("IPostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.findAll();
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postsRepository.findById(id);
    if (!post) {
      throw new HTTPException(404, { message: "Post not found" });
    }
    return post;
  }

  async createPost(data: Omit<Post, "id">): Promise<Post> {
    return this.postsRepository.create(data);
  }

  async updatePost(id: string, data: Omit<Post, "id">): Promise<Post> {
    try {
      return await this.postsRepository.update(id, data);
    } catch (error) {
      throw new HTTPException(404, { message: "Post not found" });
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new HTTPException(404, { message: "Post not found" });
    }
  }
}
