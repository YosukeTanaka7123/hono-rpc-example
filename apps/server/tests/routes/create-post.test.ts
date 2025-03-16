import { beforeEach, describe, expect, it } from "vitest";
import { setupTestApp, testPost } from "../setup/test-utils";

describe("POST /posts", () => {
  const { client, mockRepository } = setupTestApp();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("正常系: 投稿が作成できること", async () => {
    // リクエストデータ
    const requestData = {
      fullname: testPost.fullname,
      age: testPost.age,
    };

    // モックの設定
    mockRepository.create.mockResolvedValue({
      ...testPost,
      id: "new-id",
    });

    // リクエストの実行
    const res = await client.posts.$post({
      json: requestData,
    });

    // レスポンスの検証
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ...testPost,
      id: "new-id",
    });
    expect(mockRepository.create).toHaveBeenCalledWith(requestData);
  });

  it("異常系: バリデーションエラー（必須項目なし）", async () => {
    // リクエストの実行
    const res = await client.posts.$post({
      // @ts-expect-error
      json: {},
    });

    // バリデーションエラーの検証
    expect(res.status).toBe(400);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it("異常系: バリデーションエラー（型不一致）", async () => {
    // リクエストの実行
    const res = await client.posts.$post({
      json: {
        fullname: "Test User",
        // @ts-expect-error
        age: "invalid", // 数値であるべき
      },
    });

    // バリデーションエラーの検証
    expect(res.status).toBe(400);
    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
