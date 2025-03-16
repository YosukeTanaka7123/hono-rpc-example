import { z } from "zod";

export const postSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  age: z.number(),
});

export const postsSchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;
export type Posts = z.infer<typeof postsSchema>;
