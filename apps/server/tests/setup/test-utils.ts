import "reflect-metadata";
import { testClient } from "hono/testing";
import { type Mock, vi } from "vitest";
import type { AppType } from "../../src";
import app from "../../src";
import { container } from "../../src/container";

// テストデータ
export const testPost = {
  id: "test-id",
  fullname: "Test User",
  age: 20,
};

// モックリポジトリの型
export interface MockRepository {
  findAll: Mock;
  findById: Mock;
  create: Mock;
  update: Mock;
  delete: Mock;
}

// テストアプリケーションのセットアップ
export function setupTestApp() {
  const mockRepository: MockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  // DIコンテナの設定
  container.register("IPostsRepository", {
    useValue: mockRepository,
  });

  return {
    mockRepository,
    client: testClient<AppType>(app),
  };
}
