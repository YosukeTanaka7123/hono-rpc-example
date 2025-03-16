import type { Context, Next } from "hono";
import type { DependencyContainer } from "tsyringe";

declare module "hono" {
  interface ContextVariableMap {
    container: DependencyContainer;
  }
}

export const diMiddleware = (container: DependencyContainer) => {
  return async (c: Context, next: Next) => {
    c.set("container", container);
    await next();
  };
};
