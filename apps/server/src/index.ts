import "reflect-metadata";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { container } from "./container";
import { diMiddleware } from "./middleware/di.middleware";
import posts from "./routes/posts.route";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use("/*", cors());
app.use("/*", diMiddleware(container));

app.onError((err, c) => {
  // Get the custom response from the HTTPException
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  // Return a generic error response
  return c.json(
    {
      status: 500,
      title: "Internal Server Error",
      detail: `${err.name} - ${err.message}`,
      code: "INTERNAL_SERVER_ERROR",
    },
    { status: 500 },
  );
});

const routes = app
  .get("/", (c) => c.json({ status: "OK" }, { status: 200 }))
  .route("/", posts);

export type AppType = typeof routes;

export default app;
