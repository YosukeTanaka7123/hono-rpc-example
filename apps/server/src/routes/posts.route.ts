import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { IPostsService } from "../services/interfaces/posts.service.interface";
import { postSchema } from "./schemas/posts.schema";

const app = new Hono()
  .get("/posts", async (c) => {
    const postsService = c
      .get("container")
      .resolve<IPostsService>("IPostsService");
    const posts = await postsService.getAllPosts();
    return c.json(posts);
  })
  .post(
    "/posts",
    zValidator("json", postSchema.pick({ fullname: true, age: true })),
    async (c) => {
      const data = c.req.valid("json");

      const postsService = c
        .get("container")
        .resolve<IPostsService>("IPostsService");
      const newPost = await postsService.createPost(data);
      return c.json(newPost);
    },
  )
  .get("/posts/:id", async (c) => {
    const postsService = c
      .get("container")
      .resolve<IPostsService>("IPostsService");
    const post = await postsService.getPostById(c.req.param("id"));
    return c.json(post);
  })
  .put(
    "/posts/:id",
    zValidator("json", postSchema.pick({ fullname: true, age: true })),
    async (c) => {
      const data = c.req.valid("json");

      const postsService = c
        .get("container")
        .resolve<IPostsService>("IPostsService");
      const updatedPost = await postsService.updatePost(
        c.req.param("id"),
        data,
      );
      return c.json(updatedPost);
    },
  )
  .delete("/posts/:id", async (c) => {
    const postsService = c
      .get("container")
      .resolve<IPostsService>("IPostsService");
    await postsService.deletePost(c.req.param("id"));
    return new Response(null, { status: 204 });
  });

export default app;
