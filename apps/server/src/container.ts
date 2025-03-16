import "reflect-metadata";
import { container } from "tsyringe";
import type { IPostsRepository } from "./repositories/interfaces/posts.repository.interface";
import { PostsRepository } from "./repositories/posts.repository";
import type { IPostsService } from "./services/interfaces/posts.service.interface";
import { PostsService } from "./services/posts.service";

// Register Repository
container.registerSingleton<IPostsRepository>(
  "IPostsRepository",
  PostsRepository,
);

// Register Service
container.registerSingleton<IPostsService>("IPostsService", PostsService);

export { container };
