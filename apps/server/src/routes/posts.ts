import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const postSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  age: z.number(),
});

const postsSchema = z.array(postSchema);

type Posts = z.infer<typeof postsSchema>;

const postsData: Posts = [];

const app = new Hono()
  .get("/", (c) => {
    return c.json(postsData);
  })
  .post(
    "/",
    zValidator("json", postSchema.pick({ fullname: true, age: true })),
    (c) => {
      const requestData = c.req.valid("json");

      // Create a new post
      const newPost = { id: uuidv4(), ...requestData };
      postsData.push(newPost);

      // Return the new post
      return c.json(newPost);
    },
  )
  .get("/:id", (c) => {
    // Find
    const post = postsData.find((post) => post.id === c.req.param("id"));

    // Not found
    if (!post) {
      throw new HTTPException(404, { message: "Post not found" });
    }

    // Return the post
    return c.json(post);
  })
  .put(
    "/:id",
    zValidator("json", postSchema.pick({ fullname: true, age: true })),
    (c) => {
      const requestData = c.req.valid("json");

      // Find
      const postIndex = postsData.findIndex(
        (post) => post.id === c.req.param("id"),
      );

      // Not found
      if (postIndex === -1) {
        throw new HTTPException(404, { message: "Post not found" });
      }

      // Update
      const updatedPost = { id: c.req.param("id"), ...requestData };
      postsData[postIndex] = updatedPost;

      // Return the updated post
      return c.json(updatedPost);
    },
  )
  .delete("/:id", (c) => {
    // Find
    const postIndex = postsData.findIndex(
      (post) => post.id === c.req.param("id"),
    );

    // Not found
    if (postIndex === -1) {
      throw new HTTPException(404, { message: "Post not found" });
    }

    // Delete
    postsData.splice(postIndex, 1);

    // Return
    return c.json(204);
  });

export default app;
