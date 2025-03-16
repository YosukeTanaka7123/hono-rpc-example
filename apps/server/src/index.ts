import "reflect-metadata";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { container } from "./container";
import { diMiddleware } from "./middleware/di.middleware";
import posts from "./routes/posts.route";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("/*", cors());
app.use("/*", diMiddleware(container));

const routes = app
  .get("/", (c) => c.json({ status: "OK" }, { status: 200 }))
  .route("/posts", posts);

export type AppType = typeof routes;

export default app;
