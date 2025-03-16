import { beforeEach, describe, expect, it } from "vitest";
import { setupTestApp, testPost } from "../setup/test-utils";

describe("GET /posts", () => {
  const { client, mockRepository } = setupTestApp();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常系: 投稿一覧が取得できること", async () => {
    // モックの設定
    mockRepository.findAll.mockResolvedValue([testPost]);

    // リクエストの実行
    const res = await client.posts.$get();

    // レスポンスの検証
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual([testPost]);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("異常系: リポジトリでエラーが発生した場合", async () => {
    // モックの設定
    mockRepository.findAll.mockRejectedValue(new Error("Database error"));

    // リクエストの実行
    const res = await client.posts.$get();

    // エラーレスポンスの検証
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      status: 500,
      title: "Internal Server Error",
      detail: "Error - Database error",
      code: "INTERNAL_SERVER_ERROR",
    });
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
