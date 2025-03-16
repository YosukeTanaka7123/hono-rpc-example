import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { postSchema } from "../models/post.model";
import type { IPostsService } from "../services/interfaces/posts.service.interface";

const app = new Hono();

app
  .get("/", async (c) => {
    const postsService = c
      .get("container")
      .resolve<IPostsService>("IPostsService");
    const posts = await postsService.getAllPosts();
    return c.json(posts);
  })
  .post(
    "/",
    zValidator("json", postSchema.pick({ fullname: true, age: true })),
    async (c) => {
      const postsService = c
        .get("container")
        .resolve<IPostsService>("IPostsService");
      const data = c.req.valid("json");
      const newPost = await postsService.createPost(data);
      return c.json(newPost);
    },
  )
  .get("/:id", async (c) => {
    const postsService = c
      .get("container")
      .resolve<IPostsService>("IPostsService");
    const post = await postsService.getPostById(c.req.param("id"));
    return c.json(post);
  })
  .put(
    "/:id",
    zValidator("json", postSchema.pick({ fullname: true, age: true })),
    async (c) => {
      const postsService = c
        .get("container")
        .resolve<IPostsService>("IPostsService");
      const data = c.req.valid("json");
      const updatedPost = await postsService.updatePost(
        c.req.param("id"),
        data,
      );
      return c.json(updatedPost);
    },
  )
  .delete("/:id", async (c) => {
    const postsService = c
      .get("container")
      .resolve<IPostsService>("IPostsService");
    await postsService.deletePost(c.req.param("id"));
    return new Response(null, { status: 204 });
  });

export default app;
