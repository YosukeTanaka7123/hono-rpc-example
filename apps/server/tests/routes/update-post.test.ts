import { beforeEach, describe, expect, it } from "vitest";
import { setupTestApp, testPost } from "../setup/test-utils";

describe("PUT /posts/:id", () => {
  const { client, mockRepository } = setupTestApp();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常系: 投稿が更新できること", async () => {
    // 更新データ
    const requestData = {
      fullname: "Updated User",
      age: 25,
    };

    // モックの設定
    mockRepository.update.mockResolvedValue({
      id: testPost.id,
      ...requestData,
    });

    // リクエストの実行
    const res = await client.posts[":id"].$put({
      param: { id: testPost.id },
      json: requestData,
    });

    // レスポンスの検証
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      id: testPost.id,
      ...requestData,
    });
    expect(mockRepository.update).toHaveBeenCalledWith(
      testPost.id,
      requestData,
    );
  });

  it("異常系: バリデーションエラー", async () => {
    // リクエストの実行
    const res = await client.posts[":id"].$put({
      param: { id: testPost.id },
      json: {
        fullname: "Updated User",
        // @ts-expect-error
        age: "invalid", // 数値であるべき
      },
    });

    // バリデーションエラーの検証
    expect(res.status).toBe(400);
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it("異常系: 存在しないIDの場合404", async () => {
    // モックの設定
    mockRepository.update.mockRejectedValue(new Error("Post not found"));

    // リクエストの実行
    const res = await client.posts[":id"].$put({
      param: { id: "non-existent" },
      json: {
        fullname: "Updated User",
        age: 25,
      },
    });

    // エラーレスポンスの検証
    expect(res.status).toBe(404);
  });
});
