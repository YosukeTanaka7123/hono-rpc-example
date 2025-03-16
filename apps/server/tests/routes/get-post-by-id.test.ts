import { beforeEach, describe, expect, it } from "vitest";
import { setupTestApp, testPost } from "../setup/test-utils";

describe("GET /posts/:id", () => {
  const { client, mockRepository } = setupTestApp();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常系: 指定したIDの投稿が取得できること", async () => {
    // モックの設定
    mockRepository.findById.mockResolvedValue(testPost);

    // リクエストの実行
    const res = await client.posts[":id"].$get({
      param: { id: "test-id" },
    });

    // レスポンスの検証
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(testPost);
    expect(mockRepository.findById).toHaveBeenCalledWith("test-id");
  });

  it("異常系: 存在しないIDの場合404", async () => {
    // モックの設定
    mockRepository.findById.mockResolvedValue(null);

    // リクエストの実行
    const res = await client.posts[":id"].$get({
      param: { id: "non-existent" },
    });

    // エラーレスポンスの検証
    expect(res.status).toBe(404);
    expect(mockRepository.findById).toHaveBeenCalledWith("non-existent");
  });
});
