import { Hono } from "hono";
import { cors } from "hono/cors";
import posts from "./routes/posts";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("/*", cors());

const routes = app
  .get("/", (c) => c.json({ status: "OK" }, { status: 200 }))
  .route("/posts", posts);

export type AppType = typeof routes;

export default app;
