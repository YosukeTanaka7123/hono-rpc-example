import { beforeEach, describe, expect, it } from "vitest";
import { setupTestApp, testPost } from "../setup/test-utils";

describe("DELETE /posts/:id", () => {
  const { client, mockRepository } = setupTestApp();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常系: 投稿が削除できること", async () => {
    // モックの設定
    mockRepository.delete.mockResolvedValue(undefined);

    // リクエストの実行
    const res = await client.posts[":id"].$delete({
      param: { id: testPost.id },
    });

    // レスポンスの検証
    expect(res.status).toBe(204);
    expect(mockRepository.delete).toHaveBeenCalledWith(testPost.id);
  });

  it("異常系: 存在しないIDの場合404", async () => {
    // モックの設定
    mockRepository.delete.mockRejectedValue(new Error("Post not found"));

    // リクエストの実行
    const res = await client.posts[":id"].$delete({
      param: { id: "non-existent" },
    });

    // エラーレスポンスの検証
    expect(res.status).toBe(404);
    expect(mockRepository.delete).toHaveBeenCalledWith("non-existent");
  });
});
